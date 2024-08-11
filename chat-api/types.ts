interface Message {
    id: string;
    author: string;
    message: string;
    datetime: string
}

export type MessageWithoutId = Omit<Message, 'id'>;