import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import routes from 'Routes';

require('dotenv').config();

const App = express();

App.use(morgan('dev'));
App.use(helmet());
App.use(cors());
App.use(express.json());

App.use(routes.getRouter());

export default App;
