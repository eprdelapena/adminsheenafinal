import useV1EditInstallment from "@/hooks/api_hooks/usev1editinstallment";
import useV1EditStatusOrderUser from "@/hooks/api_hooks/usev1editstatusorderuser";
import {
  TDataGetInstallment,
  TDataGetOrderUser,
  TParamsEditInstallment,
} from "@/schema/main_schema";
import React from "react";
import ReactDOM from "react-dom";

const CViewOrderEditPaymentModal = (props: {
  setEditModal: React.Dispatch<React.SetStateAction<boolean>>;
  installmentParams: string;
  setInstallmentParams: React.Dispatch<React.SetStateAction<string>>;
  getV1EditInstallment: (
    params: Omit<TParamsEditInstallment, "installment">,
    callbackFunction?: (...args: any[]) => any,
  ) => Promise<void>;
  installment: TDataGetInstallment;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>
}) => {
  
  const {
    getV1EditInstallment,
    setEditModal,
    installment,
    setInstallmentParams,
    description,
    setDescription,
    installmentParams,
  } = props;


    
  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black/20 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
        <h3 className="text-xl font-semibold mb-4 text-black">Edit Payment</h3>
        <input
          className="w-full p-2 border rounded text-black mb-4"
          type="text"
          placeholder={"Input payment"}
          value={installmentParams === "0" ? "" : installmentParams}
          onChange={(e) => {
            setInstallmentParams(e.target.value);
          }}
        />
        <div className="mb-4">
          <label
            htmlFor="installment-textarea"
            className="block text-sm font-medium text-black mb-1"
          >
            Payment Description
          </label>
          <textarea
            id="installment-textarea"
            className="w-full p-2 border rounded text-black h-24 resize-none"
            placeholder="Description about the payment..."
            value={description}
            onInput={(e: any) => {
              setDescription(e.target.value);
            }}
          />
        </div>
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={() => {
              getV1EditInstallment({
                orderid: installment?.orderid,
                id: installment?.id,
              });
            }}
            className="px-4 py-2 bg-blue-500 text-white cursor-pointer rounded hover:bg-blue-600"
          >
            Save
          </button>
          <button
            onClick={() => {
              setEditModal(false);
            }}
            className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default CViewOrderEditPaymentModal;
