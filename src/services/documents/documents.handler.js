import validator from '../../validator';
import storeSchema from '../../schemes/documents/store';

export default ({ documentsService }) => {
  const document = {};

  document.create = (ctx) => validator(
    storeSchema,
    {
      docTypeID: ctx.request.body.docTypeID,
      users: ctx.request.body.users,
    },
    documentsService.create,
  );

  return document;
};
