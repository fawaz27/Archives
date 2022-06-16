import 'dotenv/config';
import 'reflect-metadata';
import App from './app';
import { AppDataSource } from './database/AppDataSource';
import { AuthentificationController } from './controllers/authentification.controller';




(async () => {


    try {
      await AppDataSource.initialize();
      
      
    } catch (error) {
      console.log('Error while connecting to the database', error);
      return error;
    }
    const app = new App([new AuthentificationController()]);
    
    
    app.listen();
    app.get();
    
    
    
})();