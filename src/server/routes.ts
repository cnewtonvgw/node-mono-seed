import * as express from 'express';

export function setupRoutes(app: express.Application) {
    app.get('/', (req, res) => {
        res.render('test');
    });
}