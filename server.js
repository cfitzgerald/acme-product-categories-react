const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const pug = require('pug');

const app = express();

// db, etc.
const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_products_react');

const Product = conn.define('product', {
  name: {
    type: conn.Sequelize.STRING,
    unique: true
  },
  price: {
    type: conn.Sequelize.FLOAT,
    defaultValue: 0,
    validate: {
      min: 0
    }
  },
  inStock: {
    type: conn.Sequelize.BOOLEAN,
    defaultValue: true
  }
}, {
  hooks: {
    beforeValidate: function(product) {
      if (product.categoryId === '') {
        product.categoryId = null;
      }
    }
  }
});

const Category = conn.define('category', {
  name: conn.Sequelize.STRING
});

// associations
Product.belongsTo(Category);
Category.hasMany(Product);

// sync, seed, etc.
conn.sync({ force: true })
  .then( () => {
    return Promise.all([
      Product.create({ name: 'Plumbus', price: 100 }),
      Product.create({ name: 'The Best Product', price: 99 }),
      Product.create({ name: 'The Worst Product', price: 1 }),
      Category.create({ name: 'Beyond' }),
      Category.create({ name: 'Normal'}),
    ])
    .then(([ plumbus, best, worst, beyondCategory, normalCategory ]) => {
      return Promise.all([
        beyondCategory.addProducts([ plumbus ]),
        normalCategory.addProducts([ best, worst ]),
      ]);
    });
  });

// middleware
app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use('/vendor', express.static(path.join(__dirname, 'node_modules')));
app.use(express.static('public')); // serve up the static files in /public
app.use(morgan('dev'));

// routes
app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/api/products', (req, res, next) => {
  Product.findAll({
    order: ['id'],
    include: Category
  })
    .then(products => res.send(products))
    .catch(next);
});

app.get('/api/categories', (req, res, next) => {
  Category.findAll({
    order: ['id'],
    include: Product
  })
    .then(categories => res.send(categories))
    .catch(next);
});

app.put('/api/products/:id', (req, res, next) => {
  Product.findById(req.params.id)
    .then(product => {
      if (!req.body.categoryId) {
        req.body.categoryId = null;
      }
      Object.assign(product, req.body);
      return product.save();
    })
    .then(() => res.sendStatus(204))
    .catch(next);
});

app.post('/api/products', (req, res, next) => {
  Product.create(req.body)
    .then(() => res.sendStatus(204))
    .catch(next);
});

app.delete('/api/products/:id', (req, res, next) => {
  Product.destroy({ where: { id: req.params.id }})
    .then(() => res.sendStatus(204))
    .catch(next);
});

// error handling
app.use((err, req, res, next) => {
  res.status(err.status || 500).send(err);
});

// server!
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`acme-products-react listening on ${port}...`);
});
