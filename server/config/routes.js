const controllers = require('../controllers')
const auth = require('./auth')

module.exports = (app) => {
  app.get('/', controllers.home.index)
  app.get('/about', auth.isAuthenticated, controllers.home.about)

  app.get('/users/register', controllers.users.registerGet)
  app.post('/users/register', controllers.users.registerPost)
  app.get('/users/login', controllers.users.loginGet)
  app.post('/users/login', controllers.users.loginPost)
  app.post('/users/logout', controllers.users.logout)
  app.get('/users/me', controllers.users.profile)

  app.get('/phone/add', auth.isInRole('Admin'), controllers.phone.addGet)
  app.post('/phone/add', auth.isInRole('Admin'), controllers.phone.addPost)
  app.get('/phone/all', controllers.phone.all)
  app.post('/phone/buy/:id', auth.isAuthenticated, controllers.phone.buy)
    
 
  

  // auth.isInRole('Admin'),

  app.all('*', (req, res) => {
    res.status(404)
    res.send('404 Not Found!')
    res.end()
  })
}
