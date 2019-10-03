import Validator from 'fastest-validator';
import RutValidator from '../../Validators/RutValidator';
import StoreDocumentValidator from '../../Validators/StoreDocumentValidator';

export default ({ documentsService }) => {
  const document = {};
  const storeDocumentSchema = StoreDocumentValidator();
  const rutValidator = RutValidator();
  const validator = new Validator({
    messages: {
      rut: rutValidator.message,
    },
  });

  validator.add('rut', value => rutValidator.validate(value, validator));

  document.create = (ctx) => {
    ctx.res.setHeader('Content-Type', 'application/pdf');
    ctx.res.setHeader('Content-Disposition', 'attachment; filename=quote.pdf');

    console.log(ctx.request.body.users);
    const isValid = validator.validate(
      {
        docTypeID: ctx.request.body.docTypeID,
        users: ctx.request.body.users,
      },
      storeDocumentSchema,
    );
    console.log(isValid);
    return !Array.isArray(isValid) && isValid
      ? documentsService.create(ctx.request.body.docTypeID, ctx.request.body.users)
      : isValid;
  };

  document.createAnnex = (docTypeID, users) => {
    return documentsService.createAnnex(docTypeID, users);
  };

  return document;
};
