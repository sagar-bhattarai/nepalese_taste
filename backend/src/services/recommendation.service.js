
import UserModel from '../models/User.model.js';
import ProductModel from '../models/Product.model.js';

const trackView = async (req) => {
    const { productId } = req.body;

    await UserModel.findByIdAndUpdate(req.user.userId, {
        $addToSet: { viewedProducts: productId }
    });

    await ProductModel.findByIdAndUpdate(productId, {
        $inc: { views: 1 }
    });

    return true;
};

export const recommendations = async (req) => {
    try {
        const { productId, catId } = req.body;

        const user = await UserModel.findById(req.user.userId)
            .populate("viewedProducts")
            .populate("orders.products");

        let recommended = [];

        // 1️⃣ Content-Based (HIGH PRIORITY)
        if (productId) {
            const product = await ProductModel.findById(productId);

            if (product) {
                const similar = await ProductModel.find({
                    categoryId: product.categoryId, // ✅ FIXED
                    _id: { $ne: productId }
                }).limit(10);

                recommended.push(...similar);
            }
        }

        // 2️⃣ Category-Based (if fallback triggered OR extra boost)
        if (catId) {
            const categoryProducts = await ProductModel.find({
                categoryId: catId
            }).limit(10);

            recommended.push(...categoryProducts);
        }

        // 3️⃣ Behavior-Based (MEDIUM PRIORITY)
        if (user && user.viewedProducts.length > 0) {
            const categories = [
                ...new Set(
                    user.viewedProducts.map(p => p.categoryId) // ✅ FIXED
                )
            ];

            const behaviorProducts = await ProductModel.find({
                categoryId: { $in: categories }
            }).limit(10);

            recommended.push(...behaviorProducts);
        }

        // 4️⃣ Trending fallback (LOW PRIORITY)
        if (recommended.length < 10) {
            const trending = await ProductModel.find()
                .sort({ sold: -1, views: -1 })
                .limit(10);

            recommended.push(...trending);
        }

        // 5️⃣ Remove duplicates
        const unique = Array.from(
            new Map(recommended.map(p => [p._id.toString(), p])).values()
        );

        return unique.slice(0, 10);

    } catch (error) {
        console.error("Recommendation Error:", error);
        throw error;
    }
};

export default { trackView, recommendations }