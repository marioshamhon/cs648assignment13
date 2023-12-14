/* 
 I didn't want to delete all the original code so I just commented out the code that I'm no longer using. I refactored the code a little bit to make it work with this assignment. 
 I commented out the static products object because now we're going to be getting our items from the database. I also set the products variable in state equal to a blank array 
 initially because we get an array of objects from the database. I now use a fetchProducts method to get all the items from the database via a get request and set the state with those items. 
 We no longer need the handleSave and handleDestroy methods to set the state because that is now being done by the fetchProducts method so I just commented out.

Now in the products prop and the onDestroy prop I am passing the fetchProducts method because now every time a product is added or deleted successfully 
the fetchProducts method will be called to retrieve the most current information from the database and set the state accordingly so that only the current 
products are displayed in the table.
*/

import React, { Component } from 'react'
import Filters from './Filters'
import ProductTable from './ProductTable'
import ProductForm from './ProductForm'

// let PRODUCTS = {
//     '1': {id: 1, category: 'Music', price: '$459.99', name: 'Clarinet'},
//     '2': {id: 2, category: 'Music', price: '$5,000', name: 'Cello'},
//     '3': {id: 3, category: 'Music', price: '$3,500', name: 'Tuba'},
//     '4': {id: 4, category: 'Furniture', price: '$799', name: 'Chaise Lounge'},
//     '5': {id: 5, category: 'Furniture', price: '$1,300', name: 'Dining Table'},
//     '6': {id: 6, category: 'Furniture', price: '$100', name: 'Bean Bag'}
// };

class Products extends Component {
    constructor(props) {
        super(props)
        this.state = {
            filterText: '',
            //products: PRODUCTS
            products: []
        }
        this.handleFilter = this.handleFilter.bind(this)
        //this.handleDestroy = this.handleDestroy.bind(this)
        //this.handleSave = this.handleSave.bind(this)
    }
    
    componentDidMount() {
        this.fetchProducts(); //We need to use componentDidMount to fetch the products when the application loads the first time.
      }

      fetchProducts = async () => {
       const  getEndPoint = 'http://localhost:5000/product/get/';
        try {
          const response = await fetch(getEndPoint); 
          if (response.ok) {
            const data = await response.json();
            // Set the fetched products in state
            this.setState({ products: data });
          } else {
            console.error('Failed to fetch products:', response.statusText);
          }
        } catch (error) {
          console.error('Error fetching products:', error.message);
        }
      };

    handleFilter(filterInput) {
        this.setState(filterInput)
    }

    // handleSave(product) {
    //     if (!product.id) {
    //         product.id = new Date().getTime()
    //     }
    //     this.setState((prevState) => {
    //         let products = prevState.products
    //         products[product.id] = product
    //         console.log(products)
    //         return { products }
    //     })
    // }

    // handleDestroy(productId) {
    //     this.setState((prevState) => {
    //         let products = prevState.products
    //         delete products[productId]
    //         return { products }
    //     });
    // }

    render () {
        return (
            <div>
                <h1>My Inventory</h1>
                <Filters 
                    onFilter={this.handleFilter}></Filters>
                <ProductTable 
                    products={this.state.products}
                    filterText={this.state.filterText}
                    onDestroy={this.fetchProducts}></ProductTable>
                <ProductForm
                    onSave={this.fetchProducts}></ProductForm>
            </div>
        )
    }
}

export default Products