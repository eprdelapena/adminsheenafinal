import useV1DeleteOrderUser from "@/hooks/api_hooks/usev1deleteorderuser";
import { TDataGetOrderUser } from "@/schema/main_schema";
import React, { useState } from "react";
import COrdersModalEditStatus from "./corders_modaleditstatus";
import { EAdminRoutes } from "@/enum/main_enum";

const COrdersTableBody = (props: {
  order: TDataGetOrderUser;
  index: number;
  getV1GetOrderUser(): Promise<void>;
}) => {
  const { order, index, getV1GetOrderUser } = props;
  const [editStatusModal, setEditStatusModal] = useState<boolean>(false);

  const { getV1DeleteOrderUser } = useV1DeleteOrderUser();

  return (
    <tr key={index} className="border-t">
      <td className="py-2 px-4 text-center text-black">
        {new Date(order.orderdate).toLocaleDateString()}
      </td>
     <td className={`py-2 px-4 text-center font-semibold ${(Number(order.totalcost) - Number(order.cuurentpayment)) > 0 ? "text-red-500" : "text-green-500" } `}>

        {
          (Number(order.totalcost) - Number(order.cuurentpayment)) > 0 
          ?
            <>{(Number(order.totalcost) - Number(order.cuurentpayment) ).toLocaleString() } ₱</> 
          :
          <>PAID</>
        }
       
      </td>
                  <td className={`py-2 px-4 text-center text-black font-semibold ${order.type === "in_transit_layaway" ? "text-violet-500" : "text-blue-500"} uppercase`}>{order.type === "in_transit_layaway" ? "PRE-ORDERED" : "IN-HAND"}</td>

            <td className="py-2 px-4 text-center text-black">{order.orderid}</td>

      <td className="py-2 px-4 text-center text-black">
        {order.receiverfirstname} {order.receiverlastname}
      </td>

      <td className="py-2 px-4 flex gap-x-4">
        <button
          className="text-blue-500 cursor-pointer"
          type="button"
          onClick={() => {
            setEditStatusModal(true);
          }}
        >
          Edit status
        </button>
        <a
          href={`${EAdminRoutes.DASHBOARDVIEWORDER}/${order.orderid}`}
          className="text-blue-500 cursor-pointer"
          type="button"
        >
          View orders
        </a>
      </td>
      <td
        className={`py-2 px-4 text-center ${order.estatustype === "success" ? "text-green-500" : "text-red-500"} font-semibold`}
      >
        {order.estatustype.toLocaleUpperCase()}
      </td>
      <td
        className={`py-2 px-4 text-center ${order.originsite === "shoppee" && "text-orange-500"} ${order.originsite === "facebook" && "text-blue-500"} font-semibold`}
      >
        {order.originsite.toLocaleUpperCase()}
      </td>

      <td className="py-2 px-4 text-center text-black">{order.username}</td>
      <td className="py-2 px-4 text-center text-black">{order.region}</td>
      <td className="py-2 px-4 text-center text-black">{order.province}</td>
      <td className="py-2 px-4 text-center text-black">{order.municity}</td>
      <td className="py-2 px-4 text-center text-black">{order.address}</td>
      <td className="py-2 px-4 text-center text-black">{order.receivermobile}</td>


      <td className="py-2 px-4">
        <button
          className="text-red-500 cursor-pointer"
          type="button"
          onClick={() => {
            getV1DeleteOrderUser({
              orderId: order.orderid,
              callbackFunction: getV1GetOrderUser,
            });
          }}
        >
          Cancel order
        </button>
      </td>
      {editStatusModal && (
        <COrdersModalEditStatus
          setEditStatusModal={setEditStatusModal}
          getV1GetOrderUser={getV1GetOrderUser}
          order={order}
        />
      )}
    </tr>
  );
};

export default COrdersTableBody;
