"use client";
import { useCallback, useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { FaTimes, FaSpinner } from "react-icons/fa";
import { addTestimonial, updateTestimonial } from "@/apis/testimonial.api";
import { toast } from "react-toastify";
import StarInput from "./StarInput";
import { useRouter } from "next/navigation";


const TestimonialForm = ({ testimonial = "", toggleReviewForm, edit = false }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // const { register, handleSubmit, reset } = useForm();
  const { register, handleSubmit, control, reset } = useForm({
    defaultValues: {
      testimonialRating: 0,
      testimonialTitle:"",
      testimonialDescription: "",
    },
  });

  useEffect(() => {
    if (testimonial) {
      reset({
        testimonialRating: testimonial?.testimonialRating || "",
        testimonialTitle: testimonial?.testimonialTitle || "",
        testimonialDescription: testimonial?.testimonialDescription || "",
      });
    }
  }, [testimonial, reset]);


  const submitForm = (data) => {
    if(data.testimonialTitle  == "" || data.testimonialDescription  == "" || data.testimonialRating  == 0){
      toast.error("All Fields Are Required.");
      return false;
    }

    setLoading(true);
    const updateData = {...data, reviewId:testimonial._id}

    if (testimonial) {
      updateTestimonial(testimonial?._id, updateData)
        .then((res) => {
          toast.success("Testimonial updated successfully");
          toggleReviewForm()
          router.refresh();
        })
        .catch((error) => {
          toast.error("could not update testimonial");
        })
        .finally(() => setLoading(false));
    } else {
      addTestimonial(data)
        .then((res) => {
          toast.success("Testimonial created successfully");
          toggleReviewForm()
          router.refresh();
        })
        .catch((error) => {
          if (error.message == "Request failed with status code 401") {
            toast.error("please login");
          } else {
            toast.error(error.message);
          }
        })
        .finally(() => setLoading(false));
    }
  };

  return (
    <form className="px-8" onSubmit={handleSubmit(submitForm)}>
      <div className="grid gap-2 min-w-[400px]">
        {/* ⭐ Rating */}
        <div>
          <label className="block font-medium text-gray-900 dark:text-slate-600">
            Add Your Ratings <span className="text-red-600">*</span>
          </label>

          <Controller
            name="testimonialRating"
            control={control}
            rules={{
              required: "Rating is required",
            }}
            render={({ field }) => (
              <StarInput
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </div>

        <div className="">
          <label
            htmlFor="testimonialTitle"
            className="block my-2 text-sm font-medium text-gray-900 dark:text-slate-600"
          >
            Review Title <span className="text-red-600">*</span>
          </label>
          <input
            id="testimonialTitle"
            className="block p-2.5 w-full text-sm text-gray-900 bg-[#07070729] rounded-lg border border-gray-300 focus:ring-purple-600 focus:border-purple-600 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring focus:outline-none  dark:focus:ring-primary dark:focus:border-primary"
            placeholder="Title Here"
            {...register("testimonialTitle")}
          />
        </div>
      

        <div className="">
          <label
            htmlFor="testimonialDescription"
            className="block my-2 text-sm font-medium text-gray-900 dark:text-slate-600"
          >
            Description <span className="text-red-600">*</span>
          </label>
          <textarea
            id="testimonialDescription"
            rows="5"
            className="block p-2.5 w-full text-sm text-gray-900 bg-[#07070729] rounded-lg border border-gray-300 focus:ring-purple-600 focus:border-purple-600 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring focus:outline-none  dark:focus:ring-primary dark:focus:border-primary"
            placeholder="Your Review here"
            {...register("testimonialDescription")}
          ></textarea>
        </div>
      </div>

      <div className="flex justify-between gap-2 items-center">
        <button
          type="submit"
          disabled={loading}
          className="disabled:opacity-50 flex w-full items-center justify-center gap-2 cursor-pointer px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary rounded-lg focus:ring-2 focus:ring-primary dark:focus:ring-primary hover:bg-primary"
        >
          {loading ? (
            <>
              {" "}
              {edit ? "Updating Reviews" : "Submit Reviews"}{" "}
              <FaSpinner className="animate-spin" />{" "}
            </>
          ) : (
            <> {edit ? "Update Review" : "Add Review"}</>
          )}
        </button>
        <button
          onClick={toggleReviewForm}
          className="flex w-max items-center justify-center gap-2 cursor-pointer px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-black light:hover:text-white dark:text-white  border border-primary rounded-lg hover:bg-primary">
          cancel
        </button>
      </div>
    </form>
  );
};

export default TestimonialForm;
