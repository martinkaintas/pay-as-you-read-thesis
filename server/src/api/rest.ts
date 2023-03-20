import { getPostInformation } from "@app/services/content";
import express from "express";
export const router = express.Router();

router.get("/posts/:id", (req, res) => {
  const post = getPostInformation(req.params.id);
  if(post) {
    res.send(post);
  } else {
    res.status(404).send("not found");
  }
})

export default router;