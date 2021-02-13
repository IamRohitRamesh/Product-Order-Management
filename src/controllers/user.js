const User = require('../models/user')

exports.user_create = async(req,res)=>{
    const user = new User(req.body)
    const token = await user.generateAuthToken()
    try{
        await user.save()
        res.status(201).send({user,token})
    }catch(e){
        res.status(500).send(e)
    }
}

exports.user_login = async(req,res)=>{
    try{
        const user = await User.findByCredentials(req.body.email,req.body.password)
        const token = await user.generateAuthToken()
        res.status(201).send({user,token})
    }catch(e){
        res.status(500).send(e)
    }
}

exports.user_logout = async (req,res)=>{
    try{
        req.user.tokens = req.user.tokens.filter((token)=>token.token!=req.token)
        await req.user.save()
        res.send('Success')
    }catch(e){
        res.status(500).send(e)
    }

}