import { TDataGetProducts, TUserSession } from "@/schema/main_schema";
import React, { useContext } from "react";
import CProductTableContent from "./cproduct_tablecontent";
import { UserDataContext } from "@/hooks/context/main_context";
import useV1GenerateBarcode from "@/hooks/api_hooks/usev1generatebarcode";

const CProductTableBody = (props: {
  productList: TDataGetProducts[];
  getV1DeleteProduct: (payload: {
    productid: number;
    callbackFunction?: any;
  }) => Promise<void>;
  getV1GetProduct: () => Promise<void>;
}) => {
  const { productList, getV1DeleteProduct, getV1GetProduct } = props;
  const userData = useContext(UserDataContext);
  const { eaccounttype } = userData as TUserSession;

  return (
    <div className="overflow-x-auto whitespace-nowrap">
      <table className="w-full bg-white shadow-md rounded-lg">
        <thead className="bg-gray-200">
          <tr>
          <th className="py-2 px-4 text-center text-black uppercase">
              Product image
            </th>
            <th className="py-2 px-4 text-center text-black uppercase">
              Pending orders
            </th>
            <th className="py-2 px-4 text-center text-black uppercase">
              Product ID
            </th>
            <th className="py-2 px-4 text-center text-black uppercase">
              Date added
            </th>

            {eaccounttype !== "admin_viewer" && (
              <th className="py-2 px-4 text-center text-black uppercase">
                Add product to customer cart
              </th>
            )}

            <th className="py-2 px-4 text-center text-black uppercase">
              Product Name
            </th>
            <th className="py-2 px-4 text-center text-black uppercase">
              Category
            </th>
            <th className="py-2 px-4 text-center text-black uppercase">
              {" "}
              Barcode
            </th>
            {["admin", "admin_viewer", "admin_secretary"].includes(
              eaccounttype,
            ) && (
              <>
                <th className="py-2 px-4 text-center text-black uppercase">
                  {" "}
                  Selling price per item (a)
                </th>
                <th className="py-2 px-4 text-center text-black uppercase">
                  {" "}
                  Buying price per item(b)
                </th>
                {/* <th className="py-2 px-4 text-center text-black uppercase">
                  Profit per item (a-b)
                </th> */}
                <th className="py-2 px-4 text-center text-black uppercase">
                  remaining qty. (e)
                </th>
                <th className="py-2 px-4 text-center text-black uppercase">
                  Pending orders (c)
                </th>
                {/* <th className="py-2 px-4 text-center text-black uppercase">
                  Success orders (d)
                </th>
                <th className="py-2 px-4 text-center text-black uppercase">
                  Total orders (c+d)
                </th> */}
                {/* <th className="py-2 px-4 text-center text-black uppercase">
                  {" "}
                  Bal. from remaining items (e x (a-b))
                </th> */}
                {/* <th className="py-2 px-4 text-center text-black uppercase">
                  Total product expenses
                </th> */}
                {/* <th className="py-2 px-4 text-center text-black uppercase">
                  Bal.
                </th>
                <th className="py-2 px-4 text-center text-black uppercase">
                  Gross income
                </th> */}
              </>
            )}
                        {!["admin_level_one", "admin_viewer"].includes(eaccounttype) && (
              <th className="py-2 px-4 text-center text-black uppercase">
                Edit
              </th>
            )}

            {!["admin_level_one", "admin_level_two"].includes(eaccounttype) && (
              <th className="py-2 px-4 text-center text-black uppercase">
                Delete
              </th>
            )}

          </tr>
          
        </thead>
        <tbody>
          {productList.length > 0 ? (
            productList.map((product) => (
              <CProductTableContent
                key={product.id}
                product={product}
                getV1DeleteProduct={getV1DeleteProduct}
                getV1GetProduct={getV1GetProduct}
              />
            ))
          ) : (
            <tr className="border-t">
              <td className="py-2 px-4 text-black text-left" colSpan={100}></td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CProductTableBody;
