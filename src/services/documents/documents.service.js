export default () => {
  const document = {};

  /* Store Documents */
  document.store = (docID, users) => {
    /*
    Send doc & users to end-point to request hash content
    Store in DB the hash of the doc with the users involved
    */
    return {
      doc_id: docID,
      users,
    };
  };

  return document;
};
