// call the trace_transaction method using the node and hash from the input
async function trace() {

    //retrieve the users inputs 
    const node_url = document.getElementById("node").value;
    const txHash = document.getElementById("hash").value;

    // connect to the node and log getBlockNumber to verify the connection is successful
    const provider = new ethers.providers.JsonRpcProvider(node_url);
    const blockNum = await provider.getBlockNumber();
    console.log(`The latest block is: ${blockNum}`);

    // try/catch to give an error alert
    try {

        // call trace_transaction using the transaction hash from the user (Erigon node only)
        const traceTx = await provider.send("trace_transaction", [txHash, ]);
        console.log('Tracing...')
        //console.log(traceTx);

        // parse and display the JSON response. 
        document.getElementById("result").innerHTML = JSON.stringify(traceTx, null, 4)

        document.getElementById("info").innerHTML = "Done retrieving"

    } catch (err) {
        console.error("Something went wrong")
        alert("Something went wrong - possible reasons: Not an Erigon node, Trace module not active on your node, Transaction hash not valid.")
    }
}

// call the debug_traceTransaction method using the node and hash from the input
async function debug() {

    //retrieve the users inputs 
    const node_url = document.getElementById("node").value;
    const txHash = document.getElementById("hash").value;

    // connect to the node and log getBlockNumber to verify the connection is successful
    const provider = new ethers.providers.JsonRpcProvider(node_url);
    const blockNum = await provider.getBlockNumber();
    console.log(`The latest block is: ${blockNum}`);

    // try/catch to give an error alert
    try {
        const debugTx = await provider.send("debug_traceTransaction", [txHash, ]);
        console.log("Debugging...")
        //console.log(debugTx);

        document.getElementById("info").innerHTML = "Done retrieving"

        document.getElementById("result").innerHTML = JSON.stringify(debugTx, null, 4)

    } catch (err) {
        console.error("Something went wrong")
        alert("Something went wrong - possible reasons: Not an Erigon node, Trace module not active on your node, Transaction hash not valid.")
    }

}

// clear the screen from the previous result
function clean() {
    let div = document.getElementById('result');
    let info = document.getElementById('info');
    div.innerHTML = "";
    info.innerHTML = "";
}
