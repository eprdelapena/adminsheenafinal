import useV1AddToCart from "@/hooks/api_hooks/usev1addtocart";
import useV1GenerateBarcode from "@/hooks/api_hooks/usev1generatebarcode";
import { UserDataContext } from "@/hooks/context/main_context";
import { TDataGetProducts, TUserSession } from "@/schema/main_schema";
import { Session } from "next-auth";
import React, { useContext, useState } from "react";
import ReactDOM from "react-dom";
import Swal from "sweetalert2";

const CProductBarcodeModal = (props: {
  product: TDataGetProducts;
  setBarcodeModal: React.Dispatch<React.SetStateAction<boolean>>;
  session: Session | null;
}) => {
  const { product, setBarcodeModal, session } = props;

  const userData = useContext(UserDataContext);
  const { username } = userData as TUserSession;

  const { APILocalGenerateBarcode, quantity, setQuantity } = useV1GenerateBarcode();

  const [selectedSize, setSelectedSize] = useState<string>("quantitydefault");

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black/20 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl relative max-h-[90vh] overflow-y-auto">
        <h3 className="text-xl text-black font-semibold mb-4">
          Generate barcode - {product.title}
        </h3>
        <form className="space-y-3">
          <label className="block mb-1 font-medium text-black">
            Select product size
          </label>
          <select
            className="w-full border text-black border-black rounded p-2"
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
          >
            <option value="quantitydefault">
              DEFAULT
            </option>
            <option value="quantityxxs">Size XXS</option>
            <option value="quantityxs">Size XS</option>
            <option value="quantitys">Size S</option>
            <option value="quantitym">Size M</option>
            <option value="quantityl">Size L</option>
            <option value="quantityxl">Size XL</option>
            <option value="quantityxxl">Size XXL</option>
            <option value="quantity5">Size 5</option>
            <option value="quantity55">Size 5.5</option>
            <option value="quantity6">Size 6</option>
            <option value="quantity65">Size 6.5</option>
            <option value="quantity7">Size 7</option>
            <option value="quantity75">Size 7.5</option>
            <option value="quantity8">Size 8</option>
            <option value="quantity85">Size 8.5</option>
            <option value="quantity9">Size 9</option>
            <option value="quantity95">Size 9.5</option>
            <option value="quantity100">Size 10.0</option>
            <option value="quantity105">Size 10.5</option>
            <option value="quantity110">Size 11.0</option>
            <option value="quantity115">Size 11.5</option>
            <option value="quantity120">Size 12.0</option>
          </select>
          <label className="block mb-1 font-medium text-black">
            Number of QR codes to be generated
          </label>
          <input
            type="number"
            className="w-full border text-black border-black rounded p-2"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            placeholder="Input number of QR codes to be generated..."
          />
        </form>
        <div className="flex justify-end space-x-2 mt-4">
          <button
            type="button"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => {
              APILocalGenerateBarcode(selectedSize, product, quantity, session);
              setBarcodeModal(false);
            }}
          >
            Generate QR Code
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 cursor-pointer"
            onClick={() => {
              setBarcodeModal(false);
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

export default CProductBarcodeModal;
