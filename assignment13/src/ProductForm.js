import React, { Component } from 'react'

const RESET_VALUES = {id: '', category: '', price: '', name: ''}

class ProductForm extends Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.handleSave = this.handleSave.bind(this)
        this.state = {
            product: Object.assign({}, RESET_VALUES),
            errors: {},
        }
    }
        
    handleChange(e) {
        const target = e.target
        const value = target.value
        const name = target.name
    
        this.setState((prevState) => {
            prevState.product[name] = value
            return { product: prevState.product }
        })
    }
    
    handleSave = async (e) => {
      e.preventDefault();
        
        const createEndPoint = 'http://localhost:5000/product/create'; 
        const { product } = this.state;
      
        try {
          const response = await fetch(createEndPoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
          });
      
          if (response.ok) {
              this.setState(({
                product: { ...RESET_VALUES },
                errors: {} // Reset errors if needed
              }), async () => {
                // After updating state with the new product, fetch all products
                await this.props.onSave();
              });
             
            // Handle success - e.g., show a success message
            console.log('Product saved successfully!',product);
            
          } else {
            // Handle error - e.g., show an error message
            console.error('Error saving product:', response.statusText);
          }
        } catch (error) {
          console.error('Error:', error.message);
          // Handle network errors or other exceptions
        }
         
      };
      
    render () {
        return (
            <form>
                <h4>Add a new product</h4>
                <p>
                    <label>Name <br /> 
                    <input type="text" className="form-control" name="name" onChange={this.handleChange} value={this.state.product.name} /></label>
                </p>
                <p>
                    <label>Category <br /> 
                    <input type="text" className="form-control" name="category" onChange={this.handleChange} value={this.state.product.category} /></label>
                </p>
                <p>
                    <label>Price <br /> 
                    <input type="text" className="form-control" name="price" onChange={this.handleChange} value={this.state.product.price} /></label>
                </p>
                <input type="submit" className="btn btn-info" value="Save" onClick={this.handleSave}></input>
            </form>
        )
    }
}

export default ProductForm