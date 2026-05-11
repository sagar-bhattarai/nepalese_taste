"use client"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTime } from "@/redux/commentTime/timeSlice";

const TimeUpdater = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    let timer;

    const schedule = () => {
      if (document.hidden) return; // pause if tab inactive

      const now = new Date();

      // wait until next minute (00 seconds)
      const delay =
        (60 - now.getSeconds()) * 1000 - now.getMilliseconds();

      timer = setTimeout(() => {
        dispatch(setTime());
        schedule(); // run again
      }, delay);
    };

    schedule();

    const handleVisibility = () => {
      if (!document.hidden) {
        dispatch(setTime()); // sync immediately
        schedule();
      } else {
        clearTimeout(timer);
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [dispatch]);

  return null;
};

export default TimeUpdater;