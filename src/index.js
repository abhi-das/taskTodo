const cors = require('cors');
const express = require('express');
const app = express();
const path = require('path');

// const routes = require('./routes/index');
const taskAPIRoutes = require('./routes/tasks');

// settings
app.set('views', path.join(__dirname, 'views'));
app.set('port', process.env.PORT || 3000);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');


// midleware 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({'extended':'false'}));

// Routes
// app.use(routes);
app.use('/api', taskAPIRoutes);

// Static files
app.use(express.static(path.join(__dirname, 'dist')));

// Start Server
app.listen(app.get('port'), () => {
	console.log('server on port ', app.get('port'));
})