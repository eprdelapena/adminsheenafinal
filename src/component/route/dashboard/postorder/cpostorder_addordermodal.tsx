import useV1AddToCart from "@/hooks/api_hooks/usev1addtocart";
import useV1PostOrderUser from "@/hooks/api_hooks/usev1postorderuser";
import { UserDataContext } from "@/hooks/context/main_context";
import {
  TDataGetProducts,
  TParamsPostOrders,
  TUserSession,
} from "@/schema/main_schema";
import React, { useContext, useEffect } from "react";
import ReactDOM from "react-dom";
import Swal from "sweetalert2";

const CPostOrderAddOrderModal = (props: {
  setPostOrderModal: (value: React.SetStateAction<boolean>) => void;
  currentCart: (TParamsPostOrders & {
    title: string;
    category: string;
  })[];
  userId: string;
}) => {
  const { setPostOrderModal, currentCart, userId } = props;
  const {
    payload,
    setPayload,
    getV1PostOrderUser,
    philippineRegions,
    regionProvinceMap,
    provinceAndCities,
  } = useV1PostOrderUser();

  const calculateTotalPrice = () => {
    return currentCart.reduce((acc, item) => {
      return acc + Number(item.price.replace(",", ""));
    }, 0);
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black/20 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl relative max-h-[90vh] overflow-y-auto">
        <h3 className="text-xl font-semibold mb-4 text-black">Generate order ID</h3>
        <form className="space-y-3">
          <input
            className="w-full p-2 rounded text-black border-solid border-black border-[1px] "
            value={payload?.username || ""}
            placeholder="input username..."
            onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (e.target.value.includes(" ")) {
                Swal.fire({
                  title: "Error",
                  text: "Username must not contain spaces",
                  icon: "error",
                  confirmButtonText: "Try again",
                });
                return;
              }
              setPayload((prev) => ({
                ...prev,
                username: e.target.value,
              }));
            }}
          />
          <input
            className="w-full p-2 rounded text-black border-solid border-black border-[1px]"
            value={payload?.receiverfirstname || ""}
            placeholder="input first name..."
            onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
              setPayload((prev) => ({
                ...prev,
                receiverfirstname: e.target.value,
              }));
            }}
          />
          <input
            className="w-full p-2 rounded text-black border-solid border-black border-[1px]"
            value={payload?.receiverlastname || ""}
            placeholder="input last name..."
            onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
              setPayload((prev) => ({
                ...prev,
                receiverlastname: e.target.value,
              }));
            }}
          />
          <input
            className="w-full p-2 rounded text-black border-solid border-black border-[1px]"
            value={payload?.receivermobile || ""}
            placeholder="input mobile number..."
            onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
              setPayload((prev) => ({
                ...prev,
                receivermobile: e.target.value,
              }));
            }}
          />
          <select
            className="w-full p-2 rounded text-black border-solid border-black border-[1px] "
            value={payload?.region || ""}
            onInput={(e: any) => {
              setPayload((prev) => ({
                ...prev,
                region: e.target.value,
              }));
            }}
          >
            <option value="">Select a region...</option>
            {philippineRegions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
          {payload.region && (
            <select
              className="w-full text-black border-black p-2 border rounded"
              value={payload?.province || ""}
              onInput={(e: any) => {
                setPayload((prev) => ({
                  ...prev,
                  municity: e.target.value,
                  province: e.target.value,
                }));
              }}
            >
              <option value={undefined}>Select a city or province</option>
              <option value={undefined} disabled>Select a province</option>
              {(regionProvinceMap as any)[payload.region].map((city: any) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          )}
          {payload.province && (
            <select
              className="w-full p-2 border text-black border-black rounded"
              value={payload?.municity || ""}
              onInput={(e: any) => {
                setPayload((prev) => ({
                  ...prev,
                  municity: e.target.value,
                }));
              }}
            >
              <option value={undefined}>Select a city or municipality</option>
              {(provinceAndCities as any)[payload?.province || ""].map(
                (city: any) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ),
              )}
            </select>
          )}
          <input
            className="w-full p-2 rounded text-black border-solid border-black border-[1px]"
            value={payload?.barangay || ""}
            placeholder="input barangay..."
            onInput={(e: any) => {
              setPayload((prev) => ({
                ...prev,
                barangay: e.target.value,
              }));
            }}
          />
          <input
            className="w-full p-2 rounded text-black border-solid border-black border-[1px]"
            value={payload?.address || ""}
            placeholder="input full address..."
            onInput={(e: any) => {
              setPayload((prev) => ({
                ...prev,
                address: e.target.value,
              }));
            }}
          />
          <select
            className="w-full p-2 rounded text-black border-solid border-black border-[1px]"
            value={payload?.originsite || ""}
            onInput={(e: any) => {
              setPayload((prev) => ({
                ...prev,
                originsite: e.target.value,
              }));
            }}
          >
            <option value={undefined}>Select origin site...</option>
            {["shoppee", "facebook"].map((site: any) => (
              <option key={site} value={site}>
                {site.toUpperCase()}
              </option>
            ))}
          </select>
                  <div className="mb-4">
          <label htmlFor="totalPrice" className="block text-sm font-medium text-gray-700 mb-1">
            Type of order
          </label>
          <select
            className="w-full p-2 rounded text-black border-solid border-black border-[1px]"
            value={payload?.type || ""}
            onInput={(e: any) => {
              setPayload((prev) => ({
                ...prev,
                type: e.target.value,
              }));
            }}
          >
              <option value={"on_hand_layaway"}>
                In hand layaway
              </option>
              <option value={"in_transit_layaway"}>
                Preorder layaway
              </option>
          </select>
        </div>

          <input
            className="w-full p-2 rounded text-black border-solid border-black border-[1px]"
            value={payload?.downpayment || ""}
            placeholder="input downpayment..."
            onInput={(e: any) => {
              setPayload((prev) => ({
                ...prev,
                downpayment: e.target.value,
              }));
            }}
          />
        <div className="mb-4">
          <label htmlFor="totalPrice" className="block text-sm font-medium text-gray-700 mb-1">
            Total price of customer's order
          </label>
          <input
            id="totalPrice"
            className="w-full p-2 rounded text-black border-solid border-black border-[1px]"
            value={calculateTotalPrice()}
            placeholder="Input total price..."
            disabled
          />
        </div>
        </form>
        <div className="flex justify-end space-x-2 mt-4">
          <button
            type="button"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => {
              getV1PostOrderUser({
                currentCart,
                userId,
                totalprice: `${calculateTotalPrice()}`,
              });
            }}
          >
            Save
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 cursor-pointer"
            onClick={() => {
              setPostOrderModal(false);
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

export default CPostOrderAddOrderModal;
