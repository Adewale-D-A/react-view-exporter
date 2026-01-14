import viewStyles from "@/app/_assets/view-style.json";
// Receipt VIEW React component detailing all the payment items, user info and payment unique identifiers
export default function ExportableView({ ref }: { ref: any }) {
  return (
    <div style={viewStyles.container} ref={ref}>
      <div style={viewStyles.section}>
        <h4 style={viewStyles.heading}>Payment Receipt</h4>
        <ul style={viewStyles.list}>
          <li style={viewStyles.listItem}>
            <strong>Payment ID:</strong> <span>1234567890</span>
          </li>
          <li style={viewStyles.listItem}>
            <strong>User:</strong> <span>John Doe</span>
          </li>
          <li style={viewStyles.listItem}>
            <strong>Payment Date:</strong> <span>2026-01-01</span>
          </li>
          <li style={viewStyles.listItem}>
            <strong>Payment Method:</strong> <span>Credit Card</span>
          </li>
          <li style={viewStyles.listItem}>
            <strong>Total Amount:</strong> <span>$175.00</span>
          </li>
          <li style={viewStyles.listItem}>
            <strong>Status:</strong> <span style={viewStyles.paid}>Paid</span>
          </li>
        </ul>
      </div>

      <div>
        <h4 style={viewStyles.heading}>Receipt Items</h4>
        <table style={viewStyles.table}>
          <thead>
            <tr>
              <th style={{ ...viewStyles.th, textAlign: "left" }}>Item</th>
              <th style={{ ...viewStyles.th, textAlign: "left" }}>Quantity</th>
              <th style={{ ...viewStyles.th, textAlign: "left" }}>Price</th>
              <th style={{ ...viewStyles.th, textAlign: "left" }}>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={viewStyles.td}>Product 1</td>
              <td style={viewStyles.td}>2</td>
              <td style={viewStyles.td}>$50.00</td>
              <td style={viewStyles.td}>$100.00</td>
            </tr>
            <tr>
              <td style={viewStyles.td}>Product 2</td>
              <td style={viewStyles.td}>1</td>
              <td style={viewStyles.td}>$75.00</td>
              <td style={viewStyles.td}>$75.00</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
