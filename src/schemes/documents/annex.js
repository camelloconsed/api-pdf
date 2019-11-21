const schema = {
  docTypeID: { type: 'uuid' },
  annexTypes: {
    type: 'array',
    items: {
      type: 'object',
      props: {
        type: 'uuid',
        idMachine: 'string',
      },
    },
  },
  annexTypeID: { type: 'uuid' },
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
