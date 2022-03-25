import { Socket } from "../socket/Socket";
import { CUser } from "../structs/CUser";
import EventEmitter from "events";

export class Client extends EventEmitter {
    public token: string | null;
    public socket: Socket | null;
    public user: CUser;

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