import express from "express";
// import { addTestinomial, getAllTestinomials, updateTestinomial, deleteTestinomial, reactToTestinomial, getAllReactions} from "../controllers/testinomial.controller.js";
import { addTestinomial, getAllTestinomials, updateTestinomial, deleteTestinomial} from "../controllers/testinomial.controller.js";
import addTestinomialSchema from "../zod/testinomial/addTestinomial.schema.js";
import updateTestinomialSchema from "../zod/testinomial/updateTestinomial.schema.js";
// import addReactionSchema from "../zod/testinomial/addReaction.schema.js";
// import zodValidation from "../middlewares/zodValidator.middleware.js";

const router = express.Router();

// router.post("/reaction", zodValidation(addReactionSchema), reactToTestinomial);

router.post("/add", zodValidation(addTestinomialSchema), addTestinomial);
router.put("/edit/:id", zodValidation(updateTestinomialSchema), reactToTestinomial);
router.delete("/delete/:id", deleteTestinomial);
router.get("/:id", getAllTestinomials);

// router.get("/reactions/:testinomialId", getAllReactions);

export default router;