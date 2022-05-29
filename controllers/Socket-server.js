import { io } from "../index";
import express from "express";
import { SERVER_DB_URL } from "../config/variables";
import axios from "axios";
const router = express.Router();

router.put("/update/ticket/:id", async (req, res) => {
  const { id } = req.params;
  await axios
    .put(`${SERVER_DB_URL}/api/update/ticket/${id}`, {
      headers: {
        // Overwrite Axios's automatically set Content-Type
        "Content-Type": "application/json",
      },
    })
    .then(async (_) => {
      const { data } = await axios.get(SERVER_DB_URL + "/api/tickets");
      io.emit("update-ticket", data);
      res.send(data);
    });
});

router.post("/add/ticket/comment", async (req, res) => {
  const { ticketId, createdBy } = req.query;
  await axios
    .post(
      `${SERVER_DB_URL}/api/add/ticket/comment?ticketId=${ticketId}&createdBy=${createdBy}`,
      req.body,
      {
        headers: {
          // Overwrite Axios's automatically set Content-Type
          "Content-Type": "application/json",
        },
      }
    )
    .then(async (_) => {
      const { data } = await axios.get(
        SERVER_DB_URL + `/api/tickets/comments/${ticketId}`
      );
      io.emit("add-comment", data);
    })
    .then(async (_) => {
      const { data } = await axios.get(SERVER_DB_URL + "/api/tickets");
      io.emit("update-ticket", data);
      res.send(data);
    });
});

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
