import { useMoralis } from "react-moralis";
import { useState } from "react";
import { Modal, Typography } from "antd";
import { connectors } from "../lib/src/components/Account/config";
import { RPGConnectButton } from "./orders/ui";
import { useConnect, useAccount } from "wagmi";
const { Text } = Typography

const styles = {
  connector: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    height: "auto",
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
    padding: "20px 5px",
    cursor: "pointer",
  },
  icon: {
    alignSelf: "center",
    fill: "rgb(40, 13, 95)",
    flexShrink: "0",
    marginBottom: "8px",
    height: "30px",
  },
  button: {
    backgroundColor: 'Transparent',
    backgroundRepeat: 'no-repeat',
    border: 'none',
    overflow: 'none',
    outline: 'none',
    background: 'url("/submit-btn.png") no-repeat no-repeat',
    backgroundClip: 'padding-box',
    backgroundOrigin: 'padding-box',
    backgroundSize: '100% 100%',
    fontSize: '10px',
    maxWidth: '100%',
    minWidth: '150px',
    height: '65px',
    display: 'inline-block',
    paddingLeft: '35px',
    paddingRight: '35px',
    fontFamily: `'Press Start 2P', cursive`,
    color: 'white'
  }
}

export default function Connect() {
  // const { authenticate, isAuthenticated, account, chainId, logout, enableWeb3 } =
  // useMoralis();
  const { connectAsync, connectors: connectorsWagmi } = useConnect()
  const { account: accountWagmi, isConnected } = useAccount()

const [isModalVisible, setIsModalVisible] = useState(false);
const [isAuthModalVisible, setIsAuthModalVisible] = useState(false);
if (!isConnected || !account) {
  return (
    <>
      <div>
        <RPGConnectButton style={styles.button} className="rpgui-button" onClick={() => setIsAuthModalVisible(true)}>Connect</RPGConnectButton>
      </div>
      <Modal
        visible={isAuthModalVisible}
        footer={null}
        onCancel={() => setIsAuthModalVisible(false)}
        bodyStyle={{
          padding: "15px",
          fontSize: "17px",
          fontWeight: "500",
          zIndex: 1000
        }}
        style={{ fontSize: "16px", fontWeight: "500" }}
        width="340px"
      >
        <div
          style={{
            padding: "10px",
            display: "flex",
            justifyContent: "center",
            fontWeight: "700",
            fontSize: "20px",
          }}
        >
          Connect Wallet
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
          {connectors.map(({ title, icon, connectorId }, key) => (
            <div
              style={styles.connector}
              key={key}
              onClick={async () => {
                try {
                  connectAsync({ connector: connectorsWagmi[key] })
                  .then((_) => {
                    console.log('Connected wallet successfully')
                  })
                  .catch((err) => console.log(`ERROR.  Failed to connect wallet beep boop ${err}`))
                  // await authenticate({ provider: connectorId });
                  window.localStorage.setItem("connectorId", connectorId);
                  window.sessionStorage.setItem('isLoggedIn', true)
                  setIsAuthModalVisible(false);
                } catch (e) {
                  console.error(e);
                }
              }}
            >
              <img src={icon} alt={title} style={styles.icon} />
              <Text style={{ fontSize: "14px" }}>{title}</Text>
            </div>
          ))}
        </div>
      </Modal>
    </>
  );
}
}