const reactRouterDom = jest.createMockFromModule('react-router-dom');

reactRouterDom.useRouteMatch = jest.fn().mockImplementation(() => ({url: 'dummyUrl'}));

module.exports = reactRouterDom;


