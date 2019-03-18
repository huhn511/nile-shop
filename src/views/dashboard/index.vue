<template>
  <div class="dashboard-container">
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
    <a href="#/products/new">Test it and create an product!</a>
  </div>
</template>

<script>
export default {
  name: "Dashboard"
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
