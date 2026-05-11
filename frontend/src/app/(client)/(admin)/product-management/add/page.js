"use client"
import Form from "@/components/admin/products/Form";
import { fetchAllCategories } from "@/apis/category.api";
import { useState, useEffect } from "react";

const addProductPage = async () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await fetchAllCategories();
        setCategories(res);
      } catch (err) {
        console.log(err);
      }
    };
    fetch();
  }, []);

  return (
    <section className="w-max mx-auto">
      <div className="py-2 px-4 mx-auto max-w-2xl lg:py-4">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Add a new product</h2>
        <Form categories={categories.categories} />
      </div>
    </section>
  )
}

export default addProductPage