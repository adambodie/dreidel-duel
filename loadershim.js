global.___loader = {
  enqueue: jest.fn(),
}

// setup enzyme file
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

