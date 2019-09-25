export default ({ documentsService }) => {
  const document = {};

  document.create = (ctx) => {
    ctx.res.setHeader('Content-Type', 'application/pdf');
    ctx.res.setHeader('Content-Disposition', 'attachment; filename=quote.pdf');

    return documentsService.create(ctx.request.body.docTypeID, ctx.request.body.users);
  };

  document.createAnnex = (docTypeID, users) => {
    return documentsService.createAnnex(docTypeID, users);
  };

  return document;
};
