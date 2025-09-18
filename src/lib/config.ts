import { createConfig, http } from "wagmi";
import { mainnet, sepolia, celoAlfajores, celo } from "wagmi/chains";
import { getDefaultConfig } from "connectkit";
import { QueryClient } from "@tanstack/react-query";

const config = createConfig(
  getDefaultConfig({
    chains: [mainnet, sepolia, celo, celoAlfajores],
    transports: {
      [mainnet.id]: http(),
      [sepolia.id]: http(
        `https://sepolia.infura.io/v3/${import.meta.env.VITE_INFURA_API_KEY}`,
      ),
      [celo.id]: http(),
      [celoAlfajores.id]: http(),
    },
    enableFamily: false,
    // Required API Keys
    walletConnectProjectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID,

    // Required App Info
    appName: "ENS",

    // Optional App Info
    appDescription: "Minimal ENS dApp",
    appUrl: "#",
    appIcon: "/logo.png",
  }),
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

export { config, queryClient };
