'use strict'

const Helpers = use('Helpers')
const Product = use('App/Models/Product')
const Photo = use('App/Models/Photo')
const User = use('App/Models/User')

class ProductController {
  async index({params, response, view}){
    const {username} = params;

    const user = await User.findBy('username', username)

    const products = await Product.query().innerJoin('photos', function(){
      this.on('products.id', 'photos.product')
    }).where('owner', user.id).fetch()

    // console.log(products.toJSON())

    // const products = await user.products().fetch()

    // console.log(products.toJSON())



    return view.render('product.index', {
      list: products.toJSON(),
      user
    })
  }



  create({view, response}){
    return response.send(view.render('product.create'))
  }

  async store({auth, request, response}){
    const {name, price, details} = request.post()

    const product = new Product();

    product.name = name
    product.price = price
    product.details = details
    product.owner = auth.user.id

    const ok = await product.save()

    const photo = new Photo()

    if(request.file){
      const photo_file = request.file('photo', {
        types: ['image'],
        size: '2mb'
      })

      await photo_file.move(Helpers.publicPath('uploads'), {
        name: `product_${Date.now()}.jpg`,
        overwrite: true
      })

      if (!photo_file.moved()) {
        return profilePic.error()
      }

      photo.url = `uploads/${photo_file.fileName}`

    } else {
      photo.url = 'img/generic.png'
    }

    photo.product = product.id

    await photo.save()

    response.redirect('/perfil')
  }

}

module.exports = ProductController
