const jwt = require("jsonwebtoken");

async function authArtist(req,res,next){
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            message : "Unathorized"
        })
    }
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);

        if(decoded.role !== 'artist'){
            return res.status(403).json({
                message : "You don't have access to create a music"
            })
        }
        req.user = decoded
        next()
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            message : " Unathorized "
        })
    }
}

async function authUser(req,res,next){
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            message : "Unathorized"
        })
    }
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        if(decoded.role !=='user' && decoded.role !=='artist'){
            return res.status(403).json({
                message : "You don't have access to fetch musics"
            })
        }
        req.user = decoded

        next()
    } catch (error) {
        return res.status(401).json({
            message : "Unathorized"
        })
    }
}

module.exports = { authArtist , authUser }