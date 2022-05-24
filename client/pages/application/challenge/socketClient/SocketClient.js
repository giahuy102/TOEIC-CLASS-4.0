import { io } from "socket.io-client";
import { initiateEventListeners } from '../slice/challengeRealTimeSlice';
import { loadToken } from "../../../../services/JWTStorage";

const ServerURI = 'http://10.0.2.2:3001';



export const createSocket = (user_id, challenge_id, classroom_id) => {

    /**
     * Connecting to the namespace `${challenge_id}` of the URL `${ServerURI}`,
     * still only One Socket created
     */
    console.log(`Socket namespace ${ServerURI}/${challenge_id}`,)
    const socket = io(`${ServerURI}/${challenge_id}`, {
        autoConnect: false,
        withCredentials: false,
    })

    socket.auth = {
        user_id,
        challenge_id,
        classroom_id
    };
    return socket;
}

export class SocketClient {
    constructor(user_id, challenge_id, classroom_id, dispatch, navigation) {
        /**
         * navigation of ChallengesStackScreen
         */
        this.socket = createSocket(user_id, challenge_id, classroom_id);
        // this.socket.onAny((event, ...args) => {
        //     console.log(event, args);
        // });
        // console.log("SocketClient constructor");
        dispatch(initiateEventListeners({ socket: this.socket, navigation }));
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