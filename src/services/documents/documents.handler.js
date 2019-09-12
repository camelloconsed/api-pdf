export default ({ documentsService }) => {
  const document = {};

  document.create = (docTypeID, users) => documentsService.create(docTypeID, users);

  return document;
};
