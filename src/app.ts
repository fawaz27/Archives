

import  express, {Application} from 'express';
import  bodyParser from "body-parser";
import  morgan from "morgan";
import cookieParser from 'cookie-parser'
import errorMiddleware from './middlewares/errorMiddleware';


class App {
  public app: Application;

  constructor(controllers:any) {
    this.app= express();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();
    
  }

  public listen(){
    const port = process.env.PORT || 3000;
    const hostname = process.env.API_URL|| '127.0.0.1';

    this.app.listen( Number(port)  ,hostname, () => {
      console.log(`Example app listening at http://${hostname}:${port}`);
    })
  }

  public getServer() 
    {
        return this.app;
    }
    public get()
    {
        this.app.get('/', (request, response) => {
            response.send('Le serveur est bien configuré, bravo!!');
        })
    }
    private initializeMiddlewares()
    { 
        
        this.app.use(bodyParser.json());
        this.app.use(cookieParser());
        this.app.use(morgan("tiny"));
        this.app.use(express.static("public"));
        
    }

    
    private initializeErrorHandling()
    {
      this.app.use(errorMiddleware);
        
    }

    

    private initializeControllers(controllers: any[])
    {
      
        controllers.forEach((controller ) => {
          //console.log(controller.getRouter())
            this.app.use('/',controller.router);
        });
      console.log("ssdsddgfgjjj")
    }

}
export default App;





