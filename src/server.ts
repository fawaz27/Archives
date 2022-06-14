import 'dotenv/config';
import 'reflect-metadata';
import App from './app';

import { createConnection } from 'typeorm';
import config from './ormconfig';
//import UsersController from './src/api/controllers/usercontrollers';

(async () => {
    try {
      await createConnection(config);
      
    } catch (error) {
      console.log('Error while connecting to the database', error);
      return error;
    }
    const app = new App([]);
    
    //app.connectToTheDatabase();
    app.listen();
    app.get();
    
    
    
})();