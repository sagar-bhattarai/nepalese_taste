"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaTimes, FaSpinner } from "react-icons/fa";
import { addCategory, updateCategory } from "@/apis/category.api";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const CategoryForm = ({ category }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { register, handleSubmit, reset } = useForm();
  useEffect(() => {
    if (category?.categoryName) {
      reset({
        categoryName: category.categoryName || "",
        categoryDescription: category?.categoryDescription || "",
      });
    }
  }, [category, reset]);


  const submitForm = (data) => {
    setLoading(true);

    if (category) {
      updateCategory(category._id, data)
        .then((res) => {
          toast.success("Category updated successfully");
          router.back();
        })
        .catch((error) => {
          // toast.error(error.message);
          toast.error("could not update category");
        })
        .finally(() => setLoading(false));
    } else {
      addCategory(data)
        .then((res) => {
          toast.success("Category created successfully");
          router.back();
        })
        .catch((error) => {
          if (error.message == "Request failed with status code 401") {
            toast.error("please login");
          } else {
            // console.log("error", error);
            toast.error(error.message);
          }
        })
        .finally(() => setLoading(false));
    }
  };

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <div className="grid gap-4 sm:gap-6 min-w-[400px]">
        <div className="">
          <label
            htmlFor="categoryName"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Category Name *
          </label>
          <input
            type="text"
            id="categoryName"
            className="bg-[#07070729] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring focus:outline-none  dark:focus:ring-primary dark:focus:border-primary"
            placeholder="Type category name"
            required
            {...register("categoryName")}
          />
        </div>
        <div className="">
          <label
            htmlFor="categoryDescription"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Description
          </label>
          <textarea
            id="categoryDescription"
            rows="5"
            className="block p-2.5 w-full text-sm text-gray-900 bg-[#07070729] rounded-lg border border-gray-300 focus:ring-purple-600 focus:border-purple-600 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring focus:outline-none  dark:focus:ring-primary dark:focus:border-primary"
            placeholder="Your description here"
            {...register("categoryDescription")}
          ></textarea>
        </div>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="disabled:opacity-50 flex w-full items-center justify-center gap-2 cursor-pointer px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary rounded-lg focus:ring-2 focus:ring-primary dark:focus:ring-primary hover:bg-primary"
      >
        {loading ? (
          <>
            {" "}
            {category ? "Updating Category" : "Adding Category"}{" "}
            <FaSpinner className="animate-spin" />{" "}
          </>
        ) : (
          <> {category ? "Update Category" : "Add Category"}</>
        )}
      </button>
    </form>
  );
};

export default CategoryForm;
