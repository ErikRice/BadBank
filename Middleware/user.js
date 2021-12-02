import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config({ path: '../../.env'})

// const tokenGenerator = async () => {
//     const token = jwt.sign({ user }, process.env.REACT_APP_USER_TOKEN_SECRET)  //{ expiresIn: '1h' }
// }

const userAuth = async (req, res, next) => {
    try{
        let token = req.header("Authorization");
        token = token.split(' ')[1];
        const isCustomUser = token.length < 500;     // differentiate between Google Auth token
        let transaction = req.body
        let decodedData;
        if (token && isCustomUser) {
                decodedData = await jwt.verify(token, process.env.REACT_APP_USER_TOKEN_SECRET);
                // if (error) return res.sendStatus(403);
                req.user = { "id": decodedData.id, "transaction": transaction.transaction };
                next();
        }
    } catch (e) {
        console.log(e);
        return res.sendStatus(401);
    }
}

export default userAuth;