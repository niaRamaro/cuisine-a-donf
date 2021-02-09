import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { Collection, ObjectId } from "mongodb";

export type Salad = {
  name: string;
  description: string;
  ingredients: string[];
  photo: string;
};

const saladInputSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  ingredients: Joi.array().items(Joi.string()).required(),
});

function getCollection(req: Request): Collection<Salad> {
  return req.app.locals.saladsCollection;
}

async function create(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  if (!req.file) {
    res.status(400).json("photo is required");

    next();
  }

  const saladInput = req.body;
  const { error } = saladInputSchema.validate(saladInput);

  if (error) {
    res.status(400).json(error.message);

    next();
  }

  const newSalad = {
    ...saladInput,
    photo: req.file.filename,
  };

  const mongoResult = await getCollection(req).insertOne(newSalad);
  mongoResult.insertedCount ? res.json(newSalad) : next(new Error());
}

async function find(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { id } = req.params;

    const salad = await getCollection(req).findOne({ _id: new ObjectId(id) });

    salad ? res.json(salad) : res.status(404).json(`Salad ${id} not found`);
  } catch (e) {
    next(new Error());
  }
}

async function list(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const salads = await getCollection(req).find().toArray();

    res.json(salads);
  } catch (e) {
    next(new Error());
  }
}

function remove(req: Request, res: Response): void {
  res.json("remove salad");
}

function update(req: Request, res: Response): void {
  res.json("update salad");
}

export default {
  create,
  find,
  list,
  remove,
  update,
};
