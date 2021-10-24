const express = require('express');
const multer = require('multer');
const path = require('path');
const AWS = require('aws-sdk');
const multerS3 = require('multer-s3');
const { User, Review, ReviewImage } = require('../models');
const { verifyToken } = require('./middlewares');
const router = express.Router();

AWS.config.update({
   accessKeyId: process.env.S3_ACCESS_KEY_ID,
   secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
   region: 'ap-northeast-2'
});
const upload = multer({  // multer 설정
    storage: multerS3({
        s3: new AWS.S3(),
        bucket: 'csmoa',
        key(req, file, cb) {
            cb(null, `orignal/${Date.now()}${path.basename(file.originalname)}`)
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
});

router.post('/img', verifyToken, upload.single('img'), async(req, res, next) => {
    try {
        console.log(req.file);
        const originalUrl = req.file.location;
        const url = originalUrl.replace(/\/original\//, '/thumb/');
        res.json({ url, originalUrl });  // S3의 주소
    } catch (error) {
        console.log(error);
        next(error);
    }
});

const upload2 = multer();
router.post('/', verifyToken, upload2.none(), async(req, res, next) => {
    try {
        const { a, b, c, d } = req.body;
        const post = await Review.create({
            item_name: a,
            item_price: b,
            item_star_score, c,
            cs_brand: d,
        });

        const LatestPkOfReview = await Review.findOne({
            order: [ [ 'createdAt', 'DESC' ]],
        });

        const postImage = await ReviewImage.create({
            image_src: req.body.url,
            review_review_id: LatestPkOfReview.review_id +1,
        });

        return res.json({
            code: 200,
            mssage: "리뷰 등록 완료",
            user_id: req.decoded.user_id,
        })
    } catch (error) {
        console.log(error);
        next(error);
    }
});

module.exports = router;