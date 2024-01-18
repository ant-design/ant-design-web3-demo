import { createConfig, http, useReadContract } from "wagmi";
import { mainnet } from "wagmi/chains";
import { WagmiWeb3ConfigProvider, MetaMask } from "@ant-design/web3-wagmi";
import { Address, NFTCard, Connector, ConnectButton } from "@ant-design/web3";
import { injected } from "wagmi/connectors";

const config = createConfig({
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(),
  },
  connectors: [
    injected({
      target: "metaMask",
    }),
  ],
});

const CallTest = () => {
  const result = useReadContract({
    abi: [{
      type: 'function',
      name: 'totalSupply',
      stateMutability: 'view',
      inputs: [],
      outputs: [{ name: 'supply', type: 'uint256' }]
    }],
    address: '0xEcd0D12E21805803f70de03B72B1C162dB0898d9',
    functionName: 'totalSupply',
  });
  return (
    <div>{result.data?.toString()}</div>
  );
}

export default () => {
  return (
    <WagmiWeb3ConfigProvider config={config} wallets={[MetaMask()]}>
      <Address format address="0xEcd0D12E21805803f70de03B72B1C162dB0898d9" />
      <NFTCard
        address="0x79fcdef22feed20eddacbb2587640e45491b757f"
        tokenId={8540}
      />
      <Connector>
        <ConnectButton />
      </Connector>
      <CallTest />
    </WagmiWeb3ConfigProvider>
  );
};
