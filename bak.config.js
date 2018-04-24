module.exports = {
  routes: ['./controllers/index.js'],
  registrations: ['yar', 'inert', 'vision', 'hapi-swagger'],
  yar: {
    maxCookieSize: 0,
    cookieOptions: {
      password: 'ASSnsjudnfuernAAcEIdjS*34dcjZjwAjddjAposwp8ej4r4dsd',
      isSecure: false,
    },
  },
  'hapi-swagger': {
    title: 'Simple Chat API',
  },
};
