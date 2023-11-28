const express = require('express');
require('dotenv').config();
const app = express();
const handleFailure = require('./utils/UnexceptionlaHandling');
const expressWinston = require('express-winston');
const mongoose = require('mongoose');
const Logger = require('./utils/Logger');
const error_404 = require('./routes/notFound');
const urlRoutes = require('./routes/urls');
const cors = require('cors');
const PORT = process.env.PORT || 3001;

// express middleware for the parse the json data
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// logger for the Https request handling 
app.use(expressWinston.logger({
    winstonInstance:Logger,
    statusLevels:true,
}))
app.use(cors({
    origin:'http://localhost:3000'
}));
// url routes
app.use(urlRoutes)
// 404 handling the error
app.use(error_404)
// handle the unexceptional error
handleFailure();

mongoose.connect(process.env.MONGOOSE_URL)
.then((result)=>{
    Logger.info(`Database is connected...`);
    app.listen(PORT,()=>{
        Logger.info(`server is Running on the PORT : ${PORT}`);
    })
})
.catch(err=>{
    Logger.error(err.message);
    Logger.error(`Database is not connected`);
    
})

