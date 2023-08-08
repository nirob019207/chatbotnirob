// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/posts',  // Proxy requests to JSONPlaceholder
    createProxyMiddleware({
      target: 'http://104.198.53.36:1980/filestorage/upload',
      changeOrigin: true,
    })
  );
};
