const authMiddleware = (req, res, next)=>{
    const authHeader = req.headers.authorization;
    if(!authHeader){
        return res.status(401).json({message:"unauthorized"});
    }
    const token = authHeader.split(" ")[1];
    if(token !== "secret-token"){
        return res.status(403).json({message:"forbidden"});
    }
    const user = {id:1, name:"John Doe"};
    req.user = user;
    next();         
}

module.exports = authMiddleware;