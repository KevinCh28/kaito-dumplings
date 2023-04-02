export class AuthRequiredError extends Error {
  constructor(message = 'Authentication is required to access this page.') {
    super(message) 
    this.name = 'AuthRequiredError'
  }
}

export class LoadingError extends Error {
  constructor(message = 'An error occurred while loading the page.') {
    super(message) 
    this.name = 'LoadingError'
  }
}