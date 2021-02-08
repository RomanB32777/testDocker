import App from './app'
//import config from 'config'

const application: Promise<any> = new App({
    port: process.env.PORT,
// config.get('port'),
    mongoUri: process.env.DB
// config.get('mongoUri')
}).run()

if (!application) {
    console.log('good bye! ');
    process.exit(1)
}
