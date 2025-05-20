import Instance_ApiLocal from "@/api/api_local";
import { TDataGetProducts, TUserSession } from "@/schema/main_schema";
import { Session } from "next-auth";
import { useState } from "react";
import Swal from "sweetalert2";

const useV1GenerateBarcode = () => {
  const [quantity, setQuantity] = useState<number>(1);
  const APILocalGenerateBarcode = async (
    sizecategory: string,
    product: TDataGetProducts,
    quantity: number,
    session: Session | null,
  ) => {
    const currentToken = (session?.user as TUserSession)?.token;
    console.log(`${process.env.NEXT_PUBLIC_API_URL}/v9/generate_barcode`, "Barcode link")
    Swal.fire({
      title: "Loading",
      text: "Please wait while we prepare your QR Code...",
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/v9/generate_barcode`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentToken}`,
        },
        body: JSON.stringify({
          productid: product.productid,
          sizecategory,
          quantity
        }),
      },
    );

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `barcode_${product.title}_${product.productid}_qr.docx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(url);
    Swal.close();
    return;
  };

  return {
    APILocalGenerateBarcode,
    quantity, 
    setQuantity
  };
};

export default useV1GenerateBarcode;
