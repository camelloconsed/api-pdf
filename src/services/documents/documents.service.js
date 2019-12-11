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
  function formatHTML(html, users) {
    const mapPDF = {
      FirstUserName: users[0].name,
      FirstUserRUT: users[0].RUT,
      SecondUserName: users[1].name,
      SecondUserRUT: users[1].RUT,
      Money: 10000,
      Date: Date.now(),
    };

    const re = new RegExp(Object.keys(mapPDF).join('|'), 'g');

    const response = html.replace(re, matched => {
      return mapPDF[matched];
    });

    return response;
  }

  /* Convert HTML to PDF */
  document.convertPDF = (params) => {
    return new Promise((resolve, reject) => {
      const options = {
        border: {
          directory: './',
          top: CONSTS.PDF.TEMPLATE.OPTIONS.BORDER.TOP,
          right: CONSTS.PDF.TEMPLATE.OPTIONS.BORDER.RIGHT,
          bottom: CONSTS.PDF.TEMPLATE.OPTIONS.BORDER.BOTTOM,
          left: CONSTS.PDF.TEMPLATE.OPTIONS.BORDER.LEFT,
        },
      };
      pdf.create(params.html, options).toBuffer((err, buffer) => {
        if (!err) {
          resolve(new Response(
            CONSTS.RESPONSES.DOCUMENTS.CONVERT.SUCCESS,
            CONSTS.HTTP.CODES.OK,
            buffer,
          ));
        } else {
          reject(new Response(
            CONSTS.RESPONSES.DOCUMENTS.CONVERT.ERROR,
            CONSTS.HTTP.CODES.INTERNAL_SERVER_ERROR,
            err,
          ));
        }
      });
    });
  };

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

      html = formatHTML(
        fs.readFileSync(`src/templates/${params.annexTypeID}.html`, CONSTS.PDF.TEMPLATE.CHARSET),
        params.users,
      );

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
