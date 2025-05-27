
export class customError extends Error {
  constructor(

    public readonly message: string,

    public readonly statusCode: number
  ) {
    super(message);
  }

  static badRequest(message: string) {

    return new customError(message, 400);
  }

  static unAutorized(message: string) {

    return new customError(message, 401);
  }

  static forbiden(message: string) {

    return new customError(message, 403);
  }

  static notFound(message: string) {

    return new customError(message, 404);
  }

  static conflict(message: string) {

    return new customError(message, 409);
  }

  static unprocessableEntity(message: string) {

    return new customError(message, 422);
  }

  static internalServer(message: string) {

    return new customError(message, 500);
  }
}