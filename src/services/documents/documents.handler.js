export default ({ documentsService }) => {
  const document = {};

  document.store = (docID, users) => documentsService.store(docID, users);

  return document;
};
