const schema = {
  docTypeID: { type: 'uuid' },
  annexCount: { type: 'string' },
  annexTypeID: { type: 'uuid' },
  users: {
    type: 'array',
    items: {
      type: 'object',
      props: {
        name: 'string',
        RUT: 'rut',
      },
    },
  },
  idMachine: {
    type: 'string',
  },
};

export default schema;
