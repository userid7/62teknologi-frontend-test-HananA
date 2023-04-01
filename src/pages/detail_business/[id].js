import styles from "@/styles/Home.module.css";
import { useState, useMemo } from "react";

import { useQuery } from "react-query";
import axios from "axios";
import { Button, Card, Carousel } from "react-daisyui";
import RatingStar from "@/components/rating_star";
import ReviewCard from "@/components/review_card";

const fetchBusinessById = async (id) => {
  const headers = {
    Authorization:
      "Bearer Ubf1-f0uqsJUnssqPMGo-tiFeZTT85oFmKfznlPmjDtX8s83jYMoAb-ApuD63wgq6LDZNsUXG6gurZIVYaj2jzxJmmLdCdXbDqIHU_b6KiCEVi8v-YB0OSsW6MWaY3Yx",
    Accept: "application/json",
    // "Access-Control-Allow-Origin": "*",
    // "Content-Type": "application/json",
  };
  try {
    const res = await axios.get(`https://api.yelp.com/v3/businesses/${id}`, {
      headers: headers,
      withCredentials: false,
      // credentials: "same-origin",
    });
    return res.data;
  } catch (err) {
    console.log(err.response.data.error);
    return;
  }
};

// H4jJ7XB3CetIr1pg56CczQ

const fetchReviewsById = async (id) => {
  const headers = {
    Authorization:
      "Bearer Ubf1-f0uqsJUnssqPMGo-tiFeZTT85oFmKfznlPmjDtX8s83jYMoAb-ApuD63wgq6LDZNsUXG6gurZIVYaj2jzxJmmLdCdXbDqIHU_b6KiCEVi8v-YB0OSsW6MWaY3Yx",
    Accept: "application/json",
    // "Access-Control-Allow-Origin": "*",
    // "Content-Type": "application/json",
  };
  try {
    const res = await axios.get(
      `https://api.yelp.com/v3/businesses/${id}/reviews?limit=10&sort_by=yelp_sort`,
      {
        headers: headers,
        withCredentials: false,
        // credentials: "same-origin",
      },
    );
    return res.data;
  } catch (err) {
    console.log(err.response.data.error);
    return;
  }
};

export default function ListBusiness({ detailData, reviewData }) {
  return (
    <>
      <div>
        <main className="flex">
          <div className="pt-15 m-auto mt-12 w-5/6 max-w-[1000px] bg-white">
            <div className="m-7 flex flex-col gap-10 xl:flex-row">
              <div className="flex w-full flex-col xl:w-[400px]">
                <Carousel
                  display="numbered"
                  className="rounded-box aspect-[4/4] "
                >
                  <Carousel.Item
                    src="https://s3-media3.fl.yelpcdn.com/bphoto/q48fU42NPeJoz_VMPjB05w/o.jpg"
                    alt="Car"
                  />
                  <Carousel.Item
                    src="https://s3-media3.fl.yelpcdn.com/bphoto/DH29qeTmPotJbCSzkjYJwg/o.jpg"
                    alt="Car"
                  />
                  <Carousel.Item
                    src="https://s3-media3.fl.yelpcdn.com/bphoto/hCp7TJqo1m_rGPkvso4dxw/o.jpg"
                    alt="Car"
                  />
                </Carousel>
              </div>
              <div className="flex-1 flex-col">
                <div className="pt-16 text-4xl font-black">
                  {detailData.name}
                </div>
                <div className="text-md py-5">
                  <RatingStar rating={detailData.rating} /> /{" "}
                  {detailData.review_count} reviews
                </div>
                <div>
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      window.location.href = `https://www.google.com/maps/@${detailData.coordinates.latitude},${detailData.coordinates.longitude},15z`;
                    }}
                  >
                    Find Me
                  </Button>
                </div>
                <div className="flex w-full flex-col items-center py-6">
                  {/* <Card className="h-24 min-h-full w-full bg-slate-100">
                    <div className="m-auto"></div>
                  </Card> */}
                  {reviewData.reviews.map((review, i) => (
                    <ReviewCard
                      name={review.user.name}
                      rating={review.rating}
                      text={review.text}
                      avatar={review.user.image_url}
                    />
                  ))}
                  {/* <ReviewCard
                    name={reviewData.name}
                    review={reviewData.review}
                  /> */}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export const getServerSideProps = async (context) => {
  var id = context.params.id;
  console.log(id);
  if (!id) {
    return {
      notFound: true,
    };
  }

  var res = await fetchBusinessById(id);

  if (!res) {
    return {
      notFound: true,
    };
  }

  console.log(res);

  var detailData = res;

  var res = await fetchReviewsById(id);

  if (!res) {
    return {
      notFound: true,
    };
  }

  console.log(res);

  var reviewData = res;

  if (detailData == undefined) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      detailData,
      reviewData,
    },
  };
};
