const express = require("express");
const router = express.Router();
const protect = require("../auth/auth");
const { show, index, update, _delete, signin, signup, getCurrentlySignedInArtist } = require("../controllers/artistController");


router.put("/:id", protect, update);

router.delete("/:id", protect, _delete);

router.get("/me", protect, getCurrentlySignedInArtist);

router.get("/", index);

router.post("/signup", signup);

router.post("/signin", signin);

router.get("/:id", show);

module.exports = router;
