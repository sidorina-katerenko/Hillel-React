import React from "react";
import { v4 as uuidv4 } from 'uuid';

import TableRow from "./TableRow"
import AddProductForm from "./AddProductForm";

const data = [
    {
        name: 'iPhone',
        category: 'Phones',
        price: 500,
        id: uuidv4()
    },
    {
        name: 'MacBook',
        category: 'Laptops',
        price: 1300,
        id: uuidv4()
    },
    {
        name: 'Apple Watch',
        category: 'Smart watches',
        price: 300,
        id: uuidv4()
    }
];

const thead = ['Name', 'Category', 'Price', 'Action'];

class ProductTable extends React.Component {
    state = {
        data
    };

    onRemove = id => {
        const {data} = this.state;
        this.setState({
            data: data.filter(item => item.id !== id)
        });
    }

    onItemAdd = item => {
        const {data} = this.state;
        this.setState({
            data: [...data, item]
        });
    }

    render() {
        return (
            <div>
                <AddProductForm onSubmit={this.onItemAdd} />
                <table>
                    <thead>
                        <tr>
                            {thead.map(item => <td key={item}>{item}</td>)}
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.data.map(item => <TableRow key={item.id} onRemove={this.onRemove} {...item} />)}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default ProductTable;