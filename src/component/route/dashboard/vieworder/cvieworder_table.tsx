"use client";

import { TUserSession } from "@/schema/main_schema";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import useV1ViewOrderItem from "@/hooks/api_hooks/usev1vieworderitem";
import useV1GetSingleOrderUser from "@/hooks/api_hooks/usev1getsingleorderuser";
import useV1GetInstallment from "@/hooks/api_hooks/usev1getinstallment";
import useV1PostInstallment from "@/hooks/api_hooks/usev1postinstallment";
import useV1DeleteInstallment from "@/hooks/api_hooks/usev1deleteinstallment";
import useV1EditInstallment from "@/hooks/api_hooks/usev1editinstallment";
import CViewOrderEditPaymentModal from "./cvieworder_editpaymentmodal";
import useV1OrderGenerateBarcode from "@/hooks/api_hooks/usev1ordergeneratebarcode";
import { EParamsDefault } from "@/enum/main_enum";
import Swal from "sweetalert2";
import useV1GetLogs from "@/hooks/api_hooks/usev1getlogs";

  const quantityMap: Record<string, string> = {
    quantityxxs: "XXS",
    quantityxs: "XS",
    quantitys: "S",
    quantitym: "M",
    quantityl: "L",
    quantityxl: "XL",
    quantityxxl: "XXL",
    quantity5: "5.0",
    quantity55: "5.5",
    quantity6: "6.0",
    quantity65: "6.5",
    quantity7: "7.0",
    quantity75: "7.5",
    quantity8: "8.0",
    quantity85: "8.5",
    quantity9: "9.0",
    quantity95: "9.5",
    quantity100: "10.0",
    quantity105: "10.5",
    quantity110: "11.0",
    quantity115: "11.5",
    quantity120: "12.0",
    quantitydefault: "default",
  };


