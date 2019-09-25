import pdf from 'html-pdf';
import fs from 'fs';

export default () => {
  const document = {};

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

  /* Store Documents */
  document.create = (docTypeID, users) => {
    return new Promise((resolve, reject) => {
      let html = fs.readFileSync(`src/templates/${docTypeID}.html`, 'utf8');
      const options = {
        border: {
          top: '1in',
          right: '0.5in',
          bottom: '1in',
          left: '1in',
        },
      };

      html = formatHTML(html, users);

      pdf.create(html, options).toBuffer((err, buffer) => {
        if (!err) {
          resolve(buffer);
        } else {
          reject(err);
        }
      });
    });
    /*
    Create PDF & Sign it with the users
    */
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
