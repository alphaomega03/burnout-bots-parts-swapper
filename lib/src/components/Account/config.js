import Metamask from "./WalletIcons/metamaskWallet.png";
import Coin98 from "./WalletIcons/Coin98.png";
import MathWallet from "./WalletIcons/MathWallet.svg";

import TrustWallet from "./WalletIcons/TrustWallet.png";

export const connectors = [
  {
    title: "Metamask",
    icon: './metamask.png',
    connectorId: "injected",
    priority: 1,
  },
  {
    title: "WalletConnect",
    icon: "./wallet-connect.svg",
    connectorId: "walletconnect",
    priority: 2,
  }
  // {
  //   title: "Trust Wallet",
  //   icon: "./TrustWallet.png",”
  //   connectorId: "injected",
  //   priority: 3,
  // },
  // {
  //   title: "MathWallet",
  //   icon: "./MathWallet.svg",
  //   connectorId: "injected",
  //   priority: 999,
  // },
  // {
  //   title: "TokenPocket",
  //   icon: TokenPocket,
  //   connectorId: "injected",
  //   priority: 999,
  // },
  // {
  //   title: "SafePal",
  //   icon: SafePal,
  //   connectorId: "injected",
  //   priority: 999,
  // },
  // {
  //   title: "Coin98",
  //   icon: Coin98,
  //   connectorId: "injected",
  //   priority: 999,
  // },
];
