const jwt = require('jsonwebtoken');

exports.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()){
        next();
    }
    else{
        res.status(403).send('you need to login');
    }
};

exports.verifyToken = (req, res, next) => {
    try{
        req.decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
        req.data.decoded;
        return next();
    } catch(err){
        if(err.name === 'TokenExpiredError') { //유효기간 초과
            return res.status(419).json({
                code: 419,
                message: 'token has been expired',
            });
        }
        return res.status(401).json({
            code: 401,
            message: 'unvalid token',
        });
    }
};

exports.isNotLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        next();
    }
    else{
        const message = encodeURI('already logged in');
        res.redirec(`/?error=${message}`);
    }
};