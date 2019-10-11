import pdf from 'html-pdf';
import fs from 'fs';
import Consts from '../../config/constants';
import Response from '../../responses';

export default () => {
  const document = {};
  const CONSTS = Consts();

  /* Format HTML Function */
  function formatHTML(html, users) {
    const mapPDF = {
      FirstUserName: users[0].name,
      FirstUserRUT: users[0].RUT,
      SecondUserName: users[1].name,
      SecondUserRUT: users[1].RUT,
    };

    const re = new RegExp(Object.keys(mapPDF).join('|'), 'g');

    const response = html.replace(re, matched => {
      return mapPDF[matched];
    });

    return response;
  }

  /* Create Documents */
  document.create = (params) => {
    return new Promise((resolve, reject) => {
      let html = fs.readFileSync(`src/templates/${params.docTypeID}.html`, CONSTS.PDF.TEMPLATE.CHARSET);
      const options = {
        border: {
          top: CONSTS.PDF.TEMPLATE.OPTIONS.BORDER.TOP,
          right: CONSTS.PDF.TEMPLATE.OPTIONS.BORDER.RIGHT,
          bottom: CONSTS.PDF.TEMPLATE.OPTIONS.BORDER.BOTTOM,
          left: CONSTS.PDF.TEMPLATE.OPTIONS.BORDER.LEFT,
        },
      };

      html = formatHTML(html, params.users);

      pdf.create(html, options).toBuffer((err, buffer) => {
        if (!err) {
          const response = {
            buffer,
            html,
          };
          resolve(new Response(
            CONSTS.RESPONSES.DOCUMENTS.STORE.CREATE,
            CONSTS.HTTP.CODES.OK,
            response,
          ));
        } else {
          reject(err);
        }
      });
    });
  };

  /* Create Annex */
  document.createAnnex = (docTypeID, users) => {
    /*
    Create PDF & Sign it with the users
    */
    return {
      doc_type_id: docTypeID,
      users,
    };
  };

  return document;
};
