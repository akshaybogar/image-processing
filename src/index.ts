import express from 'express';
//const imageRoutes = require('./routes/image');
import router from './routes/image';
import resizeImage from './apis/image';
const app: express.Application = express();
const port = 5000;

app.use('/api', router.get('/imageResize', resizeImage));

/*function printMessage() {
    return ('Jasmine configured properly!');
}
*/

app.listen(port, () => console.log(`App is listening on port ${port}`));

export default app;
