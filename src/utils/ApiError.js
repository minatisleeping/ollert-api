
// * Định nghĩa riêng một Class ApiError kế thừa class Error sẵn
//*(điều này cần thiết và là Best Practice vì class Error nó là class built-in sẵn)

class ApiError extends Error {
  constructor(statusCode, message) {
    super(message)

    // Tên của cái custom Error này, nếu không set thì mặc định nó sẽ kế thừa là "Error"
    this.name = 'ApiError'
    this.statusCode = statusCode // Gán thêm http status code của chúng ta ở đây

    Error.captureStackTrace(this, this.constructor) // Ghi lại Stack Trace để thuận tiện cho việc debug
  }
}

export default ApiError
