const express = require('express');
const router = express.Router();
const perfilController= require('../controllers/perfilController');
const authMiddleware = require('../middlewares/authMiddleware')
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let avatarPath = path.resolve(__dirname, '../public/images/user_avatar');
        cb(null, avatarPath);
    },
    filename: (req, file, cb) => {
        let fileName = "img-" + Date.now() + path.extname(file.originalname);
        cb(null, fileName)
    }
})

const upload = multer({storage: storage})

router.get('/', authMiddleware, perfilController.perfil);
router.put('/', upload.single("avatar"), perfilController.edit);

module.exports = router;