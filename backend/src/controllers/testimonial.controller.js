import testimonialService from "../services/testimonial.service.js";
import config from "../configs/config.js";

const getAllTestimonials = async (req, res) => {
  try {
    const result = await testimonialService.all(req);

    return res
      .status(200)
      .json({ api: config.api, result, message: "Testimonials fetched successfully." });
  } catch (error) {
    return res
      .status(error.statusFromService || 500)
      .json({ message: error.msgFromService || "server error while fetching all testimonial." })

  }
};

const addTestimonial = async (req, res) => {
  try {
    const testimonialAdded = await testimonialService.add(req);

    return res.status(200).json(
      {
        api: config.api,
        testimonial: testimonialAdded,
        message: "testimonial added successfully"
      },
    );
  } catch (error) {
    return res
      .status(error.statusFromService || 500)
      .json({ message: error.msgFromService || "server error while adding testimonial." });
  }
};

const updateTestimonial = async (req, res) => {
  try {
    const updated = await testimonialService.update(req);
    return res
      .status(200)
      .json(
        { api: config.api, testimonial: updated, message: "Testimonial updated successfully." },
      );
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Testimonial name must be unique" });
    }
    return res
      .status(error.statusFromService || 500)
      .json({ message: error.msgFromService || "error while updating testimonial" });
  }
};

const deleteTestimonial = async (req, res) => {
  try {
    const deleted = await testimonialService.remove(req);
    return res
      .status(200)
      .json(
        { api: config.api, testimonial: deleted, message: "Testimonial deleted successfully" },
      );
  } catch (error) {
    return res
      .status(error.status || 500)
      .json({ message: "error while deleting testimonial" });
  }
};

const getAllRatings = async (req, res) =>{
  try {
    const result = await testimonialService.ratings(req);

    return res
      .status(200)
      .json({ api: config.api, result, message: "Testimonials Ratings fetched successfully." });
  } catch (error) {
    return res
      .status(error.statusFromService || 500)
      .json({ message: error.msgFromService || "server error while fetching all testimonial ratings." })

  }
}
// const reactToTestimonial = async (req, res) => {
//   try {
//     const action = await testimonialService.reaction(req);
//     return res
//       .status(200)
//       .json(
//         { api: config.api, testimonial: action, message: "reaction toggled successfully" },
//       );
//   } catch (error) {
//     return res
//       .status(error.status || 500)
//       .json({ message: "error while toggling reaction" });
//   }
// };

// const getAllReactions = async (req, res) => {
//   try {
//     const result = await testimonialService.getReactions(req);

//     return res
//       .status(200)
//       .json({ api: config.api, result, message: "Reactions fetched successfully." });
//   } catch (error) {
//     return res
//       .status(error.statusFromService || 500)
//       .json({ message: error.msgFromService || "server error while fetching all Reactions." })

//   }
// };

export {
  addTestimonial,
  getAllTestimonials,
  updateTestimonial,
  deleteTestimonial,
  // reactToTestimonial,
  // getAllReactions
  getAllRatings
};
