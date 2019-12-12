const schema = {
  annexTypeID: { type: 'uuid' },
  money: { type: 'string' },
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
