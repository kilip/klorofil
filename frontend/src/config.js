import _ from 'lodash';
const config = {
    apiBaseUrl: _.trim(process.env.REACT_APP_API_URI,'/')
};
global.config = config;
export default config;