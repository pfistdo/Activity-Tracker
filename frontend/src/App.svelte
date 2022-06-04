<script>
  import Router from "svelte-spa-router";
  import routes from "./routes";
</script>

<!-- This part is always displayed -->

<nav class="navbar navbar-expand-lg bg-light">
  <div class="container">
    <a class="navbar-brand" href="/">
      <img src="/images/favicon.png" alt="" width="30" height="24" class="d-inline-block align-text-top" />
      Idea Tracker
    </a>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNavAltMarkup"
      aria-controls="navbarNavAltMarkup"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon" />
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav">
        <a class="nav-link active" aria-current="page" href="#/documentation">Documentation</a>
      </div>
    </div>
  </div>
</nav>

<div class="container mt-4">
  <!-- Here we load the page depending on the current URL -->
  <Router {routes} />
</div>

<style>
</style>
