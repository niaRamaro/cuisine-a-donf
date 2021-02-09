import { Router } from "express";
import multer from "multer";
import { basename, extname } from "path";
import Controller from "./controller";

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "static/images");
    },
    filename: function (req, file, cb) {
      const extension = extname(file.originalname);
      const fileName = basename(file.originalname, extension);
      cb(null, fileName + "-" + Date.now() + extension);
    },
  }),
});

const router = Router();

router.get("/", Controller.list);
router.post("/", upload.single("photo"), Controller.create);
router.get("/:id", Controller.find);
router.put("/:id", Controller.update);
router.delete("/:id", Controller.remove);

export default router;
