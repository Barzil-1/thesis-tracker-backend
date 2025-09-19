const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post('/', authenticateToken, upload.single('file'), (req, res) => {
  res.status(200).json({ filename: req.file.filename });
});
