import { Router } from "express";
import {
  getProfile,
  updateProfile,
  deleteProfile,
  deactivateProfile
} from "../controllers/profile.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import zodValidation from "../middlewares/validator/zod.validator.js";
// import updateProfileSchema from "../libs/schemas/users/update.profile.schema.zod.js";

const router = Router();

router.get("/", getProfile);
// router.put("/update", upload.single({name: "profileImage", maxCount: 1}), updateProfile);
router.put("/update", upload.single("profileImage"), updateProfile);
router.patch("/deactivate", deactivateProfile);
router.delete("/remove", deleteProfile);

export default router;
