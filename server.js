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

// deploy to heroku
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build/index.html'));
});




app.use(routes);



sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});

