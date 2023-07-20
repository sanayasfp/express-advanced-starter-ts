import App from 'App';
import Config from 'Config';

const port = new Config().get('PORT') || 5000;
App.listen(port, () => {
  console.log(`Listening: http://localhost:${port}`);
});
