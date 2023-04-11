
const express = require("express");
const router = express.Router();
const { index, create, update, _delete, show } = require("../controllers/albumController");
const protect  = require("../auth/auth");

router.get("/", index);

router.get("/:id", show);

router.post("/", protect, create);

router.put("/:id", protect, update);

router.delete("/:id", protect, _delete);

module.exports = router;
