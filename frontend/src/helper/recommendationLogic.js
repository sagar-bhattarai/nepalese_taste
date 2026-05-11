const recommendationLogic = (products) => {
    {/*
            1. Check max quantity product
            2. If tie → check category frequency
            3. If still tie →
            apply tie - breaker:
            - last item OR
                - price OR
                    - random OR
                        - user history(best)
        */}
    const data = {};

    // Step 1: Find max quantity product
    let maxItem = products[0];
    let allSameQuantity = true;

    for (let i = 1; i < products.length; i++) {
        if (products[i].quantity !== maxItem.quantity) {
            allSameQuantity = false;
        }

        if (products[i].quantity > maxItem.quantity) {
            maxItem = products[i];
        }
    }

    // Step 2: If NOT all same → return max quantity product
    if (!allSameQuantity) {
        data.productId = maxItem._id;
        data.reason = "max quantity";
    } else {
        // Step 3: Count category frequency
        const categoryCount = {};

        products.forEach(item => {
            categoryCount[item.catId] = (categoryCount[item.catId] || 0) + 1;
        });

        // Step 4: Find most frequent category
        let maxCategory = null;
        let maxCount = 0;
        let isCategoryTie = false;

        for (let catId in categoryCount) {
            if (categoryCount[catId] > maxCount) {
                maxCount = categoryCount[catId];
                maxCategory = catId;
                isCategoryTie = false;
            } else if (categoryCount[catId] === maxCount) {
                isCategoryTie = true;
            }
        }

        // Step 5: If no tie → use category
        if (!isCategoryTie) {
            data.catId = maxCategory;
            data.reason = "category frequency";
        } else {
            // Step 6: Fallback → last added item
            const lastItem = products[products.length - 1];

            data.productId = lastItem._id;
            data.catId = lastItem.catId;
            data.reason = "fallback → last added item";
        }
    }

    return data;
}

export default recommendationLogic 