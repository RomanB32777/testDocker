import App from './app'
import config from './config/index'

if (config.port && config.mongoUri){
    const application: Promise<any> = new App({
        port: +config.port,
        mongoUri: config.mongoUri
    }).run()
    
    if (!application) {
        console.log('good bye! ');
        process.exit(1)
    }
}
