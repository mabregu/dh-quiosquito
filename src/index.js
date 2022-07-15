const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');

const PORT = process.env.PORT || 3000;
const mainRoutes = require('./routes/mainRoutes');
const productsRoutes = require('./routes/productsRoutes');

// Set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', './src/views');

// Middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use(mainRoutes);
app.use('/products', productsRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
    console.log(`Press CTRL + C to stop server`);
});
