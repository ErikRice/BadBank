import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config({ path: '../../.env'})

// const tokenGenerator = async () => {
//     const token = jwt.sign({ user }, process.env.REACT_APP_USER_TOKEN_SECRET)  //{ expiresIn: '1h' }
// }
const userAuth = async (req, res, next) => {
    try{
        res.header({"Access-Control-Allow-Origin": "http://localhost:3000"})
        const token = req.headers.authorization.split(' ')[1];
        const isCustomUser = token.length < 500;     // differentiate between Google Auth token
        // let decodedData = await jwt.verify(token, process.env.REACT_APP_USER_TOKEN_SECRET);
        //     console.log("decoded",decodedData);
        //     if (error) return res.sendStatus(403);
        //     req.user = user;
        //     next();
        let transaction = req.body
        let decodedData;
        if (token && isCustomUser) {
                decodedData = await jwt.verify(token, process.env.REACT_APP_USER_TOKEN_SECRET);
                console.log("decoded",decodedData);
                if (error) return res.sendStatus(403);
                res.locals.user = { id: decodedData?.id, transaction: transaction };
                next();
         
            // 
        } 
        // else {
        //     decodedData = jwt.decode(token);
        //     req.userId = decodedData?.sub;
        // }
        // next();
    } catch (error) {
        console.log(error.message);
        return res.sendStatus(401)
    }
}

export default userAuth;