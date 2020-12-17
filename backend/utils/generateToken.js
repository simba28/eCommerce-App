import jwt from 'jsonwebtoken'

const generateToken = ( id ) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d'})
    // 1st parameter is payload, 2nd is secret key and 3rd is for 30days
}

export default generateToken