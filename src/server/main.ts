import * as path from 'path';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { handleBundleCommand } from './command/bundle-command-handler';
import { validateCommand } from './command/bundle-command-validator';
import { BundleRepository } from './repository/bundle-repository';

const app = express();

const publicFolder = path.resolve(__dirname, 'public');
const webapp = path.resolve(publicFolder, 'index.html');


app.use(bodyParser());
app.use(express.static(publicFolder));
app.get('/', (req, res) => {
    res.sendFile(webapp);
});

app.get('/query/events', async (req, res) => {
    const events = await BundleRepository.getEvents();
    res.send(events);
});

app.get('/query/all', async (req, res) => {
    const bundles = await BundleRepository.getAll();
    res.send(bundles);
});

app.get('/query/:id', async (req, res) => {
    const bundle = await BundleRepository.getById(req.params.id);
    res.send(bundle);
});

app.post('/command', async (req, res) => {
    try {
        const command = validateCommand(req.body);
        await handleBundleCommand(command);
        res.sendStatus(200);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.info(`App listening to ${PORT}....`);
    console.info('Press Ctrl+C to quit.');
});