export class ApiResponse {
  constructor(statusCode = 200, data = null, message = 'Success', meta = undefined) {
    this.success = true
    this.statusCode = statusCode
    this.message = message
    this.data = data

    if (meta) {
      this.meta = meta
    }
  }
}
