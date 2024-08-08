import {
  createConfig,
  http,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  WagmiWeb3ConfigProvider,
  MetaMask,
  Sepolia,
} from "@ant-design/web3-wagmi";
import {
  Address,
  NFTCard,
  Connector,
  ConnectButton,
  useAccount,
} from "@ant-design/web3";
import { injected } from "wagmi/connectors";
import { Button, message, Spin, Flex } from "antd";
import { parseEther } from "viem";
import { useEffect } from "react";

const config = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(
      "https://api.zan.top/node/v1/eth/mainnet/7f039b4a093940a8bb5d2f76cca81e45"
    ),
    [sepolia.id]: http(
      "https://api.zan.top/node/v1/eth/sepolia/7f039b4a093940a8bb5d2f76cca81e45"
    ),
  },
  connectors: [
    injected({
      target: "metaMask",
    }),
  ],
});

const queryClient = new QueryClient();

// Sepolia test contract 0x81BaD6F768947D7741c83d9EB9007e1569115703
const CONTRACT_ADDRESS = "0x81BaD6F768947D7741c83d9EB9007e1569115703";

const CallTest = () => {
  const { account } = useAccount();
  const result = useReadContract({
    abi: [
      {
        type: "function",
        name: "balanceOf",
        stateMutability: "view",
        inputs: [{ name: "account", type: "address" }],
        outputs: [{ type: "uint256" }],
      },
    ],
    address: CONTRACT_ADDRESS,
    functionName: "balanceOf",
    args: [account?.address as `0x${string}`],
  });
  const { data: hash, writeContract } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  useEffect(() => {
    if (isConfirmed) {
      message.success("Mint Success");
      result.refetch();
    }
  }, [isConfirmed]);

  return (
    <Flex gap={12} align="center">
      {result.data?.toString()}
      <Button
        onClick={() => {
          writeContract(
            {
              abi: [
                {
                  type: "function",
                  name: "mint",
                  stateMutability: "payable",
                  inputs: [
                    {
                      internalType: "uint256",
                      name: "quantity",
                      type: "uint256",
                    },
                  ],
                  outputs: [],
                },
              ],
              address: CONTRACT_ADDRESS,
              functionName: "mint",
              args: [1n],
              value: parseEther("0.01"),
            },
            {
              onError: (err) => {
                message.error(err.message);
              },
            }
          );
        }}
      >
        mint
      </Button>
      <Spin spinning={isConfirming} fullscreen />
    </Flex>
  );
};

export default function Web3() {
  return (
    <WagmiWeb3ConfigProvider
      config={config}
      chains={[Sepolia]}
      wallets={[MetaMask()]}
    >
      <QueryClientProvider client={queryClient}>
        <Address format address={CONTRACT_ADDRESS} />
        <NFTCard address={CONTRACT_ADDRESS} tokenId={641} />
        <Connector>
          <ConnectButton />
        </Connector>
        <CallTest />
      </QueryClientProvider>
    </WagmiWeb3ConfigProvider>
  );
}
