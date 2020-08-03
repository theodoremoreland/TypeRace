import React from 'react';
import Button from './Button.js'
import './App.css';

let buttonTextItems = ["Bears, beets, Battlestar Galactica"
  ,"What's Forrest Gump's password? 1Forrest1"
  , "Where do programmers like to hangout? The Foo Bar"
];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userText: "",
    };
    this.input = React.createRef();
  }

  updateUserText = (event) => {
    this.setState( {userText : event.target.value } );

    if (event.target.value === this.state.snippet) { 
      this.setState({victory: true, endTime: new Date().getTime() - this.state.startTime});
    }
    else {
      this.setState({victory: false, endTime: null});
    }
  };

  submitNewSnippet = (event) => {
    if (event.key === "Enter") { 
      buttonTextItems.push(this.state.userText);
      this.setState({ state: this.state });
    }
  };

  chooseSnippet = (index, event) => {
    this.setState({snippet : this.state.snippet === buttonTextItems[index] ? null : buttonTextItems[index]
      , startTime: new Date().getTime()
      , userText: ""
      , victory: false});
    this.input.current.focus();
  };

  render() {
    return (
      <div>
        <h2>Type Race</h2>
        {this.state.snippet}
        <h4>{this.state.victory ? `Jam Jamboree! Time: ${this.state.endTime}ms` : null}</h4>
        <hr/>
        <input value={this.state.userText} onChange={this.updateUserText} onKeyDown={this.submitNewSnippet} ref={this.input}/>
        <hr/>
        { buttonTextItems.map((textItem, index) => <Button onClick={(e) => this.chooseSnippet(index, e)} buttonText={textItem} />) }
      </div>
    );
  }

}

export default App;
