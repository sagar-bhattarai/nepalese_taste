import ProductModel from "../models/Product.model.js";
import CategoryModel from "../models/Category.model.js";
import uploadOnCloudinary from "../utility/cloudinary.js"

const findProductOnDb = async (productIdOrName, searchType) => {
  if (searchType === "name") {
    return await ProductModel.findOne({ ProductName: productIdOrName }).select("-createdAt -updatedAt -__v");
  } else {
    return await ProductModel.findById(productIdOrName).select("-createdAt -updatedAt -__v");
  }
};

const create = async (req) => {
  // const {
  //   productName,
  //   productDescription,
  //   categoryId,
  //   brand,
  //   attributes,
  //   productPrice,
  //   oldPrice,
  //   productStock,
  // } = req.body;

  // const vendorId = req.user._id;

  // const category = await CategoryModel.findById(categoryId);
  // if (!category) throw new Error("Invalid category");

  // const listing = await ProductModel.create({
  //   vendorId,
  //   productId: product._id,
  //   publicSku,
  //   productPrice,
  //   oldPrice,
  //   productStock,
  // });

  // return { product, listing };


  const existingProduct = await findProductOnDb(req.body.productName, "name");
  if (existingProduct) {
    throw {
      statusFromService: 409,
      msgFromService: "Product name already exists.",
    };
  }

  const imagePath = req.files?.productImage?.[0]?.path;
  let imageUploaded = null;
  if (imagePath) {
    imageUploaded = await uploadOnCloudinary(imagePath);

    // console.log("imageUploaded", imageUploaded)

    if (!imageUploaded) {
      throw {
        statusFromService: 409,
        msgFromService: "Error while image upload.",
      };
    }
  }

  const newProduct = await ProductModel({
    ...req.body,
    productImage: imageUploaded?.url || null,
  });

  return await newProduct.save();
};


const single = async (id) => {
  const product = await ProductModel.findOne({
    _id: id,
    // isActive: true
  })
    .populate("categoryId")
    .lean();

  if (!product) {
    throw new Error("Product not found");
  }

  return { ...product };
};


const edit = async (req, res) => {   // adminUpdateProduct
  const productOnDb = await findProductOnDb(req.params.id, "id");

  if (!productOnDb) {
    throw {
      statusFromService: 400,
      msgFromService: "product does not exist",
    };
  }

  // const { productName, productDescription, productPrice, productStock, categoryId } = req.body;
  // const {productData} = req.body;
  // const parsedProductData = JSON.parse(productData);

  // const updateThis = {
  //   productName: parsedProductData.productName || productOnDb.productName,
  //   productDescription: parsedProductData.productDescription || productOnDb.productDescription,
  //   productPrice: parsedProductData.productPrice || productOnDb.productPrice,
  //   productStock: parsedProductData.productStock || productOnDb.productStock,
  //   categoryId: parsedProductData.categoryId || productOnDb.categoryId,
  //   isActive: parsedProductData.isActive || productOnDb.isActive
  // }

  const { productName, productDescription, productPrice, productStock, categoryId, isActive } = req.body;
  const updateThis = {
    productName: productName || productOnDb.productName,
    productDescription: productDescription || productOnDb.productDescription,
    productPrice: productPrice || productOnDb.productPrice,
    productStock: productStock || productOnDb.productStock,
    categoryId:  categoryId || productOnDb.categoryId,
    isActive: isActive || productOnDb.isActive
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
  // const hasFilterOrSort =
  //   req.query.sort ||
  //   req.query.minPrice ||
  //   req.query.maxPrice ||
  //   req.query.color ||
  //   req.query.brand;

  {/* const page = Number(req.query.page) || 1;
  const size = Number(req.query.size) || 10;
  const skip = (page - 1) * size;

  const [products, total, inActive] = await Promise.all([
    ProductModel.find()
      .populate("categoryId")
      .skip(skip)
      .limit(size),

    ProductModel.countDocuments(),
    ProductModel.countDocuments({ isActive: false }),
  ]);
  return { products: [...products], total: total, inActive }; */}


  const page = Number(req.query.page) || 1;
  const size = Number(req.query.size) || 10;
  const skip = (page - 1) * size;

  // Optional filters
  const filters = {};
  if (req.query.isActive) {
    filters.isActive = req.query.isActive === "true"; // convert string → boolean
  }
  if (req.query.categoryId) {
    filters.categoryId = req.query.categoryId;
  }

  const products = await ProductModel.find(filters)
    .populate("categoryId", "categoryName")
    .skip(skip)
    .limit(size)
    .lean();

  // Map categoryId → category name
  const formattedProducts = products.map(({ categoryId, ...rest }) => ({
    ...rest,
    categoryName: categoryId?.categoryName  || null,
    catId: categoryId?._id  || null,
  }));

  const [totalCount, inactiveCount] = await Promise.all([
    ProductModel.countDocuments(filters),
    ProductModel.countDocuments({ ...filters, isActive: false }),
  ]);

  return { products: formattedProducts, total: totalCount, inActive: inactiveCount, page, size, };

};

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


export default { create, single, edit, remove, getProducts };
