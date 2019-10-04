export class ValidationError extends Error {
  constructor(message, code) {
    super(message || 'validation error');
    this.code = code;
  }
}
export class NotAuthorizedError extends Error {
  constructor(message, code) {
    super(message || 'not authorized');
    this.code = code;
  }
}
export class NotAuthenticatedError extends Error {
  constructor(message, code) {
    super(message || 'not authenticated');
    this.code = code;
  }
}
export class NotFoundError extends Error {
  constructor(message, code) {
    super(message || 'not found');
    this.code = code;
  }
}
export class InternalServerError extends Error {
  constructor(message, code) {
    super(message || 'Ooops, something went wrong!');
    this.code = code;
  }
}