const CViewOrderTable = (props: { userData: TUserSession }) => {
  const { userData } = props;
  const [loading, setLoading] = useState<boolean>(true);
  const [editModal, setEditModal] = useState<boolean>(false);
  const currentOrderId = usePathname()?.split("/")[3];
  const [selectedInstallment, setSelectedInstallment] = useState<any>(null);
  const { getV1ViewOrderItem, orderList, currentSkip, setCurrentSkip } =
    useV1ViewOrderItem();
  const totalPages = 9999;
  const pageSize = 5;

  const { getV1GetSingleOrderUser, orderUser } = useV1GetSingleOrderUser();
  const { getV1GetInstallment, installmentList } = useV1GetInstallment();
  const { getV1PostInstallment, setPayload, payload } = useV1PostInstallment();

  const {
    APILocalOrderGenerateBarcode
  } = useV1OrderGenerateBarcode();

  const { getV1DeleteInstallment } = useV1DeleteInstallment();

  const { getV1EditInstallment, installmentParams, description, setDescription, setInstallmentParams } =
    useV1EditInstallment();

  const handleNext = () => {
    setCurrentSkip((prev) => (prev < totalPages ? prev + 1 : prev));
  };

  const handlePrevious = () => {
    setCurrentSkip((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const {
    getV1GetLogsOrder,
    orderLogs,
    setOrderLogs
  } = useV1GetLogs();

  const paginationNumbers = Array.from(
    {
      length: Math.min(
        pageSize,
        totalPages - Math.floor((currentSkip - 1) / pageSize) * pageSize,
      ),
    },
    (_, i) => i + 1 + Math.floor((currentSkip - 1) / pageSize) * pageSize,
  );

  const initializer = async () => {
    setLoading(true); // Start loading
    try {
      await Promise.all([
        getV1GetInstallment({ orderid: currentOrderId }),
        getV1GetLogsOrder(currentOrderId),
        getV1GetSingleOrderUser({ orderid: currentOrderId }),
      ]);
    } finally {
      setLoading(false); // End loading
    }
  };
  useEffect(() => {
    initializer();
  }, []);

  useEffect(() => {
    getV1ViewOrderItem({ orderid: currentOrderId });
  }, [currentSkip]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-opacity-25 mb-4"></div>
          <p className="text-lg text-gray-700 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="p-6 bg-white min-h-screen">
        <h2 className="text-2xl text-black font-bold mb-4">
          Order ID: {orderUser?.orderid || ""}
        </h2>
        <div className="gap-x-2 mb-5">
          <p className="text-black">
            Order type: {`${orderUser?.type === "on_hand_layaway" ? "Inhand": "Pre-ordered"}`}
          </p>
          <p className="text-black">
            Full name:{" "}
            {`${orderUser?.receiverfirstname} ${orderUser?.receiverlastname}`}
          </p>
          <p className="text-black">
            Date order:{" "}
            {`${new Date(orderUser?.orderdate || "").toLocaleDateString() || ""}`}
          </p>
          <p className="text-black">Region: {`${orderUser?.region}`}</p>
          <p className="text-black">Province: {`${orderUser?.province}`}</p>
          <p className="text-black">Municity: {`${orderUser?.municity}`}</p>
          <p className="text-black">Barangay: {`${orderUser?.barangay}`}</p>
          <p className="text-black">
            Mobile number: {`${orderUser?.receivermobile || ""}`}
          </p>
          <p className="text-black">Address: {`${orderUser?.address || ""}`}</p>
          <p className="text-black">
            Current payment:{" "}
            {`${Number(orderUser?.cuurentpayment).toLocaleString() || ""}`} ₱
          </p>
          <p className="text-black">
            Total price:{" "}
            {`${Number(orderUser?.totalcost).toLocaleString() || ""}`} ₱
          </p>
          <p className="text-black">
            Origin:{" "}
            <span
              className={`${orderUser?.originsite === "shoppee" && "text-orange-500"} ${orderUser?.originsite === "facebook" && "text-blue-500"}  font-semibold`}
            >{`${orderUser?.originsite.toLocaleUpperCase() || ""}`}</span>{" "}
          </p>
          <p className="text-black">
            Status:{" "}
            <span
              className={`${orderUser?.estatustype === "success" ? "text-green-500" : "text-red-500"} font-semibold`}
            >{`${orderUser?.estatustype?.toLocaleUpperCase() || ""}`}</span>{" "}
          </p>
        </div>

        <div className="w-full overflow-x-auto whitespace-nowrap mb-5">
          <h1 className="text-black mb-3 text-lg font-bold uppercase">
            Payment History
          </h1>
          <div className="flex items-center gap-3 mb-4">
            <input
              type="text"
              value={payload?.amount || ""}
              onChange={(e) => {
                setPayload((prev) => ({
                  ...prev,
                  amount: e.target.value,
                }));
              }}
              placeholder="Enter payment details"
              className="border border-black text-black rounded-lg px-4 py-2 w-[20em] focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              className="bg-blue-600 text-white cursor-pointer px-4 py-2 rounded-lg hover:bg-blue-700 transition"
  onClick={async () => {
    Swal.fire({
      title: "Posting customer's payment, please wait...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      await getV1PostInstallment({
        orderid: orderUser?.orderid!,
      });
      Swal.close(); // or show a success modal if needed
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong while adding the payment.",
      });
    }
  }}
            >
              Add Payment
            </button>
            {
              ((orderUser?.estatustype !== EParamsDefault.success) && (orderUser?.estatustype !== EParamsDefault.ondelivery))
              &&
            <button
              className="bg-orange-600 text-white cursor-pointer px-4 py-2 rounded-lg hover:bg-orange-700 transition"
              onClick={() => {
                APILocalOrderGenerateBarcode({
                  session: userData as any,
                  orderid: orderUser?.orderid as string || ""
                });
              }}
            >
              Generate order QR Codes 
            </button>
            }

          </div>
          <table className="min-w-full table-auto bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-blue-100 text-gray-700">
              <tr>
                <th className="py-3 px-6 text-left text-sm font-semibold">
                  Payment Date
                </th>
                <th className="py-3 px-6 text-left text-sm font-semibold">
                  Amount (₱)
                </th>
                <th className="py-3 px-6 text-left text-sm font-semibold">
                  Edit
                </th>
                <th className="py-3 px-6 text-left text-sm font-semibold">
                  Delete
                </th>
                <th className="py-3 px-6 text-left text-sm font-semibold">
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              {installmentList.length > 0 ? (
                installmentList.map((installment, index) => (
                  <tr
                    key={index}
                    className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} border-t`}
                  >
                    <td className="py-3 px-6 text-l text-gray-800">
                      {new Date(installment.installmentdate).toLocaleDateString(
                        "en-PH",
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        },
                      )}
                    </td>
                    <td className="py-3 px-6 text-l text-green-600 font-medium">
                      ₱ {Number(installment?.installment || 0).toLocaleString()}
                    </td>
                    <td className="py-3 px-6 text-l text-blue-600 font-medium">
                      <button
                        className="cursor-pointer"
                        onClick={() => {
                            setSelectedInstallment(installment); 
                          setEditModal(true);
                        }}
                      >
                        Edit
                      </button>
                    </td>
                    <td className="py-3 px-6 text-l text-red-500 font-medium">
                      <button
                        className="cursor-pointer"
                        onClick={() => {
                          getV1DeleteInstallment({
                            id: installment?.id,
                            orderid: installment?.orderid,
                          });
                        }}
                      >
                        Delete
                      </button>
                    </td>
                    <td className="py-3 px-6 text-l text-black font-medium">

                        {installment?.description || "none"}
                      
                    </td>
                      {editModal && selectedInstallment && (
                        <CViewOrderEditPaymentModal
                          setEditModal={setEditModal}
                          installmentParams={installmentParams}
                          setInstallmentParams={setInstallmentParams}
                          getV1EditInstallment={getV1EditInstallment}
                          installment={selectedInstallment}
                          description={description}
                          setDescription={setDescription}
                        />
                      )}
                  </tr>
                ))
              ) : (
                <tr className="border-t">
                  <td
                    colSpan={4}
                    className="py-4 px-6 text-center text-gray-500"
                  >
                    No payment history available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

<div className="mt-4 overflow-x-auto">
  <h1 className="font-bold mb-2 text-blue-500">Item logs</h1>
  <table className="min-w-full table-auto bg-white shadow-md rounded-lg overflow-hidden">
    <thead className="bg-gray-100 text-gray-700">
      <tr>
        <th className="py-3 px-6 text-left text-sm font-semibold">Date logged</th>
        <th className="py-3 px-6 text-left text-sm font-semibold">Product name</th>
        <th className="py-3 px-6 text-left text-sm font-semibold">Product size</th>
      </tr>
    </thead>
    <tbody>
      {orderLogs && orderLogs.length > 0 ? (
        orderLogs.map((log, index) => (
          <tr key={index} className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} border-t`}>
            <td className="py-3 px-6 text-sm text-gray-800">
              {new Date(log.logdate).toLocaleString("en-PH")}
            </td>
            <td className="py-3 px-6 text-sm text-black">{log.title || "Unknown"}</td>
            <td className="py-3 px-6 text-sm text-blue-600 font-medium">{quantityMap[`${log.size}`]}</td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={4} className="py-4 px-6 text-center text-gray-500">
            No logs available.
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>

        <div className="w-full overflow-x-auto whitespace-nowrap">
          <h1 className="text-blue-500 font-bold mb-2">Customer's order</h1>
          <table className="table-auto w-max bg-white shadow-md rounded-lg">
            <thead className="bg-gray-200">
              <tr>
                {[
                  "Product ID",
                  "Product name",
                  "Category",
                  "Total price",
                  "Total quantity",
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
                  <th
                    key={i}
                    className="py-2 px-4 text-black text-center whitespace-nowrap"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orderList.length > 0 ? (
                orderList.map((order, index) => {
                  const quantityTotal =
                    Number(order.quantitydefault) +
                    Number(order.quantityxxs) +
                    Number(order.quantityxs) +
                    Number(order.quantitys) +
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
                    Number(order.quantity110) +
                    Number(order.quantity115) +
                    Number(order.quantity120);

                  return (
                    <tr key={index} className="border-t">
                      <td className="py-2 px-4 text-center text-black whitespace-nowrap">
                        {order.productid}
                      </td>
                      <td className="py-2 px-4 text-center text-black whitespace-nowrap">
                        {order.title}
                      </td>
                      <td className="py-2 px-4 text-center text-black whitespace-nowrap">
                        {order.category}
                      </td>
                      {/* <td className="py-2 px-4 text-center whitespace-nowrap">{order.}</td>
                      <td className="py-2 px-4 text-center whitespace-nowrap">{order.}</td> */}

                      <td className="py-2 px-4 text-center text-black whitespace-nowrap">
                        {Number(order.price).toLocaleString()}
                      </td>
                      {/* <td className="py-2 px-4 text-center whitespace-nowrap">
                        {Number(order.cost).toLocaleString()}
                      </td> */}
                      <td className="py-2 px-4 text-center text-black whitespace-nowrap">
                        {Number(order.orderquantity).toLocaleString()}
                      </td>
                      <td
                        className={`py-2 px-4 text-center whitespace-nowrap ${Number(order.quantitydefault) > 0 ? "text-red-500" : "text-black"}`}
                      >
                        {Number(order.quantitydefault) === 0
                          ? "--"
                          : Number(order.quantitydefault).toLocaleString()}
                      </td>
                      <td
                        className={`py-2 px-4 text-center whitespace-nowrap ${Number(order.quantityxxs) > 0 ? "text-red-500" : "text-black"}`}
                      >
                        {Number(order.quantityxxs) === 0
                          ? "--"
                          : Number(order.quantityxxs).toLocaleString()}
                      </td>
                      <td
                        className={`py-2 px-4 text-center whitespace-nowrap ${Number(order.quantityxs) > 0 ? "text-red-500" : "text-black"}`}
                      >
                        {Number(order.quantityxs) === 0
                          ? "--"
                          : Number(order.quantityxs).toLocaleString()}
                      </td>
                      <td
                        className={`py-2 px-4 text-center whitespace-nowrap ${Number(order.quantitys) > 0 ? "text-red-500" : "text-black"}`}
                      >
                        {Number(order.quantitys) === 0
                          ? "--"
                          : Number(order.quantitys).toLocaleString()}
                      </td>
                      <td
                        className={`py-2 px-4 text-center whitespace-nowrap ${Number(order.quantitym) > 0 ? "text-red-500" : "text-black"}`}
                      >
                        {Number(order.quantitym) === 0
                          ? "--"
                          : Number(order.quantitym).toLocaleString()}
                      </td>
                      <td
                        className={`py-2 px-4 text-center whitespace-nowrap ${Number(order.quantityl) > 0 ? "text-red-500" : "text-black"}`}
                      >
                        {Number(order.quantityl) === 0
                          ? "--"
                          : Number(order.quantityl).toLocaleString()}
                      </td>
                      <td
                        className={`py-2 px-4 text-center whitespace-nowrap ${Number(order.quantityxl) > 0 ? "text-red-500" : "text-black"}`}
                      >
                        {Number(order.quantityxl) === 0
                          ? "--"
                          : Number(order.quantityxl).toLocaleString()}
                      </td>
                      <td
                        className={`py-2 px-4 text-center whitespace-nowrap ${Number(order.quantityxxl) > 0 ? "text-red-500" : "text-black"}`}
                      >
                        {Number(order.quantityxxl) === 0
                          ? "--"
                          : Number(order.quantityxxl).toLocaleString()}
                      </td>
                      <td
                        className={`py-2 px-4 text-center whitespace-nowrap ${Number(order.quantity5) > 0 ? "text-red-500" : "text-black"}`}
                      >
                        {Number(order.quantity5) === 0
                          ? "--"
                          : Number(order.quantity5).toLocaleString()}
                      </td>
                      <td
                        className={`py-2 px-4 text-center whitespace-nowrap ${Number(order.quantity55) > 0 ? "text-red-500" : "text-black"}`}
                      >
                        {Number(order.quantity55) === 0
                          ? "--"
                          : Number(order.quantity55).toLocaleString()}
                      </td>
                      <td
                        className={`py-2 px-4 text-center whitespace-nowrap ${Number(order.quantity6) > 0 ? "text-red-500" : "text-black"}`}
                      >
                        {Number(order.quantity6) === 0
                          ? "--"
                          : Number(order.quantity6).toLocaleString()}
                      </td>
                      <td
                        className={`py-2 px-4 text-center whitespace-nowrap ${Number(order.quantity65) > 0 ? "text-red-500" : "text-black"}`}
                      >
                        {Number(order.quantity65) === 0
                          ? "--"
                          : Number(order.quantity65).toLocaleString()}
                      </td>
                      <td
                        className={`py-2 px-4 text-center whitespace-nowrap ${Number(order.quantity7) > 0 ? "text-red-500" : "text-black"}`}
                      >
                        {Number(order.quantity7) === 0
                          ? "--"
                          : Number(order.quantity7).toLocaleString()}
                      </td>
                      <td
                        className={`py-2 px-4 text-center whitespace-nowrap ${Number(order.quantity75) > 0 ? "text-red-500" : "text-black"}`}
                      >
                        {Number(order.quantity75) === 0
                          ? "--"
                          : Number(order.quantity75).toLocaleString()}
                      </td>
                      <td
                        className={`py-2 px-4 text-center whitespace-nowrap ${Number(order.quantity8) > 0 ? "text-red-500" : "text-black"}`}
                      >
                        {Number(order.quantity8) === 0
                          ? "--"
                          : Number(order.quantity8).toLocaleString()}
                      </td>
                      <td
                        className={`py-2 px-4 text-center whitespace-nowrap ${Number(order.quantity85) > 0 ? "text-red-500" : "text-black"}`}
                      >
                        {Number(order.quantity85) === 0
                          ? "--"
                          : Number(order.quantity85).toLocaleString()}
                      </td>
                      <td
                        className={`py-2 px-4 text-center whitespace-nowrap ${Number(order.quantity9) > 0 ? "text-red-500" : "text-black"}`}
                      >
                        {Number(order.quantity9) === 0
                          ? "--"
                          : Number(order.quantity9).toLocaleString()}
                      </td>
                      <td
                        className={`py-2 px-4 text-center whitespace-nowrap ${Number(order.quantity95) > 0 ? "text-red-500" : "text-black"}`}
                      >
                        {Number(order.quantity95) === 0
                          ? "--"
                          : Number(order.quantity95).toLocaleString()}
                      </td>
                      <td
                        className={`py-2 px-4 text-center whitespace-nowrap ${Number(order.quantity100) > 0 ? "text-red-500" : "text-black"}`}
                      >
                        {Number(order.quantity100) === 0
                          ? "--"
                          : Number(order.quantity100).toLocaleString()}
                      </td>
                      <td
                        className={`py-2 px-4 text-center whitespace-nowrap ${Number(order.quantity105) > 0 ? "text-red-500" : "text-black"}`}
                      >
                        {Number(order.quantity105) === 0
                          ? "--"
                          : Number(order.quantity105).toLocaleString()}
                      </td>
                      <td
                        className={`py-2 px-4 text-center whitespace-nowrap ${Number(order.quantity110) > 0 ? "text-red-500" : "text-black"}`}
                      >
                        {Number(order.quantity110) === 0
                          ? "--"
                          : Number(order.quantity110).toLocaleString()}
                      </td>
                      <td
                        className={`py-2 px-4 text-center whitespace-nowrap ${Number(order.quantity115) > 0 ? "text-red-500" : "text-black"}`}
                      >
                        {Number(order.quantity115) === 0
                          ? "--"
                          : Number(order.quantity115).toLocaleString()}
                      </td>
                      <td
                        className={`py-2 px-4 text-center whitespace-nowrap ${Number(order.quantity120) > 0 ? "text-red-500" : "text-black"}`}
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

      </div>

      
    </>
  );
};

export default CViewOrderTable;
