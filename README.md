# Failing FormData example with Enzyme

This repo demonstrates a failing test with Enzyme attempting to leverage FormData.

The call to initialize `FormData` fails when an `input` is provided without a `value` or `defaultValue` propr.

In the browser, no such error occurs.

*test code scaffolding:*
```
// test
import React from 'react';
import App from './App';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

it('test', () => {
  const comp = <App />;
  const wrapper = mount(comp);
  const instance = wrapper.instance();
  expect(instance.handleSubmit()).toEqual([
    'foo', 'foo-bar',
  ]);
});

```

## Example of a failing test:
```
// App
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
    return (
      <form ref={this.formRef}>
        <input type="text" name="foo" />
      </form>
    );
  }
}

export default App;
```

Running this test will produce the following output:
```
 FAIL  src/App.test.js
  ✕ test (62ms)

  ● test

    TypeError: Cannot read property 'replace' of null

      16 |   handleSubmit = () => {
      17 |     if (this.formRef.current) {
    > 18 |       const formData = new FormData(this.formRef.current);
         |                        ^
      19 |       for (var [key, value] of formData.entries()) {
      20 |         return [key, value];
      21 |       }

      at exports.normalizeToCRLF.string (node_modules/jsdom/lib/jsdom/living/helpers/form-controls.js:60:17)
      at constructTheFormDataSet (node_modules/jsdom/lib/jsdom/living/xhr/FormData-impl.js:163:21)
      at new FormDataImpl (node_modules/jsdom/lib/jsdom/living/xhr/FormData-impl.js:14:23)
      at Object.setup (node_modules/jsdom/lib/jsdom/living/generated/FormData.js:399:14)
      at new FormData (node_modules/jsdom/lib/jsdom/living/generated/FormData.js:68:9)
      at App.handleSubmit (src/App.js:18:24)
      at Object.handleSubmit (src/App.test.js:11:19)

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
Snapshots:   0 total
Time:        3.971s
Ran all test suites related to changed files.

Watch Usage: Press w to show more.
```

## Example of a passing test:
```
// App
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
    return (
      <form ref={this.formRef}>
        <input type="text" name="foo" defaultValue="foo-bar" />
      </form>
    );
  }
}

export default App;
```
