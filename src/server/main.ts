import * as path from 'path';
import * as express from 'express';

const app = express();

const publicFolder = path.resolve(__dirname, 'public');
const webapp = path.resolve(publicFolder, 'index.html');

app.use(express.static(publicFolder));
app.get('*', (req, res) => {
    res.sendFile(webapp);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`App listening to ${PORT}....`);
    console.log('Press Ctrl+C to quit.');
});