import { Socket } from "../socket/Socket";
import { CUser } from "../structs/CUser";
import EventEmitter from "events";
import { Message } from "../structs/Message";

export interface Client {
    on(event: "ready", listener: () => void): this;
    on(event: "guildMessage", listener: (message: Message) => void): this;
};

export class Client extends EventEmitter {
    public token: string | null;
    public socket: Socket | null;
    public user: CUser;
    public apiURL = "https://discord.com/api/v10";

    constructor () {
        super();

        this.user = new CUser(this, {} as any);
        this.token = null;
        this.socket = null;
    };

    public async login (token: string | undefined): Promise<any> {
        if (!token) throw new Error("The token parameter is invalid");

        this.token = token;
        this.socket = new Socket(this);
    };

    public async logout (): Promise<void> {
        return this.socket?.destroy();
    };
};