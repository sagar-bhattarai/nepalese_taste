import express from "express";
import {addFavourite, getFavouriteById, getAllFavourites, deleteFavourite} from "../controllers/favourite.controller.js";
import zodValidation from "../middlewares/zodValidator.middleware.js";
import addFavouriteSchema from "../zod/favourites/addFavourite.schema.js";
import deleteFavouriteSchema from "../zod/favourites/deleteFavourite.schema.js";

const router = express.Router();

router.get("/", getAllFavourites);
router.post("/add", zodValidation(addFavouriteSchema), addFavourite);
router.delete("/delete/:id", zodValidation(deleteFavouriteSchema), deleteFavourite);
router.get("/:id", getFavouriteById);

export default router;