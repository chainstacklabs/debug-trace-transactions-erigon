
// call the trace_transaction method using the node and hash from the input
async function trace() {

    //retrieve the users inputs 
    const node_url = document.getElementById("erigon").value;
    const txHash = document.getElementById("hash").value;

    // connect to the node and log getBlockNumber to verify the connection is successful
    const provider = new ethers.providers.JsonRpcProvider(node_url);
    const blockNum = await provider.getBlockNumber();
    console.log(`The latest block is: ${blockNum}`);

    // call and measure the execution time of the callTrace function
    console.log('Tracing...')
    document.getElementById("info").innerHTML = "Tracing..."

    const start = Date.now();
    const traceResult = await callTrace(txHash, provider);
    const end = Date.now();
    document.getElementById("SpeedEri").innerHTML = `${end - start} ms`

    console.log('done')
    //console.log(traceTx);

    // Display the JSON response. 
    const jsonResponse = JSON.stringify(traceResult, null, 4)
    document.getElementById("result").innerHTML = jsonResponse
    
    // calculate size of the response
    const size = new TextEncoder().encode(jsonResponse).length
    const kiloBytes = size / 1024;
    //const megaBytes = kiloBytes / 1024;
    
    // The trace response is usually small, that's why I'm using KB here
    document.getElementById("dataEri").innerHTML = `${kiloBytes.toFixed(3)} KB`

    document.getElementById("info").innerHTML = "Done retrieving"
}

// call the debug_traceTransaction method using the Erigon URL and hash from the input
async function debugErigon() {

    //retrieve the users inputs 
    const node_url = document.getElementById("erigon").value;
    const txHash = document.getElementById("hash").value;

    // connect to the node and log getBlockNumber to verify the connection is successful
    const provider = new ethers.providers.JsonRpcProvider(node_url);
    const blockNum = await provider.getBlockNumber();
    console.log(`The latest block is: ${blockNum}`);

    // call and measure the execution time of the debug function
    console.log('Debugging...')
    document.getElementById("info").innerHTML = "Debugging..."
    
    const start = Date.now();
    const debugResult = await callDebugErigon(txHash, provider);
    const end = Date.now();
    document.getElementById("SpeedEri").innerHTML = `${end - start} ms`

    document.getElementById("info").innerHTML = "Done retrieving"

    // display Json response
    const jsonResponse = JSON.stringify(debugResult, null, 4)
    document.getElementById("result").innerHTML = jsonResponse

    // calculate size of the response 
    const size = new TextEncoder().encode(jsonResponse).length
    const kiloBytes = size / 1024;
    const megaBytes = kiloBytes / 1024;

    document.getElementById("dataEri").innerHTML = `${megaBytes.toFixed(2)} MB`

}

// call the debug_traceTransaction method using the Geth URL and hash from the input
async function debugGeth() {

    //retrieve the users inputs 
    const node_url = document.getElementById("geth").value;
    const txHash = document.getElementById("hash").value;

    // connect to the node and log getBlockNumber to verify the connection is successful
    const provider = new ethers.providers.JsonRpcProvider(node_url);
    const blockNum = await provider.getBlockNumber();
    console.log(`The latest block is: ${blockNum}`);

    // call and measure the execution time of the debug function
    console.log('Debugging...')
    document.getElementById("info").innerHTML = "Debugging..."

    const start = Date.now();
    const debugResult = await callDebugGeth(txHash, provider);
    const end = Date.now();
    document.getElementById("SpeedGeth").innerHTML = `${end - start} ms`

    document.getElementById("info").innerHTML = "Done retrieving"

    // display Json response
    const jsonResponse = JSON.stringify(debugResult, null, 4)
    document.getElementById("result").innerHTML = jsonResponse

    // calculate size of the response 
    const size = new TextEncoder().encode(jsonResponse).length
    const kiloBytes = size / 1024;
    const megaBytes = kiloBytes / 1024;
    console.log(megaBytes)

    document.getElementById("dataGeth").innerHTML = `${megaBytes.toFixed(2)} MB`

}

