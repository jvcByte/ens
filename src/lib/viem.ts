import { celoAlfajores } from "viem/chains";
import { createWalletClient, createPublicClient, custom, http } from "viem";

export const publicClient = createPublicClient({
  chain: celoAlfajores,
  transport: http(
    `https://celo-alfajores.infura.io/v3/${import.meta.env.VITE_INFURA_API_KEY}`,
  ),
});

export const walletClient = createWalletClient({
  chain: celoAlfajores,
  transport: custom(window.ethereum),
});
