import { v2 as cloudinary } from "cloudinary";
import config from "../../src/configs/config.js";

cloudinary.config({
  cloud_name: config.cloudinary.cloud_name,
  api_key: config.cloudinary.api_key,
  api_secret: config.cloudinary.api_secret,
});

// const fetchResourcesByType = async (resourceType) => {
//   let resources = [];
//   let nextCursor = null;

//   do {
//     const result = await cloudinary.api.resources({
//       resource_type: resourceType,
//       max_results: 100,
//       next_cursor: nextCursor,
//     });

//     resources = [...resources, ...result.resources];
//     nextCursor = result.next_cursor;

//   } while (nextCursor);

//   return resources;
// };

// const all = async (req, res) => {
//     const images = await fetchResourcesByType("image");
//     const videos = await fetchResourcesByType("video");
//     const raws = await fetchResourcesByType("raw"); // optional

//     const allResources = [...images, ...videos, ...raws];

//     return {
//       total: allResources.length,
//       data: allResources,
//     };
// };



const all = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = 10;

  const search = req.query.search || "";

  const result = await cloudinary.search
    .expression(
      search
        ? `public_id:*${search}* OR tags:${search} OR display_name:${search}`
        : "resource_type:image OR resource_type:video"
    )
    .sort_by("created_at", "desc")
    .max_results(page * limit)
    .execute();

  const start = (page - 1) * limit;
  const end = start + limit;

  const paginatedData = result.resources.slice(start, end);

  return {
    success: true,
    data: paginatedData,
    page,
    total: result.total_count,
  };
};


const deleteOne = async (req, res) => {
    const { public_id, resource_type } = req.body;
    const result = await cloudinary.uploader.destroy(req.params.id, {
      resource_type: resource_type || "image",
    });

    return {
      success: true,
      result,
    };

};

export default { all, deleteOne };