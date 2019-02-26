import * as path from 'path';
import * as express from 'express';
import * as exhbs from 'express-handlebars';

export function prepareMiddleware(app: express.Application) {
    // Set up the Handlebars template factory
    const hbsTemplates = exhbs.create({
        extname: '.html',
        layoutsDir: path.resolve(__dirname, 'pages/layouts'),
        partialsDir: path.resolve(__dirname, 'pages/partials'),
        defaultLayout: 'full-page',
    });

    app.set('view engine', 'html');
    app.set('views', path.resolve(__dirname, 'pages/views'));
    app.engine('html', hbsTemplates.engine);

    // Set up static file serving
    app.use(express.static(path.resolve(__dirname, 'pages/static-assets'), { maxAge: '1d' }));

    if (process.env.NODE_ENV === 'production') {
        app.enable('view cache');
    }
}