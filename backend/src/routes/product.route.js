import { addProduct, getAllProduct, updateProduct, getProductById, toggleActiveStatus } from "../controllers/product.controller.js";
import express from "express";
import auth from "../middlewares/auth.middleware.js";
import roleBasedAuth from "../middlewares/roleBasedAuth.middleware.js";
import { CUSTOMER, MERCHANT, ADMIN, STAFF } from "../constants/roles.constant.js"
;import {upload} from "../middlewares/multer.middleware.js";

import zodValidator from "../middlewares/zodValidator.middleware.js";
import productSchema from "../zod/products/addProduct.schema.js";
import updateProductSchema from "../zod/products/updateProduct.schema.js";

const router = express.Router();

/** 
 * POST /api/products/add
*/
router.post("/add", auth, roleBasedAuth(ADMIN), upload.array("images"), zodValidator(productSchema), addProduct);


/** 
 * GET /api/products
 *     /api/products?minPrice=1000&attributes[color]=Red
 *     /api/products?attributes[color]=Red&attributes[size]=M
 *     /api/products?brand=Nike&attributes[material]=Cotton
 *     /api/products?sort=price_asc
*/
router.get("/", getAllProduct);


/** 
 * GET /api/products/product/:id
*/
router.get("/product/:id", getProductById);

/** 
 * GET /api/products/toggleStatus/:internalSku
*/
router.get("/toggleStatus/:id", auth, roleBasedAuth(ADMIN), toggleActiveStatus);

/** 
 * PATCH /api/products/update/:id
 *       /api/products/:id/admin-update
*/
router.patch("/update/:id", auth, roleBasedAuth(ADMIN), upload.array("images"), updateProduct);   
// router.patch("/:id/update", auth, roleBasedAuth(ADMIN), zodValidator(updateProductSchema), updateProduct);
// router.patch("/update/:id", auth, roleBasedAuth(ADMIN), upload.array("images"), zodValidator(updateProductSchema), updateProduct);

/** 
 * GET /api/products/delete/:id
*/
// router.get("/delete/:id",  auth, roleBasedAuth(ADMIN), deleteProduct);







export default router;