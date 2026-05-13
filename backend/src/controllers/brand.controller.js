import brandService from "../services/brand.service.js";
import config from "../configs/config.js";

const addBrand = async (req, res) => {
  try {
    const brandAdded = await brandService.add(req);

    return res.status(200).json(
      {
        api: config.api,
        brand: brandAdded,
        message: "brand added successfully"
      },
    );
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Brand name must be unique" });
    }
    return res
      .status(error.statusFromService || 500)
      .json({ message: error.msgFromService || "server error while adding brand." });
  }
};

const getBrandById = async (req, res) => { 
    try {
    const result = await brandService.single(req);

    return res
      .status(200)
      .json({ api: config.api, result, message: "Brand fetched successfully." });
  } catch (error) {
    return res
      .status(error.statusFromService || 500)
      .json({ message: error.msgFromService || "server error while fetching all brand." })

  }
};

const getAllBrands = async (req, res) => {
  try {
    const result = await brandService.all(req);

    return res
      .status(200)
      .json({ api: config.api, result, message: "Brands fetched successfully." });
  } catch (error) {
    return res
      .status(error.statusFromService || 500)
      .json({ message: error.msgFromService || "server error while fetching all brand." })

  }
};

const updateBrand = async (req, res) => {
  try {
    const updated = await brandService.update(req);
    return res
      .status(200)
      .json(
        { api: config.api, brand: updated, message: "Brand updated successfully." },
      );
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Brand name must be unique" });
    }
    return res
      .status(error.statusFromService || 500)
      .json({ message: error.msgFromService || "error while updating brand" });
  }
};

const deleteBrand = async (req, res) => {
  try {
    const deleted = await brandService.remove(req);
    return res
      .status(200)
      .json(
        { api: config.api, brand: deleted, message: "Brand deleted successfully" },
      );
  } catch (error) {
    return res
      .status(error.status || 500)
      .json({ message: "error while deleting brand" });
  }
};

export {
  addBrand,
  getBrandById,
  getAllBrands,
  updateBrand,
  deleteBrand,
};
