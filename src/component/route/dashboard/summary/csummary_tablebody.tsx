import { TDataGetMonthlyIncome, TDataLogTable } from "@/schema/main_schema";
import React, { useState } from "react";
import CSummaryMemoModal from "./csummary_memomodal";
import useV1DeleteLogs from "@/hooks/api_hooks/usev1deletelogs";

const quantityMap: Record<string, string> = {
  quantityxxs: "XXS",
  quantityxs: "XS",
  quantitys: "S",
  quantitym: "M",
  quantityl: "L",
  quantityxl: "XL",
  quantityxxl: "XXL",
  quantity5: "5.0",
  quantity55: "5.5",
  quantity6: "6.0",
  quantity65: "6.5",
  quantity7: "7.0",
  quantity75: "7.5",
  quantity8: "8.0",
  quantity85: "8.5",
  quantity9: "9.0",
  quantity95: "9.5",
  quantity100: "10.0",
  quantity105: "10.5",
  quantity110: "11.0",
  quantity115: "11.5",
  quantity120: "12.0",
  quantitydefault: "default",
};

const CSummaryTableBody = (props: {
  logs: TDataLogTable;
  index: number;
  getV1GetLogs: () => Promise<void>;
}) => {
  const { index, logs, getV1GetLogs } = props;


  const {
    getV1DeleteLogs
  } = useV1DeleteLogs(getV1GetLogs);

  return (
    <tr key={index} className={`border-t ${logs.mode === "incoming" ? "bg-green-300/50" : "bg-red-300/50"}`}>
      <td className="py-2 px-4 text-center text-black ">
        {new Date(logs.logdate).toLocaleDateString()}
      </td>
      {/* <td className="py-2 px-4 text-center flex flex-col">
        <button
          className="text-blue-500 font-semibold"
          onClick={() => {
            setMemoModal(true);
          }}
        >
          View breakdown
        </button>
      </td> */}
      <td className={`py-2 px-4 text-center font-semibold ${logs.mode === "incoming" ? "text-green-700" : "text-red-700"}`}>
        {logs.mode.toLocaleUpperCase()}
      </td>
      <td className="py-2 px-4 text-center text-black ">
        {logs.productid}
      </td>
      <td className="py-2 px-4 text-center text-black ">
        {logs.itemid}
      </td>
      <td className="py-2 px-4 text-center text-black ">
        {logs?.orderid || "--"}
      </td>
      <td className="py-2 px-4 text-center text-black ">
        {logs.category}
      </td>
      <td className="py-2 px-4 text-center text-black ">
        {logs.title}
      </td>
      <td className="py-2 px-4 text-center text-black ">
        {quantityMap[`${logs.size}`]}
      </td>
      <td className="py-2 px-4 text-center text-red-700 font-semibold ">
        {Number(logs.cost).toLocaleString()} ₱
      </td>
      <td className="py-2 px-4 text-center text-green-700 font-semibold ">
        {Number(logs.price).toLocaleString()} ₱
      </td>

      <td className="py-2 px-4 text-center  ">
        <button 
          className="cursor-pointer text-red-700 font-semibold"
          onClick={() => {
            getV1DeleteLogs(logs.itemid)
          }}  
        >
          DELETE
        </button>
      </td>

      {/* <td className="py-2 px-4 text-center text-black ">
        {income.expense.toLocaleString()} ₱
      </td>
      <td className="py-2 px-4 text-center text-black ">
        {income.projectedincome.toLocaleString()} ₱
      </td>
      <td className="py-2 px-4 text-center text-black ">
        {income.successincome.toLocaleString()} ₱
      </td> */}
      {/* {memoModal && (
        <CSummaryMemoModal income={income} setMemoModal={setMemoModal} />
      )} */}
    </tr>
  );
};

export default CSummaryTableBody;
