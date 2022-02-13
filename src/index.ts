// to use decorators
import "reflect-metadata";

// loading environment variables
import "configs/env.configs";

// immediate loaders
import "loaders/utilities.loader";

// loaders
import appLoader from "loaders/app.loader";
import routesLoader from "loaders/routes.loader";
import postMiddlewaresLoader from "loaders/postMiddlewares.loader";
import preMiddlewaresLoader from "loaders/preMiddlewares.loader";
import serverLoader from "loaders/server.loader";

// init
(async () => {
	// loaders
	await appLoader();
	await preMiddlewaresLoader();
	await routesLoader();
	await postMiddlewaresLoader();
	await serverLoader();
})();
