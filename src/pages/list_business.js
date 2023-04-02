import styles from "@/styles/Home.module.css";
import Link from "next/link";

import CustomTable from "../components/table.js";
import { useState, useMemo } from "react";

import { useQuery } from "react-query";
import axios from "axios";
import HeaderWithSearch from "@/components/header_search.js";
import RatingStar from "@/components/rating_star.js";
import CustomPagination from "@/components/pagination.js";
import CustomFilter from "@/components/filter.js";
import { useRouter } from "next/router.js";

const PAGE_SIZE = 50;

const fetchBusiness = async ({
  offset,
  limit,
  location,
  sort_by,
  price,
  open_now,
  term,
}) => {
  const headers = {
    Authorization:
      "Bearer Ubf1-f0uqsJUnssqPMGo-tiFeZTT85oFmKfznlPmjDtX8s83jYMoAb-ApuD63wgq6LDZNsUXG6gurZIVYaj2jzxJmmLdCdXbDqIHU_b6KiCEVi8v-YB0OSsW6MWaY3Yx",
    Accept: "application/json",
    // "Access-Control-Allow-Origin": "*",
    // "Content-Type": "application/json",
  };
  const params = {
    location: location,
    term: term,
    sort_by: sort_by,
    limit: limit,
    offset: offset,
    price: price,
    open_now: open_now,
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

const navToToNewRoute = ({ location, price, is_closed, term, page }) => {};

export default function ListBusiness({ filterParam, data, paginationData }) {
  var router = useRouter();

  const gotoPage = (page) => {
    const url = {
      pathname: "/list_business",
      query: {
        location: filterParam.location,
        term: filterParam.term,
        price: filterParam.price,
        open_now: filterParam.open_now,
      },
    };

    url.query.page = page;
    router.replace(url);
  };

  const columns = useMemo(
    () => [
      {
        Header: () => <HeaderWithSearch name="Name" />,
        accessor: "name",
        Cell: ({ cell: { row, value } }) => (
          <Link href={`/detail_business/${row.original.id}`}>{value}</Link>
        ),
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
        Header: "Phone",
        accessor: "display_phone",
      },
    ],
    [],
  );

  return (
    <>
      <div>
        <main className="flex">
          <div className="pt-15 m-auto mt-12 w-5/6 max-w-[700px] py-5">
            <CustomFilter
              location={filterParam.location}
              price={filterParam.price}
              term={filterParam.term}
              open_now={filterParam.open_now}
            />
            <CustomTable columns={columns} data={data} />;
            <CustomPagination
              page={paginationData.page}
              totalPage={paginationData.totalPage}
              gotoPage={gotoPage}
            />
          </div>
        </main>
      </div>
    </>
  );
}

export const getServerSideProps = async (context) => {
  var page = context.query.page || 1;
  var location = context.query.location || "NYC";
  var term = context.query.term || null;
  var price = context.query.price || null;
  var open_now = context.query.open_now != null ? context.query.open_now : null;

  var limit = PAGE_SIZE;
  var offset = (parseInt(page) - 1) * PAGE_SIZE;
  var sort_by = "best_match";

  var filterParam = {
    offset,
    limit,
    sort_by,
    location,
    term,
    price,
    open_now,
  };

  var res = await fetchBusiness(filterParam);

  if (!res) {
    return {
      notFound: true,
    };
  }

  var data = res.businesses;

  if (data == undefined) {
    return {
      notFound: true,
    };
  }

  res.total = res.total > 1000 ? 1000 : res.total;

  var remainder = res.total % PAGE_SIZE;

  var totalPage = Math.floor(res.total / PAGE_SIZE);

  if (remainder > 0) {
    totalPage = totalPage + 1;

    // // remove loop data from last page
    // if (page == totalPage) {
    //   data = data.slice(0, res.total % PAGE_SIZE);
    // }
  }

  var paginationData = { page, totalPage };

  return {
    props: {
      filterParam,
      data,
      paginationData,
    },
  };
};
