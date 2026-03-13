# StackPay SDK


![npm](https://img.shields.io/npm/v/stacks-pay-sdk)
![npm downloads](https://img.shields.io/npm/dw/stacks-pay-sdk)
![license](https://img.shields.io/npm/l/stacks-pay-sdk)

StackPay SDK allows merchants and developers to accept **STX payments** on the **Stacks blockchain** easily. It’s lightweight, simple, and ready for integration in Node.js or frontend projects.

---

## Installation

Install via npm:

```bash
npm install stacks-pay-sdk
```

---

## Usage

### CommonJS (Node.js)

```javascript
const StackPay = require("stacks-pay-sdk");

// 1️⃣ Create an invoice
const invoice = StackPay.createInvoice({
  amount: 1000000,              // amount in micro-STX
  merchantAddress: "SP123456...", // your STX address
  memo: "Order #1"               // optional
});

console.log(invoice);

// 2️⃣ Trigger payment via wallet
StackPay.payWithSTX({
  amount: invoice.amount,
  recipient: invoice.merchantAddress,
  memo: invoice.memo
});

// 3️⃣ Verify payment
(async () => {
  const success = await StackPay.verifyPayment("TXID_HERE");
  console.log("Payment successful?", success);
})();
```

### ES Modules (Frontend / ESM)

```javascript
import { createInvoice, payWithSTX, verifyPayment } from "stacks-pay-sdk";

const invoice = createInvoice({ amount: 1000000, merchantAddress: "SP1234567890" });
payWithSTX({ amount: invoice.amount, recipient: invoice.merchantAddress, memo: invoice.memo });
const success = await verifyPayment("TXID_HERE");
```

---

## Features

- Create invoices for STX payments  
- Open wallet to pay with STX  
- Verify payment status on the Stacks blockchain  
- Lightweight and easy to integrate  

---

## Quick 1-Line Pay Button (Optional Frontend)

For merchants who want a simple button:

```html
<button id="payButton">Pay with STX</button>

<script type="module">
import { createInvoice, payWithSTX } from "https://cdn.jsdelivr.net/npm/stacks-pay-sdk/dist/index.js";

document.getElementById("payButton").addEventListener("click", () => {
  const invoice = createInvoice({
    amount: 1000000,
    merchantAddress: "SP1234567890"
  });
  payWithSTX({
    amount: invoice.amount,
    recipient: invoice.merchantAddress
  });
});
</script>
```

> This creates a **“Stripe-like” one-click payment** button for your website.

---

## Contributing

Contributions are welcome! Fork the repo and submit a pull request.  

Please follow these guidelines:

- Keep functions small and modular  
- Include tests for new features  
- Update the README if adding new SDK functionality  

---

## License

MIT License

---

## Contact

- GitHub: [investorphem/StackPay](https://github.com/investorphem/StackPay)  
- Project: StackPay — STX Payment SDK