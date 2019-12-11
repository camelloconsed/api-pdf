import validator from '../../validator';
import createSchema from '../../schemes/documents/create';
import annexSchema from '../../schemes/documents/annex';
import convertPDFSchema from '../../schemes/documents/convertPDF';

export default ({ documentsService }) => {
  const document = {};

  document.create = (ctx) => validator(
    createSchema, {
      docTypeID: ctx.request.body.docTypeID,
      users: ctx.request.body.users,
      idMachine: ctx.request.ip,
    },
    documentsService.create,
  );

  document.annex = (ctx) => validator(

    annexSchema, {
      docTypeID: ctx.request.body.docTypeID,
      annexCount: ctx.request.body.annexCount,
      annexTypeID: ctx.request.body.annexTypeID,
      users: ctx.request.body.users,
      idMachine: ctx.request.ip,
    },
    documentsService.annex,
  );

  document.convertPDF = ctx => validator(

    convertPDFSchema, {
      html: ctx.request.body.html,
    },
    documentsService.convertPDF,
  );
  return document;
};
