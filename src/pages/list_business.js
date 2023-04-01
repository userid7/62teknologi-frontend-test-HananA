import styles from "@/styles/Home.module.css";
import CustomTable from "../components/table.js";
import { useState, useMemo } from "react";

import { useQuery } from "react-query";
import axios from "axios";
import HeaderWithSearch from "@/components/header_search.js";
import RatingStar from "@/components/rating_star.js";

const fetchBusiness = async ({ offset, limit, location, is_closed }) => {
  const headers = {
    Authorization:
      "Bearer Ubf1-f0uqsJUnssqPMGo-tiFeZTT85oFmKfznlPmjDtX8s83jYMoAb-ApuD63wgq6LDZNsUXG6gurZIVYaj2jzxJmmLdCdXbDqIHU_b6KiCEVi8v-YB0OSsW6MWaY3Yx",
    Accept: "application/json",
    // "Access-Control-Allow-Origin": "*",
    // "Content-Type": "application/json",
  };
  const params = {
    location: location,
    sort_by: "best_match",
    limit: offset,
  };
  try {
    const res = await axios.get("https://api.yelp.com/v3/businesses/search", {
      headers: headers,
      params: params,
      withCredentials: false,
      // credentials: "same-origin",
    });
    return res.data;
  } catch (err) {
    console.log(err.response.data.error);
    return;
  }
};

export default function ListBusiness({ data }) {
  // console.log(data);
  // const { data, status } = useQuery("business", fetchBusiness);
  const columns = useMemo(
    () => [
      {
        Header: () => <HeaderWithSearch name="Headers" />,
        accessor: "name",
      },
      {
        Header: "Rating",
        accessor: "rating",
        Cell: ({ cell: { value } }) => <RatingStar rating={value} />,
      },
      {
        Header: "Price",
        accessor: "price",
      },
      {
        Header: "Status",
        accessor: "is_closed",
        Cell: ({ cell: { value } }) => {
          return value ? "Close" : "Open";
        },
      },
    ],
    [],
  );

  return (
    <>
      <div>
        <main className="flex">
          <div className="pt-15 m-auto mt-12 w-5/6 max-w-[700px]">
            <CustomTable columns={columns} data={data} />;
          </div>
        </main>
      </div>
    </>
  );
}

export const getServerSideProps = async (context) => {
  var res = await fetchBusiness();

  if (!res) {
    return {
      notFound: true,
    };
  }

  var data = res.businesses;
  // console.log(data);

  if (data == undefined) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data,
    },
  };
};
