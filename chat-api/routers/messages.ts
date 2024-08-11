import express from "express";
import {MessageMutation} from "../types";
import database from "../database";

const messagesRouter = express.Router();

messagesRouter.post('/', async (req, res) => {

    if (!req.body.author || !req.body.message) {
        return res.status(400).send({error: "Author and message are required"});
    }

    const message: MessageMutation = {
    author: req.body.author,
    message: req.body.message,
}
const savedMessages = await database.addMessage(message)
    res.send(savedMessages)
});

export default messagesRouter;