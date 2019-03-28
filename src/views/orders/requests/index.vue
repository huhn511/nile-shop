<template>
  <div class="requests-container">
    <h3>Shop IOTA Address</h3>
    <p>{{shop.order_request_address}}</p>
    <h3>Transactions</h3>
    <pre>{{messages}}</pre>
  </div>
</template>

<script>
import { provider } from "@/config.json";
import { composeAPI } from "@iota/core";
import { trytesToAscii } from "@iota/converter";

const iota = composeAPI({
  provider: provider
});

export default {
  data() {
    return {
      shop: {},
      messages: []
    };
  },
  created() {
    // fetch products from database
    let shop_string = localStorage.getItem("shop") || "{}";
    this.shop = JSON.parse(shop_string);
    console.log("shopp?", this.shop);
    var self = this
    iota
      .findTransactionObjects({ addresses: [this.shop.order_request_address] })
      .then(response => {
        console.log("Encoded response:", response);
        response.forEach(transaction => {
          let message = trytesToAscii(
            transaction.signatureMessageFragment + "9"
          );

            let character = message[message.length- 1]

            const first = [...message].findIndex(char => char !== character);
            const last = [...message].reverse().findIndex(char => char !== character);
            let trimed_message =  message.substring(first, message.length - last);

          try {
            this.messages.push(JSON.parse(trimed_message.toString()));
            console.log("Valid JSON:");
          } catch (e) {
            console.log("INVALID JSON:");
          }
        });
      })
      .catch(err => {
        // handle errors here
        console.log("findTransactionObjects ERROR:", err);
      });
  },
  medhots: {
    trimByChar: function(string, character) {
      const first = [...string].findIndex(char => char !== character);
      const last = [...string].reverse().findIndex(char => char !== character);
      return string.substring(first, string.length - last);
    }
  }
};
</script>
