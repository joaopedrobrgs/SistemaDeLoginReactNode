const jwt = require('jsonwebtoken');

module.exports = function (req, res, next){
    const token = req.header('authorization-token');
    if(!token){
        return res.status(401).json({ message: 'Access Denied.', status: 401 })
    }else{
        try{
            const userVerified = jwt.verify(token, process.env.TOKEN_SECRET);
            req.userVerified = userVerified;
            //utilizamos o "req" acima, pois assim conseguimos passar esse valor adiante,
            //ou seja, para o arquivo "authRoute" que está importando este aqui.
            next();
            //utilizamos o "next()" para deixar essa função mais genérica. Então, tudo
            //o que vier após isso aqui vai ser definido pela rota que for acessada.
            //Se a rota acessada for "admin", vai haver mais uma verificação. Se a rota
            //acessada for "common", não vai haver mais nenhuma verificação.
        }catch(error){
            return res.status(400).json({message: error.message, status: 400});
        }
    }
}