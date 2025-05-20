import useV1EditProduct from "@/hooks/api_hooks/usev1editproduct";
import { TDataGetProducts } from "@/schema/main_schema";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import Swal from "sweetalert2";

const CEditProductModal = (props: {
  setEditModal: (value: React.SetStateAction<boolean>) => void;
  product: TDataGetProducts;
  getV1GetProduct: () => Promise<void>;
}) => {
  const { setEditModal, product, getV1GetProduct } = props;
  const { getV1EditProduct, payload, setPayload } = useV1EditProduct(product);

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black/20 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl relative max-h-[90vh] overflow-y-auto">
        <h3 className="text-xl font-semibold mb-4 text-black">Edit product</h3>
        <form className="space-y-3">
          <label className="block mb-1 font-medium text-sm text-black">
            Product name
          </label>
          <input
            className="w-full p-2 border-black text-black border-solid border-[1px] "
            name="title"
            placeholder="Input product name"
            value={payload.title}
            onChange={(e) => {
              setPayload((prev) => ({
                ...prev,
                title: e.target.value,
              }));
            }}
          />
          <label className="block mb-1 font-medium text-sm text-black">
            Product category
          </label>
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
          <label className="block mb-1 font-medium text-sm text-black">
            Selling Price
          </label>
          <input
            className="w-full p-2 text-black border-solid border-[1px] border-black "
            name="price"
            placeholder="Input selling price"
            value={payload.price}
            onChange={(e) => {
              setPayload((prev) => ({
                ...prev,
                price: e.target.value,
              }));
            }}
          />
          <label className="block mb-1 font-medium text-sm text-black">
            Buying price
          </label>
          <input
            className="w-full p-2 text-black border-solid border-[1px] border-black "
            name="price"
            placeholder="Input buying price"
            value={payload.cost}
            onChange={(e) => {
              setPayload((prev) => ({
                ...prev,
                cost: e.target.value,
              }));
            }}
          />
          <label className="block mb-1 font-medium text-sm text-black">
            Current Default Quantity: {product.quantitydefault} items left
          </label>
          <input
            className="w-full p-2 rounded text-black border-solid border-[1px] border-black"
            type="text"
            value={payload.quantitydefault}
            onChange={(e) => {
              if (isNaN(Number(e.target.value))) {
                Swal.fire({
                  title: "Error",
                  text: "This field must be a number",
                  icon: "error",
                  confirmButtonText: "Try again",
                });
                return;
              }
              setPayload((prev) => ({
                ...prev,
                quantitydefault: Number(e.target.value),
              }));
            }}
          />
          <label
            className="block mb-1 font-medium text-sm text-black"
            htmlFor="quantityxxs"
          >
            Current Quantity (XXS): {product.quantityxxs} items left
          </label>
          <input
            id="quantityxxs"
            className="w-full p-2  rounded text-black border-solid border-[1px] border-black"
            name="quantityxxs"
            type="text"
            placeholder="Input Quantity of Size XXS"
            value={payload.quantityxxs}
            onChange={(e) => {
              if (isNaN(Number(e.target.value))) {
                Swal.fire({
                  title: "Error",
                  text: "This field must be a number",
                  icon: "error",
                  confirmButtonText: "Try again",
                });
                return;
              }
              setPayload((prev) => ({
                ...prev,
                quantityxxs: Number(e.target.value),
              }));
            }}
          />
          <label
            className="block mb-1 font-medium text-sm text-black"
            htmlFor="quantityxxs"
          >
            Current Quantity (XS): {product.quantityxs} items left
          </label>
          <input
            id="quantityxs"
            className="w-full p-2  rounded text-black border-solid border-[1px] border-black"
            name="quantityxs"
            type="text"
            placeholder="Input Quantity of Size XS"
            value={payload.quantityxs}
            onChange={(e) => {
              if (isNaN(Number(e.target.value))) {
                Swal.fire({
                  title: "Error",
                  text: "This field must be a number",
                  icon: "error",
                  confirmButtonText: "Try again",
                });
                return;
              }
              setPayload((prev) => ({
                ...prev,
                quantityxs: Number(e.target.value),
              }));
            }}
          />
          <label
            className="block mb-1 font-medium text-sm text-black"
            htmlFor="quantityxxs"
          >
            Current Quantity (S): {product.quantitys} items left
          </label>
          <input
            id="quantitys"
            className="w-full p-2 text-black border-solid border-[1px] border-black "
            name="quantitys"
            type="text"
            placeholder="Input Quantity of Size S"
            value={payload.quantittys}
            onChange={(e) => {
              if (isNaN(Number(e.target.value))) {
                Swal.fire({
                  title: "Error",
                  text: "This field must be a number",
                  icon: "error",
                  confirmButtonText: "Try again",
                });
                return;
              }
              setPayload((prev) => ({
                ...prev,
                quantittys: Number(e.target.value),
              }));
            }}
          />
          <label
            className="block mb-1 font-medium text-sm text-black"
            htmlFor="quantityxxs"
          >
            Current Quantity (M): {product.quantitym} items left
          </label>
          <input
            id="quantitym"
            className="w-full p-2 rounded text-black border-solid border-[1px] border-black"
            name="quantitym"
            type="text"
            placeholder="Input Quantity of Size M"
            value={payload.quantitym}
            onChange={(e) => {
              if (isNaN(Number(e.target.value))) {
                Swal.fire({
                  title: "Error",
                  text: "This field must be a number",
                  icon: "error",
                  confirmButtonText: "Try again",
                });
                return;
              }
              setPayload((prev) => ({
                ...prev,
                quantitym: Number(e.target.value),
              }));
            }}
          />
          <label
            className="block mb-1 font-medium text-sm text-black"
            htmlFor="quantityxxs"
          >
            Current Quantity (L): {product.quantityl} items left
          </label>
          <input
            id="quantityl"
            className="w-full p-2 text-black border-solid border-[1px] border-black rounded"
            name="quantityl"
            type="text"
            placeholder="Input Quantity of Size L"
            value={payload.quantityl}
            onChange={(e) => {
              if (isNaN(Number(e.target.value))) {
                Swal.fire({
                  title: "Error",
                  text: "This field must be a number",
                  icon: "error",
                  confirmButtonText: "Try again",
                });
                return;
              }
              setPayload((prev) => ({
                ...prev,
                quantityl: Number(e.target.value),
              }));
            }}
          />
          <label
            className="block mb-1 font-medium text-sm text-black"
            htmlFor="quantityxxs"
          >
            Current Quantity (XL): {product.quantityxl} items left
          </label>
          <input
            id="quantityxl"
            className="w-full p-2 text-black border-solid border-[1px] border-black rounded"
            name="quantityxl"
            type="text"
            placeholder="Input Quantity of Size XL"
            value={payload.quantityxl}
            onChange={(e) => {
              if (isNaN(Number(e.target.value))) {
                Swal.fire({
                  title: "Error",
                  text: "This field must be a number",
                  icon: "error",
                  confirmButtonText: "Try again",
                });
                return;
              }
              setPayload((prev) => ({
                ...prev,
                quantityxl: Number(e.target.value),
              }));
            }}
          />
          <label className="block mb-1 font-medium text-sm text-black">
            Current Quantity (XXL): {product.quantityxxl} items left
          </label>
          <input
            className="w-full p-2  rounded text-black border-solid border-[1px] border-black"
            type="text"
            placeholder="Input Quantity of Size XXL"
            value={payload.quantityxxl}
            onChange={(e) => {
              if (isNaN(Number(e.target.value))) {
                Swal.fire({
                  title: "Error",
                  text: "This field must be a number",
                  icon: "error",
                  confirmButtonText: "Try again",
                });
                return;
              }
              setPayload((prev) => ({
                ...prev,
                quantityxxl: Number(e.target.value),
              }));
            }}
          />
          <label className="block mb-1 font-medium text-sm text-black">
            Current Quantity (5.0): {product.quantity5} items left
          </label>
          <input
            className="w-full p-2 text-black border-solid border-[1px] border-black "
            type="text"
            placeholder="Input Quantity of Size XXL"
            value={payload.quantity5}
            onChange={(e) => {
              if (isNaN(Number(e.target.value))) {
                Swal.fire({
                  title: "Error",
                  text: "This field must be a number",
                  icon: "error",
                  confirmButtonText: "Try again",
                });
                return;
              }
              setPayload((prev) => ({
                ...prev,
                quantity5: Number(e.target.value),
              }));
            }}
          />
          <label className="block mb-1 font-medium text-sm text-black">
            Current Quantity (5.5): {product.quantity55} items left
          </label>
          <input
            className="w-full p-2 text-black border-solid border-[1px] border-black "
            type="text"
            placeholder="Input Quantity of Size XXL"
            value={payload.quantity55}
            onChange={(e) => {
              if (isNaN(Number(e.target.value))) {
                Swal.fire({
                  title: "Error",
                  text: "This field must be a number",
                  icon: "error",
                  confirmButtonText: "Try again",
                });
                return;
              }
              setPayload((prev) => ({
                ...prev,
                quantity55: Number(e.target.value),
              }));
            }}
          />
          <label className="block mb-1 font-medium text-sm text-black">
            Current Quantity (6.0): {product.quantity6} items left
          </label>
          <input
            className="w-full p-2  rounded text-black border-solid border-[1px] border-black"
            type="text"
            value={payload.quantity6}
            onChange={(e) => {
              if (isNaN(Number(e.target.value))) {
                Swal.fire({
                  title: "Error",
                  text: "This field must be a number",
                  icon: "error",
                  confirmButtonText: "Try again",
                });
                return;
              }
              setPayload((prev) => ({
                ...prev,
                quantity6: Number(e.target.value),
              }));
            }}
          />
          <label className="block mb-1 font-medium text-sm text-black">
            Current Quantity (6.5): {product.quantity65} items left
          </label>
          <input
            className="w-full p-2 text-black border-solid border-[1px] border-black rounded "
            type="text"
            value={payload.quantity65}
            onChange={(e) => {
              if (isNaN(Number(e.target.value))) {
                Swal.fire({
                  title: "Error",
                  text: "This field must be a number",
                  icon: "error",
                  confirmButtonText: "Try again",
                });
                return;
              }
              setPayload((prev) => ({
                ...prev,
                quantity65: Number(e.target.value),
              }));
            }}
          />
          <label className="block mb-1 font-medium text-sm text-black">
            Current Quantity (7.0): {product.quantity7} items left
          </label>
          <input
            className="w-full p-2 text-black border-solid border-[1px] border-black rounded"
            type="text"
            value={payload.quantity7}
            onChange={(e) => {
              if (isNaN(Number(e.target.value))) {
                Swal.fire({
                  title: "Error",
                  text: "This field must be a number",
                  icon: "error",
                  confirmButtonText: "Try again",
                });
                return;
              }
              setPayload((prev) => ({
                ...prev,
                quantity7: Number(e.target.value),
              }));
            }}
          />
          <label className="block mb-1 font-medium text-sm text-black">
            Current Quantity (7.5): {product.quantity75} items left
          </label>
          <input
            className="w-full p-2 text-black border-solid border-[1px] border-black rounded"
            type="text"
            value={payload.quantity75}
            onChange={(e) => {
              if (isNaN(Number(e.target.value))) {
                Swal.fire({
                  title: "Error",
                  text: "This field must be a number",
                  icon: "error",
                  confirmButtonText: "Try again",
                });
                return;
              }
              setPayload((prev) => ({
                ...prev,
                quantity75: Number(e.target.value),
              }));
            }}
          />
          <label className="block mb-1 font-medium text-sm text-black">
            Current Quantity (8.0): {product.quantity8} items left
          </label>
          <input
            className="w-full p-2 text-black border-solid border-[1px] border-black rounded"
            type="text"
            value={payload.quantity8}
            onChange={(e) => {
              if (isNaN(Number(e.target.value))) {
                Swal.fire({
                  title: "Error",
                  text: "This field must be a number",
                  icon: "error",
                  confirmButtonText: "Try again",
                });
                return;
              }
              setPayload((prev) => ({
                ...prev,
                quantity8: Number(e.target.value),
              }));
            }}
          />
          <label className="block mb-1 font-medium text-sm text-black">
            Current Quantity (8.5): {product.quantity85} items left
          </label>
          <input
            className="w-full p-2 text-black border-solid border-[1px] border-black"
            type="text"
            value={payload.quantity85}
            onChange={(e) => {
              if (isNaN(Number(e.target.value))) {
                Swal.fire({
                  title: "Error",
                  text: "This field must be a number",
                  icon: "error",
                  confirmButtonText: "Try again",
                });
                return;
              }
              setPayload((prev) => ({
                ...prev,
                quantity85: Number(e.target.value),
              }));
            }}
          />
          <label className="block mb-1 font-medium text-sm text-black">
            Current Quantity (9.0): {product.quantity9} items left
          </label>
          <input
            className="w-full p-2 text-black border-solid border-[1px] border-black"
            type="text"
            value={payload.quantity9}
            onChange={(e) => {
              if (isNaN(Number(e.target.value))) {
                Swal.fire({
                  title: "Error",
                  text: "This field must be a number",
                  icon: "error",
                  confirmButtonText: "Try again",
                });
                return;
              }
              setPayload((prev) => ({
                ...prev,
                quantity9: Number(e.target.value),
              }));
            }}
          />
          <label className="block mb-1 font-medium text-sm text-black">
            Current Quantity (9.5): {product.quantity95} items left
          </label>
          <input
            className="w-full p-2 text-black border-solid border-[1px] border-black"
            type="text"
            value={payload.quantity95}
            onChange={(e) => {
              if (isNaN(Number(e.target.value))) {
                Swal.fire({
                  title: "Error",
                  text: "This field must be a number",
                  icon: "error",
                  confirmButtonText: "Try again",
                });
                return;
              }
              setPayload((prev) => ({
                ...prev,
                quantity95: Number(e.target.value),
              }));
            }}
          />
          <label className="block mb-1 font-medium text-sm text-black">
            Current Quantity (10.0): {product.quantity100} items left
          </label>
          <input
            className="w-full p-2 text-black border-solid border-[1px] border-black"
            type="text"
            value={payload.quantity100}
            onChange={(e) => {
              if (isNaN(Number(e.target.value))) {
                Swal.fire({
                  title: "Error",
                  text: "This field must be a number",
                  icon: "error",
                  confirmButtonText: "Try again",
                });
                return;
              }
              setPayload((prev) => ({
                ...prev,
                quantity100: Number(e.target.value),
              }));
            }}
          />
          <label className="block mb-1 font-medium text-sm text-black">
            Current Quantity (10.5): {product.quantity105} items left
          </label>
          <input
            className="w-full p-2 text-black border-solid border-[1px] border-black"
            type="text"
            value={payload.quantity105}
            onChange={(e) => {
              if (isNaN(Number(e.target.value))) {
                Swal.fire({
                  title: "Error",
                  text: "This field must be a number",
                  icon: "error",
                  confirmButtonText: "Try again",
                });
                return;
              }
              setPayload((prev) => ({
                ...prev,
                quantity105: Number(e.target.value),
              }));
            }}
          />
          <label className="block mb-1 font-medium text-sm text-black">
            Current Quantity (11.0): {product.quantity110} items left
          </label>
          <input
            className="w-full p-2 text-black border-solid border-[1px] border-black"
            type="text"
            value={payload.quantitty110}
            onChange={(e) => {
              if (isNaN(Number(e.target.value))) {
                Swal.fire({
                  title: "Error",
                  text: "This field must be a number",
                  icon: "error",
                  confirmButtonText: "Try again",
                });
                return;
              }
              setPayload((prev) => ({
                ...prev,
                quantitty110: Number(e.target.value),
              }));
            }}
          />
          <label className="block mb-1 font-medium text-sm text-black">
            Current Quantity (11.5): {product.quantity115} items left
          </label>
          <input
            className="w-full p-2 text-black border-solid border-[1px] border-black"
            type="text"
            value={payload.quantity115}
            onChange={(e) => {
              if (isNaN(Number(e.target.value))) {
                Swal.fire({
                  title: "Error",
                  text: "This field must be a number",
                  icon: "error",
                  confirmButtonText: "Try again",
                });
                return;
              }
              setPayload((prev) => ({
                ...prev,
                quantity115: Number(e.target.value),
              }));
            }}
          />
          <label className="block mb-1 font-medium text-sm text-black">
            Current Quantity (12.0): {product.quantity120} items left
          </label>
          <input
            className="w-full p-2 text-black border-solid border-[1px] border-black"
            type="text"
            value={payload.quantity120}
            onChange={(e) => {
              if (isNaN(Number(e.target.value))) {
                Swal.fire({
                  title: "Error",
                  text: "This field must be a number",
                  icon: "error",
                  confirmButtonText: "Try again",
                });
                return;
              }
              setPayload((prev) => ({
                ...prev,
                quantity120: Number(e.target.value),
              }));
            }}
          />
        </form>
        <div className="flex justify-end space-x-2 mt-4">
          <button
            type="button"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => {
              getV1EditProduct({
                productid: product.productid,
                callBackFunction: getV1GetProduct,
              });
            }}
          >
            Save
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 cursor-pointer"
            onClick={() => {
              setEditModal(false);
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

export default CEditProductModal;
