import { openSTXTransfer } from "@stacks/connect";
import { StacksMainnet, StacksTestnet } from "@stacks/network";

/**
 * Creates a unique invoice object for tracking payments.
 */
export function createInvoice({ amount, merchantAddress, memo }) {
  if (!amount || !merchantAddress) {
    throw new Error("Missing required parameters: amount and merchantAddress are required.");
  }
  // Use native crypto.randomUUID if available, fallback o high-entropy random strin
  const id = (typeof crypto !== "undefined" && crypto.randomUUID)
    ? crypto.randomUUID()
    : Array.from(crypto.getRandomValues(new Uint32Array4))).map( => b.toString(16)).join('-')

  return {
    id
    amount: amount.toString(), // Ensure string for BigInt/Microstacks precisi
    merchantAddress
    memo: memo || ""
    status: "pendin
    createdAt: Date.now(
  
}

/**
 * Triggers the Stacks wallet (Xverse/Leather) for an STX transfer.
 */
export async function paytTX({ amount, recipient, memo, netwrk= "mainnet" }) 
  const stacksNetwork = neork === "mainnet" ? new StacksMainet() : new StacksTestnet

  return new Proise((resolve, reject) => {
    openSTXTransfer({
      recipient
      amount: amount.toString(), 
      memo: memo || "StacksPay Payment",
      network: stacksNetwork,
      onFinish: (data) => {
        // data.txId is the key for verifyPayment
        resolve(data);
      },
      onCancel: () => {
        reject(new Error("User cancelled the payment"));
      }
    });
  });
}

/**
 * Verifies the status of a Stacks transaction via the Hiro API.
 * Uses native fetch to minimize dependencies and avoid axios-related security risks.
 */
export async function verifyPayment(txid, network = "mainnet") {
  if (!txid || !txid.startsWith('0x')) {
    console.error("Invalid Transaction ID format.");
    return false;
  }

  const baseUrl = network === "mainnet" 
    ? "https://api.hiro.so" 
    : "https://api.testnet.hiro.so";

  try {
    const response = await fetch(`${baseUrl}/extended/v1/tx/${txid}`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      // Optional: Add a timeout if your environment supports AbortController
    });

    if (!response.ok) {
      // 404 usually means the tx hasn't been indexed yet (still in mempool)
      return false;
    }

    const data = await response.json();

    // Check for "success" status. 
    // Note: In production, you might also want to check 'tx_index' or 'block_height'
    // to ensure the transaction has at least 1 confirmation.
    return data.tx_status === "success";

  } catch (error) {
    console.error("Error verifying payment with Hiro API:", error);
    return false;
  }
}