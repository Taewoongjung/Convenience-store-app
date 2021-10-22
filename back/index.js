const express = require('express');
const path = require('path');
const morgan = require('morgan');
const dotenv = require('dotenv');
const {sequelize} = require('./models');
const nunjucks = require('nunjucks');
const passport = require('passport');
const cookie_parser = require('cookie-parser');
const helmet = require('helmet');
const hpp = require('hpp');

dotenv.config();

const app = express();
app.set('port', process.env.PORT || 3000);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set('view engine', 'html');
nunjucks.configure('views', {
    express: app,
    watch: true,
});

sequelize.sync({force: false})
    .then(() => console.log('succeeded to connect DB'))
    .catch((err) => console.error(err));

if (process.env.NODE_ENV === 'production'){
    app.enable('trust proxy');
    app.use(morgan('combined'));
    app.use(helmet({contentSecurityPolicy: false}));
    app.use(hpp());
} else {
    app.use(morgan('dev'));
}

const main_router = require('./routes');
const login_router = require('./routes/user');
const signup_router = require('./routes/signup');
const passportConfig = require('./passport');

app.use(cookie_parser());
passportConfig();
app.use(passport.initialize());
app.use(passport.session());
app.use('/script', express.static('public'));
app.use('/', main_router);
app.use('/login', login_router);
app.use('/signup', signup_router);

app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} does not exist`);
    console.error(error);
    next(error);
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.err = process.env.NODE_DEV !== 'production' ? err : {};
    res.status(err.status || 500).json({
        message: err.message,
        error: err,
    });
});

app.listen(app.get('port'), () => {
    console.log(`successfully connected at ${app.get('port')}`);
})