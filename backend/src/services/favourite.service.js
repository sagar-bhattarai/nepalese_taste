import FavouriteModel from "../models/Favourite.model.js";

const add = async (req) => {
  const { productId } = req.body;
  const customerId = req.user._id;
  if (!customerId || !productId) {
    throw new Error("Invalid customerId or productId");
  }

  const existing = await FavouriteModel.findOne({
    customerId: customerId,
    productId: productId,
  });

  let favourite;

  if (!existing) {
    favourite = await FavouriteModel.create({
      customerId: customerId,
      productId: productId,
      isFavourited: true,
    });
  } else {
    existing.isFavourited = !existing.isFavourited;
    favourite = await existing.save();
  }

  return {
    message: favourite.isFavourited  ? "favourite added successfully" : "favourite removed successfully",
    isFavourited: favourite.isFavourited ? true  : false,
  };


{/*
  
    const favourite = await FavouriteModel.findOneAndUpdate(
    { customerId: customerId, productId: productId },
    [
      {
        $set: {
          isFavourited: { $not: "$isFavourited" },
        },
      },
    ],
    { upsert: true, returnDocument: "after",updatePipeline: true, }
  );

  const isNowFavourited = favourite.isFavourited;

  return {
    // favourite,
    message: isNowFavourited
      ? "favourite added successfully"
      : "favourite removed successfully",
  };

*/}

};

const all = async (req) => {
  const page = Number(req.query.page) || 1;
  const size = Number(req.query.size) || 3;
  const skip = (page - 1) * size;

  const [favourites, total] = await Promise.all([
    FavouriteModel.find()
      .limit(size)
      .skip(skip),
    FavouriteModel.countDocuments(),
  ]);


  if (!favourites) {
    throw {
      statusFromService: 404,
      msgFromService: "no any favourites found",
    };
  }

  return { favourites: [...favourites], total: total };

};
const single = async (req) => {
  const favourite = await FavouriteModel.findById(req.params.id);
  if (!favourite) {
    throw {
      statusFromService: 400,
      msgFromService: "could not find favourite"
    }
  }
  return favourite
}


const remove = async (req) => {
  const deleted = await FavouriteModel.findByIdAndDelete(req.params.id);
  if (!deleted) {
    throw {
      statusFromService: 400,
      msgFromService: "could not delete favourite"
    }
  }
  return deleted;
}
export default { single, add, all, remove };
