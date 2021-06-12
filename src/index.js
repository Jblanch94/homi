const Startup = require('./startup');

const startUp = new Startup();
startup
  .run()
  .then()
  .catch((err) => console.error(err));
