import BrandModel from "../models/Brand.model.js";
import uploadOnCloudinary from "../utility/cloudinary.js";

const findBrandOnDb = async (brandIdOrName, searchType) => {
  // console.log("brandIdOrName", brandIdOrName, searchType);
  if (searchType === "name") {
    return await BrandModel.findOne({ name: brandIdOrName });
  } else {
    return await BrandModel.findById(brandIdOrName);
  }
};

const add = async (req) => {
  const { brandName, brandDescription } = req.body;

  if (brandName == "" || brandDescription == "") {
    throw {
      statusFromService: 400,
      msgFromService: "Fields cannot be empty.",
    };
  }
  const existingBrand = await findBrandOnDb(brandName, "name");
  if (existingBrand) {
    throw {
      statusFromService: 409,
      msgFromService: "brand already exists.",
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

  const newBrand = new BrandModel({
    brandName,
    brandDescription,
    brandImage: imageUploaded?.url || null,
  });

  return await newBrand.save();

};

const all = async (req) => {
  // const brands = await BrandModel.find({}, { _id: 1, brandName: 1, brandDescription: 1 }).limit(10);
  //  const brands = await BrandModel.find().select("brandName brandDescription -_id").limit(5);

  const page = Number(req.query.page) || 1;
  const size = Number(req.query.size) || 10;
  const skip = (page - 1) * size;

  const [brands, total] = await Promise.all([
    BrandModel.find()
      .limit(size)
      .skip(skip),
    BrandModel.countDocuments(),
  ]);


  if (!brands) {
    throw {
      statusFromService: 404,
      msgFromService: "no any brands found",
    };
  }

  return { brands: [...brands], total: total };

};

const single = async (req) => {
  const brand = await BrandModel.findById(req.params.id);
  if (!brand) {
    throw {
      statusFromService: 400,
      msgFromService: "could not find brand"
    }
  }
  return brand
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
    brandImage: imageUploaded.url
  }

  const updated = await BrandModel.findByIdAndUpdate(
    req.params.id,
    updateThis,
    { returnDocument: 'after' }
  );
  if (!updated) {
    throw {
      statusFromService: 400,
      msgFromService: "could not update brand"
    }
  }
  return updated;
}

const remove = async (req) => {
  const deleted = await BrandModel.findByIdAndDelete(req.params.id);
  if (!deleted) {
    throw {
      statusFromService: 400,
      msgFromService: "could not delete brand"
    }
  }
  return deleted;
}

export default { single, add, all, update, remove };
