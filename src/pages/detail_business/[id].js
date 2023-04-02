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
        <main className="flex xl:h-screen">
          <div className="m-16 bg-white">
            <div className="flex flex-col gap-1 md:flex-row xl:max-h-full">
              <div className="md:w-min-[400px] m-6 flex flex-col md:w-1/2">
                <Carousel
                  display="numbered"
                  className="rounded-box aspect-[5/4] "
                >
                  {detailData.photos.map((photoUrl) => (
                    <Carousel.Item src={photoUrl} alt={detailData.name} />
                  ))}
                </Carousel>
              </div>
              <div className="max-h-full flex-1 flex-col overflow-y-auto">
                <div className="mx-4">
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
                        window.location.href = `https://www.google.com/maps/search/${detailData.name.replace(
                          / /g,
                          "+",
                        )}/@${detailData.coordinates.latitude},${
                          detailData.coordinates.longitude
                        },15z`;
                      }}
                    >
                      Find Me
                    </Button>
                  </div>
                  <div className="flex w-full flex-col items-center py-6">
                    {reviewData.reviews.map((review, i) => (
                      <ReviewCard
                        name={review.user.name}
                        rating={review.rating}
                        text={review.text}
                        avatar={review.user.image_url}
                      />
                    ))}
                  </div>
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
