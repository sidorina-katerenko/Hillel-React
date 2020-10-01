import React from 'react';
import Quill from 'quill';

class RichTextEditor extends React.Component {
    constructor() {
        super();

        this.ref = React.createRef();
        this.quill = null;
    }

    componentDidMount() {
        if (this.ref.current) {
            this.quill = new Quill(this.ref.current, { theme: 'snow' });
            this.quill.setText(this.props.text);
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.text !== this.props.text && this.quill !== null) {
            this.quill.setText(this.props.text);
        }
    }

    render() {
        return (
            <div ref={this.ref}></div>
        )
    }
}

export default RichTextEditor;