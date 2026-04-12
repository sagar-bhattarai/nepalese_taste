import productService from "../services/product.service.js";
import config from "../configs/config.js";

const addProduct = async (req, res) => {
    try {
        const result = await productService.create(req);

        return res
            .status(200)
            .json({ api: config.api, result, message: "product added successfully" });

    } catch (error) {
        return res
            .status(error.statusFromService || 500)
            .json({ error: true, message: error.msgFromService || "server error while adding product." });
    }
}

const getAllProduct = async (req, res) => {
    try {
        // const result = await productService.all(req);
        const result = await productService.getProducts(req);

        return res
            .status(200)
            .json({ api: config.api, result, message: "products fetched successfully." });

    } catch (error) {
        return res
            .status(error.statusFromService || 500)
            .json({ error: true, message: error.msgFromService || "server error while fetching products." });
    }
}

// const searchProducts = async (req, res) => {
//         console.log(req.query)
//     try {
//         const result = await productService.search(req);

//         return res
//             .status(200)
//             .json({ api: config.api, result, message: "products searched successfully." });

//     } catch (error) {
//         return res
//             .status(error.statusFromService || 500)
//             .json({ error: true, message: error.msgFromService || "server error while searching products." });
//     }
// }

const updateProduct = async (req, res) => {
    try {
        const result = await productService.edit(req);

        return res
            .status(200)
            .json({ api: config.api, result, message: "product updated successfully." });

    } catch (error) {
        // console.log(error)
        return res
            .status(500)
            .json({ error: true, message: "server error while updating product." });
    }
}

const getProductById = async (req, res) => {
    try {
        const result = await productService.single(req.params.id);

        return res
            .status(200)
            .json({ api: config.api, result, message: "product fetched successfully." });

    } catch (error) {
        return res
            .status(500)
            .json({ error: true, message: "server error while fetching product." });
    }
}

const toggleActiveStatus = async (req, res) => {
    try {
        const result = await productService.toggle(req.params.internalSku);

        return res
            .status(200)
            .json({ api: config.api, result, message: "product active status toggled successfully." });

    } catch (error) {
        return res
            .status(500)
            .json({ error: true, message: "server error while toggling product active status." });
    }
}

const getBrands = async (req, res) => {
    try {
        const result = await productService.brands();

        return res
            .status(200)
            .json({ api: config.api, result, message: "Brands fetched successfully." });

    } catch (error) {
        return res
            .status(500)
            .json({ error: true, message: "server error while fetching Brands" });
    }
}

const getCategories = async (req, res) => {
    try {
        const result = await productService.categories();

        return res
            .status(200)
            .json({ api: config.api, result, message: "Categories fetched successfully." });

    } catch (error) {
        return res
            .status(500)
            .json({ error: true, message: "server error while fetching Categories" });
    }
}

// export { addProduct, getAllProduct, updateProduct, getProductById, toggleActiveStatus, searchProducts }
export { addProduct, getAllProduct, updateProduct, getProductById, toggleActiveStatus, getBrands, getCategories }