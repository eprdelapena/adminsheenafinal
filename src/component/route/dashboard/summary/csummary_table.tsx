"use client";

import useV1GetMonthlyIncome from "@/hooks/api_hooks/usev1getmonthlyincome";
import React, { useEffect, useState } from "react";
import CSummaryTableBody from "./csummary_tablebody";
import useV1GetLogs from "@/hooks/api_hooks/usev1getlogs";
import { TParamsGetLogTable } from "@/schema/main_schema";
import useV1DeleteLogs from "@/hooks/api_hooks/usev1deletelogs";
import useV1DownloadInstallmentTable from "@/hooks/api_hooks/usev1downloadinstallmenttable";
import useV1DownloadOrderTable from "@/hooks/api_hooks/usev1downloadordertable";
import useV1DownloadOrderUserTable from "@/hooks/api_hooks/usev1downloadorderusertable";
import useV1DownloadProductTable from "@/hooks/api_hooks/usev1downloadproducttable";

const totalPages = 9999;
const pageSize = 5;


const CSummaryTable = () => {
  // const { incomeList, setPayload, getV1GetMonthlyIncome, payload } =
  //   useV1GetMonthlyIncome();

  // useEffect(() => {
  //   getV1GetMonthlyIncome();
  // }, []);
  const [initialPayload, setInitialPayload] = useState<Partial<TParamsGetLogTable>>({
    searchCategory: undefined,
    searchText: "",
  })
  
  const {
    logs,
    payload,
    setPayload,
    getV1GetLogs,
    currentSkip,
    setCurrentSkip
  } = useV1GetLogs();



  useEffect(() => {
    getV1GetLogs()
  }, [currentSkip, payload]);

  const handleNext = () => {
    setCurrentSkip((prev) => (prev < totalPages ? prev + 1 : prev));
  };

  const handlePrevious = () => {
    setCurrentSkip((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const paginationNumbers = Array.from(
    {
      length: Math.min(
        pageSize,
        totalPages - Math.floor((currentSkip - 1) / pageSize) * pageSize,
      ),
    },
    (_, i) => i + 1 + Math.floor((currentSkip - 1) / pageSize) * pageSize,
  );

  const {
    getV1DownloadInstallmentTable
  } = useV1DownloadInstallmentTable();

  const {
    getV1DownloadOrderTable
  } = useV1DownloadOrderTable();

  const {
    getV1DownloadOrderUserTable
  } = useV1DownloadOrderUserTable();

  const {
    getV1DownloadProductTable
  } = useV1DownloadProductTable();

  return (
    <div className="p-6 bg-white min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-black">Product records</h2>

      {/* Search Filters */}
      <div className="flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0 mb-4">
        
        <input
          type="date"
          className="rounded-lg p-2 text-black w-full md:w-auto border-solid border-black border-[1px]"
          onChange={(e) => {
            const dateObj = new Date(e.target.value).toISOString();
            setPayload((prev) => ({
              ...prev,
              begin: dateObj,
            }));
          }}
        />
        <input
          type="date"
          className="bborder-black border-[1px] text-black rounded-lg p-2 w-full md:w-auto"
          onChange={(e) => {
            const dateObj = new Date(e.target.value).toISOString();
            setPayload((prev) => ({
              ...prev,
              end: dateObj,
            }));
          }}
        />
      </div>

        {/* Search Filters */}
        <div className="flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0 mb-4">
        
        <select
          className="rounded-lg p-2 text-black w-full md:w-auto border-solid border-black border-[1px]"
          value={initialPayload?.searchCategory || "Select search category"}
          onChange={(e) => {
            const selectedValue = e.target.value;
            setInitialPayload((prev) => ({
              ...prev,
              searchCategory: selectedValue as "itemid" | "orderid" | "mode",
              searchText: undefined
            }))
          }}
        >
          <option value="" >Select search category</option>
          <option value="itemid">QR Code ID</option>
          <option value="orderid">Order ID</option>
          <option value="mode">Mode</option>
        </select>
        {
          initialPayload?.searchCategory === "mode"
          ?
          <select
          className="rounded-lg p-2 text-black w-full md:w-auto border-solid border-black border-[1px]"
          value={initialPayload?.searchText || "Select mode"}
          onChange={(e) => {
            const selectedValue = e.target.value;
            setInitialPayload((prev) => ({
              ...prev,
              searchText: selectedValue
            }))
          }}
        >
          <option value="">Select mode</option>
          <option value="incoming">Incoming</option>
          <option value="outgoing">Outgoing</option>
        </select>
          :
          <input
            type="text"
            className="rounded-lg p-2 text-black w-full md:w-auto border-solid border-black border-[1px]"
            placeholder="Search..."
            onChange={(e) => {
              setInitialPayload((prev) => ({
                ...prev,
                searchText: e.target.value
              }))
            }}
          />
        }

        <button
          className="border rounded-lg p-2 w-full md:w-auto bg-blue-500 text-white cursor-pointer"
          onClick={() => {
            setPayload((prev) => ({
              ...prev,
              searchText: initialPayload.searchText,
              searchCategory: initialPayload.searchCategory
            }))
          }}
        >
          Search
        </button>
      </div>

      <div className="flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0 mb-4">

<button
  type="button"
  className="border rounded-lg p-2 w-full md:w-auto bg-green-500 text-white cursor-pointer"
  onClick={() => {
    getV1DownloadProductTable();
  }}
>
  Download product table
</button>
<button
  type="button"
  className="border rounded-lg p-2 w-full md:w-auto bg-yellow-500 text-white cursor-pointer"
  onClick={() => {
    getV1DownloadOrderUserTable();
  }}
>
  Download order user's table
</button>
<button
  type="button"
  className="border rounded-lg p-2 w-full md:w-auto bg-orange-500 text-white cursor-pointer"
  onClick={() => {
    getV1DownloadOrderTable();
  }}
>
  Download order's table
</button>
<button
  type="button"
  className="border rounded-lg p-2 w-full md:w-auto bg-violet-500 text-white cursor-pointer"
  onClick={() => {
    getV1DownloadInstallmentTable();
  }}
>
  Download installment table
</button>


</div>

      {/* Orders Table */}
      <div className="overflow-x-auto w-full">
        <table className="min-w-max bg-white shadow-md rounded-lg w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 uppercase text-center text-black whitespace-nowrap">
                Date logged
              </th>
              <th className="py-2 px-4 text-center uppercase text-black  whitespace-nowrap">
                Mode
              </th>
              <th className="py-2 px-4 uppercase text-center text-black  whitespace-nowrap">
                Product ID
              </th>
              <th className="py-2 uppercase px-4 text-center text-black  whitespace-nowrap">
                QR Code ID
              </th>
              <th className="py-2 px-4 uppercase text-center text-black  whitespace-nowrap">
                ORDER ID (FOR OUTGOING ITEMS)
              </th>
              <th className="py-2 uppercase px-4 text-center text-black  whitespace-nowrap">
                CATEGORY
              </th>
              <th className="py-2 uppercase px-4 text-center text-black  whitespace-nowrap">
                PRODUCT NAME
              </th>
              <th className="py-2 uppercase px-4 text-center text-black  whitespace-nowrap">
                SIZE
              </th>
              <th className="py-2 uppercase px-4 text-center text-black  whitespace-nowrap">
                BUYING PRICE
              </th>
              <th className="py-2 uppercase px-4 text-center text-black  whitespace-nowrap">
                SELLING PRICE
              </th>
              <th className="py-2 uppercase px-4 text-center text-black  whitespace-nowrap">
                DELETE
              </th>
            </tr>
          </thead>
          <tbody>
            {logs.length > 0 ? (
              logs.map((logs, index) => (
                <CSummaryTableBody key={index} logs={logs} index={index} getV1GetLogs={getV1GetLogs}/>
              ))
            ) : (
              <tr className="border-t">
                <td className="py-4 px-6 text-black text-center" colSpan={15}>
                  No current data
                </td>
              </tr>
            )}
            {/* <tr className="border-t">
              <td className="py-4 px-6 text-black text-center  font-semibold">
                TOTAL
              </td>
              <td className="py-4 px-6 text-black text-center font-semibold"></td>
              <td className="py-4 px-6 text-red-500 text-center font-semibold">
                {incomeList
                  .reduce((acc, income) => acc + income.expense, 0)
                  .toLocaleString()}{" "}
                ₱
              </td>

              <td className="py-4 px-6  text-center font-semibold text-blue-500">
                {incomeList
                  .reduce((acc, income) => acc + income.projectedincome, 0)
                  .toLocaleString()}{" "}
                ₱
              </td>
              <td className="py-4 px-6  text-center text-green-500 font-semibold">
                {incomeList
                  .reduce((acc, income) => acc + income.successincome, 0)
                  .toLocaleString()}{" "}
                ₱
              </td>
            </tr> */}
          </tbody>
        </table>
      </div>
      <div className="flex flex-wrap justify-center gap-2 mt-4 px-2">
        <button
          onClick={handlePrevious}
          disabled={currentSkip === 1}
          className={`px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base rounded-lg cursor-pointer ${
            currentSkip === 1
              ? "bg-gray-300"
              : "bg-gray-400 hover:bg-gray-500 text-black"
          }`}
        >
          {`<`}
        </button>
        {paginationNumbers.map((page) => (
          <button
            key={page}
            onClick={() => setCurrentSkip(page)}
            className={`px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base rounded-lg cursor-pointer ${
              currentSkip === page
                ? "bg-blue-500 text-white"
                : "bg-gray-300 hover:bg-gray-400 text-black"
            }`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={handleNext}
          disabled={currentSkip === totalPages}
          className={`px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base rounded-lg cursor-pointer ${
            currentSkip === totalPages
              ? "bg-gray-300"
              : "bg-gray-400 hover:bg-gray-500 text-black"
          }`}
        >
          {`>`}
        </button>
      </div>
    </div>
  );
};

export default CSummaryTable;
