"use client";
import { useRef, useState } from "react";
import ExportableView from "./view";

// MAIN component that renders UI and contains actionable function for the export feature
export default function RenderExportView() {
  const receiptRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  // On click, triggering this function, a JPEG file should be downloaded onto the user's device with a filer name "PAYMENT RECEIPT -001"
  const exportEReceipt = async () => {
    try {
      setIsLoading(true);
      const node = receiptRef.current;
      if (node) {
        const htmlContentString = node.outerHTML;
        const response = await fetch("/api/html-to-jpeg", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ html_content: htmlContentString }),
        });
        const result = await response.json();
        const dataBuffer = result?.data?.img_buffer;
        const pdfData = result?.data?.pdf_data;

        var binaryString = String.fromCharCode.apply(null, dataBuffer.data);
        var base64String = btoa(binaryString);
        var imageUrl = "data:image/png;base64," + base64String;

        // Convert to Uint8Array
        const byteArray = Object.values(pdfData) as number[];
        const blob = new Blob([new Uint8Array(byteArray)], {
          type: "application/pdf",
        });
        const blobURL = URL.createObjectURL(blob);

        const downloadableItems = [
          {
            fileName: "PAYMENT-RECEIPT.pdf",
            fileUrl: blobURL,
          },
          {
            fileName: "PAYMENT-RECEIPT.png",
            fileUrl: imageUrl,
          },
        ];
        const downloadFileWithAnchor = (filename: string, url: string) => {
          const anchor = document.createElement("a");
          anchor.href = url;
          anchor.download = filename;
          document.body.appendChild(anchor);
          anchor.click();
          document.body.removeChild(anchor);
        };
        for (var n = 0; n < downloadableItems.length; n++) {
          const download = downloadableItems[n];
          setTimeout(
            function () {
              downloadFileWithAnchor(download.fileName, download.fileUrl);
            },
            200 * (n + 1),
          );
        }
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className=" space-y-5 w-full">
      <h2 className=" text-center font-bold text-2xl">Sample Receipt</h2>
      <ExportableView ref={receiptRef} />
      <div className=" flex justify-end w-full">
        <button
          type="button"
          onClick={() => exportEReceipt()}
          className=" bg-blue-500 hover:bg-blue-700 transition-all px-5 rounded-lg py-2 text-white cursor-pointer"
        >
          {isLoading ? "...loading" : "Export to IMG & PDF"}
        </button>
      </div>
    </div>
  );
}