// call the trace_transaction method
async function callTrace(hash, provider) {

    // try/catch to give an error alert
    try {

        // call trace_transaction using the transaction hash from the user (Erigon node only)
        const traceTx = await provider.send("trace_transaction", [hash, ]);

        return traceTx

    } catch (err) {
        console.error("Something went wrong")
        alert("Something went wrong - possible reasons: Not an Erigon node, Trace module not active on your node, Transaction hash not valid.")
    }
}

// call the debug_traceTransaction method using Erigon
async function callDebugErigon(hash, provider) {

    // try/catch for error handling
    try {

        // call trace_transaction using the transaction hash from the user (Erigon node only)
        const debugTx = await provider.send("debug_traceTransaction", [hash, ]);

        return debugTx

    } catch (err) {
        console.error("Something went wrong")
        alert("Something went wrong - possible reasons: Not an Erigon node, Trace module not active on your node, Transaction hash not valid.")
    }
}

// call the debug_traceTransaction method using Geth
async function callDebugGeth(hash, provider) {

    // try/catch for error handling
    try {

        // call trace_transaction using the transaction hash from the user (Erigon node only)
        const debugTx = await provider.send("debug_traceTransaction", [hash, ]);

        return debugTx

    } catch (err) {
        console.error("Something went wrong")
        alert("Something went wrong - possible reasons: Not an Erigon node, Trace module not active on your node, Transaction hash not valid.")
    }
}

// compare the 2 nodes by calling the same method on the same hash at the same time.
async function compareNodes() {

    //retrieve the users inputs 
    const eri_url = document.getElementById("erigon").value;
    const geth_url = document.getElementById("geth").value;
    const txHash = document.getElementById("hash").value;

    // connects to both nodes
    const eriProvider = new ethers.providers.JsonRpcProvider(eri_url);
    const gethProvider = new ethers.providers.JsonRpcProvider(geth_url);

    console.log("Comparing...")
    
    // make the calls and time them
    const startEri = Date.now();
    const traceResult = await callDebugErigon(txHash, eriProvider);
    const endEri = Date.now();
    document.getElementById("SpeedEri").innerHTML = `${endEri - startEri} ms`
    console.log("Done Erigon")

    const start = Date.now();
    const debugResult = await callDebugGeth(txHash, gethProvider);
    const end = Date.now();
    document.getElementById("SpeedGeth").innerHTML = `${end - start} ms`
    console.log("Done Geth")

    // calculate size of the responses
    const jsonResponseEri = JSON.stringify(traceResult, null, 4)
    const jsonResponseGeth = JSON.stringify(debugResult, null, 4)
    
    // Erigon response
    const sizeEri = new TextEncoder().encode(jsonResponseEri).length

    const kiloBytesEri = sizeEri / 1024;
    const megaBytesEri = kiloBytesEri / 1024;

    document.getElementById("dataEri").innerHTML = `${megaBytesEri.toFixed(2)} MB`
    
    // Geth response
    const sizeGeth = new TextEncoder().encode(jsonResponseGeth).length
    const kiloBytesGeth = sizeGeth / 1024;
    const megaBytesGeth = kiloBytesGeth / 1024;

    document.getElementById("dataGeth").innerHTML = `${megaBytesGeth.toFixed(2)} MB`

    console.log("Done comparing")
}

// clear the screen from the previous results
function clean() {
    let div = document.getElementById('result');
    let info = document.getElementById('info');
    let timeEri = document.getElementById("SpeedEri")
    let timeGeth = document.getElementById("SpeedGeth")
    let sizeEri = document.getElementById("dataEri")
    let sizeGeth = document.getElementById("dataGeth")
    div.innerHTML = "";
    info.innerHTML = "";
    timeEri.innerHTML = "";
    timeGeth.innerHTML = "";
    sizeEri.innerHTML = "";
    sizeGeth.innerHTML = "";
}
