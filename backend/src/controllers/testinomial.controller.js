import testinomialService from "../services/testinomial.service.js";
import config from "../configs/config.js";

const getAllTestinomials = async (req, res) => {
  try {
    const result = await testinomialService.all(req);

    return res
      .status(200)
      .json({ api: config.api, result, message: "Testinomials fetched successfully." });
  } catch (error) {
    return res
      .status(error.statusFromService || 500)
      .json({ message: error.msgFromService || "server error while fetching all testinomial." })

  }
};

const addTestinomial = async (req, res) => {
  try {
    const testinomialAdded = await testinomialService.add(req);

    return res.status(200).json(
      {
        api: config.api,
        testinomial: testinomialAdded,
        message: "testinomial added successfully"
      },
    );
  } catch (error) {
    return res
      .status(error.statusFromService || 500)
      .json({ message: error.msgFromService || "server error while adding testinomial." });
  }
};

const updateTestinomial = async (req, res) => {
  try {
    const updated = await testinomialService.update(req);
    return res
      .status(200)
      .json(
        { api: config.api, testinomial: updated, message: "Testinomial updated successfully." },
      );
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Testinomial name must be unique" });
    }
    return res
      .status(error.statusFromService || 500)
      .json({ message: error.msgFromService || "error while updating testinomial" });
  }
};

const deleteTestinomial = async (req, res) => {
  try {
    const deleted = await testinomialService.remove(req);
    return res
      .status(200)
      .json(
        { api: config.api, testinomial: deleted, message: "Testinomial deleted successfully" },
      );
  } catch (error) {
    return res
      .status(error.status || 500)
      .json({ message: "error while deleting testinomial" });
  }
};

// const reactToTestinomial = async (req, res) => {
//   try {
//     const action = await testinomialService.reaction(req);
//     return res
//       .status(200)
//       .json(
//         { api: config.api, testinomial: action, message: "reaction toggled successfully" },
//       );
//   } catch (error) {
//     return res
//       .status(error.status || 500)
//       .json({ message: "error while toggling reaction" });
//   }
// };

// const getAllReactions = async (req, res) => {
//   try {
//     const result = await testinomialService.getReactions(req);

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
  addTestinomial,
  getAllTestinomials,
  updateTestinomial,
  deleteTestinomial,
  // reactToTestinomial,
  // getAllReactions
};
