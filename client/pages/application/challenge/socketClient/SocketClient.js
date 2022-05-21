import { io } from "socket.io-client";
import { initiateEventListeners } from '../slice/challengeRealTimeSlice';
import { loadToken } from "../../../../services/JWTStorage";

const ServerURI = '';



export const createSocket = (userData, challenge_id, classroom_id) => {

    /**
     * Connecting to the namespace `${challenge_id}` of the URL `${ServerURI}`,
     * still only One Socket created
     */
    const socket = io(`${ServerURI}/${challenge_id}`, {
        autoConnect: false,
        withCredentials: false,
    })

    socket.auth = {
        uniqueSessionID: userData._id,
        user_id: userData._id,
        challenge_id, classroom_id
    };
    return socket;
}

export class SocketClient {
    constructor(userData, challenge_id, classroom_id, dispatch) {
        this.socket = createSocket(userData, challenge_id, classroom_id);
        this.socket.onAny((event, ...args) => {
            console.log(event, args);
        });
        console.log("SocketClient constructor");
        dispatch(initiateEventListeners(this.socket));
    }
    async connect() {
        this.socket.connect();
        /**
         * emit 'authenticate' event here, pass in token as data
         */
        const loadTokenResponse = await loadToken();
        this.socket.emit('authenticate', loadTokenResponse);
        return new Promise((resolve, reject) => {
            this.socket.on("connect", () => {
                resolve();
            })
            this.socket.on("connect_error", (error) => {
                reject(error);
            })
        })
    }
    disconnect() {
        return new Promise((resolve, reject) => {
            try {
                this.socket.disconnect();
                resolve();
            }
            catch (error) {
                reject({ message: "Error in socket.disconnect()", error })
            }
        })
    }
    emit(event, data) {
        return new Promise((resolve, reject) => {
            if (!this.socket) {
                return reject("No socket connection")
            }
            this.socket.emit(event, data, (response) => {
                if (response.error) {
                    reject(response.error);
                } else {
                    resolve();
                }
            })
        })
    }
    on(event, handler) {
        return new Promise((resolve, reject) => {
            if (!this.socket) { return reject("No socket connection") }
            this.socket.on(event, handler);
            resolve();
        })
    }
}