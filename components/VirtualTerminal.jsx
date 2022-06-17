
import Terminal from 'terminal-in-react'
import { useEffect, useState } from 'react';
import { Modal, Typography, notification } from "antd";
import { connectors } from '../lib/src/components/Account/config';
import { ALLOWED_CHAIN_IDS, CONTRACT_ADDRESS, ETHER_SCAN_TX_URL_PREFIX } from '../consts'
import { contractAbi } from './abi'
import { useMoralis, useWeb3ExecuteFunction } from 'react-moralis';
import { StyledTerminal } from './ui';
const { Text, Link } = Typography

const styles = {
  main: {
    width: '500px',
    height: '500px',
    backgroundColor: 'green',
    position: 'relative'
  },
  main2: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "100vw"
  },
  scan: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    pointerEvents: 'none'
  },
  content: {
    margin: '50px',
    fontFamily: 'VT323',
    color: 'rgb(159, 248, 23)',
    fontSize: '20px',
    textShadow: '1px 1px 2px rgb(150, 167, 124),  0 0 1em rgb(150, 167, 124),  0 0 0.2em rgb(150, 167, 124)'
  },
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
}

export default function VirtualTerminal() {
  const showMsg = () => {
    console.log('Incoming transmission...')
    console.log('We must work together to fight against the enforcers...')
    console.log(`I've reserved some parts to help you along the way.  Type help to view a list of commands`)
  }
  useEffect(() => {
    showMsg()
  }, [])
  const [isAuthModalVisible, setIsAuthModalVisible] = useState(false);
  const { authenticate, isAuthenticated, account, chainId, logout } = useMoralis()

  // console.log('isLoggedIn, render', isLoggedIn)
  
  const { data, error, fetch, isFetching, isLoading } = useWeb3ExecuteFunction({
    abi: contractAbi,
    contractAddress: CONTRACT_ADDRESS,
    functionName: 'purchase',
    params: {
        amount: 4
    },
    msgValue: 0
  })


  const openPendingNotification = (results) => {

    console.log('Transaction to mint 4 Parts pending...')
    console.log(`View transaction here:`)
    console.log(`${ETHER_SCAN_TX_URL_PREFIX}${results.hash}`)
    // notification.open({
    //   message: 'Transaction Pending.',
    //   placement: 'topLeft',
    //   description:
    //   <>
    //     <Text>{`Transaction to mint 4 Parts pending.  `}</Text>
    //     <Link href={`${ETHER_SCAN_TX_URL_PREFIX}${results.hash}`} target="_blank">
    //       Click here to view the transaction
    //     </Link>
    //   </>
    // })
  }

  const openErrorNotification = () => {
    notification['error']({
      message: 'Transaction failed',
      description: `Failed to mint Parts due to error: ${error}`
    })
  }

  return (
    <div style={styles.main2}>
        {/* <img src="bezel.png" /> */}
        <StyledTerminal
          color='#808080'
          backgroundColor='#28282B'
          barColor='#36454F'
          style={{ fontWeight: "bold", fontSize: "1.2em", borderRadius: "10px", overflow: 'none' }}
          commands={{
            show: () => showMsg(),
            'connect': () => setIsAuthModalVisible(true),
            'mint': () => {
              if(window.sessionStorage.getItem('isLoggedIn')) {
                fetch({
                  onSuccess: openPendingNotification,
                  onError: openErrorNotification
                })
              } else {
                console.log('ERROR.  You must connect your wallet first beep boop')
              }
            }
          }}
          descriptions={{
            show: 'shows a message',
            'connect': 'connects your wallet',
            'mint': 'mint a part'
          }}
          // msg='Incoming transmission... Type help for a list of commands'
          watchConsoleLogging
          // startState='maximised'
      />
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
                    await authenticate({ provider: connectorId });
                    window.localStorage.setItem("connectorId", connectorId);
                    window.sessionStorage.setItem('isLoggedIn', true)
                    setIsAuthModalVisible(false);
                    console.log('Connected wallet successfully')
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
    </div>
  )
}