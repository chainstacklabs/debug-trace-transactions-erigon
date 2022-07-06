# ```trace_transaction``` guide

```trace_transaction``` is one of the methods available in Erigon to trace, and it takes a transaction hash as input, allowing you to see the internal functions calls made into a smart contract.

## ```trace_transaction``` method— parameters accepted and returned

 **Parameters:** 

```transaction hash``` - Hash of the transaction to trace. 

**Returns:** 

```array``` - Block traces.

<details>
  <summary>Expand to see all of the returned parameters</summary>
  
 - ```action``` - ParityTrace Object, with the following fields:

    - ```traceaddress``` - Array.

    - ```calltype``` - String.

    - ```includeintrace``` - Boolean.

    - ```isprecomplied``` - Boolean.

    - ```type``` - String.

    - ```creationmethod``` - String.

    - ```from``` - Address.

    - ```to``` - Address.

    - ```gas``` - Quantity.

    - ```value``` - Quantity.

    - ```input``` - Data.

    - ```result``` - ParityTraceResult object with the following fields:

      - ```gasused``` - Quantity

      - ```output``` - Data

      - ```address``` - Address

      - ```code``` - Data

    - ```subtraces``` - Array.

    - ```author``` - Address.

    - ```rewardtype``` - String.

    - ```error``` - String.

- ```blockhash``` - String of the block hash.

- ```blocknumber``` - Quantity.

- ```result``` - ParityTraceResult object which has the following fields:

    - ```gasused``` - Quantity

    - ```output``` - Data

    - ```address``` - Address

    - ```code``` - Data

- ```subtraces``` - Quantity.

- ```traceaddress``` - Array.

- ```transactionhash``` - Hash.

- ```transactionposition``` - Quantity.

- ```type``` - String.

- ```error``` - String.

</details>  
  
### Code examples

**cURL**

```sh
curl -X POST 'ERIGON_NODE' \
-H 'Content-Type: application/json' \
--data '{"method":"trace_transaction","params":["0x3aeaf88cf789d42533714606297bcddf3613f9092a57f2f1e9f2fb8cd0c8831f"],"id":1,"jsonrpc":"2.0"}'
```

**web3.py**

```py
from web3 import Web3

node_url = "ERIGON_NODE_URL"

# Create the node connection
web3 = Web3.HTTPProvider(node_url)

# print trace transaction
trace = web3.make_request("trace_transaction", ["0x3aeaf88cf789d42533714606297bcddf3613f9092a57f2f1e9f2fb8cd0c8831f"])
#print(trace) # raw result

# Parse the result in a more readable way
for action in trace['result']:
    for key, val in action.items():
        print(key +':', val)
```
## Analyze a transaction

