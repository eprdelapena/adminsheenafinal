"use client";

import useV1DeleteProduct from "@/hooks/api_hooks/usev1deleteproduct";
import useV1GetProduct from "@/hooks/api_hooks/usev1getproduct";
import { TParamsGetProducts, TUserSession } from "@/schema/main_schema";
import React, { useEffect, useState } from "react";
import CProductSearch from "./cproduct_search";
import CProductTableBody from "./cproduct_tablebody";
import { UserDataContext } from "@/hooks/context/main_context";
import Swal from "sweetalert2";

const CProductTable = (props: { userData: TUserSession }) => {
  const [initialPayload, setInitialPayload] = useState<
    Omit<TParamsGetProducts, "skip">
  >({
    searchType: undefined,
    searchText: undefined,
  });
  const { userData } = props;

  const totalPages = 9999;
  const pageSize = 5;

  const {
    currentPage,
    setCurrentPage,
    getV1GetProduct,
    payload,
    productList,
    setPayload,
  } = useV1GetProduct();

  const { getV1DeleteProduct } = useV1DeleteProduct();

  const handleNext = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  };

  const handlePrevious = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const paginationNumbers = Array.from(
    {
      length: Math.min(
        pageSize,
        totalPages - Math.floor((currentPage - 1) / pageSize) * pageSize,
      ),
    },
    (_, i) => i + 1 + Math.floor((currentPage - 1) / pageSize) * pageSize,
  );

  useEffect(() => {
      const fetchData = async () => {
    Swal.fire({
      title: "Loading products please wait...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      await getV1GetProduct();
    } finally {
      Swal.close();
    }
  };

  fetchData();
  }, [currentPage, payload]);

  return (
    <UserDataContext.Provider value={userData}>
      <div className="p-6 bg-white min-h-screen">
        <h2 className="text-2xl font-bold mb-4 text-black">List of products</h2>
        <CProductSearch
          getV1GetProduct={getV1GetProduct}
          initialPayload={initialPayload}
          setInitialPayload={setInitialPayload}
          setPayload={setPayload}
        />
        <div className="overflow-x-auto w-full">
          <CProductTableBody
            productList={productList}
            getV1DeleteProduct={getV1DeleteProduct}
            getV1GetProduct={getV1GetProduct}
          />
        </div>
        <div className="flex flex-wrap justify-center gap-2 mt-4 px-2">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className={`px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base rounded-lg cursor-pointer ${
              currentPage === 1
                ? "bg-gray-300 text-black"
                : "bg-gray-400 hover:bg-gray-500 text-white"
            }`}
          >
            {`<`}
          </button>
          {paginationNumbers.map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base rounded-lg cursor-pointer ${
                currentPage === page
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 hover:bg-gray-400 text-black"
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base rounded-lg cursor-pointer ${
              currentPage === totalPages
                ? "bg-gray-300 text-black"
                : "bg-gray-400 hover:bg-gray-500 text-white"
            }`}
          >
            {`>`}
          </button>
        </div>
      </div>
    </UserDataContext.Provider>
  );
};

export default CProductTable;
