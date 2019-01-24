const router = require("express").Router();
const noteRoutes = require("./notes");
const articleRoutes = require("./articles");

router.use("/notes", noteRoutes);
router.use("/article", articleRoutes);


module.exports = router;
