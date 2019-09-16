export default ({ documentsService }) => {
  const document = {};

  document.create = (docTypeID, users) => {
    return documentsService.create(docTypeID, users);
  };
  document.createAnnex = (docTypeID, users) => documentsService.createAnnex(docTypeID, users);

  return document;
};
