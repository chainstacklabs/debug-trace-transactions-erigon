# Webapp | Debug and trace transactions with Erigon
This app allows you to test the ```debug``` and ```trace``` modules offered by the Erigon and Go Ethereum clients. 

Input the URL of the node you want to query and a transaction hash. Then you can <b>trace</b> or <b>debug</b> the transaction by calling the ```trace_transaction``` or ```debug_traceTransaction``` methods. 

> **Note** You need to query a node running <b>Erigon</b> to be able to ```trace``` a transaction.

> **Note** You can ```debug``` with either an node running <b>Erigon</b>, or a node running <b>Geth</b> with the [```debug``` module enabled](https://geth.ethereum.org/docs/rpc/ns-debug).   
