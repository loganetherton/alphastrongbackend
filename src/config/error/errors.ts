export interface IRequestError {
  error: Error,
  controller: string,
  [key: string]: any
}

/**
 * Generic error to be used in the global error handler when a request has failed
 * @param {string} controller
 * @param {Error} error
 * @returns {IRequestError}
 */
export function requestError(controller: string, error: Error) {
  return <IRequestError>{error, controller};
}