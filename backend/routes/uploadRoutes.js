import express from 'express'
import multer from 'multer'
import path from 'path'
const router = express.Router()

// go to below page for information regarding multer
// https://www.npmjs.com/package/multer
const storage = multer.diskStorage({
    destination(req, file, cb) {
        // cb is callback
        cb(null, 'uploads/')
        // null is for no error
    },
    filename(req, file, cb) {
        cb(
            null,
            `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
            //path.extname will take the extensions of the file
        )
    }
})

function checkFileType(file, cb) {
    const fileTypes = /jpg|jpeg|png/
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = fileTypes.test(file.mimetype)

    if (extname && mimetype){
        return cb(null, true)
    } else {
        return cb('Images only')
        // images only is the error
    }
}

const upload = multer({
    storage,
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb)
    }
})

router.post('/', upload.single('image'), (req, res) => {
    res.send(`/${req.file.path}`)
})

export default router