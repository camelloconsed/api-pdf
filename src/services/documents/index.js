import DocumentsService from './documents.service';
import DocumentsHandler from './documents.handler';

export default () => {
  const documentsService = DocumentsService();
  const documentsHandler = DocumentsHandler({ documentsService });

  return {
    create: documentsHandler.create,
  };
};
