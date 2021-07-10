// eslint-disable-next-line import/no-extraneous-dependencies
import { configure } from 'enzyme';
// eslint-disable-next-line import/no-extraneous-dependencies
import AdapterWithShallowEffects from 'enzyme-adapter-react-16-with-shallow-effects';
// import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new AdapterWithShallowEffects() });
