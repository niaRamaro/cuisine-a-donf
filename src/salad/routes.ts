import { Router } from "express";
import Controller from "./controller";

const router = Router();

router.get("/", Controller.list);
router.post("/", Controller.create);
router.get("/:id", Controller.find);
router.put("/:id", Controller.update);
router.delete("/:id", Controller.remove);

export default router;
