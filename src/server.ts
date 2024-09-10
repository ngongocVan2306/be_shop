import express from 'express';
import compression from 'compression';
import connectDB from './configs/connectDB';
import initApiRoutes from './routes/api';
import bodyParser from 'body-parser';
import configCors from './configs/configCors';
import cookieParser from 'cookie-parser';

const app = express();
configCors(app);

app.use(compression());

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

try {
    connectDB();
} catch (error) {
    console.log(error);
}

app.use(cookieParser());

app.use('/v1/images', express.static(__dirname + '/public/products'));

//init API routes
initApiRoutes(app);

app.listen(8080, () => {
    console.log('App starting successfully with port 8080');
});
