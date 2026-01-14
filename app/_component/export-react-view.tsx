"use client";
import { useRef } from "react";
import ExportableView from "./view";

// MAIN component that renders UI and contains actionable function for the export feature
export default function RenderExportView() {
  const receiptRef = useRef<any>(null);

  // On click, triggering this function, a JPEG file should be downloaded onto the user's device with a filer name "PAYMENT RECEIPT -001"
  const exportEReceipt = () => {
    try {
      const node = receiptRef.current;
      if (node) {
        // const svg = canvas.outerHTML;
        const width = node.offsetWidth;
        const height = node.offsetHeight;
        const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
          <foreignObject width="100%" height="100%">
            ${new XMLSerializer().serializeToString(node)}
          </foreignObject>
        </svg>
      `;
        const img = new Image();

        const svgBlob = new Blob([svg], {
          type: "image/svg+xml;charset=utf-8",
        });
        const svgObjectUrl = URL.createObjectURL(svgBlob);
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0);
          URL.revokeObjectURL(svgObjectUrl);

          const link = document.createElement("a");
          link.download = "PAYMENT-RECEIPT";
          try {
            link.href = canvas.toDataURL("image/png");
          } catch (error) {
            console.log("did not word", error);
          }
          link.click();
        };
        img.crossOrigin = "anonymous"; // Must be set before setting the src
        img.src = svgObjectUrl;
      }
    } catch (error) {}
  };

  return (
    <div className=" space-y-5 w-full">
      <h2 className=" text-center font-bold text-2xl">
        TV Subscription Receipt
      </h2>
      <ExportableView ref={receiptRef} />
      <div className=" flex justify-end w-full">
        <button
          type="button"
          onClick={() => exportEReceipt()}
          className=" bg-blue-500 hover:bg-blue-700 transition-all px-5 rounded-lg py-2 text-white cursor-pointer"
        >
          Export to JPEG
        </button>
      </div>
    </div>
  );
}
