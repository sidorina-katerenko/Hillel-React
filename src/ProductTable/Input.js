import React from "react";

class Input extends React.Component {
    onChange = event => {
        this.props.onChange(event.target.value);
    }

    render() {
        const { value, type = 'text', placeholder } = this.props;

        return (
            <input placeholder={placeholder} type={type} value={value} onChange={this.onChange}></input>
        )
    }
}

export default Input;