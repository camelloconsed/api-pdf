export default () => {
  const CONSTS = {
    ENV: {
      PROD: 'production',
      DEV: 'development',
    },
    PDF: {
      USER: '',
      TEMPLATE: {
        CHARSET: 'utf8',
        OPTIONS: {
          BORDER: {
            TOP: '1in',
            RIGHT: '0.5in',
            BOTTOM: '1in',
            LEFT: '1in',
          },
        },
      },
    },
    HTTP: {
      CODES: {
        OK: 200,
        INTERNAL_SERVER_ERROR: 500,
        NOT_FOUND: 404,
      },
    },
    RESPONSES: {
      DOCUMENTS: {
        CREATE: {
          SUCCESS: 'Document created successfully.',
          ERROR: 'Error creating the document.',
        },
        TEMPLATE: {
          NOT_FOUND: 'Template not found.',
        },
      },
    },
  };

  return CONSTS;
};
