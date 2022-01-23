const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const productController = require('../controllers/productController');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/images/products'));
    },
    filename: (req, file, cb) => {
        const newFilename = 'product-' + Date.now() + path.extname(file.originalname); 
        cb(null, newFilename);
    }
});

const upload = multer({ storage });

router.get('/', productController.list);

router.get('/detail/:id', productController.detail);

router.get('/create', productController.createGET);
router.post('/create', upload.single('image'), productController.createPOST);

router.get('/edit/:id', productController.editGET);
router.put('/edit/:id', upload.single('image'), productController.editPUT);

router.delete('/delete/:id', productController.delete);

router.get('/restore/:id', productController.restore);


module.exports = router;