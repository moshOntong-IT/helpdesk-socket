import { io } from "../index";
import express from "express";
import { SERVER_DB_URL } from "../config/variables";
import axios from "axios";
const router = express.Router();

router.post("/add/ticket", async (req, res) => {
  const { createdBy } = req.query;
  // console.log(req.query);
  await axios
    .post(SERVER_DB_URL + `/api/add/ticket?createdBy=${createdBy}`, req.body, {
      headers: {
        // Overwrite Axios's automatically set Content-Type
        "Content-Type": "application/json",
      },
    })
    .then(async (_) => {
      const { data } = await axios.get(SERVER_DB_URL + "/api/tickets");
      io.emit("add-ticket", data);
      res.send(data);
    });

  // res.send(req.query.createdBy);
});

export default router;
