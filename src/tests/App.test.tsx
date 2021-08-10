import { shallow } from 'enzyme';
import App from '../App';

test('renders app', () => {
  const app = shallow(<App/>);
  expect(app).toMatchSnapshot();
});
