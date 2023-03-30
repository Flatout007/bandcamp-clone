
const express = require("express");
const router = express.Router();
const { index, create} = require("../controllers/trackController");
const protect  = require("../auth/auth");

router.get("/", index);

router.post("/", protect, create);


// router.put("/:id", protect, update);

// router.delete("/:id", protect, _delete);

module.exports = router;
