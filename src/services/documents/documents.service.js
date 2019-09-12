export default () => {
  const document = {};

  /* Store Documents */
  document.create = (docTypeID, users) => {
    /*
    Create PDF & Sign it with the users
    */
    return {
      doc_type_id: docTypeID,
      users,
    };
  };

  return document;
};
