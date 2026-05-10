"use client";
import { useCallback, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaTimes, FaSpinner } from "react-icons/fa";
import { addCategory, updateCategory } from "@/apis/category.api";
import { toast } from "react-toastify";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDropzone } from "react-dropzone";

const CategoryForm = ({ category }) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { register, handleSubmit, reset } = useForm();
  useEffect(() => {
    if (category?.categoryName) {
      reset({
        categoryName: category.categoryName || "",
        categoryDescription: category?.categoryDescription || "",
      });

      // Set existing image into state
      if (category?.categoryImage) {
        setSelectedImages([
          {
            url: category.categoryImage[0],
            name: category.categoryName,
            isExisting: true, // optional flag
          },
        ]);
      }
    }
  }, [category, reset]);

  const onDrop = useCallback((acceptedFiles) => {
    const images = acceptedFiles.map((file) => ({
      file, // keep original File
      // ...file,
      url: URL.createObjectURL(file),
      name: file.name,
      size: file.size,
    }));
    setSelectedImages((prev) => [...prev, ...images]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, multiple: true });
  const removeImage = (index) => {
    setSelectedImages((prev) => prev.filter((_, i) => i != index));
  };

  const submitForm = (data) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("categoryName", data.categoryName);
    formData.append("categoryDescription", data.categoryDescription);

    if (selectedImages.length > 0) {
      selectedImages.forEach((image) => {
        formData.append("categoryImage", image.file);
      });
    }

    if (category) {
      updateCategory(category._id, formData)
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
      addCategory(formData)
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

  useEffect(() => {
    return () => {
      selectedImages.forEach((img) => URL.revokeObjectURL(img.url));
    };
  }, []);

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

      <div className="sm:col-span-2 mt-4 sm:mt-6">
        <div
          {...getRootProps()}
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-28 bg-[#07070729] dark:bg-gray-700 border border-dashed border-default-strong  dark:border-none border-gray-300 focus:ring-purple-600 focus:border-purple-600 rounded-lg cursor-pointer"
        >
          <div className="flex flex-col items-center justify-center text-body pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h3a3 3 0 0 0 0-6h-.025a5.56 5.56 0 0 0 .025-.5A5.5 5.5 0 0 0 7.207 9.021C7.137 9.017 7.071 9 7 9a4 4 0 1 0 0 8h2.167M12 19v-9m0 0-2 2m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm">
              <span className="font-semibold">Click to upload</span> or drag
              and drop
            </p>
            <p className="text-xs">.png, .jpg, .jpeg (MAX. 5MB)</p>
          </div>
          <input
            {...getInputProps({
              accept: ".png,.jpg,.jpeg",
            })}
          />
        </div>
        {selectedImages.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2 p-2 border rounded-lg border-gray-300 bg-[#07070729] dark:bg-gray-700 dark:border-gray-600 min-h-28">
            {selectedImages.map((image, index) => (
              <div className="p-1 relative max-w-20" key={index}>
                <Image
                  src={image?.url}
                  alt={image.name}
                  height={70}
                  width={70}
                  className="border border-gray-600 rounded-lg h-16 object-cover"
                />
                <p className="text-xs mt-1">{image.name}</p>
                <button
                  onClick={() => removeImage(index)}
                  className="flex items-center justify-center hover:text-white dark:hover:text-black bg-red-600 hover:bg-red-700 absolute right-0 top-0 text-xs h-4 w-4 border border-red-600 rounded-full cursor-pointer"
                >
                  <FaTimes />
                </button>
              </div>
            ))}
          </div>
        )}
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
