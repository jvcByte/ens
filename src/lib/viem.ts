import { celoAlfajores } from "viem/chains";
import { createWalletClient, createPublicClient, custom } from "viem";

export const publicClient = createPublicClient({
  chain: celoAlfajores,
  transport: custom(window.ethereum),
});

export const walletClient = createWalletClient({
  chain: celoAlfajores,
  transport: custom(window.ethereum),
});
