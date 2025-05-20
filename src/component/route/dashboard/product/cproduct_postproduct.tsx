import useV1PostProduct from "@/hooks/api_hooks/usev1postproduct";
import { changeImage } from "@/utils/main_utils";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import Swal from "sweetalert2";
const CPostProductModal = (props: {
  setPostModal: (value: React.SetStateAction<boolean>) => void;
  getV1GetProduct: () => Promise<void>;
}) => {
  const { setPostModal, getV1GetProduct } = props;
  const { getV1PostProduct, payload, setPayload } = useV1PostProduct();

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black/20 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl relative max-h-[90vh] overflow-y-auto">
        <h3 className="text-xl font-semibold mb-4 text-black">Post product</h3>
        <form className="space-y-3">
          <select
            className="rounded-lg p-2 w-full text-black border-solid border-[1px] border-black"
            value={payload.category}
            onChange={(e) => {
              setPayload((prev) => ({
                ...prev,
                category: e.target.value,
              }));
            }}
          >
            <option value={undefined}>Select a category</option>
            <option value="bags">Bags</option>
            <option value="shoes">Shoes</option>
            <option value="clothes">Clothes</option>
            <option value="jewelry">Jewelry</option>
            <option value="watches">Watches</option>
            <option value="others">Others</option>
          </select>
          <input
            className="w-full p-2 rounded text-black border-solid border-[1px] border-black"
            name="title"
            placeholder="Input product name"
            accept=".jpg,.jpeg,.png,.webp"
            value={payload.title}
            onChange={(e) => {
              setPayload((prev) => ({
                ...prev,
                title: e.target.value,
              }));
            }}
          />
          <div className="w-full mb-4">
            <label
              htmlFor="fileUpload"
              className="block mb-2 text-sm font-medium text-black"
            >
              Upload product image
            </label>
            <input
              id="fileUpload"
              className="w-full p-2 border border-black rounded-lg  text-black file:bg-gray-700 file:text-white file:border-0 file:py-2 file:px-4 file:rounded file:cursor-pointer hover:file:bg-gray-500"
              type="file"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                const result = await changeImage(file);
                setPayload((prev) => ({
                  ...prev,
                  image: result,
                }));
                console.log("result result", result);
              }}
            />
          </div>
          <input
            className="w-full p-2 border text-black border-black rounded"
            name="cost"
            placeholder="Input buying price"
            value={payload.cost}
            onChange={(e) => {
              setPayload((prev) => ({
                ...prev,
                cost: e.target.value,
              }));
            }}
          />
          <input
            className="w-full p-2 text-black border-solid border-[1px] border-black rounded"
            name="price"
            placeholder="Input seling price"
            value={payload.price}
            onChange={(e) => {
              setPayload((prev) => ({
                ...prev,
                price: e.target.value,
              }));
            }}
          />
          {/* <label className="block mb-1 font-medium text-sm text-gray-700">

  
*/}
        </form>
        <div className="flex justify-end space-x-2 mt-4">
          <button
            type="button"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => {
              getV1PostProduct({ callBackFunction: getV1GetProduct });
              setPostModal(false);
            }}
          >
            Save
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 cursor-pointer"
            onClick={() => {
              setPostModal(false);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default CPostProductModal;
