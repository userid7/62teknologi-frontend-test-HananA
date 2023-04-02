import { Rating } from "react-daisyui";

export default function RatingStar({ rating, setRating }) {
  return (
    <Rating
      value={parseInt(rating) * 2}
      onChange={setRating}
      size="xs"
      half={true}
    >
      <Rating.Item name="rating-1" className="mask mask-half-1 mask-star" />
      <Rating.Item name="rating-1" className="mask mask-half-2 mask-star" />
      <Rating.Item name="rating-1" className="mask mask-half-1 mask-star" />
      <Rating.Item name="rating-1" className="mask mask-half-2 mask-star" />

      <Rating.Item name="rating-1" className="mask mask-half-1 mask-star" />
      <Rating.Item name="rating-1" className="mask mask-half-2 mask-star" />

      <Rating.Item name="rating-1" className="mask mask-half-1 mask-star" />
      <Rating.Item name="rating-1" className="mask mask-half-2 mask-star" />

      <Rating.Item name="rating-1" className="mask mask-half-1 mask-star" />
      <Rating.Item name="rating-1" className="mask mask-half-2 mask-star" />
    </Rating>
  );
}
