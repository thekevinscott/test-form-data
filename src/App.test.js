import React from 'react';
import App from './App';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

require('formdata-polyfill');

it('should call fetch', () => {
  const comp = (
    <App />
  );
  const wrapper = mount(comp);
  const instance = wrapper.instance();

  expect(instance.handleSubmit()).toEqual([
    'foo', 'foo-bar',
  ]);
});
