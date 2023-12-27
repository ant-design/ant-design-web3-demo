import { createConfig, configureChains, mainnet } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { WagmiWeb3ConfigProvider } from "@ant-design/web3-wagmi";
import { NFTCard } from "@ant-design/web3";

const { publicClient } = configureChains([mainnet], [publicProvider()]);

const config = createConfig({
  publicClient,
});

export default () => {
  return (
    <WagmiWeb3ConfigProvider config={config}>
      <div
        style={{
          height: "100vh",
          padding: 64,
        }}
      >
        <NFTCard
          address="0x79fcdef22feed20eddacbb2587640e45491b757f"
          tokenId={8540}
        />
      </div>
    </WagmiWeb3ConfigProvider>
  );
};
