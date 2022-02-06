// to use decorators
import "reflect-metadata";

// loading environment variables
import "configs/env.configs";

// immediate loaders
import "loaders/utilities.loader";

// loaders
import serverLoader from "loaders/server.loader";
import appLoader from "loaders/app.loader";
import routesLoader from "loaders/routes.loader";
import postMiddlewaresLoader from "loaders/postMiddlewares.loader";
import preMiddlewaresLoader from "loaders/preMiddlewares.loader";

// init
(async () => {
	// loaders
	await serverLoader();
	await preMiddlewaresLoader();
	await routesLoader();
	await postMiddlewaresLoader();
	await appLoader();
})();
