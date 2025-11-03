/*
import { createServer} from 'node:http'
import { connectDB } from './config/database.js';
import dotenv from 'dotenv'

// load .env file content into process.env (to access variables in .env file)
dotenv.config()


//const server = createServer();

const host = '127.0.0.1';
//const port = 3000;
const port = process.env.PORT || 3030;

const server = createServer((req, res) => {
res.statusCode = 200;
res.setHeader('Content-Type', 'text-plain');
res.end('Hello World');


});
server.listen(port, host, () => {
connectDB();
    console.log(`Server is running on http://${host}:${port}`)
})


// terminal = node serve
*/

/*
//Express Server

import express from 'express'
import { connectDB } from './config/database.js'
import dotenv from 'dotenv'

dotenv.config();

const app = express()

const port = process.env.PORT || 3030;

app.listen(port, () => {
    connectDB();
    console.log(`Application is running on port ${port}`);
})
*/






//Express Server

import express from 'express'
import { connectDB } from './config/database.js'
import dotenv from 'dotenv'
import userRoutes from './routes/userRoutes.js'

dotenv.config();

const app = express()

app.set('view engine', 'ejs')

//routes
app.use('/user', userRoutes)



const port = process.env.PORT || 3030;

app.listen(port, () => {
    connectDB();
    console.log(`Application is running on port ${port}`);
})
