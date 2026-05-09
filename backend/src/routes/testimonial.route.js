import express from "express";
// import { addTestimonial, getAllTestimonials, updateTestimonial, deleteTestimonial, reactToTestimonial, getAllReactions} from "../controllers/testimonial.controller.js";
import { addTestimonial, getAllTestimonials, updateTestimonial, deleteTestimonial, getAllRatings} from "../controllers/testimonial.controller.js";
import addTestimonialSchema from "../zod/testimonial/addTestimonial.schema.js";
import updateTestimonialSchema from "../zod/testimonial/updateTestimonial.schema.js";
// import addReactionSchema from "../zod/testimonial/addReaction.schema.js";
import zodValidation from "../middlewares/zodValidator.middleware.js";
import auth from "../middlewares/auth.middleware.js";
import roleBasedAuth from "../middlewares/roleBasedAuth.middleware.js";
import { CUSTOMER } from "../constants/roles.constant.js";



const router = express.Router();

// router.post("/reaction", zodValidation(addReactionSchema), reactToTestimonial);

router.get("/", getAllTestimonials);
router.get("/ratings", getAllRatings);
router.post("/add", auth, roleBasedAuth(CUSTOMER), zodValidation(addTestimonialSchema), addTestimonial);
router.put("/update/:id", auth, roleBasedAuth(CUSTOMER), zodValidation(updateTestimonialSchema), updateTestimonial);
// router.put("/edit/:id", auth, roleBasedAuth(CUSTOMER), zodValidation(updateTestimonialSchema), reactToTestimonial);
router.delete("/delete/:id", auth, roleBasedAuth(CUSTOMER), deleteTestimonial);

// router.get("/reactions/:testimonialId", getAllReactions);

export default router;