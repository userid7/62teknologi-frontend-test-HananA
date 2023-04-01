import { Avatar, Card } from "react-daisyui";
import RatingStar from "./rating_star";

export default function ReviewCard({ name, avatar, rating, text }) {
  console.log(avatar);
  return (
    <Card className=" my-1 w-full bg-slate-100">
      <div className="flex flex-row gap-3 p-3">
        <div className="m-auto">
          <Avatar letters="Y" shape="circle" size="sm" src={avatar}></Avatar>
        </div>
        <div className="flex flex-col">
          <div className="text-sm">
            {name} | <RatingStar rating={rating} />
          </div>
          <div className="text-xs">{text}</div>
        </div>
      </div>
    </Card>
  );
}
