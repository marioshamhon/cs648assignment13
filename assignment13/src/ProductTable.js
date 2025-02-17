import React, { Component } from 'react'
import ProductRow from './ProductRow'

class ProductTable extends Component {
    constructor(props) {
        super(props)
        this.handleDestroy = this.handleDestroy.bind(this)
    }

    handleDestroy() {
        this.props.onDestroy() 
    }
    
    render () {
        
        let productsArray = Object.keys(this.props.products).map((pid) => this.props.products[pid])
        let rows = []
    
        productsArray.forEach((product) => {
            let singleProduct = product.product //extracting a single from the product object
            if (singleProduct.name.indexOf(this.props.filterText) === -1) {
                return
            }
            rows.push (
                <ProductRow 
                    product={singleProduct} 
                    key={product._id} //using the _id value that gets generated by the database as the unique key
                    productid = {product._id} //Passing the .id value from the database to the productRow component so we can use it to delete products.
                    onDestroy={this.handleDestroy}></ProductRow> //Passing the fetchProducts method through the onDestroy prop.
            )
        })

        return (
            <div>
                <table className="table table-striped table-sm">
                    <thead className="thead-dark">
                        <tr>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>In Stock</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default ProductTable