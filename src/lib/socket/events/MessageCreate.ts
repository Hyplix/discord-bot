import { Client } from "../../client/Client";
import { Message, MessageStructure } from "../../structs/Message";
import { Socket } from "../Socket";

export default {
    name: "MESSAGE_CREATE",
    exec: (client: Client, socket: Socket, payload: { d: MessageStructure }) => {
        return client.emit("guildMessage", new Message(client, payload.d));
    },
};