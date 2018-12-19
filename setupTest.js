const enzyme = require('enzyme');
const adapter = require('enzyme-adapter-react-16');
import 'whatwg-fetch';

// Setup enzyme's react adapter
enzyme.configure({ adapter: new adapter() });
