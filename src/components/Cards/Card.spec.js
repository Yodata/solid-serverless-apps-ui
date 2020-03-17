import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { CardComponent } from './Card';

configure({ adapter: new Adapter });

describe("Card Component", () => {

    let wrapper;
    let mockApplication = {
        "id": "https://rdesk.example.org/profile/card#me",
        "name": "RDesk",
        "description": "CRM from Real Estate Digital",
        "logo": {
            "url": "/static/img/red-logo.jpg"
        },
        "permissions": [
            {
                "description": "create and update your leads",
                "id": "lead_write"
            }
        ],
        "group": [
            "crm"
        ]
    };

    beforeEach(() => {
        const mockEnableService = jest.fn();
        const mockExpandService = jest.fn();
        wrapper = shallow(<CardComponent classes={{}}
            application={mockApplication}
            enableService={mockEnableService}
            expandService={mockExpandService}
            enabledID={[]}
            expandedID={[]} />)
    });

    it("renders correctly", () => {
        expect(wrapper).toMatchSnapshot();
    })
});