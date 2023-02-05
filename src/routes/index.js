const Router = require("express");
const authRouter = require("./auth/index.js");

const router = Router();

router.use('/auth', authRouter);

module.exports = router;