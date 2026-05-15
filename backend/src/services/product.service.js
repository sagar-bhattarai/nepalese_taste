import ProductModel from "../models/Product.model.js";
import StarReviewModel from "../models/StarReview.model.js";
import CategoryModel from "../models/Category.model.js";
import uploadOnCloudinary from "../utility/cloudinary.js"
import FavouriteModel from "../models/Favourite.model.js"

const findProductOnDb = async (productIdOrName, searchType) => {
  if (searchType === "name") {
    return await ProductModel.findOne({ ProductName: productIdOrName }).select("-createdAt -updatedAt -__v");
  } else {
    return await ProductModel.findById(productIdOrName).select("-createdAt -updatedAt -__v");
  }
};

const create = async (req) => {
  const existingProduct = await findProductOnDb(req.body.productName, "name");
  if (existingProduct) {
    throw {
      statusFromService: 409,
      msgFromService: "Product name already exists.",
    };
  }

  // const imagePath = req.files?.[0]?.path;
  // let imageUploaded = null;
  // if (imagePath) {
  //   imageUploaded = await uploadOnCloudinary(imagePath);
  //   // console.log("imageUploaded", imageUploaded)
  //   if (!imageUploaded) {
  //     throw {
  //       statusFromService: 409,
  //       msgFromService: "Error while image upload.",
  //     };
  //   }
  // }

  const imagePaths = req.files?.map((file) => file.path);
  let uploadedImages = [];

  if (imagePaths?.length > 0) {
    uploadedImages = await Promise.all(
      imagePaths.map(async (path) => {
        const uploaded = await uploadOnCloudinary(path);

        if (!uploaded) {
          throw {
            statusFromService: 409,
            msgFromService: "Error while image upload.",
          };
        }

        return uploaded.url;
      })
    );
  }

  const newProduct = await ProductModel({
    ...req.body,
    // productImage: imageUploaded?.url || null,
    productImage: uploadedImages || null
  });

  return await newProduct.save();
};

const single = async (req) => {

  if (req?.params?.id == "#") {
    throw new Error("Product not found");
  }

  const product = await ProductModel.findOne({
    _id: req.params.id,
  })
    .populate("categoryId")
    .lean();

  if (!product) {
    throw new Error("Product not found");
  }

  let userRating = null;

  if (req.params?.userId != "guest") {
    userRating = await StarReviewModel.findOne({
      user: req.params.userId,
      product: req.params.id,
    });
  }

  return {
    ...product,
    userRating: userRating?.rating || null,
  };
};

const edit = async (req, res) => { // adminUpdateProduct
  const productOnDb = await findProductOnDb(req.params.id, "id");

  if (!productOnDb) {
    throw {
      statusFromService: 400,
      msgFromService: "product does not exist",
    };
  }

  // const imagePath = req.files?.[0]?.path;
  // let imageUploaded = null;
  // if (imagePath) {
  //   imageUploaded = await uploadOnCloudinary(imagePath);
  //   // console.log("imageUploaded", imageUploaded)
  //   if (!imageUploaded) {
  //     throw {
  //       statusFromService: 409,
  //       msgFromService: "Error while image upload.",
  //     };
  //   }
  // }

  const imagePaths = req.files?.map((file) => file.path);
  let uploadedImages = [];

  if (imagePaths?.length > 0) {
    uploadedImages = await Promise.all(
      imagePaths.map(async (path) => {
        const uploaded = await uploadOnCloudinary(path);

        if (!uploaded) {
          throw {
            statusFromService: 409,
            msgFromService: "Error while image upload.",
          };
        }
        return uploaded.url;
      })
    );
  }

  const { productName, productDescription, productPrice, productStock, categoryId, brandId, isActive } = req.body;
  const updateThis = {
    productName: productName || productOnDb.productName,
    productDescription: productDescription || productOnDb.productDescription,
    productPrice: productPrice || productOnDb.productPrice,
    productStock: productStock || productOnDb.productStock,
    categoryId: categoryId || productOnDb.categoryId,
    brandId: brandId || productOnDb.brandId,
    isActive: isActive || productOnDb.isActive,
    // productImage: imageUploaded?.url,
    // productImage: uploadedImages || null,
    productImage: [...(productOnDb.productImage || []), ...uploadedImages,],
  }

  const edited = await ProductModel.findByIdAndUpdate(
    req.params.id,
    updateThis,
    { returnDocument: 'after' }
  );

  if (!edited) {
    throw {
      statusFromService: 400,
      msgFromService: "could not update Product"
    }
  }
  return edited;
};


