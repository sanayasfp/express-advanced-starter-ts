import App from 'App';
import Config from 'Config';
import https from 'https';
import * as fs from 'fs';

const config = new Config();
const port = config.getInt('PORT') || 5000;
const nodeEnv = config.get<'development' | 'production'>('NODE_ENV');

if (nodeEnv === 'production') {
  const options = {
    key: fs.readFileSync(config.getOrThrow('SSL_KEY')),
    cert: fs.readFileSync(config.getOrThrow('SSL_CERT')),
  };

  https.createServer(options, App).listen(port, () => {
    console.log(`Server running on ${port}`);
  });
} else {
  App.listen(port, () => {
    console.log(`Listening: http://localhost:${port}`);
  });
}

