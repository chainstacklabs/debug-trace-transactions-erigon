# Webapp | Debug and trace transactions with Erigon and Geth
This app allows you to test the ```debug``` and ```trace``` modules offered by the Erigon and Go Ethereum clients. 

> **Note** You need to query a node running <b>Erigon</b> to be able to ```trace``` a transaction.

> **Note** You can ```debug``` with a node running <b>Erigon</b>, or a node running <b>Geth</b> with the [```debug``` module enabled](https://geth.ethereum.org/docs/rpc/ns-debug).   

## TL;DR

1. [Clone this repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository).
2. [Serve the page](#how-to-serve-the-page).
3.  Input the URL of the node that you want to query and a transaction hash. Then you can <b>trace</b> or <b>debug</b> the transaction by calling the ```trace_transaction``` or ```debug_traceTransaction``` methods. 

## How to serve the page

To serve the webpage, you can use a simple node server. Follow these instructions:

1. Install Node.js - [Download and instructions](https://nodejs.org/en/download/).
2. Install lite-server (with NPM in a terminal/command prompt).

```sh
npm install -g lite-server 
```

## RPC endpoint requirements

To use this app, you will need to have access to an RPC endpoint of a node running Erigon and one running Geth.

## Trace transaction using Erigon

```trace_transaction``` is one of the methods available in Erigon to trace, and it takes a transaction hash as input, allowing you to see the internal functions calls made into a smart contract.

Check out this [Gist for an extensive explanation of the ```trace_transaction``` method](https://gist.github.com/soos3d/285a5483d22970c7bdffb0db3474f71f) and an analysis of a traced transaction as an example.

