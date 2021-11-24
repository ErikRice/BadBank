import jwt from 'jsonwebtoken'

// const tokenGenerator = async () => {
//     const token = jwt.sign({ user }, process.env.REACT_APP_USER_TOKEN_SECRET)  //{ expiresIn: '1h' }
// }
const userAuth = async (req, res, next) => {
    try{
        console.log("headers",req.headers)
        const token = req.headers.authorization.split(' ')[1];
        console.log("middleware-token: token")
        const isCustomUser = token.length < 500;     // differentiate between Google Auth token

        let decodedData;

        if (token && isCustomUser) {
            decodedData = jwt.verify(token, process.env.REACT_APP_USER_TOKEN_SECRET, ()=> {
                console.log("Hello")
                if (err) return res.sendStatus(403);
                req.user = user
                next();
            })
            // req.userId = decodedData?.id;
        } 
        // else {
        //     decodedData = jwt.decode(token);
        //     req.userId = decodedData?.sub;
        // }
        // next();
    } catch (err) {
        console.log(err);
        return res.sendStatus(401)
    }
}

export default userAuth;