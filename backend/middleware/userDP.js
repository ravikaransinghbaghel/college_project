import multer from 'multer';
import path from 'path'

const userDp = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, './upload');
    },
    filename: (req, res, cb) => {
        const uniqeName = Date.now() + path.extname(res.originalname);
        cb(null, uniqeName);
    }
})

export const userImg_upload = multer({
    storage: userDp,
    limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
    fileFilter: (req, file, cb) => {
        const types = /jpg|jpeg|png|git/;
        const extname = types.test(path.extname(file.originalname).toLowerCase());
        const mimetype = types.test(file.mimetype);
        if (extname && mimetype) cb(null, true);
        else cb('Only JPG, JPEG, PNG files are allowed!');
    }
});