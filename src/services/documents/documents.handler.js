export default ({ documentsService }) => {
  const document = {};

  document.create = (docTypeID, users) => documentsService.create(docTypeID, users);
  document.createAnnex = (docTypeID, users) => documentsService.createAnnex(docTypeID, users);

  return document;
};
