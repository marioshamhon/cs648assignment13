import React, { Component } from 'react'

class ProductRow extends Component {
    constructor(props) {
        super(props)
        this.destroy = this.destroy.bind(this)
    }
    //We now only handle destroying products in this component only. This method sends a delete request to the database. 
    async destroy() {
        try {
          const productid = this.props.productid  
          const deleteEndPoint = `http://localhost:5000/product/delete/${productid}`
          const response = await fetch(deleteEndPoint, {
            method: 'DELETE'
          });
      
          if (!response.ok) {
            throw new Error('Failed to delete product');
          }
          
          if (response.ok) {
            
            await this.props.onDestroy(); // After deleteing a product fetch all products from database and set state
          }

        } catch (error) {
          console.error('Error deleting product:', error);
        }
      }

    render () {
        return (
            <tr>
                <td>{this.props.product.name}</td>
                <td>{this.props.product.category}</td>
                <td>{"$" + this.props.product.price}</td>
                <td>{this.props.product.instock.toString()}</td>
                <td className="text-right"><button onClick={this.destroy} className="btn btn-info">Delete</button></td>
            </tr>
        )
    }
}

export default ProductRow