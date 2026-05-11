"use client"
import { fetchAllCategories } from "@/apis/category.api"
import { useEffect, useState } from "react"

const ByCategories = ({ setCategory, classes = '' }) => {
    const [categories, setCategories] = useState();

    const fetchCategories = async () => {
        const response = await fetchAllCategories();
        setCategories(response.categories)
    }

    useEffect(() => {
        fetchCategories()
    }, []);

    return (
        <>
            <select
                className={classes}
                name="category"
                id="category"
                onChange={(e) => setCategory(e.target.value)}>
                <option value="">Select Category</option>
                {categories?.map((category) => (
                    <option key={category._id} value={category._id}>{category.categoryName}</option>
                ))}
            </select>
        </>
    )
}

export default ByCategories