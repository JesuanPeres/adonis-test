'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/adonisjs').render('adonisjs')

Route.on('/').render('home');

Route.get('/registrar', 'AuthController.register').middleware(['guest'])

Route.post('/registrar', 'AuthController.saveUser').middleware(['guest'])

Route.get('/login', 'AuthController.loginForm').middleware(['guest'])

Route.post('/login', 'AuthController.login').middleware(['guest'])

Route.get('/perfil', 'AuthController.acount').middleware(['auth'])

Route.post('/logout', 'AuthController.logout').middleware(['auth'])





Route.get('/produto/novo', 'ProductController.create').middleware(['auth'])

Route.post('/produto/novo', 'ProductController.store').middleware(['auth'])

Route.get('date', ({response})=> {return response.send(Date.now())})

Route.get('/perfil/:username', 'ProductController.index')
