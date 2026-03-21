import dashboardData from "../services/dashboard.service.js";
import config from "../configs/config.js";

const getDashboardData = async (req, res) => {
  try {
    const dashboardDataSummary = await dashboardData.summary();

    return res
      .status(200)
      .json({ api: config.api, summary: dashboardDataSummary, message: "dashboard datas fetched successfully." });


  } catch (error) {

    return res
      .status(error.statusFromService || 500)
      .json({ message: error.msgFromService || "server error while fetching all dashboard datas." })

  }
};


export { getDashboardData };
