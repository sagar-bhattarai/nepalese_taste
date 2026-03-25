import express from "express";
import { getAllMedia, deleteMedia} from "../controllers/media.controller.js";

const router = express.Router();

router.get("/", getAllMedia);
router.delete("/:id", deleteMedia);

export default router;