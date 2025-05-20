import Instance_ApiLocal from "@/api/api_local";
import { TDataGetProducts, TDataViewOrderItem, TUserSession } from "@/schema/main_schema";
import { Session } from "next-auth";
import Swal from "sweetalert2";

const useV1OrderGenerateBarcode = () => {
  const APILocalOrderGenerateBarcode = async (
    params: {
      orderid: string,
      session: TUserSession | null,
    }
  ) => {
    const {
      orderid,
      session
    } = params;
    const currentToken = (session as TUserSession)?.token;

    console.log("current params", params);
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
      `${process.env.NEXT_PUBLIC_API_URL}/v9/order_item_generate_barcode`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentToken}`,
        },
        body: JSON.stringify({
          orderid,
        }),
      },
    );

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `orders_qr.docx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(url);
    Swal.close();
    return;
  };

  return {
    APILocalOrderGenerateBarcode,
  };
};

export default useV1OrderGenerateBarcode;
