import CategoryModel from "../models/Category.model.js";
import uploadOnCloudinary from "../utility/cloudinary.js";

const findCategoryOnDb = async (catIdOrName, searchType) => {
  // console.log("catIdOrName", catIdOrName, searchType);
  if (searchType === "name") {
    return await CategoryModel.findOne({ name: catIdOrName });
  } else {
    return await CategoryModel.findById(catIdOrName);
  }
};

const add = async (req) => {
  const { categoryName, categoryDescription } = req.body;

  if (categoryName == "" || categoryDescription == "") {
    throw {
      statusFromService: 400,
      msgFromService: "Fields cannot be empty.",
    };
  }
  const existingCategory = await findCategoryOnDb(categoryName, "name");
  if (existingCategory) {
    throw {
      statusFromService: 409,
      msgFromService: "category already exists.",
    };
  }

  const imagePath = req.files?.[0]?.path;

  let imageUploaded = null;
  if (imagePath) {
    imageUploaded = await uploadOnCloudinary(imagePath);

    if (!imageUploaded) {
      throw {
        statusFromService: 409,
        msgFromService: "Error while image upload.",
      };
    }
  }

  const newCategory = new CategoryModel({
    categoryName,
    categoryDescription,
    categoryImage: imageUploaded?.url || null,
  });

  return await newCategory.save();

};

const all = async (req) => {

  const page = Number(req.query.page) || 1;
  const size = Number(req.query.size) || 10;
  const skip = (page - 1) * size;

  const [categories, total] = await Promise.all([
    CategoryModel.find()
      .limit(size)
      .skip(skip),
    CategoryModel.countDocuments(),
  ]);


  if (!categories) {
    throw {
      statusFromService: 404,
      msgFromService: "no any categories found",
    };
  }

  return { categories: [...categories], total: total };

};

const single = async (req) => {
  const category = await CategoryModel.findById(req.params.id);
  if (!category) {
    throw {
      statusFromService: 400,
      msgFromService: "could not find category"
    }
  }
  return category
}

const update = async (req) => {
  const imagePath = req.files[0]?.path;
  let imageUploaded = null;


  if (imagePath) {
    imageUploaded = await uploadOnCloudinary(imagePath);

    if (!imageUploaded) {
      throw {
        statusFromService: 409,
        msgFromService: "Error while image upload.",
      }
    }
  }

  const updateThis = {
    ...req.body,
    categoryImage: imageUploaded.url
  }

  const updated = await CategoryModel.findByIdAndUpdate(
    req.params.id,
    updateThis,
    { returnDocument: 'after' }
  );
  if (!updated) {
    throw {
      statusFromService: 400,
      msgFromService: "could not update category"
    }
  }
  return updated;
}

const remove = async (req) => {
  const deleted = await CategoryModel.findByIdAndDelete(req.params.id);
  if (!deleted) {
    throw {
      statusFromService: 400,
      msgFromService: "could not delete category"
    }
  }
  return deleted;
}

export default { single, add, all, update, remove };
