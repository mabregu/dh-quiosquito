const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');

const PORT = process.env.PORT || 3000;
const mainRoutes = require('./routes/mainRoutes');
const productsApiRoutes = require('./routes/api/products');
const imagesApiRoutes = require('./routes/api/images');
const productsRoutes = require('./routes/productsRoutes');

const remember = require('./middlewares/rememberMe');
const { log } = require('console');

// Set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', './src/views');

// Middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
    }
}));
app.use(remember);

// Routes
app.use(mainRoutes);
app.use('/products', productsRoutes);

// api routes
app.use("/api/products", productsApiRoutes);
app.use("/api/images", imagesApiRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
    console.log(`Press CTRL + C to stop server`);
    console.log(process.env.DB_USERNAME);
});
