import {promises as fs} from 'fs';
import crypto from 'crypto';

const filename = './database.json';
let data: Message[] = [];

export interface Message {
  id: string;
  author: string;
  message: string;
  datetime: string;
}

export interface MessageMutation {
  author: string;
  message: string;
}

const database = {
  async init() {
    try {
      const content = await fs.readFile(filename);
      data = JSON.parse(content.toString());
    } catch (e) {
      data = [];
    }
  },
  async getMessages() {
    return data;
  },
  async addMessage(message: MessageMutation) {
    const id = crypto.randomUUID();
    const datetime = new Date().toISOString();
    const newMessage: Message = {id, ...message, datetime};
    data.push(newMessage);
    await this.save();
    return newMessage;
  },
  async save() {
    return fs.writeFile(filename, JSON.stringify(data, null, 2));
  }
};

export default database;
