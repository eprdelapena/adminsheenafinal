"use client";

import { TParamsPostOrders, TUserSession } from "@/schema/main_schema";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import CPostOrderAddOrderModal from "./cpostorder_addordermodal";

const CPostOrderTable = (props: { userData: TUserSession }) => {
  const [currentCart, setCurrentCart] = useState<
    (TParamsPostOrders & { title: string; category: string })[]
  >([]);
  const [addOrderModal, setAddOrderModal] = useState<boolean>(false);
  const { userData } = props;

  const getCart = () => {
    const storedFilters = localStorage.getItem(
      `cartItems_${userData.username}`,
    );
    if (!storedFilters) return;
    const parsed = JSON.parse(storedFilters);
    setCurrentCart(parsed);
  };

  const handleDelete = (index: number) => {
    const updatedCart = [...currentCart];
    updatedCart.splice(index, 1);
    setCurrentCart(updatedCart);
    localStorage.setItem(
      `cartItems_${userData.username}`,
      JSON.stringify(updatedCart),
    );
  };

  useEffect(() => {
    getCart();
  }, []);

  return (
    <>
      <div className="p-6 bg-white min-h-screen">
        <h2 className="text-2xl font-bold mb-4 text-black">Current cart</h2>
        <div className="flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0 mb-4">
          <button
            className="border rounded-lg p-2 w-full md:w-auto bg-blue-500 text-white cursor-pointer"
            onClick={() => {
              if(currentCart.length === 0){
                Swal.fire({
                  title: "Error",
                  text: "Your current cart is empty, please add items first to the cart from the product page",
                  icon: "error",
                  confirmButtonText: "Try again",
                });
                return;
              }
              setAddOrderModal(true);
            }}
          >
            Issue order ID
          </button>
        </div>

        {/* HORIZONTAL SCROLL CONTAINER */}
        <div className="w-full overflow-x-auto whitespace-nowrap">
          <table className="table-auto w-max  bg-white shadow-md rounded-lg">
            <thead className="bg-gray-200">
              <tr>
                {[
                  "Delete",
                  "Product ID",
                  "Product name",
                  "Category",
                  "Total price",
                  "Quantity ordered",
                  "Default quantity",
                  "Quantity Size XXS",
                  "Quantity Size XS",
                  "Quantity Size S",
                  "Quantity Size M",
                  "Quantity Size L",
                  "Quantity Size XL",
                  "Quantity Size XXL",
                  "Quantity Size 5.0",
                  "Quantity 5.5",
                  "Quantity 6.0",
                  "Quantity 6.5",
                  "Quantity 7.0",
                  "Quantity 7.5",
                  "Quantity 8.0",
                  "Quantity 8.5",
                  "Quantity 9.0",
                  "Quantity 9.5",
                  "Quantity 10.0",
                  "Quantity 10.5",
                  "Quantity 11.0",
                  "Quantity 11.5",
                  "Quantity 12.0",
                ].map((heading, i) => (
                  <React.Fragment key={i}>
                    {heading === "Delete" &&
                      [
                        "admin_level_three",
                        "admin",
                        "admin_secretary",
                      ].includes(userData.eaccounttype) && (
                        <th
                          key={i}
                          className="py-2 px-4 text-black text-center whitespace-nowrap"
                        >
                          {heading}
                        </th>
                      )}
                    {heading === "Total price" &&
                      ["admin", "admin_secretary"].includes(
                        userData.eaccounttype,
                      ) && (
                        <th
                          key={i}
                          className="py-2 px-4 text-center text-black whitespace-nowrap"
                        >
                          {heading}
                        </th>
                      )}
                    {!["Delete", "Total price"].includes(heading) && (
                      <th
                        key={i}
                        className="py-2 px-4 text-center text-black whitespace-nowrap"
                      >
                        {heading}
                      </th>
                    )}
                  </React.Fragment>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentCart.length > 0 ? (
                currentCart.map((order, index) => {
                  const quantityTotal =
                    Number(order.quantitydefault) +
                    Number(order.quantityxxs) +
                    Number(order.quantityxs) +
                    Number(order.quantittys) +
                    Number(order.quantitym) +
                    Number(order.quantityl) +
                    Number(order.quantityxl) +
                    Number(order.quantityxxl) +
                    Number(order.quantity5) +
                    Number(order.quantity55) +
                    Number(order.quantity6) +
                    Number(order.quantity65) +
                    Number(order.quantity7) +
                    Number(order.quantity75) +
                    Number(order.quantity8) +
                    Number(order.quantity85) +
                    Number(order.quantity9) +
                    Number(order.quantity95) +
                    Number(order.quantity100) +
                    Number(order.quantity105) +
                    Number(order.quantitty110) +
                    Number(order.quantity115) +
                    Number(order.quantity120);

                  return (
                    <tr key={index} className="border-t">
                      {[
                        "admin_level_three",
                        "admin",
                        "admin_secretary",
                      ].includes(userData.eaccounttype) && (
                        <td
                          className="py-2 px-4 text-red-500 text-center cursor-pointer whitespace-nowrap"
                          onClick={async () => {
                            const { isConfirmed } = await Swal.fire({
                              title: "Are you sure?",
                              text: "Do you really want to delete this order?",
                              icon: "warning",
                              showCancelButton: true,
                              confirmButtonColor: "#d33",
                              cancelButtonColor: "#3085d6",
                              confirmButtonText: "Yes, delete it!",
                              cancelButtonText: "Cancel",
                            });
                            if (!isConfirmed) return;
                            handleDelete(index);
                            getCart();
                          }}
                        >
                          Delete
                        </td>
                      )}

                      <td className="py-2 px-4 text-black text-center whitespace-nowrap">
                        {order.productId}
                      </td>
                      <td className="py-2 px-4 text-black  text-center whitespace-nowrap">
                        {order.title}
                      </td>
                      <td className="py-2 px-4 text-black text-center whitespace-nowrap">
                        {order.category}
                      </td>
                      {["admin", "admin_secretary"].includes(
                        userData.eaccounttype,
                      ) && (
                        <td className="py-2 px-4 text-center text-black whitespace-nowrap">
                          {Number(order.price).toLocaleString()} ₱
                        </td>
                      )}

                      <td className="py-2 px-4 text-center text-black whitespace-nowrap">
                        {quantityTotal} pcs.
                      </td>
                      {/* <td className="py-2 px-4 text-center whitespace-nowrap">
                        {order.cost}
                      </td> */}
                      <td
                        className={`py-2 px-4 text-center text-black whitespace-nowrap ${Number(order.quantitydefault) > 0 && "text-red-500"}`}
                      >
                        {Number(order.quantitydefault) === 0
                          ? "--"
                          : Number(order.quantitydefault).toLocaleString()}
                      </td>
                      <td
                        className={`py-2 px-4 text-center text-black whitespace-nowrap ${Number(order.quantityxxs) > 0 && "text-red-500"}`}
                      >
                        {Number(order.quantityxxs) === 0
                          ? "--"
                          : Number(order.quantityxxs).toLocaleString()}
                      </td>
                      <td
                        className={`py-2 px-4 text-center text-black whitespace-nowrap ${Number(order.quantityxs) > 0 && "text-red-500"}`}
                      >
                        {Number(order.quantityxs) === 0
                          ? "--"
                          : Number(order.quantityxs).toLocaleString()}
                      </td>
                      <td
                        className={`py-2 px-4 text-center text-black whitespace-nowrap ${Number(order.quantittys) > 0 && "text-red-500"}`}
                      >
                        {Number(order.quantittys) === 0
                          ? "--"
                          : Number(order.quantittys).toLocaleString()}
                      </td>
                      <td
                        className={`py-2 px-4 text-center text-black whitespace-nowrap ${Number(order.quantitym) > 0 && "text-red-500"}`}
                      >
                        {Number(order.quantitym) === 0
                          ? "--"
                          : Number(order.quantitym).toLocaleString()}
                      </td>
                      <td
                        className={`py-2 px-4 text-center text-black whitespace-nowrap ${Number(order.quantityl) > 0 && "text-red-500"}`}
                      >
                        {Number(order.quantityl) === 0
                          ? "--"
                          : Number(order.quantityl).toLocaleString()}
                      </td>
                      <td
                        className={`py-2 px-4 text-center text-black whitespace-nowrap ${Number(order.quantityxl) > 0 && "text-red-500"}`}
                      >
                        {Number(order.quantityxl) === 0
                          ? "--"
                          : Number(order.quantityxl).toLocaleString()}
                      </td>
                      <td
                        className={`py-2 px-4 text-center text-black whitespace-nowrap ${Number(order.quantityxxl) > 0 && "text-red-500"}`}
                      >
                        {Number(order.quantityxxl) === 0
                          ? "--"
                          : Number(order.quantityxxl).toLocaleString()}
                      </td>
                      <td
                        className={`py-2 px-4 text-center text-black whitespace-nowrap ${Number(order.quantity5) > 0 && "text-red-500"}`}
                      >
                        {Number(order.quantity5) === 0
                          ? "--"
                          : Number(order.quantity5).toLocaleString()}
                      </td>
                      <td
                        className={`py-2 px-4 text-center text-black whitespace-nowrap ${Number(order.quantity55) > 0 && "text-red-500"}`}
                      >
                        {Number(order.quantity55) === 0
                          ? "--"
                          : Number(order.quantity55).toLocaleString()}
                      </td>
                      <td
                        className={`py-2 px-4 text-center text-black whitespace-nowrap ${Number(order.quantity6) > 0 && "text-red-500"}`}
                      >
                        {Number(order.quantity6) === 0
                          ? "--"
                          : Number(order.quantity6).toLocaleString()}
                      </td>
                      <td
                        className={`py-2 px-4 text-center text-black whitespace-nowrap ${Number(order.quantity65) > 0 && "text-red-500"}`}
                      >
                        {Number(order.quantity65) === 0
                          ? "--"
                          : Number(order.quantity65).toLocaleString()}
                      </td>
                      <td
                        className={`py-2 px-4 text-center text-black whitespace-nowrap ${Number(order.quantity7) > 0 && "text-red-500"}`}
                      >
                        {Number(order.quantity7) === 0
                          ? "--"
                          : Number(order.quantity7).toLocaleString()}
                      </td>
                      <td
                        className={`py-2 px-4 text-center text-black whitespace-nowrap ${Number(order.quantity75) > 0 && "text-red-500"}`}
                      >
                        {Number(order.quantity75) === 0
                          ? "--"
                          : Number(order.quantity75).toLocaleString()}
                      </td>
                      <td
                        className={`py-2 px-4 text-center text-black whitespace-nowrap ${Number(order.quantity8) > 0 && "text-red-500"}`}
                      >
                        {Number(order.quantity8) === 0
                          ? "--"
                          : Number(order.quantity8).toLocaleString()}
                      </td>
                      <td
                        className={`py-2 px-4 text-center text-black whitespace-nowrap ${Number(order.quantity85) > 0 && "text-red-500"}`}
                      >
                        {Number(order.quantity85) === 0
                          ? "--"
                          : Number(order.quantity85).toLocaleString()}
                      </td>
                      <td
                        className={`py-2 px-4 text-center text-black whitespace-nowrap ${Number(order.quantity9) > 0 && "text-red-500"}`}
                      >
                        {Number(order.quantity9) === 0
                          ? "--"
                          : Number(order.quantity9).toLocaleString()}
                      </td>
                      <td
                        className={`py-2 px-4 text-center text-black whitespace-nowrap ${Number(order.quantity95) > 0 && "text-red-500"}`}
                      >
                        {Number(order.quantity95) === 0
                          ? "--"
                          : Number(order.quantity95).toLocaleString()}
                      </td>
                      <td
                        className={`py-2 px-4 text-center text-black whitespace-nowrap ${Number(order.quantity100) > 0 && "text-red-500"}`}
                      >
                        {Number(order.quantity100) === 0
                          ? "--"
                          : Number(order.quantity100).toLocaleString()}
                      </td>
                      <td
                        className={`py-2 px-4 text-center text-black whitespace-nowrap ${Number(order.quantity105) > 0 && "text-red-500"}`}
                      >
                        {Number(order.quantity105) === 0
                          ? "--"
                          : Number(order.quantity105).toLocaleString()}
                      </td>
                      <td
                        className={`py-2 px-4 text-center text-black whitespace-nowrap ${Number(order.quantitty110) > 0 && "text-red-500"}`}
                      >
                        {Number(order.quantitty110) === 0
                          ? "--"
                          : Number(order.quantitty110).toLocaleString()}
                      </td>
                      <td
                        className={`py-2 px-4 text-center text-black whitespace-nowrap ${Number(order.quantity115) > 0 && "text-red-500"}`}
                      >
                        {Number(order.quantity115) === 0
                          ? "--"
                          : Number(order.quantity115).toLocaleString()}
                      </td>
                      <td
                        className={`py-2 px-4 text-center text-black whitespace-nowrap ${Number(order.quantity120) > 0 && "text-red-500"}`}
                      >
                        {Number(order.quantity120) === 0
                          ? "--"
                          : Number(order.quantity120).toLocaleString()}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr className="border-t">
                  <td
                    className="py-2 px-4 text-black text-center whitespace-nowrap"
                    colSpan={100}
                  >
                    No current data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {addOrderModal && (
        <CPostOrderAddOrderModal
          setPostOrderModal={setAddOrderModal}
          currentCart={currentCart}
          userId={userData.username}
        />
      )}
    </>
  );
};

export default CPostOrderTable;
