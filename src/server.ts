import 'dotenv/config';
import 'reflect-metadata';
import App from './app';
import { AppDataSource } from './database/AppDataSource';
import { AuthentificationController } from './controllers/authentification.controller';
import {TeacherController} from './controllers/teacher.controller'
import {ClassController} from './controllers/class.controller'
import {SubjectController} from './controllers/subject.controller'

(async () => {


    try {
      await AppDataSource.initialize();
      
      
    } catch (error) {
      console.log('Error while connecting to the database', error);
      return error;
    }
    const app = new App([
      new AuthentificationController(),
      new TeacherController(),
      new ClassController(),
      new SubjectController()
    ]);
    
    
    app.listen();
    app.get();
    
    
    
})();