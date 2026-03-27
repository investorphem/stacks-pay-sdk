# stacks-pay-sdk 💳

![npm](https://img.shields.io/npm/v/stacks-pay-sdk)
![npm downloads](https://img.shields.io/npm/dw/stacks-pay-sdk)
![license](https://img.shields.io/npm/l/stacks-pay-sdk)

StackPay SDK allows merchants and developers to accept **STX payments** on the **Stacks blockchain** easily. It’s lightweight, simple, and ready for modern web3 integrations using Xverse or Leather wallets.

---

## Installation

Install via npm:

```bash
npm install stacks-pay-sdk
```

or via yarn:

```bash
yarn add stacks-pay-sdk
```

---

## Usage (ES Modules)

Since `stacks-pay-sdk` is built for modern web applications, it uses ES Modules (`import`/`export`) and fully supports asynchronous Promises.

```javascript
import { createInvoice, payWithSTX, verifyPayment } from "stacks-pay-sdk";

async function processPayment() {
  try {
    // 1️⃣ Create an invoice
    const invoice = createInvoice({
      amount: 1000000,              // amount in micro-STX (1 STX)
      merchantAddress: "SP123456...", // your STX receiving address
      memo: "Order #1"               // optional memo for on-chain tracking
    });
    
    console.log("Invoice created:", invoice);

    // 2️⃣ Trigger payment via wallet popup (Waits for user interaction)
    const txData = await payWithSTX({
      amount: invoice.amount,
      recipient: invoice.merchantAddress,
      memo: invoice.memo,
      network: "mainnet" // or "testnet"
    });

    console.log("Transaction broadcasted! TXID:", txData.txId);

    // 3️⃣ Verify payment status on the Stacks blockchain
    const isSuccessful = await verifyPayment(txData.txId, "mainnet");
    console.log("Payment confirmed on-chain?", isSuccessful);

  } catch (error) {
    console.error("Payment failed or was cancelled:", error.message);
  }
}

processPayment();
```

---

## Features

- **Standardized Invoicing:** Generate trackable payment intents with built-in UUIDs.
- **Seamless Wallet Integration:** Automatically triggers Xverse or Leather wallet popups using `@stacks/connect`.
- **Promise-Based Flow:** Easily `await` user transactions before updating your UI.
- **On-Chain Verification:** Built-in checks against the Hiro API to confirm transaction success.
- **Network Agnostic:** Works flawlessly on both Stacks `mainnet` and `testnet`.

---

## Quick "Stripe-like" Pay Button (Vanilla JS)

For merchants who want a simple HTML integration without a framework:

```html
<button id="payButton">Pay with STX</button>

<script type="module">
  import { createInvoice, payWithSTX } from "[https://cdn.jsdelivr.net/npm/stacks-pay-sdk/dist/index.js](https://cdn.jsdelivr.net/npm/stacks-pay-sdk/dist/index.js)";

  document.getElementById("payButton").addEventListener("click", async () => {
    try {
      const invoice = createInvoice({
        amount: 1000000, // 1 STX
        merchantAddress: "SP1234567890"
      });
      
      console.log("Waiting for user to approve in wallet...");
      await payWithSTX({
        amount: invoice.amount,
        recipient: invoice.merchantAddress
      });
      
      alert("Payment submitted successfully!");
    } catch (err) {
      alert("Payment cancelled.");
    }
  });
</script>
```

---

## Contributing

Contributions are welcome! Fork the repo and submit a pull request.  

Please follow these guidelines:

- Keep functions small and modular.  
- Include tests for new features.  
- Update the README if adding new SDK functionality.  

---

## License

MIT License

---

## Contact

- **GitHub:** [investorphem/stacks-pay-sdk](https://github.com/investorphem/stacks-pay-sdk)  
- **Author:** Oluwafemi Olagoke
