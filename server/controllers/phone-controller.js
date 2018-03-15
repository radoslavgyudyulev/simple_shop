const errorHandler = require('../utilities/error-handler')
const mongoose = require('mongoose')
const Phone = mongoose.model('Phone')
const Buying = mongoose.model('Buying')


module.exports = {
    addGet: (req, res) => {
        res.render('phones/add-phone');
    },
    addPost: (req, res) => {
       let phoneReq = req.body

       if (phoneReq === '') {
        res.locals.globalError = 'Empty'
        res.render('phone/add', phoneReq)
        return
      }

        Phone
            .create({
                model: phoneReq.model,
                year: phoneReq.year,
                price: phoneReq.price,
                image: phoneReq.image,
                description: phoneReq.description,
                display: phoneReq.display,
                performance: phoneReq.performance,
                battery: phoneReq.battery,
                camera: phoneReq.camera
                
            })
              .then(phone => {
                   res.redirect('/phone/all');
              })
              .catch(err => {
                  let message = errorHandler.handleMongooseError(err)
                  res.locals.globalError = message
                  res.render('phones/add-phone');
                   
              })
    },
    all: (req, res) => {
       let pageSize = 2
       let page = parseInt(req.query.page) || 1
       let search = req.query.search

       let query = Phone.find({isBought: false})

       if (search) {
           query = query.where('model').regex(new RegExp(search, 'i'))
       }

            query             
                 .sort('-createdOn')
                 .skip((page - 1) * pageSize)
                 .limit(pageSize)
                 .then(phone => {
                     res.render('phones/all', {
                        phone: phone,
                        hasPrevPage: page > 1,
                        hasNextPage: phone.length > 0,
                        prevPage: page - 1,
                        nextPage: page + 1,
                        search: search
                        
                     })
                     
                 })
    },
    buy: (req, res) => {
        let userId = req.user._id
        let phoneId = req.params.id
       

        Phone
            .findById(phoneId)
            .then(phone => {
                if (phone.isBought) {
                    res.locals.globalError = 'Phone is already bought :('
                    res.render('phone/all')
                    return
                }
        Buying 
            .create({
                user: userId,
                phone: phoneId,
                totalPrice: phone.price
            }).then(buying => {
                phone.isBought = true
                phone
                    .save()
                    .then(phone => {
                         res.redirect('/users/me');
                    })
            }) 
              .catch(err => {
                  res.send(err);

              })
                     

            })
            .catch(err => {
                let message = errorHandler.handleMongooseError(err)
                res.locals.globalError = message
                res.render('phone/all');
            })
    }
    
}