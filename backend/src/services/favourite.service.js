import FavouriteModel from "../models/Favourite.model.js";
import mongoose from "mongoose";

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

  const { category, sort } = req.query;

  // ---------------------------
  // SORT LOGIC (FIXED)
  // ---------------------------
  let sortStage = { createdAt: -1 };

  switch (sort) {
    case "price_asc":
      sortStage = { "product.productPrice": 1, _id: 1 };
      break;

    case "price_desc":
      sortStage = { "product.productPrice": -1, _id: -1 };
      break;

    case "name_asc":
      sortStage = { "product.productName": 1, _id: 1 };
      break;

    case "name_desc":
      sortStage = { "product.productName": -1, _id: -1 };
      break;

    case "latest":
      sortStage = { createdAt: -1, _id: -1 };
      break;

    case "oldest":
      sortStage = { createdAt: 1, _id: 1 };
      break;
  }

  // ---------------------------
  // PIPELINE
  // ---------------------------
  const pipeline = [
    // 1. filter by user
    {
      $match: {
        customerId: new mongoose.Types.ObjectId(req.user._id),
      },
    },

    // 2. join product
    {
      $lookup: {
        from: "products",
        localField: "productId",
        foreignField: "_id",
        as: "product",
      },
    },

    { $unwind: "$product" },

    // 3. category filter (optional)
    ...(category
      ? [
          {
            $match: {
              "product.categoryId": new mongoose.Types.ObjectId(category),
            },
          },
        ]
      : []),

    // 4. join category
    {
      $lookup: {
        from: "categories",
        localField: "product.categoryId",
        foreignField: "_id",
        as: "category",
      },
    },

    {
      $unwind: {
        path: "$category",
        preserveNullAndEmptyArrays: true,
      },
    },

    // 5. SORT (IMPORTANT)
    {
      $sort: sortStage,
    },

    // 6. pagination
    {
      $skip: skip,
    },

    {
      $limit: size,
    },

    // 7. final output shape
    {
      $project: {
        _id: 1,
        createdAt: 1,

        product: {
          _id: "$product._id",
          productName: "$product.productName",
          productPrice: "$product.productPrice",
          productDescription: "$product.productDescription",
          categoryId: "$product.categoryId",
        },

        category: {
          _id: "$category._id",
          categoryName: "$category.categoryName",
        },
      },
    },
  ];

  // ---------------------------
  // EXECUTE
  // ---------------------------
  const [products, total] = await Promise.all([
    FavouriteModel.aggregate(pipeline),
    FavouriteModel.countDocuments({
      customerId: req.user._id,
    }),
  ]);

  return {
    products,
    total,
    page,
    size,
  };
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
