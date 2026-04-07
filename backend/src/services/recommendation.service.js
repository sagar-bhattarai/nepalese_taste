
import UserModel from '../models/User.model.js';
import ProductModel from '../models/Product.model.js';

const trackView = async (req) => {
    const { productId } = req.body;

    await UserModel.findByIdAndUpdate(req.user.id, {
        $addToSet: { viewedProducts: productId }
    });

    await ProductModel.findByIdAndUpdate(productId, {
        $inc: { views: 1 }
    });

    return true;
};

export const recommendations = async (req) => {
    const productId = req.body.productId ;
    const category = req.body.category;

    const user = await UserModel.findById(req.user.userId).populate("viewedProducts orders.products");

    let recommended = [];

    // 1. Content-Based (similar products)
    if (productId) {
        const product = await ProductModel.findById(productId);

        const similar = await ProductModel.find({
            category: product.categoryId,
            _id: { $ne: productId }
        }).limit(10);

        recommended.push(...similar);
    }

    // 2. Behavior-Based (user history)
    if (user) {
        const categories = [
            ...new Set(
                user.viewedProducts.map(p => p.category)
            )
        ];

        const behaviorProducts = await ProductModel.find({
            category: { $in: categories }
        }).limit(10);

        recommended.push(...behaviorProducts);
    }

    // 3. Trending fallback
    if (recommended.length < 10) {
        const trending = await ProductModel.find()
            .sort({ sold: -1, views: -1 })
            .limit(10);

        recommended.push(...trending);
    }

    // Remove duplicates
    const unique = Array.from(
        new Map(recommended.map(p => [p._id.toString(), p])).values()
    );

    return unique.slice(0, 10);
};

export default { trackView, recommendations }