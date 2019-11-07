const schema = {
  docTypeID: { type: 'uuid' },
  annexTypes: {
    type: 'array',
    items: {
      type: 'object',
      props: {
        type: 'uuid',
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
      },
    },
  },
};

export default schema;
