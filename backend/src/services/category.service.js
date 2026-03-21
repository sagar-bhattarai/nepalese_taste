import CategoryModel from "../models/Category.model.js";

const findCategoryOnDb = async (catIdOrName, searchType) => {
  // console.log("catIdOrName", catIdOrName, searchType);
  if (searchType === "name") {
    return await CategoryModel.findOne({ name: catIdOrName });
  } else {
    return await CategoryModel.findById(catIdOrName);
  }
};

const add = async (req) => {
  const { categoryName, categoryDescription } = req;
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


  const newCategory = new CategoryModel({
    categoryName,
    categoryDescription,
  });

  return await newCategory.save();

};

const all = async (req) => {
  // const categories = await CategoryModel.find({}, { _id: 1, categoryName: 1, categoryDescription: 1 }).limit(10);
  //  const categories = await CategoryModel.find().select("categoryName categoryDescription -_id").limit(5);
  
  const page = Number(req.query.page) || 1;
  const size = Number(req.query.size) || 3;
  const skip = (page - 1) * size;

  const [categories, total] = await Promise.all([
    CategoryModel.find(
      {},
      { _id: 1, categoryName: 1, categoryDescription: 1 }
    )
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
  // return categories;
};

const update = async (req) => {
  const updated = await CategoryModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
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
export default { add, all, update, remove };
