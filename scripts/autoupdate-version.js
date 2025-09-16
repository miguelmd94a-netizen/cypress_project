const https = require('https');
const http = require('http');
const url = require('url');

//console.log(process.argv);
const [baseURL, appName, auth] = process.argv.slice(2);

const apiURL = new URL(baseURL);

let usedLibrary = https;

const options = {
  hostname: apiURL.hostname,
  port: 443,
  path: `/version/${appName}/upgrade`,
  method: 'POST',
  headers: {
    Authorization: auth,
  },
};

//console.log(options);
const req = usedLibrary.request(options, (res) => {
  console.log(`statusCode: ${res.statusCode}`);
  if (res.statusCode >= 200 && res.statusCode < 300) {
    process.exit(0);
  } else {
    process.exit(1);
  }
});

req.on('error', (error) => {
  console.error(error);
  process.exit(1);
});

req.end();
