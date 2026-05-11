"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
// import { ChevronLeft, ChevronRight } from "lucide-react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";



export default function ProductCarousel({
    images = [],
    // autoPlay = true,
    autoPlayInterval = 3000,
}) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [zoomStyle, setZoomStyle] = useState({});
    const [isZoomed, setIsZoomed] = useState(false);
    const [autoPlay, setAutoPlay] = useState(true)
    const visibleThumbs = 3;
    const [thumbStart, setThumbStart] = useState(0);

    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

    // =========================
    // AUTOPLAY
    // =========================
    useEffect(() => {
        if (!autoPlay || images.length <= 1) return;

        if (autoPlay) {
            const interval = setInterval(() => {
                nextSlide();
            }, autoPlayInterval);

            return () => clearInterval(interval);
        }
    }, [currentIndex, autoPlay]);

    useEffect(() => {
        // AUTO MOVE THUMBNAILS WITH MAIN IMAGE
        if (currentIndex >= thumbStart + visibleThumbs) {
            setThumbStart(currentIndex - visibleThumbs + 1);
        }

        if (currentIndex < thumbStart) {
            setThumbStart(currentIndex);
        }
    }, [currentIndex]);
    
    // =========================
    // NEXT / PREV
    // =========================
    const nextSlide = () => {
        setCurrentIndex((prev) =>
            prev === images.length - 1 ? 0 : prev + 1
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prev) =>
            prev === 0 ? images.length - 1 : prev - 1
        );
    };

    // =========================
    // THUMBNAIL NAVIGATION
    // =========================
    const nextThumbs = () => {
        if (thumbStart + visibleThumbs < images.length) {
            const newIndex = thumbStart + 1;
            setThumbStart(newIndex);
            setCurrentIndex(newIndex);
        }
    };

    const prevThumbs = () => {
        if (thumbStart > 0) {
            const newIndex = thumbStart - 1;
            setThumbStart(newIndex);
            setCurrentIndex(newIndex);
        }
    };

    const visibleImages = images.slice(
        thumbStart,
        thumbStart + visibleThumbs
    );


    // =========================
    // SWIPE SUPPORT
    // =========================
    const handleTouchStart = (e) => {
        touchStartX.current = e.changedTouches[0].screenX;
    };

    const handleTouchEnd = (e) => {
        touchEndX.current = e.changedTouches[0].screenX;
        handleSwipe();
    };

    const handleSwipe = () => {
        const distance = touchStartX.current - touchEndX.current;

        if (distance > 50) {
            nextSlide();
        }

        if (distance < -50) {
            prevSlide();
        }
    };

    // =========================
    // ZOOM EFFECT
    // =========================
    const handleMouseMove = (e) => {
        setAutoPlay(false)
        const { left, top, width, height } =
            e.currentTarget.getBoundingClientRect();

        const x = ((e.pageX - left) / width) * 100;
        const y = ((e.pageY - top) / height) * 100;

        setZoomStyle({
            transformOrigin: `${x}% ${y}%`,
            transform: "scale(2)",
        });
    };

    const handleMouseLeave = () => {
        setIsZoomed(false);

        setZoomStyle({
            transform: "scale(1)",
        });
        setAutoPlay(true)
    };

    return (
        <div className="container flex flex-col-reverse md:flex-row  gap-4 w-full">
            {/* ========================= */}
            {/* THUMBNAILS */}
            {/* ========================= */}
            <div className="thumbnails flex md:flex-col items-center justify-center gap-3 overflow-x-auto md:overflow-visible scrollbar-hide">
                {/* TOP / LEFT ARROW */}
                {images.length > visibleThumbs && (
                    <button
                        onClick={prevThumbs}
                        disabled={thumbStart === 0}
                        className="p-1 w-max h-max rounded-full border bg-transparent text-primary hover:bg-gray-100/20 cursor-pointer shadow disabled:opacity-40"
                    >
                        <div className="hidden md:block">
                            <IoIosArrowUp size={18} />
                        </div>

                        <div className="block md:hidden">
                            <MdChevronLeft size={18} />
                        </div>
                    </button>
                )}

                {/* THUMBNAIL LIST */}
                <div className="flex md:flex-col gap-3 overflow-hidden">
                    {visibleImages.map((img, index) => {
                        const actualIndex = thumbStart + index;

                        return (
                            <button
                                key={actualIndex}
                                onClick={() =>
                                    setCurrentIndex(actualIndex)
                                }
                                className={`relative min-w-[70px] w-[70px] h-[70px] rounded-xl overflow-hidden border-2 transition-all duration-300 ${currentIndex === actualIndex
                                    ? "border-primary scale-105"
                                    : "border-slate-600 opacity-70"
                                    }`}
                            >
                                <Image
                                    src={img}
                                    alt={`thumb-${actualIndex}`}
                                    // fill
                                    height={70}
                                    width={70}
                                    className="object-cover cursor-pointer"
                                />
                            </button>
                        );
                    })}
                </div>

                {/* BOTTOM / RIGHT ARROW */}
                {images.length > visibleThumbs && (
                    <button
                        onClick={nextThumbs}
                        disabled={
                            thumbStart + visibleThumbs >=
                            images.length
                        }
                        className="p-1 w-max h-max rounded-full border bg-transparent text-primary hover:bg-gray-100/20 cursor-pointer shadow disabled:opacity-40"
                    >
                        <div className="hidden md:block">
                            <IoIosArrowDown size={18} />
                        </div>

                        <div className="block md:hidden ">
                            <MdChevronRight size={18} />
                        </div>
                    </button>
                )}
            </div>

            {/* ========================= */}
            {/* MAIN IMAGE */}
            {/* ========================= */}
            <div
                className="main-image relative flex-1 overflow-hidden rounded-2xl border border-slate-600 bg-transparent group"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                {/* IMAGE */}
                <div
                    className="relative w-full h-full overflow-hidden cursor-grab"
                    onMouseMove={(e) => {
                        setIsZoomed(true);
                        handleMouseMove(e);
                    }}
                    onMouseLeave={handleMouseLeave}
                >
                    <Image
                        key={images[currentIndex]}
                        src={images[currentIndex]}
                        alt="product-image"
                        height={300}
                        width={300}
                        // fill
                        priority
                        className={`cursor-grab object-cover transition-all duration-500 ease-in-out ${isZoomed ? "" : "scale-100"
                            }`}
                        style={zoomStyle}
                    />
                </div>


                {/* ========================= */}
                {/* LEFT ARROW */}
                {/* ========================= */}
                {images.length > 1 && (
                    <>
                        <button
                            onClick={prevSlide}
                            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-white/80 backdrop-blur-sm shadow-md rounded-full p-2 opacity-0 group-hover:opacity-100 transition"
                        >
                            <MdChevronLeft size={22} />
                        </button>

                        {/* RIGHT ARROW */}
                        <button
                            onClick={nextSlide}
                            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-white/80 backdrop-blur-sm shadow-md rounded-full p-2 opacity-0 group-hover:opacity-100 transition"
                        >
                            <MdChevronRight size={22} />
                        </button>
                    </>
                )}

                {/* ========================= */}
                {/* FADE OVERLAY */}
                {/* ========================= */}
                <div className="absolute inset-0 pointer-events-none bg-black/0 transition-opacity duration-500" />
            </div>
        </div>
    );
}