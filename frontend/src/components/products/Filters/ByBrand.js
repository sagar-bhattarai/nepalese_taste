"use client"

const ByBrand = ({ handleBrandChange }) => {
    return (
        <>
            <div className="flex items-center gap-1 ml-1">
                <input
                    name="apple"
                    id="apple"
                    type="checkbox"
                    className="border dark:accent-primary dark:text-gray-600 light:text-black dark:border-gray light:border-gray-300 rounded-md"
                    onChange={() => handleBrandChange("apple")} />
                <label className="text-xs text-gray-500" htmlFor="apple">Apple</label>
            </div>
            <div className="flex items-center gap-1 ml-1">
                <input
                    name="google"
                    id="google"
                    type="checkbox"
                    className="border dark:accent-primary dark:text-gray-600 light:text-black dark:border-gray light:border-gray-300 rounded-md"
                    onChange={() => handleBrandChange("google")} />
                <label className="text-xs text-gray-500" htmlFor="google">Google</label>
            </div>
            <div className="flex items-center gap-1 ml-1">
                <input
                    name="samsung"
                    id="samsung"
                    type="checkbox"
                    className="border dark:accent-primary dark:text-gray-600 light:text-black dark:border-gray light:border-gray-300 rounded-md"
                    onChange={() => handleBrandChange("samsung")} />
                <label className="text-xs text-gray-500" htmlFor="samsung">Samsung</label>
            </div>

        </>
    )
}

export default ByBrand