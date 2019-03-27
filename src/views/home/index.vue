<template>
  <div class="home">
    <nav-bar></nav-bar>
    <div class="home-container">
        <h1>Welcome to the Nile Shop Application</h1>
        <p>This is a proof of concept of the nile shop application, which stores product blueprints in the Tangle and managable via mam stream.</p>
        <p>
        <a href="https://nile.shopping/" target="_blank" rel="noopener">Nile</a>
        is a decentralized and commission-free shopping ecosystem that promotes local economies.
        </p>
        <h3>How it works</h3>

        <p>You can create products, each defined as an object and stores a MAM channel.</p>
        <p>Credentials are stored in the local database in your browser, so the key to publishes messages in the MAM channel is owned just by you.</p>
        <p>So there is no third party, which stores your secret information. It's all on your device!</p>
        <p>The value of the product attributes can be updaded via a new message in the MAM stream, which contains the changes.</p>
        <p>To fetch the actual information about the product, the application walks thourgh the whole messages of the MAM stream and builds the latest product with actual attributes values.</p>
        <a href="#/shop/shop">Test it and create an shop!</a>
    </div>
  </div>
</template>
<script>
import NavBar from "@/components/Navbar/index";

export default {
  name: "home",
  components: {
    NavBar
  }
};
</script>

<style lang="scss" scoped>
.home-container {
    padding-top: 70px;
    padding-left: 2%;
    padding-right: 2%;
}
</style>
