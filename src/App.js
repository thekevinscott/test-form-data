import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);

    this.formRef = React.createRef();
  }

  componentDidMount() {
    setTimeout(() => {
      this.handleSubmit();
    }, 100);
  }

  handleSubmit = () => {
    if (this.formRef.current) {
      const formData = new FormData(this.formRef.current);
      for (var [key, value] of formData.entries()) {
        return [key, value];
      }
    }

    return null;
  }

  render() {
    /* failing to set a value fails the test */
    // return (
    //   <form ref={this.formRef}>
    //     <input type="text" name="foo" />
    //   </form>
    // );

    /* setting an explicit value passes the test */
    return (
      <form ref={this.formRef}>
        <input type="text" name="foo" defaultValue="foo-bar" />
      </form>
    );
  }
}

export default App;
