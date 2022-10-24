const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');

const PORT = process.env.PORT || 3000;
const mainRoutes = require('./routes/mainRoutes');
const productsApiRoutes = require('./routes/api/products');
const imagesApiRoutes = require('./routes/api/images');
const productsRoutes = require('./routes/productsRoutes');
const cartRoutes = require('./routes/cartRoutes');
const checkoutRoutes = require('./routes/checkoutRoutes');
const invoiceRoutes = require('./routes/invoiceRoutes');
const customerRoutes = require('./routes/customerRoutes');

const remember = require('./middlewares/rememberMe');
const { log } = require('console');

const corsOptions = {
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
    optionsSuccessStatus: 200,
    allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'X-Requested-With', 'Accept'],
    preflightContinue: false,
    maxAge: 86400,
};

// Set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', './src/views');

// Middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors(corsOptions));
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
app.use('/cart', cartRoutes);
app.use('/checkout', checkoutRoutes);
app.use('/invoice', invoiceRoutes);
app.use('/customer', customerRoutes);

// api routes
app.use("/api/products", productsApiRoutes);
app.use("/api/images", imagesApiRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
    console.log(`Press CTRL + C to stop server`);
});
