const customerModel = require('../../models/customerModel')
const { responseReturn } = require('../../utiles/response')
const bcrypt = require('bcrypt')
const sellerCustomerModel = require('../../models/chat/sellerCustomerModel')
const {createToken} = require('../../utiles/tokenCreate')

class customerAuthController{

    customer_register = async(req,res) => {
        const {name, email, password } = req.body

        try {
            const customer = await customerModel.findOne({email}) 
            if (customer) {
                responseReturn(res, 404,{ error : 'Email Already Exits'} )
            } else {
                const createCustomer = await customerModel.create({
                    name: name.trim(),
                    email: email.trim(),
                    password: await bcrypt.hash(password, 10),
                    method: 'menualy'
                })
                await sellerCustomerModel.create({
                    myId: createCustomer.id
                })
                const token = await createToken({
                    id : createCustomer.id,
                    name: createCustomer.name,
                    email: createCustomer.email,
                    method: createCustomer.method 
                })
                res.cookie('customerToken',token,{
                    expires : new Date(Date.now() + 7*24*60*60*1000 )
                })
                responseReturn(res,201,{message: "User Register Success", token})
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    customer_login = async(req, res) => {
       const { email, password } =req.body
       try {
        const customer = await customerModel.findOne({email}).select('+password')
        if (customer) {
            const match = await bcrypt.compare(password, customer.password)
            if (match) {
                const token = await createToken({
                    id : customer.id,
                    name: customer.name,
                    email: customer.email,
                    method: customer.method 
                })
                res.cookie('customerToken',token,{
                    expires : new Date(Date.now() + 7*24*60*60*1000 )
                })
                responseReturn(res, 201,{ message :  'User Login Success',token})
                
            } else {
                responseReturn(res, 404,{ error :  'Password Wrong'})
            }
        } else {
            responseReturn(res, 404,{ error :  'Email Not Found'})
        }
        
       } catch (error) {
        console.log(error.message)
       }
    }

  customer_logout = async(req, res) => {
    res.cookie('customerToken',"",{
        expires : new Date(Date.now())
    })
    responseReturn(res, 200,{ message :  'Logout Success'})
  }

  forgot_password = async(req, res) => {
    const { email, new_password } = req.body
    try {
        if (!email || !new_password) {
            return responseReturn(res, 400, { error: 'Email and new password are required' })
        }
        if (new_password.length < 6) {
            return responseReturn(res, 400, { error: 'Password should be at least 6 characters' })
        }
        const customer = await customerModel.findOne({ email })
        if (!customer) {
            return responseReturn(res, 404, { error: 'No account found with this email' })
        }
        customer.password = await bcrypt.hash(new_password, 10)
        await customer.save()
        responseReturn(res, 200, { message: 'Password reset successful. Please sign in with your new password.' })
    } catch (error) {
        console.log(error.message)
        responseReturn(res, 500, { error: 'Something went wrong. Please try again.' })
    }
  }

  customer_change_password = async (req, res) => {
    const { customerId, old_password, new_password } = req.body
    try {
        if (!customerId || !old_password || !new_password) {
            return responseReturn(res, 400, { error: 'All fields are required' })
        }
        if (new_password.length < 6) {
            return responseReturn(res, 400, { error: 'New password should be at least 6 characters' })
        }
        const customer = await customerModel.findById(customerId).select('+password')
        if (!customer) {
            return responseReturn(res, 404, { error: 'Account not found' })
        }
        const match = await bcrypt.compare(old_password, customer.password)
        if (!match) {
            return responseReturn(res, 400, { error: 'Old password is incorrect' })
        }
        customer.password = await bcrypt.hash(new_password, 10)
        await customer.save()
        responseReturn(res, 200, { message: 'Password changed successfully' })
    } catch (error) {
        console.log(error.message)
        responseReturn(res, 500, { error: 'Something went wrong. Please try again.' })
    }
  }

  customer_update_name = async (req, res) => {
    const { customerId, name } = req.body
    try {
        if (!customerId || !name || !name.trim()) {
            return responseReturn(res, 400, { error: 'Name is required' })
        }
        const customer = await customerModel.findById(customerId)
        if (!customer) {
            return responseReturn(res, 404, { error: 'Account not found' })
        }
        customer.name = name.trim()
        await customer.save()

        // Reissue the token so the new name is reflected immediately
        // without requiring the customer to log in again.
        const token = await createToken({
            id: customer.id,
            name: customer.name,
            email: customer.email,
            method: customer.method
        })
        res.cookie('customerToken', token, {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        })

        responseReturn(res, 200, { message: 'Name updated successfully', token })
    } catch (error) {
        console.log(error.message)
        responseReturn(res, 500, { error: 'Something went wrong. Please try again.' })
    }
  }
}

module.exports = new customerAuthController()