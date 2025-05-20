import useV1EditStatusOrderUser from "@/hooks/api_hooks/usev1editstatusorderuser";
import { TDataGetOrderUser } from "@/schema/main_schema";
import React from "react";
import ReactDOM from "react-dom";

const COrdersModalEditStatus = (props: {
  setEditStatusModal: React.Dispatch<React.SetStateAction<boolean>>;
  getV1GetOrderUser: () => Promise<void>;
  order: TDataGetOrderUser;
}) => {
  const { setEditStatusModal, getV1GetOrderUser, order } = props;
  const { getV1EditStatusOrderUser, status, setStatus } =
    useV1EditStatusOrderUser();

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black/20 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
        <h3 className="text-xl font-semibold mb-4 text-black">
          Edit Order Status
        </h3>
        <p className="mb-2 text-black">
          <strong>Order ID:</strong>
        </p>
        <select
          className="w-full p-2 border rounded text-black mb-4"
          defaultValue={"Select a status"}
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option disabled>Select a status</option>
          <option value="success">Success</option>
          <option value="ondelivery">On delivery</option>
          <option value="pending">Pending</option>
        </select>
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={() => {
              getV1EditStatusOrderUser({
                orderid: order.orderid,
                callbackFunction: getV1GetOrderUser,
              });
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Save
          </button>
          <button
            onClick={() => {
              setEditStatusModal(false);
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

export default COrdersModalEditStatus;
