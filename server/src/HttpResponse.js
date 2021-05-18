class HttpResponse {
  constructor(msg, success, data = null) {
    this.msg = msg;
    this.data = data;
    this.success = success;
  }

  badRequest(res) {
    res.status(400).json(this);
  }

  ok(res) {
    res.status(200).json(this);
  }

  notFound(res) {
    res.status(404).json(this);
  }

  notAuthorized(res) {
    res.status(403).json(this);
  }

  notAuthenticated(res) {
    res.status(401).json(this);
  }

  created(res) {
    res.status(201).json(this);
  }

  serverError(res) {
    res.status(500).json(this);
  }
}

module.exports = HttpResponse;
