"use client";

import { useAccount, useWalletClient } from "wagmi";
import { parseEther } from "viem";
import { useState } from "react";

export default function Home() {
  const { isConnected, address } = useAccount();
  const { data: walletClient } = useWalletClient();

  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [txHash, setTxHash] = useState("");

  const sendBNB = async () => {
    if (!walletClient) {
      alert("Wallet not connected");
      return;
    }

    try {
      const tx = await walletClient.sendTransaction({
        to: recipient,
        value: parseEther(amount)
      });

      setTxHash(tx);
    } catch (err: any) {
      alert("Transaction failed: " + err.message);
    }
  };

  return (
    <main className="min-h-screen px-8 py-0 pb-12 flex-1 flex flex-col items-center bg-white">
      <header className="w-full py-4 flex justify-between items-center">
        <div className="flex items-center">
          <div className="hidden sm:inline text-xl font-bold">reown AppKit example app</div>
        </div>
        <div className="flex items-center">
          <w3m-button />
        </div>
      </header>

      {isConnected && (
        <div className="mt-10 flex flex-col items-center gap-4 w-full max-w-md">
          <input
            type="text"
            placeholder="Recipient Address"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            className="w-full border px-4 py-2 rounded"
          />
          <input
            type="number"
            placeholder="Amount in BNB"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border px-4 py-2 rounded"
          />
          <button
            onClick={sendBNB}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            Send BNB
          </button>

          {txHash && (
            <p className="mt-2 text-green-600">
              Transaction sent! Hash:{" "}
              <a
                href={`https://testnet.bscscan.com/tx/${txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-blue-600"
              >
                View on BscScan
              </a>
            </p>
          )}
        </div>
      )}
    </main>
  );
}
