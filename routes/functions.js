module.exports = {
    createToken(profile={}, options={ expiresIn: 60*5 }){
        return {token: require('jsonwebtoken').sign(profile, 'test123', options)}
    },
    getParams(req={}, data={}){
        return  [
            Array.isArray(data.req) && data.req.reduce((acc, item) => 
                (acc[item] = req[item], acc),
                {}
            ),
            data.params
        ]
    }
}