import styles from "@/styles/Home.module.css";
import { useState, useMemo } from "react";

import { useQuery } from "react-query";
import axios from "axios";
import { Button, Card, Carousel } from "react-daisyui";
import RatingStar from "@/components/rating_star";
import ReviewCard from "@/components/review_card";
import RatingReviewSection from "@/components/rating_review";

const fetchBusinessById = async (id) => {
  const headers = {
    Authorization: `Bearer ${process.env.YELP_ACCESS_KEY}`,
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
              <RatingReviewSection
                name={detailData.name}
                rating={detailData.rating}
                review_count={reviewData.review_count}
                coordinates={detailData.coordinates}
                reviews={reviewData.reviews}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export const getServerSideProps = async (context) => {
  var id = context.params.id;

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
