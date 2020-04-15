import React from 'react';
import Web3 from 'web3';

function App() {
  var provider = (window as any).ethereum;
  var web3 = new Web3(provider);

  if (provider.isStatus) {
    console.log("kimed");
  } else if (provider.isMetaMask) {
    console.log("provider Metamask");
  } else {
    console.log("no provider");
  }

  web3.eth.getAccounts().then(accounts => {
    web3.eth.defaultAccount = accounts[0];
  });

  window.addEventListener('load', async () => {
    // Read-only provider is exposed by default
    //console.log(await provider.send('net_version'));
    try {
        // Request full provider if needed
        //await provider.enable();
        // Full provider exposed
        //await provider.send('eth_sendTransaction', [/* ... */]);
        console.log("user accepted");

        if (web3.eth.defaultAccount) {
          console.log("kimed3", web3.eth.defaultAccount);
        }
      
    } catch (error) {
        // User denied full provider access
        console.log("user rejected");
    }
  });

  return (
    <div className="App">
      <p>
        <a href="." onClick={function(e){
          var provider = (window as any).ethereum;
          provider.enable();
          e.preventDefault();
        }}>click to connect</a>
      </p>
      <p>

      <a href="." onClick={function(e){
          console.log(web3.eth.defaultAccount);
          alert(web3.eth.defaultAccount);
          //e.preventDefault();
        }}>click to see address</a>
      </p>

      <p>
        <button title="sendTx" onClick={function(e){
          var gasLimit = '15';
          var account = web3.eth.defaultAccount;
          console.log(web3.eth.defaultAccount);
          alert(account);

          if (account) {
            web3.eth.sendTransaction({
              from: account,
              to: '0x170FDc6C3d4bc047e6Eab8e076FE9921557e551F',
              value: '1000000000000000',
              gas: gasLimit // use web3.eth.estimateGas() to get this amount, and add a little for extra safety.
            }).then(receipt => {
              console.log((receipt as any).transactionHash); // "0xe7991ac8107a2dd70f996ea0cd867a828b2f228b39436506271d6a53587eff16"
            }).catch(function(err){
              console.error(err);
            });
          } else {
            console.log('no account');
          }
          e.preventDefault();
        }}>send Transaction</button>
      </p>
    </div>
  );
}

export default App;
