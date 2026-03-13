const { openSTXTransfer } = require("@stacks/connect")

function createInvoice({ amount, merchantAddress, memo }) {
  return {
    id: Math.random().toString(36).substring(2),
    amount: amount,
    merchantAddress: merchantAddress,
    memo: memo || "",
    status: "pending",
    createdAt: Date.now()
  }
}

function payWithSTX({ amount, recipient, memo }) {

  openSTXTransfer({
    recipient: recipient,
    amount: amount,
    memo: memo || "StackPay Payment",
    network: "mainnet",
    onFinish: data => {
      console.log("Payment successful:", data.txId)
    },
    onCancel: () => {
      console.log("Payment cancelled")
    }
  })

}

async function verifyPayment(txid) {

  const response = await fetch(
    `https://api.hiro.so/extended/v1/tx/${txid}`
  )

  const data = await response.json()

  if (data.tx_status === "success") {
    return true
  }

  return false
}

module.exports = {
  createInvoice,
  payWithSTX,
  verifyPayment
}