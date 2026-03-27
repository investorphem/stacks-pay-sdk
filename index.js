import { openSTXTransfer } from "@stacks/connect";
import { StacksMainnet, StacksTestnet } from "@stacks/network";

export function createInvoice({ amount, merchantAddress, memo }) {
  // Use native crypto.randomUUID if available (modern browsers/Node), fallback to Math.random
  const id = typeof crypto !== "undefined" && crypto.randomUUID 
    ? crypto.randomUUID() 
    : Math.random().toString(36).substring(2, 15);

  return {
    id: id,
    amount: amount,
    merchantAddress: merchantAddress,
    memo: memo || "",
    status: "pending",
    createdAt: Date.now()
  };
}

export async function payWithSTX({ amount, recipient, memo, network = "mainnet" }) {
  const stacksNetwork = network === "mainnet" ? new StacksMainnet() : new StacksTestnet();

  return new Promise((resolve, reject) => {
    openSTXTransfer({
      recipient: recipient,
      // Convert amount to string to prevent large number precision issues in JS
      amount: amount.toString(), 
      memo: memo || "StacksPay Payment",
      network: stacksNetwork,
      onFinish: (data) => {
        console.log("Payment successful:", data.txId);
        resolve(data);
      },
      onCancel: () => {
        console.log("Payment cancelled");
        reject(new Error("User cancelled the payment"));
      }
    });
  });
}

export async function verifyPayment(txid, network = "mainnet") {
  const baseUrl = network === "mainnet" 
    ? "https://api.hiro.so" 
    : "https://api.testnet.hiro.so";

  try {
    const response = await fetch(`${baseUrl}/extended/v1/tx/${txid}`);
    
    // If the transaction isn't found yet, the API might return a 404
    if (!response.ok) {
      return false;
    }

    const data = await response.json();

    // Stacks transactions can be "success", "pending", "abort_by_response", or "abort_by_post_condition"
    if (data.tx_status === "success") {
      return true;
    }

    return false;
  } catch (error) {
    console.error("Error verifying payment:", error);
    return false;
  }
}
