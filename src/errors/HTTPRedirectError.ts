
export class HTTPRedirectError extends Error {
  public  name: string
  public  message: string
  public  location: string
  constructor(
    location: string,
    statusCode: 301 | 302 | 303 | 307 | 308 = 302,
  ) {
    let message = `Redirect to ${location} with status code ${statusCode}`
    super( message)
    this.name = "HTTPRedirectError"
    this.message = `Redirect to ${location} with status code ${statusCode}`
    this.location = location

  }
}
