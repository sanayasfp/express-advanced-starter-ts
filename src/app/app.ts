import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import routes from 'Routes';

const App = express();

App.use(morgan('dev'));
App.use(helmet());
App.use(cors());
App.use(express.json());
App.use(express.urlencoded({ extended: true }));

App.use(routes.getRouter());

export default App;
