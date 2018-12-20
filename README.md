### Commands:
`npm run build-web:cont`: Continuously rebuild the web app each time changes are detected.  
`npm run build-web:dev`: Build only the client in dev mode - purges the `dist/public` directory.  
`npm run build-server:dev`: Build only the server in dev mode.   
`npm run build:dev`: Build both the client and the server in dev mode.  
`npm run build-web:prod`: Build only the client in prod mode - purges the `dist/public` directory.  
`npm run build-server:prod`: Build only the server in dev mode.  
`npm run build:prod`: Build both the client and the server in prod mode.  
`npm run start`: Execute the server.  

##### Basic usage:
- Clone the repository  
- Run `npm install` in the root directory  
- Run `npm run build:prod` in the root directory  
- Run `npm run start` in the root directory  
- Access the website at `localhost:8080`  

#### Developing
The below instructions will guide you through setting up a continuously rebuilt web application.
Each time a source file is changed (in the webapp directory) the app will be rebuilt and the new artifacts available in the output directory.
Simply refresh your browser to see your changes.

- Clone the repository  
- Run `npm install` in the root directory  
- Run `npm run build:dev` in the root directory  
- Run `npm start` in the root directory  
- Open a separate terminal and run `npm run build-web:cont`  