import { profile } from "console";
import TestimonialModel from "../models/Testimonial.model.js";

const add = async (req) => {
  const { testimonialTitle, testimonialRating, testimonialDescription } = req.body;
  const userId = req.user._id

  const newTestimonial = new TestimonialModel({
    userId,
    testimonialRating,
    testimonialTitle,
    testimonialDescription,
  });

  return await newTestimonial.save();

};

const all = async (req) => {
  const page = Number(req.query.page) || 1;
  const size = Number(req.query.size) || 10;
  const skip = (page - 1) * size;

  const result = await TestimonialModel.aggregate([
    // customer join
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "customer",
      },
    },

    { $unwind: "$customer" },

    {
      $project: {
        _id: 1,
        testimonialRating: 1,
        testimonialTitle: 1,
        testimonialDescription: 1,
        createdAt: 1,

        customer: {
          _id: "$customer._id",
          userName: "$customer.userName",
          profileImage: "$customer.profileImage",
        },
      },
    },

    // optional latest first
    { $sort: { createdAt: -1 } },

    {
      $facet: {
        data: [
          { $skip: skip },
          { $limit: size },
        ],

        totalCount: [
          { $count: "count" },
        ],
      },
    },
  ]);

  const testimonials = result[0]?.data || [];
  const total = result[0]?.totalCount[0]?.count || 0;

  if (testimonials.length === 0) {
    throw {
      statusFromService: 404,
      msgFromService: "No testimonials found",
    };
  }

  return { testimonials, total, page, size};
};

// const single = async (req) => {
//   const testimonial = await TestimonialModel.findById(req.params.id);
//   if (!testimonial) {
//     throw {
//       statusFromService: 400,
//       msgFromService: "could not find testimonial"
//     }
//   }
//   return testimonial;
// }

const update = async (req) => {
  const updated = await TestimonialModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { returnDocument: 'after' }
  );

  return updated;
}

const remove = async (req) => {
  const deleted = await TestimonialModel.findByIdAndDelete(req.params.id);
  if (!deleted) {
    throw {
      statusFromService: 400,
      msgFromService: "could not delete testimonial"
    }
  }
  return deleted;
}

const ratings = async (req) => {
  const ratings = await TestimonialModel.aggregate([
    {
      $group: {
        _id: "$testimonialRating",
        count: {
          $sum: 1,
        },
      },
    },
  ]);

  const formattedRatings = {
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  };

  ratings.forEach((item) => {
    formattedRatings[item._id] = item.count;
  });

  const totalReviews = Object.values(formattedRatings)
    .reduce((acc, curr) => acc + curr, 0);

  const ratingStats = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: formattedRatings[star],
    percentage: totalReviews
      ? ((formattedRatings[star] / totalReviews) * 100).toFixed(1)
      : 0,
  }));

  const averageRating =
    totalReviews > 0
      ? (
        ratingStats.reduce(
          (acc, item) => acc + item.star * item.count,
          0
        ) / totalReviews
      ).toFixed(1)
      : 0;

  return {
    totalReviews,
    averageRating,
    ratingStats,
  };
}

// export default { single, add, all, update, remove, ratings };
export default { add, all, update, remove, ratings };












// const all = async (req) => {
//   const page = Number(req.query.page) || 1;
//   const size = Number(req.query.size) || 10;
//   const skip = (page - 1) * size;

//   const [testimonials, total] = await Promise.all([
//     TestimonialModel.find()
//       .limit(size)
//       .skip(skip),
//     TestimonialModel.countDocuments(),
//   ]);

//   if (!testimonials) {
//     throw {
//       statusFromService: 404,
//       msgFromService: "no any testimonials found",
//     };
//   }

//   return { testimonials: [...testimonials], total: total };

// };