import express from 'express';
const imageRoutes = require('./routes/image');

const app: express.Application = express();
const port = 5000;

app.use('/api', imageRoutes.routes);

app.listen(port, () => console.log(`App is listening on port ${port}`));
