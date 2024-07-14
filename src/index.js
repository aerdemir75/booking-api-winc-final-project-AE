// setting up sentry and express
import * as Sentry from "@sentry/node";
import 'dotenv/config';
import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// importing middleware
import log from "./middleware/logMiddleware.js";
import notFoundErrorHandler from "./middleware/notFoundErrorHandler.js";
import errorHandler from "./middleware/errorHandler.js";

// importing the routers
import amenitiesRouter from "./routes/amenitiesRoute.js";
import bookingsRouter from "./routes/bookingsRoute.js";
import hostsRouter from "./routes/hostsRoute.js";
import propertiesRouter from "./routes/propertiesRoute.js";
import reviewsRouter from "./routes/reviewsRoute.js";
import usersRouter from "./routes/usersRoute.js";
import loginRouter from "./routes/loginRoute.js";

// start the express app
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

// Sentry setup
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Sentry.Integrations.Express({ app }),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
});

// The request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler());

// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

// Rest of the imports/controllers
app.use(express.json());
app.use(log);

app.use("/amenities", amenitiesRouter);
app.use("/bookings", bookingsRouter);
app.use("/hosts", hostsRouter);
app.use("/properties", propertiesRouter);
app.use("/reviews", reviewsRouter);
app.use("/users", usersRouter);

// login to get the Auth0 bearer Token
app.use('/login', loginRouter);

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, './docs/index.html'));
});

// Sentry error handler middleware should be before any other error middleware
app.use(Sentry.Handlers.errorHandler());

// catch 404 and forward to error handler
app.use(notFoundErrorHandler);

// catch final custom errorCatcher
app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
