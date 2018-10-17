import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.formRef = React.createRef();
  }

  componentDidMount() {
    setTimeout(() => {
      this.handleSubmit();
    }, 1000);
  }

  handleSubmit = () => {
    if (this.formRef.current) {
      const formData = new FormData(this.formRef.current);
      for (var [key, value] of formData.entries()) {
        const r = [key, value];
        console.log('return', r);
        return r;
      }
    }

    return null;
  }

  render() {
    /* failing to set a value fails the test */
    return (
      <div className="App">
        <form ref={this.formRef}>
          <input type="text" name="foo" />
        </form>
      </div>
    );

    /* setting an explicit value passes the test */
    // return (
    //   <div className="App">
    //     <form ref={this.formRef}>
    //       <input type="text" name="foo" defaultValue="foo-bar" />
    //     </form>
    //   </div>
    // );
  }
}

export default App;
