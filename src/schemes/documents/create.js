const schema = {
  docTypeID: { type: 'uuid' },
  users: {
    type: 'array',
    items: {
      type: 'object',
      props: {
        name: 'string',
        rut: 'rut',
      },
    },
  },
  idMachine: {
    type: 'string',
  },
};

export default schema;
