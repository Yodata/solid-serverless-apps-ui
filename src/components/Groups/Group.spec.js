import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Group } from './Group';

configure({ adapter: new Adapter });

describe("Group Component", () => {
    it("should render the group classification", () => {
        const mockSetTabIndex = jest.fn();
        const wrapper = shallow(<Group classes={{}} setTabIndex={mockSetTabIndex}/>);
        expect(wrapper).toMatchSnapshot();
    });
});