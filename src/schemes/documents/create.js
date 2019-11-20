const schema = {
  docTypeID: { type: 'uuid' },
  users: {
    type: 'array',
    items: {
      type: 'object',
      props: {
        name: 'string',
        RUT: 'rut',
        idMachine: 'string',
      },
    },
  },
};

export default schema;
