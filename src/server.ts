import 'dotenv/config';
import 'reflect-metadata';
import App from './app';
import { AppDataSource } from './database/AppDataSource';
import { AuthentificationController } from './controllers/authentification.controller';
import {TeacherController} from './controllers/teacher.controller'
import {ClassController} from './controllers/class.controller'
import {SubjectController} from './controllers/subject.controller'
import { TextbookController } from './controllers/textbook.controller';
import { YearController } from './controllers/year.controller';
import { SessionController } from './controllers/session.controller';
import { TaskController } from './controllers/task.controller';

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
      new SubjectController(),
      new TextbookController(),
      new YearController(),
      new SessionController(),
      new TaskController()
    ]);
    
    
    app.listen();
    app.get();
    
    
    
})();