import mongoose from 'mongoose'
import config from './config/index'
import app from './app'
import {Server} from 'http'

process.on('uncaughtException', error => {
  console.log('Uncaught exception is detected.')
  if(error){
    process.exit(1);
  }
})

let server:Server;
async function connection() {
  try {
    await mongoose.connect(config.database_url as string)
    console.log('Database is connected.');

    server = app.listen(config.port, () => {
      console.log(`Application is listening on port ${config.port}`);
    })
  } catch (error) {
    console.log('Failed to connect database.');
  }

  process.on('unhandledRejection', error =>{
    console.log('Unhandled Rejection is Detected. We are closing our server....')
    if(server){
      server.close(()=>{
        console.log(error);
        process.exit(1);
      })
    } else{
      process.exit(1)
    }
  })
}
connection()

process.on('SIGTERM',()=>{
  console.log('SIGTERM is received');
  if(server){
    server.close();
  }
})