// CSS styling of receipt UI view

const receiptStyling = {
    "container": {
    "maxWidth": "100%",
    "margin": "20px auto",
    "padding": "20px",
    "border": "1px solid #ccc",
    "borderRadius": "10px",
    "boxShadow": "0 4px 12px rgba(0,0,0,0.1)",
    "fontFamily": "’Segoe UI’, Tahoma, Geneva, Verdana, sans-serif",
    "backgroundColor": "#fefefe",
    "color": "#333"
    },
    "section": {
        "marginBottom": "20px"
    },
    "heading": {
        "borderBottom": "2px solid #0078D4",
        "paddingBottom": "5px",
        "color": "#0078D4"
    },
    "list": {
        "listStyle": "none",
        "padding": "0",
        "margin": "10px 0"
    },
    "listItem": {
        "marginBottom": "8px"
    },
    "table": {
        "width": "100%",
        "marginTop": "10px"
    },
    "th":{
        "padding": "10px",
        "backgroundColor": "#0078D4",
        "color": "#fff"    
    },
    "td":{
        "padding": "10px",
        "backgroundColor": "#f9f9f9",
    },
    "paid": {
        "padding": "10px",
        "backgroundColor": "#f9f9f9",
        "color": "#28a745",
        "fontWeight": "bold"
    }


}


// MAIN component that renders UI and contains actionable function for the export feature
export default function RenderEReceipt(){
    const receiptRef = useRef<any>(null)

    // On click, triggering this function, a JPEG file should be downloaded onto the user's device with a filer name "PAYMENT RECEIPT -001"
    const exportEReceipt =  ()=>{
        try {
           const node = receiptRef.current 
           if (node) {
            const width = node.offsetWidth;
            const height = node.offsetHeight;
            const svg = `<svg xmlns="http"//www.w3.org/2000/svg" width="${width}" height="${height}"> <foreignObject width="100%" height="100%"> ${new XMLSerializer().serializeToString(node)} </foreignObject>`;
            const img = new Image();

            const svgBlob = new Blob([svg], {type: "image/svg+xml;charset=utf-8"});

            const svgObjectUrl = URL.createObjectURL(svgBlob);

            img.onload = ()=>{
                const canvas = document.createElement("canvas");
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext("2d");
                ctx?.drawImage(img, 0, 0);
                URL.revokeObjectURL(svgObjectUrl);

                const link = document.createElement("a");
                link.download = "PAYMENT RECEIPT -001";
                link.href = canvas.toDataURL("image/jpeg");;
                link.click();
            }
            img.src = svgObjectUrl;
           } 
        } catch (error) {
            
        }
    }

    return (
        <div>
            <h2>TV Subscription Receipt</h2>
            <ExportableEReceipt ref={receiptRef} />
            <div>
                <button type="button" onClick={() => exportEReceipt()}>Export to JPEG</button>
            </div>
        </div>
    )
}

// Receipt VIEW React component detailing all the payment items, user info and payment unique identifiers
function ExportableEReceipt ({
    ref
}:{
    ref: any
}){
return (
<div style={receiptStyling.container} ref={ref}>
    <div style={receiptStyling.section}>
        <h4 style={receiptStyling.heading}>Payment Receipt</h4>
        <ul style={receiptStyling.list}>
            <li style={receiptStyling.listItem}>
                <strong>Payment ID:</strong> <span>1234567890</span>
            </li>
            <li style={receiptStyling.listItem}>
                <strong>User:</strong> <span>John Doe</span>
            </li>
            <li style={receiptStyling.listItem}>
                <strong>Payment Date:</strong> <span>2026-01-01</span>
            </li>
            <li style={receiptStyling.listItem}>
                <strong>Payment Method:</strong> <span>Credit Card</span>
            </li>
            <li style={receiptStyling.listItem}>
                <strong>Total Amount:</strong> <span>$175.00</span>
            </li>
            <li style={receiptStyling.listItem}>
                <strong>Status:</strong> <span style={receiptStyling.paid}>Paid</span>
            </li>
        </ul>
    </div>

    <div>
        <h4 style={receiptStyling.heading}>Receipt Items</h4>
        <table style={receiptStyling.table}>
            <thead>
                <tr>
                    <th style={{...receiptStyling.th, textAlign: "left"}}>Item</th>
                    <th style={{...receiptStyling.th, textAlign: "left"}}>Quantity</th>
                    <th style={{...receiptStyling.th, textAlign: "left"}}>Price</th>
                    <th style={{...receiptStyling.th, textAlign: "left"}}>Total</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style={receiptStyling.td}>Product 1</td>
                    <td style={receiptStyling.td}>2</td>
                    <td style={receiptStyling.td}>$50.00</td>
                    <td style={receiptStyling.td}>$100.00</td>
                </tr>
                <tr>
                    <td style={receiptStyling.td}>Product 2</td>
                    <td style={receiptStyling.td}>1</td>
                    <td style={receiptStyling.td}>$75.00</td>
                    <td style={receiptStyling.td}>$75.00</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
)};