const getProducts = async (req) => {
  const page = Number(req.query.page) || 1;
  const size = Number(req.query.size) || 12;
  const skip = (page - 1) * size;

  const { category, sort, min, max, name, brands } = req.query;

  // -------------------------
  // FILTERS
  // -------------------------
  const filters = {};

  if (req.query.isActive) {
    filters.isActive = req.query.isActive === "true";
  }

  if (category) {
    // check if it's ObjectId or name
    const isObjectId = category.match(/^[0-9a-fA-F]{24}$/);

    if (isObjectId) {
      filters.categoryId = category;
    } else {
      const cat = await CategoryModel.findOne({
        // categoryName: { $regex: category, $options: "i" },  // It will match like (electro in every word): electronics, electro devices, my-electronics-store
        categoryName: category,
      }).lean();

      if (cat) {
        filters.categoryId = cat._id;
      } else {
        // no category found → return empty result
        filters.categoryId = null;
      }
    }
  }

  // name search
  if (name) {
    filters.productName = {
      $regex: name,
      $options: "i",
    };
  }

  // brand filter (array support)
  if (brands) {
    const brandArray = brands.split(",");
    filters.brand = { $in: brandArray };
  }

  // price filter
  if (min || max) {
    filters.productPrice = {};

    if (min) filters.productPrice.$gte = Number(min);
    if (max) filters.productPrice.$lte = Number(max);
  }

  // -------------------------
  // SORT
  // -------------------------
  let sortOption = { createdAt: -1 };

  switch (sort) {
    case "price_asc":
      sortOption = { productPrice: 1 };
      break;

    case "price_desc":
      sortOption = { productPrice: -1 };
      break;

    case "name_asc":
      sortOption = { productName: 1 };
      break;

    case "name_desc":
      sortOption = { productName: -1 };
      break;

    case "latest":
      sortOption = { createdAt: -1 };
      break;

    case "oldest":
      sortOption = { createdAt: 1 };
      break;
  }

  // -------------------------
  // QUERY
  // -------------------------
  const products = await ProductModel.find(filters)
    .populate("categoryId", "categoryName")
    .populate("brandId", "brandName")
    .sort(sortOption)
    .skip(skip)
    .limit(size)
    .lean();

  const productIds = products.map((p) => p._id);

  let favouriteSet = new Set();

  if (req.user?._id) {
    const favourites = await FavouriteModel.find({
      customerId: req.user._id,
      productId: { $in: productIds },
      isFavourited: true,
    }).lean();

    favouriteSet = new Set(favourites.map((f) => f.productId.toString()));
  }

  const formattedProducts = products.map(
    ({ categoryId, brandId, _id, ...rest }) => ({
      ...rest,
      _id,
      categoryName: categoryId?.categoryName || null,
      brandName: brandId?.brandName || null,
      catId: categoryId?._id || null,
      isFavourited: favouriteSet.has(_id.toString()),
    })
  );

  const [total, inActive] = await Promise.all([
    ProductModel.countDocuments(filters),
    ProductModel.countDocuments({ ...filters, isActive: false }),
  ]);

  return {
    products: formattedProducts,
    total,
    inActive,
    page,
    size,
  };
};

{/*
  
  const getProducts = async (req) => {
 
  const page = Number(req.query.page) || 1;
  const size = Number(req.query.size) || 3;
  const skip = (page - 1) * size;

  // Optional filters
  const filters = {};
  if (req.query.isActive) {
    filters.isActive = req.query.isActive === "true";
  }
  if (req.query.category) {
    filters.categoryId = req.query.category;
  }

  // 1. Get products
  const products = await ProductModel.find(filters)
    .populate("categoryId", "categoryName")
    .skip(skip)
    .limit(size)
    .lean();

  const productIds = products.map(p => p._id);

  // 2. Default: no favourites
  let favouriteSet = new Set();
  // 3. Only fetch favourites IF user exists
  if (req.user?._id) {
    const favourites = await FavouriteModel.find({
      customerId: req.user._id,
      productId: { $in: productIds },
      isFavourited: true,
    }).lean();


    favouriteSet = new Set(
      favourites.map(fav => fav.productId.toString())
    );
  }

  // 4. Format response
  const formattedProducts = products.map(({ categoryId, _id, ...rest }) => ({
    ...rest,
    _id,
    categoryName: categoryId?.categoryName || null,
    catId: categoryId?._id || null,
    isFavourited: favouriteSet.has(_id.toString()), // false for guests
  }));

  // 5. Counts
  const [totalCount, inactiveCount] = await Promise.all([
    ProductModel.countDocuments(filters),
    ProductModel.countDocuments({ ...filters, isActive: false }),
  ]);

  return {
    products: formattedProducts,
    total: totalCount,
    inActive: inactiveCount,
    page,
    size,
  };

};
  

*/}


const remove = async (id) => {

  /*     
      // enable this to make temporary delete , make change on  model as well as above add function
      
      const existingProduct = await findProductOnDb(id, "id");
       if(!existingProduct){
          return res.statusFromService(404).json({success: false, msgFromService: "Product not found"});
       }
       if(existingProduct.isDeleted){
           return res.statusFromService(404).json({success: false, msgFromService: "Product already removed"});
       }
       await ProductModel.findByIdAndUpdate(id, {isDeleted:true}, {new: true})
  */

  const deleted = await ProductModel.findByIdAndDelete(id);
  if (!deleted) {
    throw {
      statusFromService: 400,
      msgFromService: "could not delete Product"
    }
  }
  return deleted;
}

const brands = async () => {
  return await ProductModel.distinct("brand");
}

const categories = async () => {
  return await ProductModel.distinct("category");
}

export default { create, single, edit, remove, getProducts, findProductOnDb, brands, categories };
