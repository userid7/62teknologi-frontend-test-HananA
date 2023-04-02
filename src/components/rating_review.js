import { Button } from "react-daisyui";
import RatingStar from "./rating_star";
import ReviewCard from "./review_card";

export default function RatingReviewSection({
  name,
  rating,
  review_count,
  coordinates,
  reviews,
}) {
  return (
    <div className="mx-4">
      <div className="pt-16 text-4xl font-black">{name}</div>
      <div className="text-md py-5">
        <RatingStar rating={rating} /> / {review_count} reviews
      </div>
      <div>
        <Button
          onClick={(e) => {
            e.preventDefault();
            window.open(
              (window.location.href = `https://www.google.com/maps/search/${name.replace(
                / /g,
                "+",
              )}/@${coordinates.latitude},${coordinates.longitude},15z`),
              "_blank",
            );
          }}
        >
          Find Me
        </Button>
      </div>
      <div className="flex w-full flex-col items-center py-6">
        {reviews.map((review, i) => (
          <ReviewCard
            name={review.user.name}
            rating={review.rating}
            text={review.text}
            avatar={review.user.image_url}
          />
        ))}
      </div>
    </div>
  );
}
