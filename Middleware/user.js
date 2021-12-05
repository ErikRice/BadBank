import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config({ path: '../../.env'})

const userAuth = async (req, res, next) => {
    try{
        let token = req.header("Authorization");
        token = token.split(' ')[1];
        let transaction = req.body
        let decodedData;
        if (token) {
                decodedData = await jwt.verify(token, process.env.REACT_APP_USER_TOKEN_SECRET);
                if (error) { return res.sendStatus(403).json({message: "Unauthorized"}) };
                req.user = { "id": decodedData.id, "transaction": transaction.transaction };
                next();
        }
    } catch (e) {
        console.log(e);
        return res.sendStatus(401);
    }
}

export default userAuth;