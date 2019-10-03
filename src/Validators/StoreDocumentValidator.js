export default () => {
  const schema = {
    docTypeID: { type: 'uuid' },
    users: {
      type: 'array',
      items: {
        type: 'object',
        props: {
          name: 'string',
          RUT: 'string',
        },
      },
    },
  };

  return schema;
};
