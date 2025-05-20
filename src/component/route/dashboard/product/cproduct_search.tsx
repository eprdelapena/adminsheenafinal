import { TParamsGetProducts } from "@/schema/main_schema";
import React, { useContext, useState } from "react";
import CPostProductModal from "./cproduct_postproduct";
import { EAdminRoutes, EParamsDefault } from "@/enum/main_enum";
import Link from "next/link";
import CPostProductExpenseModal from "./cproduct_postexpense";
import { UserDataContext } from "@/hooks/context/main_context";

const CProductSearch = (props: {
  initialPayload: Omit<TParamsGetProducts, "skip">;
  setInitialPayload: (
    value: React.SetStateAction<Omit<TParamsGetProducts, "skip">>,
  ) => void;
  setPayload: (
    value: React.SetStateAction<Omit<TParamsGetProducts, "skip">>,
  ) => void;
  getV1GetProduct: () => Promise<void>;
}) => {
  const { initialPayload, setInitialPayload, setPayload, getV1GetProduct } =
    props;
  const userData = useContext(UserDataContext);
  const { eaccounttype } = userData!;
  const [postModal, setPostModal] = useState<boolean>(false);
  const [expenseModal, setExpenseModal] = useState<boolean>(false);


  return (
    <>
      <div className="flex flex-col gap-y-2 lg:gap-y-0 lg:flex-row md:space-x-4 space-y-2 md:space-y-0 mb-4">
        <select
          className="border-black border-solid border-[1px] text-black rounded-lg p-2 w-full lg:w-1/4"
          value={initialPayload.searchType}
          onChange={(e) => {
            setInitialPayload((prev) => ({
              ...prev,
              searchType:
                (e.target.value as "category") ||
                "productid" ||
                "searchtag" ||
                "title",
              searchText: undefined,
            }));
          }}
        >
          <option value={undefined}>Select search category</option>
          <option value="category">Category</option>
          <option value="productid">Product ID</option>
          <option value="title">Product name</option>
        </select>

        {initialPayload.searchType === "category" ? (
          <select
            className=" rounded-lg border-black border-solid border-[1px] text-black p-2 w-full md:w-1/4"
            value={initialPayload.searchText}
            onChange={(e) => {
              setInitialPayload((prev) => ({
                ...prev,
                searchText: e.target.value,
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
        ) : (
          <input
            type={initialPayload.searchType === "productid" ? "number" : "text"}
            placeholder="Search products..."
            value={initialPayload.searchText || ""}
            className="border-black border-solid border-[1px] text-black rounded-lg p-2 w-full lg:w-1/3"
            onChange={(e) => {
              if (
                initialPayload.searchType === "productid" &&
                isNaN(Number(e.target.value))
              ) {
                alert("Product ID must be a number");
                return;
              }
              setInitialPayload((prev) => ({
                ...prev,
                searchText: e.target.value,
              }));
            }}
          />
        )}

        <button
          type="button"
          className="border rounded-lg p-2 w-full md:w-auto bg-blue-500 text-white cursor-pointer"
          onClick={() => {
            setPayload(initialPayload);
          }}
        >
          Search
        </button>
        {["admin", "admin_secretary"].includes(eaccounttype) && (
          <button
            type="button"
            className="border rounded-lg p-2 w-full md:w-auto bg-blue-500 text-white cursor-pointer"
            onClick={() => {
              setPostModal(true);
            }}
          >
            Add product
          </button>
        )}

        {/* {["admin", "admin_secretary"].includes(eaccounttype) && (
          <button
            type="button"
            className="border rounded-lg p-2 w-full md:w-auto bg-orange-500 text-white cursor-pointer"
            onClick={() => {
              setExpenseModal(true);
            }}
          >
            Create expense
          </button>
        )} */}

        <Link
          href={EAdminRoutes.DASHBOARDPOSTORDER}
          className="border rounded-lg p-2 w-full text-center md:w-auto bg-green-500 text-white cursor-pointer"
        >
          View cart
        </Link>
      </div>

      {postModal && (
        <CPostProductModal
          setPostModal={setPostModal}
          getV1GetProduct={getV1GetProduct}
        />
      )}
      {expenseModal && (
        <CPostProductExpenseModal setPostExpenseModal={setExpenseModal} />
      )}
    </>
  );
};

export default CProductSearch;
