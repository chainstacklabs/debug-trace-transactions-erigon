# Webapp | Debug and trace transactions with Erigon and Geth

This app allows you to test the ```debug``` and ```trace``` modules offered by the Erigon and Go Ethereum clients. 

> **Note** You need to query a node running <b>Erigon</b> to be able to ```trace``` a transaction.

> **Note** You can ```debug``` with a node running <b>Erigon</b>, or a node running <b>Geth</b> with the [```debug``` module enabled](https://geth.ethereum.org/docs/rpc/ns-debug).   

## TL;DR

1. [Clone this repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository).
1. [Serve the page](#how-to-serve-the-page).
1.  Input the URL of the node that you want to query and a transaction hash. Then you can <b>trace</b> or <b>debug</b> the transaction by calling the ```trace_transaction``` or ```debug_traceTransaction``` methods. 
1. Read the result retrieved by the methods and see analytics about the time needed to retrieve data as well as the quantity of the data retrieved— comparing the two clients.   

## How to serve the page

To serve the webpage, you can use a simple node server. Follow these instructions:

1. Install Node.js - [Download and instructions](https://nodejs.org/en/download/).
1. Install lite-server (with NPM in a terminal/command prompt).

```sh
npm install -g lite-server 
```

## RPC endpoint requirements

To use this app, you will need to have access to an RPC endpoint of a node running Erigon and one running Geth.

[Chainstack](https://chainstack.com/) offers EVM nodes running both Erigon or Geth. 

Follow these steps to sign up on Chainstack, deploy a node, and find your endpoint credentials:

1. [Sign up with Chainstack](https://console.chainstack.com/user/account/create).
1. [Deploy a node](https://docs.chainstack.com/platform/join-a-public-network).
1. [View node access and credentials](https://docs.chainstack.com/platform/view-node-access-and-credentials).

You can use any RPC endpoint you have available as long as the node is running Erigon and/or Geth with the [```debug``` module enabled](https://geth.ethereum.org/docs/rpc/ns-debug).

## Trace transactions using Erigon

```trace_transaction``` is one of the methods available in Erigon to trace, and it takes a transaction hash as input, allowing you to see the internal functions calls made into a smart contract.

This is important because you could be sending a transaction to a [proxy smart contract](https://ethereum.stackexchange.com/questions/114809/what-exactly-is-a-proxy-contract-and-why-is-there-a-security-vulnerability-invol), which will then call a function from another one, and you would never know this without tracing the transaction.

Check out this [Gist for an extensive explanation of the ```trace_transaction``` method](https://gist.github.com/soos3d/285a5483d22970c7bdffb0db3474f71f) and an analysis of a traced transaction as an example.

Erigon has many **JSON RPC methods available** and you can see the entire list in the [Erigon documentation](https://github.com/ledgerwatch/erigon/tree/devel/cmd/rpcdaemon#rpc-implementation-status).

## Debug transactions using Erigon and Geth

The debug function in Erigon and Geth is very useful during the development of a smart contract to understand why a transaction is failing.

```debug_traceTransaction``` returns logs of low-level [opcode](https://en.wikipedia.org/wiki/Opcode) that can be used to show what happens step by step during the process and what is the reason for it failing.

Developers can use this data to show the steps happening during a transaction.

Check out this [Gist for an extensive explanation of the ```debug_traceTransaction``` method](https://gist.github.com/soos3d/712aa25240c968e6a22514a9b67443ee) and an analysis of a debugged transaction as an example.

## Compare Erigon and Geth

Although both Erigon and Geth are written in Golang and Erigon is actually a fork of Go Ethereum, they have a fundamentally different architecture, and with this app, you can test that. 

The speed and data test is done by querying the nodes that the user inputs and then querying them at the same time by calling the ```debug_traceTransaction``` method on the same transaction hash, also given by the user.

As we know, Erigon is focused on **storage efficiency**, and generally, it can store more blockchain data using fewer resources thanks to its DB architecture. 

You will notice that a ```debug_traceTransaction``` call made to a node running Erigon will take slightly longer to be completed, but it will also retrieve more data. 

> **Note** The statistics calculated by the app are an estimation, and the speed result will be affected by the user location compared to the node.

![screely-1657220353355](https://user-images.githubusercontent.com/99700157/177854569-2526d39f-3a14-4ce0-b862-c332ac2eb2c9.png)

