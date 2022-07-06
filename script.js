
// call the trace_transaction method using the Erigon node and hash from the input
async function trace() {

    //retrieve the users inputs 
    const node_url = document.getElementById("erigon").value;
    const txHash = document.getElementById("hash").value;

    // connect to the node and log getBlockNumber to verify the connection is successful
    const provider = new ethers.providers.JsonRpcProvider(node_url);
    const blockNum = await provider.getBlockNumber();
    console.log(`The latest block is: ${blockNum}`);
    console.log('Tracing...')

    // update info label
    document.getElementById("info").innerHTML = "Tracing..."

    // call and measure the excecution time of the callTrace function
    const start = Date.now();
    const traceResult = await callTrace(txHash, provider);
    const end = Date.now();
    document.getElementById("SpeedEri").innerHTML = `${end - start} ms`

    //console.log(traceTx);
    console.log('done')

    // Display the JSON response. 
    const jsonResponse = JSON.stringify(traceResult, null, 4)
    document.getElementById("result").innerHTML = jsonResponse

    // update info label
    document.getElementById("info").innerHTML = "Done retrieving"

    // calculate the aproximate size of the object, trace is usually small and getSizeKb returns a value in kB
    const size = getSizeKb(jsonResponse)
    //const megaBytes = size / 1024;
    document.getElementById("dataEri").innerHTML = `${size} kB`

    // call getLines to count how many lines are present in the JSON
    const lines = getLines(traceResult)
    document.getElementById("linesEri").innerHTML = lines
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
    console.log('Debugging...')

    // update info label
    document.getElementById("info").innerHTML = "Debugging..."

    // call and measure the excecution time of the callDebugErigon function
    const start = Date.now();
    const debugResult = await callDebugErigon(txHash, provider);
    const end = Date.now();
    document.getElementById("SpeedEri").innerHTML = `${end - start} ms`

    // display Json response
    const jsonResponse = JSON.stringify(debugResult, null, 4)
    document.getElementById("result").innerHTML = jsonResponse

    // update info label
    document.getElementById("info").innerHTML = "Done retrieving"

    // calculate the aproximate size of the object, trace is usually small and getSizeKb returns a value in kB
    const size = getSizeKb(jsonResponse)
    const megaBytes = size / 1024;
    document.getElementById("dataEri").innerHTML = `${megaBytes.toFixed(2)} mB`

    // call getLines to count how many lines are present in the JSON
    const lines = getLines(debugResult)
    document.getElementById("linesEri").innerHTML = lines
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
    console.log('Debugging...')

    // update info label
    document.getElementById("info").innerHTML = "Debugging..."

    //  call and measure the excecution time of the callDebugGeth function
    const start = Date.now();
    const debugResult = await callDebugGeth(txHash, provider);
    const end = Date.now();
    document.getElementById("SpeedGeth").innerHTML = `${end - start} ms`

    // update info label
    document.getElementById("info").innerHTML = "Done retrieving"

    // display Json response
    const jsonResponse = JSON.stringify(debugResult, null, 4)
    document.getElementById("result").innerHTML = jsonResponse

    // calculate the aproximate size of the object, getSizeKb returns a value in kB
    const size = getSizeKb(jsonResponse)
    const megaBytes = size / 1024;
    document.getElementById("dataGeth").innerHTML = `${megaBytes.toFixed(2)} mB`

    // call getLines to count how many lines are present in the JSON
    const lines = getLines(debugResult)
    document.getElementById("linesGeth").innerHTML = lines
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

    // measure the time to complete the 2 functions, callDebugErigon and callDebugGeth
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

    // calculate the approximate size of the responses 
    const jsonResponseEri = JSON.stringify(traceResult, null, 4)
    const jsonResponseGeth = JSON.stringify(debugResult, null, 4)

    const sizeEri = getSizeKb(jsonResponseEri)
    const megaBytesEri = sizeEri / 1024;
    document.getElementById("dataEri").innerHTML = `${megaBytesEri.toFixed(2)} mB`

    const sizeGeth = getSizeKb(jsonResponseGeth)
    const megaBytesGeth = sizeGeth / 1024;
    document.getElementById("dataGeth").innerHTML = `${megaBytesGeth.toFixed(2)} mB`

    // call getLines to count how many lines are present in the JSON
    const linesEri = getLines(traceResult)
    document.getElementById("linesEri").innerHTML = linesEri

    // call getLines to count how many lines are present in the JSON
    const linesGeth = getLines(debugResult)
    document.getElementById("linesGeth").innerHTML = linesGeth

    console.log("Done comparing")
}

// return the approximate size of the stringified JSON object 
function getSizeKb(object) {
    const bytes = new TextEncoder().encode(object).length
    const kb = (bytes / 1024).toFixed(2);
    return kb
}

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

// clear the screen from the previous result
function clean() {
    let div = document.getElementById('result');
    let info = document.getElementById('info');
    div.innerHTML = "";
    info.innerHTML = "";
}

// clear the screen from the data stats
function cleanStats() {
    let timeEri = document.getElementById("SpeedEri")
    let timeGeth = document.getElementById("SpeedGeth")
    let sizeEri = document.getElementById("dataEri")
    let sizeGeth = document.getElementById("dataGeth")
    let linesEri = document.getElementById("linesEri")
    let linesGeth = document.getElementById("linesGeth")
    timeEri.innerHTML = "";
    timeGeth.innerHTML = "";
    sizeEri.innerHTML = "";
    sizeGeth.innerHTML = "";
    linesEri.innerHTML = "";
    linesGeth.innerHTML = "";
}
