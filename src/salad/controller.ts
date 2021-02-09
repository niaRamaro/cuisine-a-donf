import { Request, Response } from "express";

function create(req: Request, res: Response): void {
  res.json("create salad");
}
function find(req: Request, res: Response): void {
  res.json("find salad");
}
function list(req: Request, res: Response): void {
  res.json("list salad");
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
