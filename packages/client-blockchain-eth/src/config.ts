import { http, createConfig } from '@wagmi/core'
import { injected, metaMask, safe } from '@wagmi/connectors'
import { mainnet, sepolia, bsc, optimism, bscTestnet } from '@wagmi/chains'

export const connectors = {
  injected: injected(),
  metaMask: metaMask(),
  safe: safe(),
}

export const config = createConfig({
  chains: [bscTestnet, mainnet, bsc, optimism],
  connectors: [
    connectors.injected,
    connectors.metaMask,
    connectors.safe,
  ],
  transports: {
    [bscTestnet.id]: http(),
    [mainnet.id]: http(),
    [bsc.id]: http(),
    [optimism.id]: http(),
  },
})

