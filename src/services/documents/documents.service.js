import pdf from 'html-pdf';
import fs from 'fs';
import Consts from '../../config/constants';
import Response from '../../responses';
import Log from '../../log';

export default () => {
  const document = {};
  const CONSTS = Consts();
  const logger = Log();

  /* Format HTML Function */
  function formatHTML(html, users, index) {
    const mapPDF = {
      Index: index,
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
      const options = {
        border: {
          top: CONSTS.PDF.TEMPLATE.OPTIONS.BORDER.TOP,
          right: CONSTS.PDF.TEMPLATE.OPTIONS.BORDER.RIGHT,
          bottom: CONSTS.PDF.TEMPLATE.OPTIONS.BORDER.BOTTOM,
          left: CONSTS.PDF.TEMPLATE.OPTIONS.BORDER.LEFT,
        },
      };

      const html = formatHTML(
        fs.readFileSync(`src/templates/${params.docTypeID}.html`, CONSTS.PDF.TEMPLATE.CHARSET),
        params.users,
        0,
      );
      pdf.create(html, options).toBuffer((err, buffer) => {
        if (!err) {
          const response = {
            buffer,
            html,
          };
          resolve(new Response(
            CONSTS.RESPONSES.DOCUMENTS.CREATE.SUCCESS,
            CONSTS.HTTP.CODES.OK,
            response,
          ));
        } else {
          reject(new Response(
            CONSTS.RESPONSES.DOCUMENTS.CREATE.ERROR,
            CONSTS.HTTP.CODES.INTERNAL_SERVER_ERROR,
            err,
          ));
        }
      });
    });
  };

  /* Add Annex */
  document.annex = (params) => {
    return new Promise((resolve, reject) => {
      let html = '';
      let indice = 0;
      html = html.concat(formatHTML(
        fs.readFileSync(`src/templates/${params.docTypeID}.html`, CONSTS.PDF.TEMPLATE.CHARSET),
        params.users,
        0,
      ));

      params.annexTypes.forEach((annex, index) => {
        html = html.concat(formatHTML(
          fs.readFileSync(`src/templates/${annex.type}.html`, CONSTS.PDF.TEMPLATE.CHARSET),
          params.users,
          index + 1,
        ));
        indice = index + 1;
      });

      html = html.concat(formatHTML(
        fs.readFileSync(`src/templates/${params.annexTypeID}.html`, CONSTS.PDF.TEMPLATE.CHARSET),
        params.users,
        indice + 1,
      ));

      const options = {
        border: {
          top: CONSTS.PDF.TEMPLATE.OPTIONS.BORDER.TOP,
          right: CONSTS.PDF.TEMPLATE.OPTIONS.BORDER.RIGHT,
          bottom: CONSTS.PDF.TEMPLATE.OPTIONS.BORDER.BOTTOM,
          left: CONSTS.PDF.TEMPLATE.OPTIONS.BORDER.LEFT,
        },
      };

      pdf.create(html, options).toBuffer((err, buffer) => {
        if (!err) {
          const response = {
            buffer,
            html,
          };
          resolve(new Response(
            CONSTS.RESPONSES.DOCUMENTS.CREATE.SUCCESS,
            CONSTS.HTTP.CODES.OK,
            response,
          ));
        } else {
          reject(new Response(
            CONSTS.RESPONSES.DOCUMENTS.CREATE.ERROR,
            CONSTS.HTTP.CODES.INTERNAL_SERVER_ERROR,
            err,
          ));
        }
      });
    });
  };

  return document;
};
