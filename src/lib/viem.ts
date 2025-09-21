// src/lib/viem.ts
import { celoAlfajores } from "viem/chains";
import { createPublicClient, http } from "viem";
import { getWalletClient } from "@wagmi/core";
import { config } from "./config";

export const publicClient = createPublicClient({
  chain: celoAlfajores,
  transport: http(),
});

// Obtain the connected wallet client from Wagmi's config at call time.
// Returns null if no wallet is connected.
export async function getWagmiWalletClient() {
  try {
    const client = await getWalletClient(config);
    return client ?? null;
  } catch {
    return null;
  }
}