You will need access to an Ethereum node running Erigon, you can [get one with Chainstack](https://t.co/Ks7k4295Xm).

Let's analyze this [transaction](https://etherscan.io/tx/0x3aeaf88cf789d42533714606297bcddf3613f9092a57f2f1e9f2fb8cd0c8831f/advanced):

This transaction is made by an account to a smart contract. 

![image](https://user-images.githubusercontent.com/99700157/175949660-e75f0ac5-beac-4e24-9a76-6625a0d4b1d8.png)

The transaction sends this data to the smart contract (calls the ```claim``` function):

```sh
Function: claim(address _receiver, uint256 _quantity, address _currency, uint256 _pricePerToken, bytes32[] _proofs, uint256 _proofMaxQuantityPerTransaction) ***

MethodID: 0x7a5a8e7e
[0]:  0000000000000000000000000ee46e8ca7933dd131e7369ee9d871a7e430067e
[1]:  0000000000000000000000000000000000000000000000000000000000000001
[2]:  000000000000000000000000eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
[3]:  0000000000000000000000000000000000000000000000000000000000000000
[4]:  00000000000000000000000000000000000000000000000000000000000000c0
[5]:  0000000000000000000000000000000000000000000000000000000000000000
[6]:  000000000000000000000000000000000000000000000000000000000000000a
[7]:  09f950e600088b8f3c83a2a1fe308d099c818d122c8d60b7f73d962d68b83171
[8]:  3c23450053c5193e661f163aa190964e9f81eb7c419d2273b45afb22498292bc
[9]:  64aebc659f0ddecec9d2c95668d708b439cd8efb23872724a3e4d0b223463402
[10]: 44a955e75c9e4de07cd2c9eb99b144c468597b5d4bd6c42b29b7ba499915d07a
[11]: c02dec6a1ac983c5f340096f1076ec049bcfb3e8b3bc55d0dadcddf68335db7c
[12]: 88e7a619f7ea2cbb2e67d9ea3eac23f141f4d04d686bcbfa92edfabb91cf5b40
[13]: 887c08fd8316423db1fa67dcb4ec0498bcfa9df86fdf32d052ed30fa4c0b8de1
[14]: f7d0f7f5859b0dc082c8c37f32c289d48e8aabd0dcefcf1688503165e6159c07
[15]: 0cb354a05f36ef1fd4b9c334e4b5435f0007191af09640ae4c5e03c3169e9a5e
[16]: b5e2a40dc6e10ca58622afa8872e7e969a0cb03959d12b80b8d6c0471ebc2a6d
```
raw data:
```sh
0x7a5a8e7e0000000000000000000000000ee46e8ca7933dd131e7369ee9d871a7e430067e0000000000000000000000000000000000000000000000000000000000000001000000000000000000000000eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a09f950e600088b8f3c83a2a1fe308d099c818d122c8d60b7f73d962d68b831713c23450053c5193e661f163aa190964e9f81eb7c419d2273b45afb22498292bc64aebc659f0ddecec9d2c95668d708b439cd8efb23872724a3e4d0b22346340244a955e75c9e4de07cd2c9eb99b144c468597b5d4bd6c42b29b7ba499915d07ac02dec6a1ac983c5f340096f1076ec049bcfb3e8b3bc55d0dadcddf68335db7c88e7a619f7ea2cbb2e67d9ea3eac23f141f4d04d686bcbfa92edfabb91cf5b40887c08fd8316423db1fa67dcb4ec0498bcfa9df86fdf32d052ed30fa4c0b8de1f7d0f7f5859b0dc082c8c37f32c289d48e8aabd0dcefcf1688503165e6159c070cb354a05f36ef1fd4b9c334e4b5435f0007191af09640ae4c5e03c3169e9a5eb5e2a40dc6e10ca58622afa8872e7e969a0cb03959d12b80b8d6c0471ebc2a6d
```

## Call ```trace_transaction``` :

Now calling ```trace_transaction``` (from Postman), we can analyze what happens within the smart contract:

```sh
curl -X POST 'ERIGON_NODE' \
-H 'Content-Type: application/json' \
--data-raw '{"method":"trace_transaction","params":["0x3aeaf88cf789d42533714606297bcddf3613f9092a57f2f1e9f2fb8cd0c8831f"],"id":1,"jsonrpc":"2.0"}'
```

Will return 2 calls:

<details>
  <summary>Expand to see the entire results retrieved</summary>

```sh
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": [
        {
            "action": {
                "from": "0x0ee46e8ca7933dd131e7369ee9d871a7e430067e",
                "callType": "call",
                "gas": "0x3e67a",
                "input": "0x7a5a8e7e0000000000000000000000000ee46e8ca7933dd131e7369ee9d871a7e430067e0000000000000000000000000000000000000000000000000000000000000001000000000000000000000000eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a09f950e600088b8f3c83a2a1fe308d099c818d122c8d60b7f73d962d68b831713c23450053c5193e661f163aa190964e9f81eb7c419d2273b45afb22498292bc64aebc659f0ddecec9d2c95668d708b439cd8efb23872724a3e4d0b22346340244a955e75c9e4de07cd2c9eb99b144c468597b5d4bd6c42b29b7ba499915d07ac02dec6a1ac983c5f340096f1076ec049bcfb3e8b3bc55d0dadcddf68335db7c88e7a619f7ea2cbb2e67d9ea3eac23f141f4d04d686bcbfa92edfabb91cf5b40887c08fd8316423db1fa67dcb4ec0498bcfa9df86fdf32d052ed30fa4c0b8de1f7d0f7f5859b0dc082c8c37f32c289d48e8aabd0dcefcf1688503165e6159c070cb354a05f36ef1fd4b9c334e4b5435f0007191af09640ae4c5e03c3169e9a5eb5e2a40dc6e10ca58622afa8872e7e969a0cb03959d12b80b8d6c0471ebc2a6d",
                "to": "0x7340bf9efc961d65724fcf142e9579fa29832909",
                "value": "0x0"
            },
            "blockHash": "0xb9ad714b627e0e7905c9c7a7f0b83908357f7f2dc3c8f0baca52baf437b1cec2",
            "blockNumber": 15013721,
            "result": {
                "gasUsed": "0x3ceb0",
                "output": "0x"
            },
            "subtraces": 1,
            "traceAddress": [],
            "transactionHash": "0x3aeaf88cf789d42533714606297bcddf3613f9092a57f2f1e9f2fb8cd0c8831f",
            "transactionPosition": 193,
            "type": "call"
        },
        {
            "action": {
                "from": "0x7340bf9efc961d65724fcf142e9579fa29832909",
                "callType": "delegatecall",
                "gas": "0x3cc5f",
                "input": "0x7a5a8e7e0000000000000000000000000ee46e8ca7933dd131e7369ee9d871a7e430067e0000000000000000000000000000000000000000000000000000000000000001000000000000000000000000eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a09f950e600088b8f3c83a2a1fe308d099c818d122c8d60b7f73d962d68b831713c23450053c5193e661f163aa190964e9f81eb7c419d2273b45afb22498292bc64aebc659f0ddecec9d2c95668d708b439cd8efb23872724a3e4d0b22346340244a955e75c9e4de07cd2c9eb99b144c468597b5d4bd6c42b29b7ba499915d07ac02dec6a1ac983c5f340096f1076ec049bcfb3e8b3bc55d0dadcddf68335db7c88e7a619f7ea2cbb2e67d9ea3eac23f141f4d04d686bcbfa92edfabb91cf5b40887c08fd8316423db1fa67dcb4ec0498bcfa9df86fdf32d052ed30fa4c0b8de1f7d0f7f5859b0dc082c8c37f32c289d48e8aabd0dcefcf1688503165e6159c070cb354a05f36ef1fd4b9c334e4b5435f0007191af09640ae4c5e03c3169e9a5eb5e2a40dc6e10ca58622afa8872e7e969a0cb03959d12b80b8d6c0471ebc2a6d",
                "to": "0xb1bd9d7942a250ba2dce27dd601f2ed4211a60c4",
                "value": "0x0"
            },
            "blockHash": "0xb9ad714b627e0e7905c9c7a7f0b83908357f7f2dc3c8f0baca52baf437b1cec2",
            "blockNumber": 15013721,
            "result": {
                "gasUsed": "0x3c3e3",
                "output": "0x"
            },
            "subtraces": 0,
            "traceAddress": [
                0
            ],
            "transactionHash": "0x3aeaf88cf789d42533714606297bcddf3613f9092a57f2f1e9f2fb8cd0c8831f",
            "transactionPosition": 193,
            "type": "call"
        }
    ]
}
```
</details>

It basically shows details like gas used, block, the call type, and so on for every action happening during the transaction.

### The first one is the call from the account to the smart contract:

```callType : call```

```sh
"action": {
                "from": "0x0ee46e8ca7933dd131e7369ee9d871a7e430067e",
                "callType": "call",
                "gas": "0x3e67a",
                "input": "0x7a5a8e7e0000000000000000000000000ee46e8ca7933dd131e7369ee9d871a7e430067e0000000000000000000000000000000000000000000000000000000000000001000000000000000000000000eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a09f950e600088b8f3c83a2a1fe308d099c818d122c8d60b7f73d962d68b831713c23450053c5193e661f163aa190964e9f81eb7c419d2273b45afb22498292bc64aebc659f0ddecec9d2c95668d708b439cd8efb23872724a3e4d0b22346340244a955e75c9e4de07cd2c9eb99b144c468597b5d4bd6c42b29b7ba499915d07ac02dec6a1ac983c5f340096f1076ec049bcfb3e8b3bc55d0dadcddf68335db7c88e7a619f7ea2cbb2e67d9ea3eac23f141f4d04d686bcbfa92edfabb91cf5b40887c08fd8316423db1fa67dcb4ec0498bcfa9df86fdf32d052ed30fa4c0b8de1f7d0f7f5859b0dc082c8c37f32c289d48e8aabd0dcefcf1688503165e6159c070cb354a05f36ef1fd4b9c334e4b5435f0007191af09640ae4c5e03c3169e9a5eb5e2a40dc6e10ca58622afa8872e7e969a0cb03959d12b80b8d6c0471ebc2a6d",
                "to": "0x7340bf9efc961d65724fcf142e9579fa29832909",
                "value": "0x0"
            },
            "blockHash": "0xb9ad714b627e0e7905c9c7a7f0b83908357f7f2dc3c8f0baca52baf437b1cec2",
            "blockNumber": 15013721,
            "result": {
                "gasUsed": "0x3ceb0",
                "output": "0x"
            },
            "subtraces": 1,
            "traceAddress": [],
            "transactionHash": "0x3aeaf88cf789d42533714606297bcddf3613f9092a57f2f1e9f2fb8cd0c8831f",
            "transactionPosition": 193,
            "type": "call"
        },
```

It looks like that this first action is a ```call``` from the account sending the transaction to the smart contract [0x7340bf9efc961d65724fcf142e9579fa29832909](https://etherscan.io/address/0x7340bf9efc961d65724fcf142e9579fa29832909)

You can see the same on Etherscan using the Parity Trace function:

[Parity VM Trace](https://etherscan.io/vmtrace?txhash=0x3aeaf88cf789d42533714606297bcddf3613f9092a57f2f1e9f2fb8cd0c8831f&type=parity)

![image](https://user-images.githubusercontent.com/99700157/175952233-06a4a04c-6e69-4f6f-abeb-793524c7661d.png)

> Note that the input matches the raw data sent with the transaction because that is what tells the contract what to do.

### The second one is the smart contract sending a ```delegateCall``` to another smart contract:

```callType : delegateCall```

```sh
{
            "action": {
                "from": "0x7340bf9efc961d65724fcf142e9579fa29832909",
                "callType": "delegatecall",
                "gas": "0x3cc5f",
                "input": "0x7a5a8e7e0000000000000000000000000ee46e8ca7933dd131e7369ee9d871a7e430067e0000000000000000000000000000000000000000000000000000000000000001000000000000000000000000eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a09f950e600088b8f3c83a2a1fe308d099c818d122c8d60b7f73d962d68b831713c23450053c5193e661f163aa190964e9f81eb7c419d2273b45afb22498292bc64aebc659f0ddecec9d2c95668d708b439cd8efb23872724a3e4d0b22346340244a955e75c9e4de07cd2c9eb99b144c468597b5d4bd6c42b29b7ba499915d07ac02dec6a1ac983c5f340096f1076ec049bcfb3e8b3bc55d0dadcddf68335db7c88e7a619f7ea2cbb2e67d9ea3eac23f141f4d04d686bcbfa92edfabb91cf5b40887c08fd8316423db1fa67dcb4ec0498bcfa9df86fdf32d052ed30fa4c0b8de1f7d0f7f5859b0dc082c8c37f32c289d48e8aabd0dcefcf1688503165e6159c070cb354a05f36ef1fd4b9c334e4b5435f0007191af09640ae4c5e03c3169e9a5eb5e2a40dc6e10ca58622afa8872e7e969a0cb03959d12b80b8d6c0471ebc2a6d",
                "to": "0xb1bd9d7942a250ba2dce27dd601f2ed4211a60c4",
                "value": "0x0"
            },
            "blockHash": "0xb9ad714b627e0e7905c9c7a7f0b83908357f7f2dc3c8f0baca52baf437b1cec2",
            "blockNumber": 15013721,
            "result": {
                "gasUsed": "0x3c3e3",
                "output": "0x"
            },
            "subtraces": 0,
            "traceAddress": [
                0
            ],
            "transactionHash": "0x3aeaf88cf789d42533714606297bcddf3613f9092a57f2f1e9f2fb8cd0c8831f",
            "transactionPosition": 193,
            "type": "call"
        }
```

So it looks like it uses a [proxy smart contract](https://ethereum.stackexchange.com/questions/114809/what-exactly-is-a-proxy-contract-and-why-is-there-a-security-vulnerability-invol). 

>We can add Basti's article once is published!

The account sends the transaction to the ["proxy" smart contract](https://etherscan.io/address/0x7340bf9efc961d65724fcf142e9579fa29832909#code) to claim an NFT, then the proxy contract sends a ```delegatedCall``` to the [contract that will execute the function](https://etherscan.io/address/0xb1bd9d7942a250ba2dce27dd601f2ed4211a60c4#code).

![image](https://user-images.githubusercontent.com/99700157/175953184-54780794-93db-4829-81b0-5d31d1b8e1ce.png)

You can see the same on Etherscan using the Parity Trace function:

[Parity VM Trace](https://etherscan.io/vmtrace?txhash=0x3aeaf88cf789d42533714606297bcddf3613f9092a57f2f1e9f2fb8cd0c8831f&type=parity)

## Different type of calls 

In this example, we can see that the two actions make two types of calls:

- ```call```

```call``` in this case refers to how the account interacts with the smart contract, and it is defined as a **low-level interface for sending a message to a contract**. 

Essentially ```call``` is used by an account to send a message, in this case, code, to a smart contract telling it to execute a **public** or **external** function.  Using ```call```, the account can only call a function in the smart contract directly. 

- ```delegatecall```

A ```delegatecall``` is used in case the smart contract that receives the transaction wants to call another function from another smart contract, but using its storage, balance, and address supplied to the function.

**Account**  ——— send transaction ———> **contract A** ——— calls function ———> **contract B**

This is a common occurrence when interacting with proxy contracts and [upgradable smart contracts](https://docs.openzeppelin.com/upgrades-plugins/1.x/writing-upgradeable). 

## Conclusion

We just learned that claiming an NFT from this contract will send the transaction to another contract to call a function, and we would not have known this without tracing it. 



