"use client";
import { useDispatch } from "react-redux";
// import { rateProduct } from "../../../redux/forStarReviews/starReviewActions";
import { useSelector } from "react-redux";
import { rateTheProduct } from "../apis/starRate.api";
import { useRouter } from "next/navigation";


const StarInput = ({ productId, currentRating }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const router = useRouter();

  const handleClick = async (value) => {
    //  dispatch(rateProduct({ productId, rating: value, userId: user?.data?.loggedInUser?._id }));
    const response = await rateTheProduct({ productId, rating: value, userId: user?.data?.loggedInUser?._id });
    if (response.success) {
      router.refresh(); // re-runs SSR on the page
    }
  };

  return (
    <div>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => handleClick(star)}
          style={{
            cursor: "pointer",
            // color: star <= currentRating ? "gold" : "#ccc",
            color: star <= currentRating ? "#8200db" : "#ccc",
            fontSize: "24px",
          }}
          className="hover:!text-primary"
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarInput;