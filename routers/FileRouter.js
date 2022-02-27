import express from "express";
import File from "../models/File.js";
import { ObjectId } from "mongodb";
const router = express.Router();

//Create file
router.post("/", async (request, response) => {
  const file = new File(request.body);
  const addFile = await file.save();
  response.send(addFile);
});

//get files by userId
router.get("/:_id", async (request, response) => {
  const { recent } = request.query;
  const id = request.params._id;
  try {
    if (recent) {
      const files = await File.find({ userId: ObjectId(id) }).sort({
        createdAt: -1,
      });
      response.send(files);
    } else {
      const files = await File.find({ userId: ObjectId(id) });
      response.send(files);
      console.log(files);
    }
  } catch (err) {
    response.status(400).send(err);
  }
});
//delete files by id
router.delete("/:id", async (request, response) => {
  const { id } = request.params;
  try {
    await File.findByIdAndDelete(id);
    response.send("file deleted successfully");
  } catch (err) {
    response.status(401).send(err);
  }
});
export const fileRouter = router;
