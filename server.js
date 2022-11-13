const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const path = require('path');
const helpers = require('./utils/helpers');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({ helpers });
const session = require('express-session');

const app = express();
var PORT = process.env.PORT || 3001;
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const userRoutes = require('./controllers/api/user-routes');
const index= require('./controllers/api/index.js');
const index2= require('./controllers/index.js');
const server = require('./server.js');




const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('*/javascript',express.static(path.join(__dirname, 'public/javascript')));
app.use('*/stylesheets',express.static(path.join(__dirname, 'public/stylesheets')));
app.use('*/images',express.static(path.join(__dirname, 'public/images')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(userRoutes);
app.use(index);
app.use(index2);
app.use(server);






app.use(routes);



sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});

