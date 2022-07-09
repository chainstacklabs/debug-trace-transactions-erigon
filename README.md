# Webapp | Debug and trace transactions with Erigon and Geth

This app allows you to test the ```debug``` and ```trace``` modules offered by the Erigon and Go Ethereum clients. 

> **Note** You need to query a node running <b>Erigon</b> to be able to ```trace``` a transaction.

> **Note** You can ```debug``` with a node running <b>Erigon</b>, or a node running <b>Geth</b> with the [```debug``` module enabled](https://geth.ethereum.org/docs/rpc/ns-debug).   

## Table of contents

* [TL;DR](#tl-dr)
* [How to serve the page](#how-to-serve-the-page)
* [RPC endpoint requirements](#rpc-endpoint-requirements)
* [Trace transactions using Erigon](#trace-transactions-using-erigon)
* [Debug transactions using Erigon and Geth](#debug-transactions-using-erigon-and-geth)
* [Compare Erigon and Geth](#compare-erigon-and-geth)
* [Time to explain the code](#time-to-explain-the-code)
+ [Ethers library | ```ethers.js```](#ethers-library-ethersjs-)
+ [```script.js```](#-scriptjs-)
+ [Trace button and ```trace()``` function](#trace-button-and-trace-function)
  - [Call ```trace_transaction``` and measure the execution time](#call-trace-transaction-and-measure-the-execution-time)
  - [Display the response in the page](#display-the-response-in-the-page)
  - [Measure the size in kB/MB of the data restrieved from the blockchain](#measure-the-size-in-kb-mb-of-the-data-restrieved-from-the-blockchain)
  - [Calculate the numbers of lines retrieved in the parsed object](#calculate-the-numbers-of-lines-retrieved-in-the-parsed-object)

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

The ```trace_transaction``` method is only available using Erigon, so it won't be possible to compare to Geth, so this app compares the two clients on the ```debug_traceTransaction``` method. 

In short, Erigon retrieves more data, and it takes a bit longer to do it compared to Geth.

## Time to explain the code

### Ethers library | ```ethers.js```

This app uses the [Ethers library](https://docs.ethers.io/v5/) to interact with the nodes and make the requests. The nice part is that there is no need to install any dependencies as the [Etheres docs](https://docs.ethers.io/v5/getting-started/#getting-started--importing--web-browser) explain how to import the library into the browser directly.

> **Note** that this method is generally accepted for tests and prototypes, but it is recommended to copy the [Ethers library](https://cdn.ethers.io/lib/ethers-5.6.esm.min.js) to your web server and serve it yourself (for security reasons).

In this case, we import it into the ```index.html``` file with this line:

```html
<script src="https://cdn.ethers.io/lib/ethers-5.2.umd.min.js" type="application/javascript"></script>
```

> Make sure to take a look at the [Etheres docs](https://docs.ethers.io/v5/getting-started/#getting-started--importing--web-browser) to keep the library up to date.

### ```script.js``` 

The bulk of the functionality is in the ```script.js``` file, where you can find the functions that power the buttons on the webpage. 

Generally, when interacting with the blockchain and sending requests to a node, we need to establish a connection to it. Using the Ethers library, we do it by creating a ```provider``` variable, like this:

```js
const provider = new ethers.providers.JsonRpcProvider(NODE_URL);
```

Then you can send requests to the node like this:

```js
const traceTx = await provider.send("trace_transaction", [TRANSACTION_HASH, ]);
```

In this app, when you click one of the buttons, a function will retrieve the node URLs and the transaction hash, use the node URLs to create a ```provider``` variable, and then call another function that holds the instruction to send the request to the node. 

The code in the ```script.js``` file is heavily commented, perhaps more than you usually see, but I want to make sure that every step is explained so that you won't have any doubt. 

Now, we'll break down the function called when you press the ```trace``` button. Note that the principle applies to the other buttons as well.

### Trace button and ```trace()``` function

This is the HTML code for the button itself in the ```index.html``` file:

```html
<button onclick="trace()">Trace &#128373</button>
```

The ```onclick="trace()"``` event attribute tells the button element to call the ```trace()``` function when the user clicks it. 

Let's break down the ```trace()``` function:

The first step will be to retrieve the data that the user inputs, as the script needs to extract the node URL and the transaction hash to use.

```js
//retrieve the users inputs 
const node_url = document.getElementById("erigon").value;
const txHash = document.getElementById("hash").value;
```

We use the ```document.getElementById("ID_NAME").value``` command to take the content of the input boxes. 

Then we use these variables to connect to the node.

```js
// Create an instance to connect to the node
const provider = new ethers.providers.JsonRpcProvider(node_url);

//log getBlockNumber to verify the connection is successful
const blockNum = await provider.getBlockNumber();
console.log(`The latest block is: ${blockNum}`);
console.log('Tracing...')
```

> **Note** that we already call the ```eth_blockNumber``` method and log the result in the console. This is just to verify that the connection works, and you will often see similar things across the code. Logging data to the console is a common practice used by developers to keep track of what happens and debug. 

After the node instance is created, we update the label that keeps track of the phases in the HTML. You will often find lines like this:

```js
// update info label
document.getElementById("info").innerHTML = "Tracing..."
```

#### Call ```trace_transaction``` and measure the execution time

The next session is the part where we call the ```trace_transaction``` method and measure how long it takes to be complete. 

```js
// call and measure the excecution time of the callTrace function
const start = Date.now();
const traceResult = await callTrace(txHash, provider);
const end = Date.now();

// Display the result in the page
document.getElementById("SpeedEri").innerHTML = `${end - start} ms`;
```

The ```Date.now()``` function returns a number resenting the milliseconds elapsed since the [UNIX epoch](https://en.wikipedia.org/wiki/Unix_time), and this is used to measure how long it takes to execute the ```callTrace()``` function by taking a snapshot just before and immediately after the ```callTrace()``` is called and making the difference. Giving a result of how many milliseconds the excecution took.

You will notice that the call to the ```trace_transaction``` method is done through a function, the ```callTrace(txHash, provider)``` in this case:

- We pass the transaction hash and the provider to the function.

```js
// call the trace_transaction method
async function callTrace(hash, provider) {
    try {

        // call trace_transaction using the transaction hash from the user (Erigon node only)
        const traceTx = await provider.send("trace_transaction", [hash, ]);

        return traceTx
        
    } catch (err) {
        console.log(err)
        alert("Something went wrong - possible reasons: Not an Erigon node, Trace module not active on your node, Transaction hash not valid.")
    }
}
```

This is an ```async``` function and that means that we can use the ```await``` keyword on it allowing us to wait for it to be done before continuing. 

This line:

```js
const traceTx = await provider.send("trace_transaction", [hash, ]);
``` 
is the command that makes the call to the node, and you can see that we use the ```provider``` and the ```hash``` that we took from the input elements and passed to the function. 

> **Note** I decided to implement it like this because this way, we can measure only the time that takes for the request to be executed without other processes happening before. Also, keep in mind that these numbers are approximations.

The RPC call itself is enclosed in a ```try/catch``` pattern; so that if something went wrong, the user receives an alert with some possible causes, and the error returned is logged in the console.

#### Display the response in the page

After we retrieve the data we parse is into a readable format and display it to the user, much like [Postman](https://www.postman.com/) would.

```js
// Display the JSON response. 
const jsonResponse = JSON.stringify(traceResult, null, 4)
document.getElementById("result").innerHTML = jsonResponse
```

To do this we use the ```JSON.stringify()``` function adding four extra indent spaces to make it easier to read, then display it in the HTML page.

#### Measure the size in kB/MB of the data restrieved from the blockchain

This section of the function makes a calculation of the size of the response:

```js
// calculate the aproximate size of the object, trace is usually small and getSizeKb returns a value in kB
const size = getSizeKb(traceResult)
//const megaBytes = size / 1024;

document.getElementById("dataEri").innerHTML = `${size} kB`
```

To do it I created the ```getSizeKb()``` function, that takes the response of the call to the node as a parameter. 

```js
// return the approximate sie of the stringified JSON object 
function getSizeKb(object) {
    const parsed = JSON.stringify(object, null,)
    const bytes = new TextEncoder().encode(parsed).length
    const kb = (bytes / 1024).toFixed(2);
    return kb
}
```

We first transform the response into a string with zero added spaces to maintain the estimate as accurate as possible. Then, call the ```.lenght``` method on the ```TextEncoder()``` function of the parsed response to calculate an approximate size in bytes. At this point, we just need some math to convert it into kB and MB.

You will see this pattern often throughout the code.

#### Calculate the numbers of lines retrieved in the parsed object

The last section of the function calculates the numbers of lines after the object is parsed. This is to give a metric to be able to compare the responses between a node running Erigon and one runnig Geth.

```js
// call getLines() to count how many lines are present in the JSON
const lines = getLines(traceResult)
document.getElementById("linesEri").innerHTML = lines
```

The ```getLines()``` function simply splits the parsed object by whitespaces ```"\n"``` (where the line ends and goes onto a new one) loops through it and counts how many times it finds a whitespace and a new line in the result. 

```js
// count the lines retrieved 
function getLines(object) {
    
    const parsed = JSON.stringify(object, null, 4)
    const lines = parsed.split("\n")

    let length = 0;
    for(let i = 0; i < lines.length; ++i)
    length++;

    console.log("lines:"+length)

    return length
}
```
