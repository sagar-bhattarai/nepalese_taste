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
    message: favourite.isFavourited ? "favourite added successfully" : "favourite removed successfully",
    isFavourited: favourite.isFavourited ? true : false,
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

  const userId = req.user._id;
  const filter = { customerId: userId };

  const [products, total] = await Promise.all([
    FavouriteModel.find(filter)
      .populate({
        path: "productId",
        populate: {
          path: "categoryId",
          select: "categoryName",
        },
      })
      // .populate("customerId")
      .populate({
        path: "customerId",
        select: "userName userAddress",
      })
      .limit(size)
      .skip(skip),

    FavouriteModel.countDocuments(filter),
  ]);

  return { products, total };

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
  console.log("here")
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
