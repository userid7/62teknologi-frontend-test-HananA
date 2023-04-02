import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import {
  Table,
  Pagination,
  Button,
  Input,
  InputGroup,
  ButtonGroup,
  Card,
  Toggle,
  Dropdown,
  Collapse,
} from "react-daisyui";

export default function CustomFilter({ location, price, open_now, term }) {
  const router = useRouter();

  useEffect(() => {}, [router.query]);

  const [termState, setTerm] = useState(term);
  const [locState, setLocation] = useState(location);

  const priceString = () => {
    switch (price) {
      case "1":
        return "low";
      case "2":
        return "low-mid";
      case "3":
        return "mid-high";
      case "4":
        return "high";

      default:
        return "all";
    }
  };

  const open_nowString = () => {
    switch (open_now) {
      case "true":
        return "Open";
      case "false":
        return "Close";

      default:
        return "all";
    }
  };

  const url = {
    pathname: "/list_business",
    query: { location, price, open_now, term },
  };

  const handleLocationKeyPress = (e) => {
    if (e.key === "Enter") {
      url.query.location = locState;
      router.replace(url);
      //   router.replace(url).then(() => router.reload());
    }
  };

  const setPrice = (v) => {
    url.query.price = v;
    router.replace(url);
  };

  const setOpenNow = (v) => {
    url.query.open_now = v;
    router.replace(url);
  };

  const handleTermSubmit = (e) => {
    e.preventDefault();
    url.query.term = termState;
    router.replace(url);
  };

  return (
    <div className="flex flex-col">
      <div className="flex py-3">
        <InputGroup className="w-full">
          <Input
            className="w-full"
            value={termState}
            onChange={(e) => {
              setTerm(e.target.value);
            }}
          />
          <Button onClick={handleTermSubmit}>Search</Button>
        </InputGroup>
      </div>
      <div className="flex flex-row gap-3">
        <div className="my-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="h-6 w-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
            />
          </svg>
        </div>
        <Dropdown>
          <Dropdown.Toggle>Location : {location}</Dropdown.Toggle>
          <Dropdown.Menu className="w-52">
            <Input
              className="w-full"
              value={locState}
              onChange={(e) => {
                setLocation(e.target.value);
              }}
              onKeyDown={handleLocationKeyPress}
            />
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown>
          <Dropdown.Toggle>Price : {priceString()}</Dropdown.Toggle>
          <Dropdown.Menu className="w-52">
            <Dropdown.Item
              onClick={() => {
                setPrice(null);
              }}
            >
              all
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                setPrice(1);
              }}
            >
              low
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                setPrice(2);
              }}
            >
              low-mid
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                setPrice(3);
              }}
            >
              mid-high
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                setPrice(4);
              }}
            >
              high
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown>
          <Dropdown.Toggle>Status : {open_nowString()}</Dropdown.Toggle>
          <Dropdown.Menu className="w-52">
            <Dropdown.Item
              onClick={() => {
                setOpenNow(true);
              }}
            >
              Open only
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                setOpenNow(false);
              }}
            >
              Close only
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                setOpenNow(null);
              }}
            >
              All
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
}
