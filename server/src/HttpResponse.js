class HttpResponse {
  constructor(msg, statusCode, data = null) {
    this.msg = msg;
    this.statusCode = statusCode;
    this.data = data;
  }

  send(req, res) {
    res.status(this.statusCode).json(this);
  }
}

module.exports = HttpResponse;
