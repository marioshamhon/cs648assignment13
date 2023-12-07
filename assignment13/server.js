var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var cors = require("cors"); //This was needed to avoid a corps error

app.use(bodyParser.json());
app.use(cors()); //This was needed to avoid a corps error


var mongoose = require('mongoose')
var dbURL = 'mongodb+srv://mario:tech@nodeproject.azbwi6o.mongodb.net/?retryWrites=true&w=majority'

try {
    mongoose.connect(dbURL) 
    console.log('Mongo connected')
}
catch(error) {
    console.log(error)

}

// Create a mongoose model
var Product = mongoose.model('Product', {
    "id": Number,
    "product": {
      "productid": Number,
      "category": String,
      "price": Number,
      "name": String,
      "instock": Boolean
    }

  });

  // Endpoint to fetch products
  app.get('/product/get/', async (req, res) => {
    try {
      // Fetch products from the database using Mongoose
      const products = await Product.find({});
      res.json(products); // Send products as a JSON response
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

// Endpoint to handle POST request for creating a product
app.post('/product/create', async (req, res) => {
    try {
      const {name, category, price } = req.body;

      const productData = {
        id: 0,
        product: {
          productid: 0,
          category: category,
          price: price,
          name: name,
          instock: true
        }
      };
      
      const newProduct = new Product(productData);
      const savedProduct = await newProduct.save();
      res.status(201).json(savedProduct);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

// Endpoint to delete a product by its ID
app.delete('/product/delete/:id', async (req, res) => {
  const productId = req.params.id;

  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);
    
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

var server = app.listen(5000, () => {
    console.log('server is listening on port', server.address().port)
})