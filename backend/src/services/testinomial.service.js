import TestinomialModel from "../models/Testinomial.model.js";

const add = async (req) => {
  const { testinomialDescription } = req.body;

  const newTestinomial = new TestinomialModel({
    testinomialDescription,
  });

  return await newTestinomial.save();

};

const all = async (req) => {
  // const testinomials = await TestinomialModel.find({}, { _id: 1, testinomialName: 1, testinomialDescription: 1 }).limit(10);
  //  const testinomials = await TestinomialModel.find().select("testinomialName testinomialDescription -_id").limit(5);

  const page = Number(req.query.page) || 1;
  const size = Number(req.query.size) || 10;
  const skip = (page - 1) * size;

  const [testinomials, total] = await Promise.all([
    TestinomialModel.find()
      .limit(size)
      .skip(skip),
    TestinomialModel.countDocuments(),
  ]);


  if (!testinomials) {
    throw {
      statusFromService: 404,
      msgFromService: "no any testinomials found",
    };
  }

  return { testinomials: [...testinomials], total: total };

};

const single = async (req) => {
  const testinomial = await TestinomialModel.findById(req.params.id);
  if (!testinomial) {
    throw {
      statusFromService: 400,
      msgFromService: "could not find testinomial"
    }
  }
  return testinomial;
}

const update = async (req) => {

  const updated = await TestinomialModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { returnDocument: 'after' }
  );

  return updated;
}

const remove = async (req) => {
  const deleted = await TestinomialModel.findByIdAndDelete(req.params.id);
  if (!deleted) {
    throw {
      statusFromService: 400,
      msgFromService: "could not delete testinomial"
    }
  }
  return deleted;
}

export default { single, add, all, update, remove };
