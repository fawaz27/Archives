import { ConnectionOptions } from 'typeorm';

const config: ConnectionOptions = {
    type: 'postgres',
    host: process.env.HOST,
    port: Number(process.env.PORT_DB),
    username: process.env.USERNAME_DB,
    password: process.env.PASSWORD_DB,
    database: process.env.NAME_DB,
    entities: [
      __dirname +"/models/*.ts"
    ],
    synchronize: true,
  };
   
  export default config;