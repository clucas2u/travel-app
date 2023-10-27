// globalTeardown.js

const { server } = require('./src/server/server.js'); // Import your server instance

module.exports = async function() {
  if (server && server.close) {
    await new Promise((resolve, reject) => {
      server.close((err) => {
        if (err) {
          console.error(err);
          reject(err);
          return;
        }
        resolve();
      });
    });
  }
};
