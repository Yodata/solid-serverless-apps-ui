import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Header } from './Header';

configure({ adapter: new Adapter });

describe("Header Component", () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Header classes={{}} />);
    })

    it("renders correctly", () => {
        expect(wrapper).toMatchSnapshot();
    })
})