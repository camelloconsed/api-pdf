export class ValidationError {
  constructor(message, code) {
    this.code = code;
    this.message = 'Validation error';
    this.payload = {
      error: message,
    };
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
