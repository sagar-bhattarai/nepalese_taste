"use client"
import { useEffect, useState } from "react"
import { fetchAllTestimonials, fetchAllRatings, deleteTestimonial } from "@/apis/testimonial.api"
import TestimonialForm from "@/components/testimonial/TestimonialForm";
import StarDisplay from "@/components/testimonial/StarDisplay";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FaStar } from "react-icons/fa";
import Image from "next/image";
import userPlaceholder from "../../../../public/user_placeholder.png"
import dateUtility from "../../../helper/dateUtility.js";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import checkTimePassed from "@/helper/checkTimePassed";
import Pagination from "@/components/Pagination";

const testimonialsPage = () => {
    const [testimonials, settestimonials] = useState();
    const [ratings, setRatings] = useState();
    const [reviewForm, setReviewForm] = useState(false);
    const [editReview, setEditReview] = useState(null);
    const [refresh, setRefresh] = useState(false);
    const user = useSelector((state) => state.auth?.user?.userData);

    const limit = 10;
    const [page, setPage] = useState(1);
    const [sort, setSort] = useState("latest");
    const [size, setSize] = useState(limit);

    const allTestimonials = async () => {
        const response = await fetchAllTestimonials({ page, sort, size });
        settestimonials(response)
    }

    const allRatings = async () => {
        const response = await fetchAllRatings();
        setRatings(response);
    }

    useEffect(() => {
        allTestimonials()
        allRatings()
    }, [])

    useEffect(() => {
        allTestimonials()
    }, [page])


    useEffect(() => {
        if (refresh) {
            allTestimonials()
            allRatings()
            setRefresh(false)
        }
    }, [refresh])

    const writeReviewHandler = () => {
        (user)
            ? setReviewForm(true)
            : toast.info("please login first")
    }

    const toggleReviewForm = () => {
        setReviewForm(false)
        setRefresh(true)
        setEditReview(null)
    }

    const editHandle = (item) => {
        setEditReview(item);
        setReviewForm(true);
        window.scrollTo({ left: 0, top: 0, behavior: 'smooth' })
    }

    const deleteHandler = async (id) => {
        const deleted = await deleteTestimonial(id);
        if (deleted) {
            setRefresh(true)
            toast.success(deleted)
        }
    }

    return (
        <>
            <section className="pb-12 relative">
                <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
                    <div className="w-full">
                        <h2 className="font-manrope font-bold text-4xl text-primary py-8 text-center">Our customer reviews
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-11 pb-6 border-b border-slate-600 max-xl:max-w-2xl max-xl:mx-auto">

                            <div className="box  px-12 flex flex-col gap-y-4 w-full ">

                                <div className="ratingsBox px-12 flex flex-col gap-y-4 w-full">
                                    {ratings?.ratingStats?.map((item) => (
                                        <div
                                            key={item.star}
                                            className="flex items-center w-full"
                                        >
                                            <p className="font-medium text-lg text-slate-600 mr-1">
                                                {item.star}
                                            </p>
                                            <FaStar className="text-primary h-5 w-5 ml-2" />

                                            <div className="h-2 w-full rounded-3xl bg-slate-600 ml-3 mr-3 overflow-hidden">
                                                <span
                                                    className="h-full rounded-3xl bg-primary flex"
                                                    style={{
                                                        width: `${Number(item.percentage)}%`,
                                                    }}
                                                />
                                            </div>

                                            <p className="font-medium text-lg text-slate-600">
                                                {item.count}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>


                            {(reviewForm && user)
                                ?
                                editReview
                                    ? <TestimonialForm testimonial={editReview} toggleReviewForm={toggleReviewForm} edit={true} />
                                    : <TestimonialForm toggleReviewForm={toggleReviewForm} />
                                :
                                <div className="px-12 pb-8 bg-transparent rounded-3xl flex items-center justify-center flex-col">
                                    <h2 className="font-manrope font-bold text-5xl text-amber-400 ">
                                        {ratings?.averageRating} </h2>
                                    {/* ⭐ Average rating */}
                                    <StarDisplay rating={ratings?.averageRating} />

                                    <p className="font-medium text-xl leading-8 text-slate-400 text-center">{ratings?.totalReviews} Ratings</p>

                                    <button
                                        onClick={writeReviewHandler}
                                        className='w-3/4 text-primary mt-4 cursor-pointer hover:transition-all hover:duration-300 hover:ease-in-out hover:animate-pulse text-xl hover:bg-primary hover:text-white border border-primary rounded-full py-3 mt-2'>
                                        write a review
                                    </button>
                                </div>}

                        </div>
                        {
                            testimonials?.testimonials?.map((item) => (
                                <div key={item._id} id={item._id} className="relative py-6 px-6 border-b border-slate-600 max-xl:max-w-2xl max-xl:mx-auto">

                                    {item?._id == editReview?._id
                                        &&
                                        <div className="z-10 absolute top-0 left-0 h-full w-full bg-[#000000b3]"></div>
                                    }

                                    <div className="flex justify-between">
                                        <StarDisplay size="32px" rating={item.testimonialRating} />
                                        {(item?.customer?._id == user?._id && !checkTimePassed(item?.createdAt, 30))
                                            &&
                                            <div className="flex justify-between w-max gap-2">
                                                <button
                                                    className="flex items-center gap-2 cursor-pointer text-green-500 hover:text-green-700 dark:text-green-300 dark:hover:text-green-600"
                                                    onClick={() => { editHandle(item) }}>
                                                    <FaPencilAlt />
                                                    Edit
                                                </button>
                                                <button
                                                    className="flex items-center gap-2 cursor-pointer text-red-500 hover:text-red-800  dark:text-red-300 dark:hover:text-red-600 "
                                                    onClick={() => deleteHandler(item._id)}
                                                >
                                                    <FaTrash />
                                                    Delete
                                                </button>
                                            </div>
                                        }
                                    </div>

                                    <h3 className="font-manrope font-semibold text-xl sm:text-2xl leading-9 text-slate-600 mb-6">
                                        {item.testimonialTitle || "N/A"}
                                    </h3>
                                    <div className="flex items-center justify-between gap-5 mb-4">
                                        <div className="flex items-center gap-3">
                                            <Image
                                                src={item?.customer?.profileImage || userPlaceholder || null}
                                                alt="John image"
                                                className="w-8 h-8 rounded-full object-cover"
                                                height={50}
                                                width={50} />
                                            <h6 className="font-semibold text-lg leading-8 text-indigo-600 ">{item.customer.userName || "N/A"}</h6>
                                        </div>
                                        <p className="font-normal text-lg leading-8 text-gray-400">{dateUtility(item.createdAt)}</p>
                                    </div>
                                    <p className="font-normal text-lg leading-8 text-gray-400 max-xl:text-justify">
                                        {item.testimonialDescription}
                                    </p>
                                </div>
                            ))
                        }
                        <Pagination page={page} setPage={setPage} overAllTotal={testimonials?.total} LIMIT={limit} />
                    </div>

                </div>
            </section>

        </>
    )
}

export default testimonialsPage