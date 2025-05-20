import useV1PostExpense from "@/hooks/api_hooks/usev1postexpense";
import useV1PostProduct from "@/hooks/api_hooks/usev1postproduct";
import { UserDataContext } from "@/hooks/context/main_context";
import { TDataGetMonthlyIncome, TUserSession } from "@/schema/main_schema";
import React, { useContext } from "react";
import ReactDOM from "react-dom";

const CSummaryMemoModal = (props: {
  setMemoModal: (value: React.SetStateAction<boolean>) => void;
  income: TDataGetMonthlyIncome;
  // getV1GetProduct: () => Promise<void>;
}) => {
  const { setMemoModal, income } = props;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black/20 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl relative max-h-[90vh] overflow-y-auto">
        <h3 className="text-xl font-semibold mb-4">
          Expense breakdown - {new Date(income.day).toLocaleDateString()}
        </h3>
        <form className="space-y-3">
          <textarea
            className="w-full p-2 border rounded min-h-[20em]"
            name="title"
            placeholder="Place description about the expenses (e.g. Product name - x Quantity - Product price)"
            value={income?.memo ? income.memo : "No content"}
            disabled
          />
        </form>
        <div className="flex justify-end space-x-2 mt-4">
          <button
            type="button"
            className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 cursor-pointer"
            onClick={() => {
              setMemoModal(false);
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default CSummaryMemoModal;
