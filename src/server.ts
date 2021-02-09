import bodyParser from "body-parser";
import express, { NextFunction } from "express";
import initDb from "./mongoDbConnection";
import { Salad } from "./salad/controller";
import saladRoutes from "./salad/routes";

const app = express();

function setupMiddlewares(): void {
  app.use(bodyParser.json());
}

function setupRoutes(): void {
  app.get("/", (req, res) => res.json("TD EXAM"));
  app.use("/salads", saladRoutes);
  // Global error handling
  app.use(
    (
      err: Error,
      req: express.Request,
      res: express.Response,
      next: NextFunction
    ) => {
      res.status(500).json("Sorry, an unexpected error occured");
    }
  );
}

async function setupDb() {
  const mongodb = await initDb();
  app.locals.saladsCollection = mongodb.collection<Salad>("salads");
}

async function startServer() {
  try {
    setupMiddlewares();
    setupRoutes();
    await setupDb();

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (e) {
    console.log("Could not start the server", e);
  }
}

startServer();
