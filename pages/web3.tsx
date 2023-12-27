import { Address } from "@ant-design/web3";

export default () => {
  return (
    <div
      style={{
        height: "100vh",
        padding: 64,
      }}
    >
      <Address format address="0xEcd0D12E21805803f70de03B72B1C162dB0898d9" />
    </div>
  );
};
