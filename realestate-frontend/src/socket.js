import { io } from 'socket.io-client';

const socket = io('https://real-estate-app-4vp2.onrender.com', {
  transports: ['websocket'],
  withCredentials: true,
});

export default socket;
