import dashboardData from "../services/dashboard.service.js";
import config from "../configs/config.js";

const getCustomerDashboardData = async (req, res) => {
  try {
    const customerDashboardDataSummary = await dashboardData.customerSummary();

    return res
      .status(200)
      .json({ api: config.api, summary: customerDashboardDataSummary, message: " customer dashboard datas fetched successfully." });


  } catch (error) {

    return res
      .status(error.statusFromService || 500)
      .json({ message: error.msgFromService || "server error while fetching customers all dashboard datas." })

  }
};

const getAdminDashboardData = async (req, res) => {
  try {
    const adminDashboardDataSummary = await dashboardData.adminSummary();

    return res
      .status(200)
      .json({ api: config.api, summary: adminDashboardDataSummary, message: "admin dashboard datas fetched successfully." });


  } catch (error) {

    return res
      .status(error.statusFromService || 500)
      .json({ message: error.msgFromService || "server error while fetching admins all dashboard datas." })

  }
};


export { getCustomerDashboardData, getAdminDashboardData };
