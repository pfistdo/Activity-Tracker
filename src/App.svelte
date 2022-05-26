<script>
	import Router from "svelte-spa-router";
	import routes from "./routes";
</script>

<!-- This part is always displayed -->
<nav class="navbar bg-light">
	<div class="container-fluid">
		<a class="navbar-brand" href="/">
			<img src="/images/favicon.png" alt="" width="30" height="24" class="d-inline-block align-text-top" />
			Idea Tracker
		</a>
	</div>
</nav>

<div class="container mt-4">
	<!-- Here we load the page depending on the current URL -->
	<Router {routes} />
</div>

<style>
</style>