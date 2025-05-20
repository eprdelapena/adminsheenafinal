"use client";

import COrdersTableBody from "@/component/route/dashboard/orders/corders_tablebody";
import useV1GetOrderUser from "@/hooks/api_hooks/usev1getorderuser";
import { TParamsGetOrderUser } from "@/schema/main_schema";
import React, { useEffect, useState } from "react";

const totalPages = 9999;
const pageSize = 5;

const COrdersTable = () => {
  const [initialPayload, setInitialPayload] = useState<
    Partial<Omit<TParamsGetOrderUser, "skip">>
  >({
    begin: undefined,
    end: undefined,
    category: undefined,
    type: undefined,
    search: undefined,
    estatustype: "pending",
  });

  const {
    currentSkip,
    setCurrentPayload,
    setCurrentSkip,
    payload,
    getV1GetOrderUser,
    orderUserList,
  } = useV1GetOrderUser();


  useEffect(() => {
    getV1GetOrderUser();
  }, [currentSkip, payload]);



  return (
    <div className="p-6 bg-white min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-black">List of orders</h2>

                <div className="flex flex-col ">
          <label className="text-sm  block text-black ">Select search category: </label>
        <select
          className="border rounded-lg p-2 w-full border-black text-black border-solid border-[1px] my-2"
          defaultValue={"Select search category"}
          onChange={(e) => {
            setInitialPayload((prev) => ({
              ...prev,
              category: e.target.value as "orderid" | "username",
            }));
          }}
        >
          <option disabled>Select search category</option>
          <option value="username">By username</option>
          <option value="orderid">By order ID</option>
           <option value="firstname">By first name</option>
            <option value="lastname">By last name</option>
        </select>
        </div>

      {/* Search Filters */}
      <div className="flex flex-col w-full lg:w-auto gap-y-2 text-black md:space-x-4 space-y-2 md:space-y-0 mb-4">
        <input
          type="text"
          placeholder="Search orders..."
          className="border rounded-lg p-2 text-black w-full"
          onChange={(e) => {
            setInitialPayload((prev) => ({
              ...prev,
              search: e.target.value,
            }));
          }}
        />

                <div className="flex flex-col ">
          <label className="text-sm  block ">Select by order type: </label>
        <select
          className="border rounded-lg p-2 w-full lg:my-0 my-2 "
          value={initialPayload?.type || ""}
          onChange={(e) => {
            setInitialPayload((prev) => ({
              ...prev,
              type: e.target.value,
            }));
          }}
        >
       
          <option value="on_hand_layaway">Inhand</option>
          <option value="in_transit_layaway">Pre-ordered</option>
        </select>
        </div>



        <div className="flex flex-col">
          <label className="text-sm  block mb-1">Select by order status: </label>
        <select
          className="border rounded-lg p-2 w-full mb-2"
          defaultValue={"Select status"}
          onChange={(e) => {
            setInitialPayload((prev) => ({
              ...prev,
              estatustype: e.target.value,
            }));
          }}
        >
          {/* <option disabled>Select status</option> */}
          <option value="pending">Pending</option>
          <option value="ondelivery">On Delivery</option>
          <option value="success">Success</option>
          
          
        </select>
        </div>

        <div className="flex flex-col">
          <label className="text-sm  block mb-1">Begin Date</label>
          <input
            type="date"
            className="border rounded-lg p-2 w-full "
            onChange={(e) => {
              const dateObj = new Date(e.target.value).toISOString();
              setInitialPayload((prev) => ({
                ...prev,
                begin: dateObj,
              }));
            }}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm mb-1  block">End Date</label>
          <input
            type="date"
            className="border rounded-lg p-2 w-full lg:mb-0 mb-3 lg:w-auto"
            onChange={(e) => {
              const dateObj = new Date(e.target.value).toISOString();
              setInitialPayload((prev) => ({
                ...prev,
                end: dateObj,
              }));
            }}
          />
        </div>
        <button
          className="border rounded-lg p-2 w-full md:w-auto bg-blue-500 text-white cursor-pointer"
          onClick={() => {
            setCurrentPayload(initialPayload);
            setCurrentSkip(1);
          }}
        >
          Search
        </button>
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto w-full">
        <table className="min-w-max bg-white shadow-md rounded-lg w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 text-center text-black whitespace-nowrap">
                Date
              </th>
               <th className="py-2 px-4 text-center text-black whitespace-nowrap">
                Customer remaining balance
              </th>
              <th className="py-2 px-4 text-center text-black whitespace-nowrap">
                Order type
              </th>
              <th className="py-2 px-4 text-center text-black whitespace-nowrap">
                Order ID
              </th>
              <th className="py-2 px-4 text-center text-black whitespace-nowrap">
                Full name
              </th>
              <th className="py-2 px-4 text-center text-black whitespace-nowrap">
                Action
              </th>
              <th className="py-2 px-4 text-center text-black whitespace-nowrap">
                Status
              </th>
              <th className="py-2 px-4 text-center text-black whitespace-nowrap">
                Origin
              </th>

              <th className="py-2 px-4 text-center text-black whitespace-nowrap">
                Username
              </th>
              <th className="py-2 px-4 text-center text-black whitespace-nowrap">
                Region
              </th>
              <th className="py-2 px-4 text-center text-black whitespace-nowrap">
                Province
              </th>
              <th className="py-2 px-4 text-center text-black whitespace-nowrap">
                Municipality / City
              </th>
              <th className="py-2 px-4 text-center text-black whitespace-nowrap">
                Address
              </th>

              <th className="py-2 px-4 text-center text-black whitespace-nowrap">
                Mobile
              </th>


              <th className="py-2 px-4 text-center text-black whitespace-nowrap">
                Cancel
              </th>
            </tr>
          </thead>
          <tbody>
            {orderUserList.length > 0 ? (
              orderUserList.map((order, index) => (
                <COrdersTableBody
                  key={index}
                  order={order}
                  getV1GetOrderUser={getV1GetOrderUser}
                  index={index}
                />
              ))
            ) : (
              <tr className="border-t">
                <td className="py-4 px-6 text-black text-center" colSpan={15}>
                  No current data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>


    </div>
  );
};

export default COrdersTable;
