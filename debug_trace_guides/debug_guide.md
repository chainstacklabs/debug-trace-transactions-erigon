# ```debug_traceTransaction``` guide

The debug function in Erigon is very useful during the development of a smart contract to understand why a transaction is failing. 

```debug_traceTransaction``` returns logs of low-level [opcode](https://en.wikipedia.org/wiki/Opcode) that can be used to show what happens step by step during the process and what is the reason for it failing.

Developers can use this data to show the steps happening during a transaction.

In this guide we will see three ways to analyze a failed transaction:

  1. Using Geth VM Debug Trace Transaction page on Etherscan.
  1. Using [tenderly.co](https://dashboard.tenderly.co/), an Ethereum developer platform.
  1. Calling the ```debug_traceTransaction``` method.

## ```debug_traceTransaction``` method— parameters accepted and returned

 **Parameters:** 

```transaction hash``` - Hash of the transaction to trace. 

**Returns:** 

```array``` - Block traces.

- ```result``` - Transaction Trace Object, with the following fields:

  - ```failed``` - Boolean.

  - ```gas``` - Quantity.

  - ```returnvalue``` - Data.

  - ```structlogs``` - Array:
  
    - ```entries``` - Array.

    - ```storagesbydepth``` - Array.
    
### Code examples

**cURL**

```sh
curl -X POST 'ERIGON_NODE_URL' \
-H 'Content-Type: application/json' \
--data '{"method": "debug_traceTransaction", "params": ["0x1cd5d6379c7a06619acaf07a1a87116e5a476203b1798862ebb7144ecc5ebba9", {}],"id":1,"jsonrpc":"2.0"}'
```

**web3.py**

```py
from web3 import Web3

node_url = "ERIGON_NODE_URL"

# Create the node connection
web3 = Web3.HTTPProvider(node_url)

# print debug trace transaction
debug = web3.make_request('debug_traceTransaction', ['0x1cd5d6379c7a06619acaf07a1a87116e5a476203b1798862ebb7144ecc5ebba9'])
#print(result)  # print raw result

# Parse the result in a more readable way
for action in debug['result']['structLogs']:
    for key, val in action.items():
        print(key +':', val)
```

## Analyze a failed transaction 

>**Note:** you will need access to an Ethereum node running Erigon to call the ```debug_traceTransaction``` method. 
>You can [get one with Chainstack](https://t.co/Ks7k4295Xm).

Let's analyze this [transaction](https://etherscan.io/tx/0x1cd5d6379c7a06619acaf07a1a87116e5a476203b1798862ebb7144ecc5ebba9):

This transaction is made by an [account](https://etherscan.io/address/0x7e6f723fcb32bafc4131f710d342c3d051b280ee) to a [smart contract](https://etherscan.io/address/0xee4458e052b533b1aabd493b5f8c4d85d7b263dc), and you can see that it failed and was reverted.

![image](https://user-images.githubusercontent.com/99700157/176203063-c7e60b59-bba1-4c41-b299-419caaa4966e.png)

The transaction sends this data to the smart contract (calls the ```transfer``` function):

```sh
Function: transfer(address _to, uint256 _value)

MethodID: 0xa9059cbb
[0]:  000000000000000000000000876eabf441b2ee5b5b0554fd502a8e0600950cfa
[1]:  000000000000000000000000000000000000000000000000000005e5ac845ea0
```
raw data:
```sh
0xa9059cbb000000000000000000000000876eabf441b2ee5b5b0554fd502a8e0600950cfa000000000000000000000000000000000000000000000000000005e5ac845ea0
```

## There are different ways to analyze the transaction.

### Geth VM Debug Trace Transaction on Etherscan

The first option is from the [Geth VM Trace Transaction](https://etherscan.io/vmtrace?txhash=0x1cd5d6379c7a06619acaf07a1a87116e5a476203b1798862ebb7144ecc5ebba9#raw) page on Etherscan. 

This is essentially the same output that you would get by calling ```debug_traceTransaction```, but parsed nicely.

![image](https://user-images.githubusercontent.com/99700157/176225316-7cc62957-959b-4083-9e62-2013a3c13830.png)

You can notice that the last operation is ***REVERT** at the step [241] and [program counter](https://en.wikipedia.org/wiki/Program_counter) (PC) 7243. 

![image](https://user-images.githubusercontent.com/99700157/176225064-2dcd4c05-c7da-46c0-b581-20c50385a9a9.png)

So this allows us to see that the transaction reverted for some reason, but we cannot see what that reason is. 

### Use tenderly.co

[tenderly.co](https://dashboard.tenderly.co/) is a Ethereum developer platform with deep functionality across debugging, testing, infra and more. This platform allows us to really analyze a transaction. 

If we use the transaction hash to in the dashboard we can retrieve the data. In the overview tab we can already see what the problem is. 

[link to the transaction overview in tenderly](https://dashboard.tenderly.co/tx/mainnet/0x1cd5d6379c7a06619acaf07a1a87116e5a476203b1798862ebb7144ecc5ebba9?trace=0.0)

This shows us that the transaction was reverted because the account calling the ```transfer``` function does not meet the condition of the modifier. In this case, the address sending the transaction (msg.sender) is not present in the **whitelist mapping**. 

![image](https://user-images.githubusercontent.com/99700157/176213677-96cd4052-a48b-4b62-a1f0-ddc3af79d12a.png)

Then, if we go to the **Debugger** section, we can see the details, and you will notice that it shows the ```OPCODE``` that we retrieve if we call the ```debug_traceTransaction``` method.

It first shows the function that was called, with its relative ```OPCODE```. As well as the contract, caller, and input information. Notice that in this case, the information is already converted into decimal from HEX. 

![image](https://user-images.githubusercontent.com/99700157/176220043-23299d7c-082b-4737-8d75-7461a67ded46.png)

Stack trace information:

```sh
{
  "[FUNCTION]": "transfer",
  "[OPCODE]": "JUMPDEST",
  "contract": {
    "address": "0xee4458e052b533b1aabd493b5f8c4d85d7b263dc",
    "balance": "0"
  },
  "caller": {
    "address": "0x7e6f723fcb32bafc4131f710d342c3d051b280ee",
    "balance": "12957438303317436"
  },
  "input": {
    "_to": "0x876eabf441b2ee5b5b0554fd502a8e0600950cfa",
    "_value": "6484000005792"
  },
  "[OUTPUT]": "0x",
  "[ERROR]": "execution reverted",
  "gas": {
    "gas_left": 128380,
    "gas_used": 5231,
    "total_gas_used": 21620
  }
}
```

The second step shows us why the transaction was reverted. It does not meet the condition of the **whitelist modifier**. 

![image](https://user-images.githubusercontent.com/99700157/176220778-292a58bf-c8b6-4044-8ddf-bcd1a95c3548.png)

With its stack trace:

```sh
{
  "[FUNCTION]": "transfer",
  "[OPCODE]": "REVERT",
  "[INPUT]": "0x",
  "[OUTPUT]": "0x",
  "[ERROR]": "execution reverted",
  "gas": {
    "gas_left": 0,
    "gas_used": 0,
    "total_gas_used": 150000
  }
}
```

### Call ```debug_traceTransaction``` :

Now calling ```debug_traceTransaction``` (from Postman), we can analyze what happens:

```sh
curl -X POST 'ERIGON_NODE_URL' \
-H 'Content-Type: application/json' \
--data '{"method": "debug_traceTransaction", "params": ["0x1cd5d6379c7a06619acaf07a1a87116e5a476203b1798862ebb7144ecc5ebba9", {}],"id":1,"jsonrpc":"2.0"}'
```
Here is the beginning of the response that you will receive by running the code above:

```sh
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": {
        "structLogs": [
            {
                "pc": 0,
                "op": "PUSH1",
                "gas": 128380,
                "gasCost": 3,
                "depth": 1,
                "stack": [],
                "memory": []
            },
            {
                "pc": 2,
                "op": "PUSH1",
                "gas": 128377,
                "gasCost": 3,
                "depth": 1,
                "stack": [
                    "0x80"
                ],
                "memory": []
            },
            ...
```

> You can see the full response in the ```debug_trace_response.json``` file in this Gist. It contains more than 5000 lines, and having it as a separate file keeps this guide a bit cleaner.

Then, you will find the ```REVERT``` opcode at the end, where it describes the error:

```sh
{
                "pc": 7243,
                "op": "REVERT",
                "gas": 123149,
                "gasCost": 0,
                "depth": 1,
                "stack": [
                    "0xa9059cbb",
                    "0x96d",
                    "0x876eabf441b2ee5b5b0554fd502a8e0600950cfa",
                    "0x5e5ac845ea0",
                    "0x0",
                    "0x0",
                    "0x0"
                ],
                "memory": [
                    "0000000000000000000000007e6f723fcb32bafc4131f710d342c3d051b280ee",
                    "0000000000000000000000000000000000000000000000000000000000000008",
                    "0000000000000000000000000000000000000000000000000000000000000080"
                ]
            }
```

By decoding these parameters, we can understand why the transaction fails.

> Still working on a way to decode this. I assume that it shows on what line of the smart contract is reverted. But I can't find a way to decode it. 
