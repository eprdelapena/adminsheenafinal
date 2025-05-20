import useV1GetPendingOrder from "@/hooks/api_hooks/usev1getpendingorders";
import { TDataGetProducts } from "@/schema/main_schema";
import React, { useEffect } from "react";
import ReactDOM from "react-dom";

const totalPages = 9999;
const pageSize = 5;

const CPendingOrderModal = (props: {
  setPendingOrderModal: React.Dispatch<React.SetStateAction<boolean>>;
  product: TDataGetProducts;
}) => {
  const { product, setPendingOrderModal } = props;

  const {
    getV1GetPendingOrder,
    pendingOrders,
    currentSkip,
    setCurrentSkip,
    setCurrentType,
    count,
    type
  } = useV1GetPendingOrder();

  useEffect(() => {
    getV1GetPendingOrder(product.productid)
  }, [currentSkip, type]);

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


  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black/20 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-[40em] relative">
        <h3 className="text-xl font-semibold mb-4 text-black">
          Pending orders
        </h3>
        <p className="mb-2 uppercase">{type === "on_hand_layaway" ? "In hand" : "Pre ordered"} orders total: {count}</p>
    {/* Two-column table */}
    <div>
      {}
    </div>
    <div className="max-h-64 overflow-y-auto mb-4 border border-gray-200 rounded">
<label htmlFor="item-type" className="mb-2 block text-gray-700">
  Order type
</label>
<select
  id="item-type"
  className="w-full p-2 border rounded text-black mb-4"
  value={type}
  onChange={(e) => setCurrentType(e.target.value)}
>
  <option value="on_hand_layaway">In hand</option>
  <option value="in_transit_layaway">Pre-ordered</option>
</select>
  <table className="w-full text-left">
    <thead>
      <tr className="bg-gray-100 border-b border-gray-300">
        <th className="py-2 px-4 text-black font-semibold">ORDER ID</th>
        <th className="py-2 px-4 text-black font-semibold">QTY.</th>
        <th className="py-2 px-4 text-black font-semibold">VISIT</th>
      </tr>
    </thead>
    <tbody>
      {
        pendingOrders.map((item, index) => (
          <tr key={index} className="border-b border-gray-200">
            <td className="py-2 px-4 text-black font-medium">{item.orderid}</td>
            <td className="py-2 px-4 text-black">{item.itemquantity}</td>
            <td className="py-2 px-4 text-black">
                <a href={`/dashboard/vieworder/${item.orderid}`} className="text-blue-500">
                    Visit link
                </a>
            </td>
          </tr>
        ))
      }
      
    </tbody>
  </table>
</div>
<div className="flex flex-wrap justify-center gap-2 mt-4 px-2">
          <button
            onClick={handlePrevious}
            disabled={currentSkip === 1}
            className={`px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base rounded-lg cursor-pointer ${
              currentSkip === 1
                ? "bg-gray-300 text-black"
                : "bg-gray-400 hover:bg-gray-500 text-white"
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
                ? "bg-gray-300 text-black"
                : "bg-gray-400 hover:bg-gray-500 text-white"
            }`}
          >
            {`>`}
          </button>
        </div>
        <div className="flex justify-end space-x-2">

          <button
            onClick={() => {
              setPendingOrderModal(false);
            }}
            className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default CPendingOrderModal;
