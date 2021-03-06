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
            TOP: '0.5in',
            RIGHT: '0.5in',
            BOTTOM: '0,5in',
            LEFT: '0.5in',
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
        CONVERT: {
          SUCCESS: 'Document converted successfully.',
          ERROR: 'Error converting the document.',
        },
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
