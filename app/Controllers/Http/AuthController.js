'use strict'

const Hash = use('Hash')
const User = use('App/Models/User')


class AuthController {

  register({request, response, view}){
    return response.send(view.render('register_form'))
  }

  async saveUser({request, response}){
    const {username, email, password} = request.post()
    const user = new User();

    user.username = username
    user.email = email
    user.password = password


    await user.save()

    return response.redirect('/')
  }

  loginForm({request, response, view}){
    return response.send(view.render('login_form'))
  }

  async login({auth, request, response}){
    const {email, password} = request.post()
    const ok = await auth.attempt(email, password)
    // const user = await User.findBy('email', email);
    // const ok = await Hash.verify(password, user.password)

    return response.redirect('/')

  }

  acount({view, response}){
    return response.send(view.render('perfil'))
  }


  async logout({auth, response}){
    await auth.logout()

    return response.redirect('/')
  }
}

module.exports = AuthController
