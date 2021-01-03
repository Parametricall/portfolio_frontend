import { configure } from 'enzyme';
import AdapterWithShallowEffects from 'enzyme-adapter-react-16-with-shallow-effects';
// import Adapter from 'enzyme-adapter-react-16';


configure({ adapter: new AdapterWithShallowEffects() });