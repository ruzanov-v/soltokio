import { connect as wagmiConnect } from "@wagmi/core";
import { config, connectors } from "./config";

export const connect = async () => {
    const result = await wagmiConnect(config, { connector: connectors.metaMask })
    
    const displayAccount = result.accounts[0]
    const displayChain = {
        family: 'eth',
    }
}
