import React from "react";
import Button from "./Button";

class TableRow extends React.Component {
    onRemove = () => {
        const { id } = this.props;
        this.props.onRemove(id);
    }

    render() {
        const { name, category, price } = this.props;

        return (
            <tr>
                {[name, category, price].map(item => <td key={item}>{item}</td>)}
                <td>
                    <Button>Edit</Button>
                    <Button onClick={this.onRemove}>Remove</Button>
                </td>
            </tr>
        )
    }
}

export default TableRow;