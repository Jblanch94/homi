const Startup = require('./startup');

const startUp = new Startup();
startUp
  .run()
  .then()
  .catch((err) => console.error(err));
