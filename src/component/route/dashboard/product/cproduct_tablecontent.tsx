import { TDataGetProducts, TUserSession } from "@/schema/main_schema";
import React, { useContext, useState } from "react";
import CEditProductModal from "./cproduct_editproduct";
import CPostOrderModal from "./cproduct_postorder";
import Swal from "sweetalert2";
import { UserDataContext } from "@/hooks/context/main_context";
import CProductImageModal from "./cproduct_imagemodal";
import useV1GenerateBarcode from "@/hooks/api_hooks/usev1generatebarcode";
import { useSession } from "next-auth/react";
import CProductBarcodeModal from "./cproduct_generatebarcode";
import CPendingOrderModal from "./cproduct_pendingordermodal";
// import CProductBarcodeModal from "./cproduct_generatebarcode";

const CProductTableContent = (props: {
  product: TDataGetProducts;
  getV1DeleteProduct: (payload: {
    productid: number;
    callbackFunction?: any;
  }) => Promise<void>;
  getV1GetProduct: () => Promise<void>;
}) => {
  const { product, getV1DeleteProduct, getV1GetProduct } = props;
  const userData = useContext(UserDataContext);

  const [editModal, setEditModal] = useState<boolean>(false);
  const [orderModal, setOrderModal] = useState<boolean>(false);
  const [imageModal, setImageModal] = useState<boolean>(false);
  const [barcodeModal, setBarcodeModal] = useState<boolean>(false);
  const [pendingOrderModal, setPendingOrderModal] = useState<boolean>(false);

  const { eaccounttype } = userData as TUserSession;
  const { data: session } = useSession();

  return (
    <>
      <tr key={product.id} className="border-t">
        <td className="py-2 px-4 text-center ">
          <img className="w-[10em] h-[8em]" src={product?.image || ""} />

        </td>
        <td className="py-2 px-4 text-center ">
          <button
            className="text-green-800 cursor-pointer font-semibold"
            onClick={() => {
              setPendingOrderModal(true);
            }}
          >
            See pending orders
          </button>
        </td>
        <td className="py-2 px-4 text-center text-black">
          {product.productid}
        </td>
        <td className="py-2 px-4 text-center text-black">
          {new Date(product.regdate).toLocaleDateString()}
        </td>

        {eaccounttype !== "admin_viewer" && (
          <>
            <td className="py-2 px-4 text-center">
              <button
                className="text-blue-500 cursor-pointer"
                onClick={() => {
                  const cart = localStorage.getItem(
                    `cartItems_${userData?.username}`,
                  );

                  if (JSON.parse(cart as string)) {
                    const result = (
                      JSON.parse(cart as string) as { productId: number }[]
                    ).some((item) => item.productId === product.productid);
                    if (result) {
                      Swal.fire({
                        title: "Error",
                        text: "This item has already been added to the cart",
                        icon: "error",
                        confirmButtonText: "Try again",
                      });
                      return;
                    }
                  }

                  setOrderModal(true);
                }}
              >
                Add product to customer cart
              </button>
            </td>
          </>
        )}


        <td className="py-2 px-4 text-center text-black">{product.title}</td>
        <td className="py-2 px-4 text-center text-black">{product.category}</td>
        <td className="py-2 px-4 text-center ">
          <button
            className="text-orange-400 cursor-pointer font-semibold"
            onClick={() => {
              // APILocalGenerateBarcode(product, session);
              setBarcodeModal(true);
            }}
          >
            Generate barcode
          </button>
        </td>
        {["admin", "admin_viewer", "admin_secretary"].includes(
          eaccounttype,
        ) && (
          <>
            <td className="py-2 px-4 text-black text-center">
              {Number(product.price).toLocaleString()} ₱
            </td>
            <td className="py-2 px-4 text-black text-center">
              {Number(product.cost).toLocaleString()} ₱
            </td>
            {/* <td className="py-2 px-4 text-black text-center">
              {(Number(product.price) - Number(product.cost)).toLocaleString()}{" "}
              ₱
            </td> */}
            <td className="py-2 px-4 text-center text-black">
              {[
                "quantitydefault",
                "quantityxxs",
                "quantityxs",
                "quantitys",
                "quantitym",
                "quantityl",
                "quantityxl",
                "quantityxxl",
                "quantity5",
                "quantity55",
                "quantity6",
                "quantity65",
                "quantity7",
                "quantity75",
                "quantity8",
                "quantity85",
                "quantity9",
                "quantity95",
                "quantity100",
                "quantity105",
                "quantity110",
                "quantity115",
                "quantity120",
              ].reduce((sum, key) => {
                return sum + Number((product as any)[key] || 0);
              }, 0)}{" "}
              pcs.
            </td>
            <td className="py-2 px-4 text-center text-black">
              {Number(product.pendingorders).toLocaleString()}
            </td>
            {/* <td className="py-2 px-4 text-center text-black">
              {Number(product.successorders).toLocaleString()}
            </td> */}
            {/* <td className="py-2 px-4 text-center text-black">
              {Number(
                [
                  "quantitydefault",
                  "quantityxxs",
                  "quantityxs",
                  "quantitys",
                  "quantitym",
                  "quantityl",
                  "quantityxl",
                  "quantityxxl",
                  "quantity5",
                  "quantity55",
                  "quantity6",
                  "quantity65",
                  "quantity7",
                  "quantity75",
                  "quantity8",
                  "quantity85",
                  "quantity9",
                  "quantity95",
                  "quantity100",
                  "quantity105",
                  "quantity110",
                  "quantity115",
                  "quantity120",
                ].reduce((sum, key) => {
                  return sum + Number((product as any)[key] || 0);
                }, 0)
              * (Number(product.price) - Number(product.cost))).toLocaleString()}
            </td> */}

            {/* <td className="py-2 px-4 text-center text-black">
              {Number(
                product.successorders + Number(product.pendingorders),
              ).toLocaleString()}
            </td> */}
            {/* <td className="py-2 px-4 text-center text-black">
              {Number(
                [
                  "quantitydefault",
                  "quantityxxs",
                  "quantityxs",
                  "quantitys",
                  "quantitym",
                  "quantityl",
                  "quantityxl",
                  "quantityxxl",
                  "quantity5",
                  "quantity55",
                  "quantity6",
                  "quantity65",
                  "quantity7",
                  "quantity75",
                  "quantity8",
                  "quantity85",
                  "quantity9",
                  "quantity95",
                  "quantity100",
                  "quantity105",
                  "quantity110",
                  "quantity115",
                  "quantity120",
                ].reduce((sum, key) => {
                  return sum + Number((product as any)[key] || 0);
                }, 0) *
                  (Number(product.price) - Number(product.cost)),
              ).toLocaleString()}
            </td> */}

            {/* <td className="py-2 px-4 text-center text-black">
              {Number(product.expense).toLocaleString()} ₱
            </td> */}
            {/* <td className="py-2 px-4 text-center text-black">
              {Number(product.expected).toLocaleString()} ₱
            </td>
            <td className="py-2 px-4 text-center text-black">
              {Number(product.earning).toLocaleString()} ₱
            </td> */}
          </>
        )}

{!["admin_level_one", "admin_viewer"].includes(eaccounttype) && (
          <td className="py-2 px-4 text-center">
            <button
              className="text-blue-500 cursor-pointer"
              onClick={() => {
                setEditModal(true);
              }}
            >
              Edit
            </button>
          </td>
        )}

        {!["admin_level_one", "admin_level_two"].includes(eaccounttype) && (
          <td className="py-2 px-4 text-center">
            <button
              className="text-red-500 cursor-pointer"
              onClick={() => {
                if (product.pendingorders > 0) {
                  Swal.fire({
                    title: "Error",
                    text: "You cannot delete a product with pending orders",
                    icon: "error",
                    confirmButtonText: "Try again",
                  });
                  return;
                }

                const cart = localStorage.getItem(
                  `cartItems_${userData?.username}`,
                );

                if (JSON.parse(cart as string)) {
                  const result = (
                    JSON.parse(cart as string) as { productId: number }[]
                  ).filter((item) => item.productId !== product.id);
                  localStorage.setItem(
                    `cartItems_${userData?.username}`,
                    JSON.stringify(result),
                  );
                }

                getV1DeleteProduct({
                  productid: Number(product.productid),
                  callbackFunction: getV1GetProduct,
                });
              }}
            >
              Delete
            </button>
          </td>
        )}
        {/* <td className="py-2 px-4 text-center">
          {Number(product.cost).toLocaleString()}
        </td> */}
      </tr>
      {/* {
        barcodeModal &&
        <CProductBarcodeModal 
          product={product}
        />
      } */}
      {editModal && (
        <CEditProductModal
          setEditModal={setEditModal}
          product={product}
          getV1GetProduct={getV1GetProduct}
        />
      )}
      {orderModal && (
        <CPostOrderModal setPostOrderModal={setOrderModal} product={product} />
      )}
      {imageModal && (
        <CProductImageModal setImageModal={setImageModal} product={product} />
      )}
      {barcodeModal && (
        <CProductBarcodeModal
          product={product}
          setBarcodeModal={setBarcodeModal}
          session={session}
        />
      )}
      {
        pendingOrderModal && (
          <CPendingOrderModal
            product={product}
            setPendingOrderModal={setPendingOrderModal}
          />
        )
      }
    </>
  );
};

export default CProductTableContent;
