# Bloc Examples

This directory contains examples on how to consume the `Bloc API`. There are examples using the `request-promise` library that demonstrate the various `GET` and `POST` routes available on the REST API. We also have examples of our powerful `blockapps-rest` node library, which implements promise chaining to handle more complicated workflows. If developing an application in node, we suggest using `blockapps-rest` as it keeps code clean and concise.

### Dependency
Make sure you've an instance of STRATO platform with Bloc API running.

You can do that on your own machine or a VM using our Developer Edition: https://github.com/blockapps/strato-getting-started

### Documentation
* `bloc-server` endpoints: http://<YOUR_STRATO_URL>/bloc/v2.1/docs
* `blockapps-rest` docs: https://github.com/blockapps/blockapps-rest#bloch

### Examples included:

  1. Create users and send transactions
    * Creating new users
    * Accessing users and checking user account balances
    * Sending ether between user accounts

  2. Upload
    * Upload a contract from a user
    * Call a method on a contract
    * Query contract state

### Instructions
  1. Run `npm install`
  2. Open `config.yaml` and put in the appropriate `stratoUrl` and `blocUrl`. If you are running [strato-getting-started](https://github.com/blockapps/strato-getting-started), then the appropriate values are alread in place.
  3. Execute `node <name-of-js-file>.js  --config config.yaml` to run any of the examples.
  
