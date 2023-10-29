import jwt from 'jsonwebtoken';

const createToken = (user) => {
    return jwt.sign(
        {
            _id: user._id,
            email: user.email,
            name: user.name
        },
        "mysecreat"
    );
}

const verifyToken = (token) => {
    return jwt.verify(token, "mysecreat");
}

export { createToken, verifyToken };