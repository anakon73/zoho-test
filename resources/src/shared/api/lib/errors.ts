export class FetchError extends Error {
  constructor(public response: Response, message?: string) {
    super(message ?? response.statusText)
  }
}

export class UnauthorizedError extends Error {
  constructor() {
    super('Unauthorized')
  }
}
