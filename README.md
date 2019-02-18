### Commands:

`npm run build`: Build both the client and server in 'production mode'.
`npm run build:dev`: Build both the client and server in 'development mode' - rebuild on file changes.
`npm run build-svr`: Build only the server portion in 'production mode'.
`npm run build-web`: Build only the client portion in 'production mode'.
`npm run build-svr:dev`: Build only the server portion in 'development mode' - rebuild on file changes.
`npm run build-web:dev`: Build only the client portion in 'development mode' - rebuild on file changes.
`npm run test`: Run all server tests, then all client tests, output coverage for both.
`npm run test-svr`: Run all server tests, output coverage.
`npm run test-web`: Run all client tests, output coverage.
`npm run test-svr:dev`: Run all server tests, enter watch and rerun mode.
`npm run test-web:dev`: Run all client tests, enter watch and rerun mode.
`npm run start`: Start the server.

##### Basic usage:
- Clone the repository  
- Run `npm install` in the root directory  
- Run `npm run build` in the root directory  
- Run `npm run start` in the root directory  
- Access the website at `localhost:8080`  

#### Developing
The below instructions will guide you through setting up a continuously rebuilt web application.
Each time a source file is changed (in the webapp directory) the app will be rebuilt and the new artifacts available in the output directory.
Simply refresh your browser to see your changes.

- Clone the repository  
- Run `npm install` in the root directory  
- Run `npm run build:dev` in the root directory  
- Run `npm start` in the root directory in a separate terminal 
- Changes to the client will be available immediately (refresh the browser)
- Changes to the server require only a restart of the `npm start` terminal request. 