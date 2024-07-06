import { createRequire } from 'module';
const require = createRequire(import.meta.url);
require('dotenv').config();
const express = require('express');
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

import favicon from 'serve-favicon';

// import { Server } from "socket.io";

// import sqlite3 from 'sqlite3';
// import { open } from 'sqlite';

// import { availableParallelism } from 'node:os';
// import cluster from 'node:cluster';
// import { createAdapter, setupPrimary } from '@socket.io/cluster-adapter';

const app = express();
const server = createServer(app);

const __dirname = dirname(fileURLToPath(import.meta.url));


const PORT = process.env.PORT;
const HOST = process.env.HOST;

app.use(express.json());

app.use(favicon(join(__dirname, 'public/favicon.ico')));

const publicOptions = {
    dotfiles: 'ignore',
    etag: false,
    extensions: ['htm', 'html'],
    index: false,
    maxAge: '1d',
    redirect: false,
    setHeaders (res, path, stat) {
      res.set('x-timestamp', Date.now())
    }
}

app.use(express.static('public', publicOptions));

// app.get('/favicon.ico' ,(req, res) => {
//     res.sendFile(join(__dirname, 'public/favicon.ico'))
// })

app.get('/', (req, res) => {

    res.sendFile(join(__dirname, './public/index.html'))

})

app.get('/chat', (req, res) => {
 
    res.sendFile(join(__dirname, './public/chat.html'))

})

//start http server
server.listen(PORT, HOST, () => {

    console.log(`listening at http://${HOST}:${PORT}`);

});