const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const productController = require('../controllers/productController');
const { body } = require('express-validator');

const productsValidation = [
    body('name').notEmpty().withMessage('El nombre es obligatorio').bail().isLength({min: 5}).withMessage('El nombre debe tener al menos cinco caracteres'),
    body('price').notEmpty().withMessage('Debes introducir un precio'),
    body('category_id').notEmpty().withMessage('Debes seleccionar una categoría'),
    // body('mainImage').notEmpty().withMessage('Debes introducir una imagen de portada'),
    // body('gallery').notEmpty().withMessage('Debes introducir al menos una imagen del producto'),
    body('description').notEmpty().withMessage('Debes introducir una descripción').bail().isLength({min: 20}).withMessage('La descripción debe tener al menos 20 caracteres')
];

const imageValidation = (req, res, next) => {
    const mainImage = req.files.mainImage[0]
    const gallery = req.files.gallery
    let error = false
    if (!mainImage || !gallery) {
        error = true
    }
    next()
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/images/products'));
    },
    filename: (req, file, cb) => {
        const newFilename = 'product-' + Date.now() + path.extname(file.originalname); 
        cb(null, newFilename);
    }
});

const upload = multer({storage});

router.get('/', productController.list);

router.get('/detail/:id', productController.detail);

router.get('/create', productController.createGET);
router.post('/create', upload.fields([
    {name: 'mainImage', maxCount: 1},
    {name: 'gallery', maxCount: 10}
]), productsValidation, productController.createPOST);

router.get('/edit/:id', productController.editGET);
router.put('/edit/:id', upload.fields([
    {name: 'mainImage', maxCount: 1},
    {name: 'gallery', maxCount: 10}
]), productController.editPUT);

router.delete('/delete/:id', productController.delete);

router.get('/restore/:id', productController.restore);


module.exports = router;