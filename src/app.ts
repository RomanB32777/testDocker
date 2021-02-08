import express, { Application, Request, Response, NextFunction } from "express"
import mongoose from 'mongoose'
import cors from 'cors'
import path from 'path'
import passport from 'passport'
import { IConfigApp } from './interfaces/configs'
import connectDB from "./db"


// const app: Application = express()


export default class App {
    private app: Application
    private configClass: IConfigApp

    constructor(IConfig: IConfigApp) {  
        this.configClass = IConfig;
	this.app = express()
    }

    async run(): Promise<any> {

        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: false }));

        this.app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", req.headers.origin);
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
            next();
        });



        this.app.use(cors())
        //app.use(fileUpload());
        this.app.use(passport.initialize())
        this.app.use(passport.session())

        require('./config/passport')(passport)



        // .??
        this.app.use((req: Request, res: Response, next: NextFunction) => {
            res.contentType('application/json');
            next();
        });


        this.app.use(express.static(path.join(__dirname, 'public')))
        this.app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
        this.app.use('/api/auth', require('./routes/authRouter'))
        this.app.use('/api/post', require('./routes/postRouter'))
        this.app.use('/api/mail', require('./routes/mailerRouter'))
        this.app.use('/api/file', require('./routes/fileRouter'))

        if (process.env.NODE_ENV === 'production'){
            this.app.use('/', express.static(path.join(__dirname, 'front', 'build'))) // подключаем статическую папку с фронтом

            this.app.get('*', (req, res) => {
                res.sendFile(path.resolve(__dirname, 'front', 'build', 'index.html'))
            })
        }


        const startServer = () => { 
            this.app.listen(this.configClass.port, () => {
                console.log(`Сервер запущен на пoртe ${this.configClass.port}`);
            }) 
        }

        await connectDB(this.configClass.mongoUri)
            .then(startServer)
            .catch((error)  => {
                console.log("Ошибка, связанная с базой данных", error);
                throw error
            })
      
     }
}

