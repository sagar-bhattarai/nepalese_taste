import favouriteService from "../services/favourite.service.js";
import config from "../configs/config.js";

const addFavourite = async (req, res) => {
  try {
    const favouriteAdded = await favouriteService.add(req);

    return res.status(200).json(
      {
        api: config.api,
        favourite: favouriteAdded,
      },
    );
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Favourite name must be unique" });
    }
    return res
      .status(error.statusFromService || 500)
      .json({ message: error.msgFromService || "server error while adding favourite." });
  }
};

const getFavouriteById = async (req, res) => {
  try {
    const result = await favouriteService.single(req);

    return res
      .status(200)
      .json({ api: config.api, result, message: "Favourite fetched successfully." });
  } catch (error) {
    return res
      .status(error.statusFromService || 500)
      .json({ message: error.msgFromService || "server error while fetching all favourite." })

  }
};

const getAllFavourites = async (req, res) => {
  try {
    const result = await favouriteService.all(req);

    return res
      .status(200)
      .json({ api: config.api, result, message: "Favourites fetched successfully." });
  } catch (error) {
    return res
      .status(error.statusFromService || 500)
      .json({ message: error.msgFromService || "server error while fetching all favourite." })

  }
};


const deleteFavourite = async (req, res) => {
  try {
    const deleted = await favouriteService.remove(req);
    return res
      .status(200)
      .json(
        { api: config.api, favourite: deleted, message: "Favourite deleted successfully" },
      );
  } catch (error) {
    return res
      .status(error.status || 500)
      .json({ message: "error while deleting favourite" });
  }
};

export {
  addFavourite,
  getFavouriteById,
  getAllFavourites,
  deleteFavourite,
};
