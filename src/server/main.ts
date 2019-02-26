import * as express from 'express';

import { prepareMiddleware } from './middleware';
import { setupRoutes } from './routes';

const app = express();

prepareMiddleware(app);
setupRoutes(app);

app.listen(8080, () => {
    console.log(`App listening to 8080....`);
    console.log('Press Ctrl+C to quit.');
});