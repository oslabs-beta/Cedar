import regeneratorRuntime from 'regenerator-runtime';
// import '@testing-library/jest-dom/extend-expect'

module.exports = () => {
  global.ResizeObserver = require('resize-observer-polyfill');
  global.testServer = require('./server/server.js');
};