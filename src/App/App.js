import React from 'react';
import './App.css';
import RichTextEditor from "../RichTextEditor/RichTextEditor"

class App extends React.Component {
  state = {
    text: 'Yo!'
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        text: 'Wanna hang out?'
      })
    }, 5000)
  }

  render() {
    return (
      <RichTextEditor text={this.state.text} />
    )
  }
}

export default App;
