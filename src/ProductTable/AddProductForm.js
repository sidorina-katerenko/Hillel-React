import React from "react";
import { v4 as uuidv4 } from 'uuid';

import Input from "./Input";

const initialState = {
    name: '',
    category: '',
    price: ''
}

class AddProductForm extends React.Component {
    state = initialState;

    onNameChange = value => this.setState({ name: value });

    onCategoryChange = value => this.setState({ category: value });

    onPriceChange = value => this.setState({ price: +value });
    
    onSubmit = event => {
        event.preventDefault();
        const { name, category, price } = this.state;

        const item = {
            name,
            category,
            price,
            id: uuidv4()
        }

        this.props.onSubmit(item);

        this.setState(initialState);
    }

    render() {
        const { name, category, price } = this.state;
        const isDisabled = name === '' || category === '' || price <= 0;

        return (
            <form onSubmit={this.onSubmit}>
                <Input value={name} onChange={this.onNameChange} placeholder='Name' />
                <Input value={category} onChange={this.onCategoryChange} placeholder='Category' />
                <Input type='number' value={price} onChange={this.onPriceChange} placeholder='Price' />
                <button type="submit" disabled={isDisabled}>Submit</button>
            </form>
        )
    }
}

export default AddProductForm;