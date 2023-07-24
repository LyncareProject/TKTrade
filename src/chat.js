// const express = require('express')
// const app = express()
// const http = require("http").createServer(app);
// const db = require("./models");
// const moment = require("moment");
// const { 
//     chatRoom : ChatRoom,
//     chatMessage : ChatMessage 
// } = db;

// const ObjectId = require("mongoose").Types.ObjectId;
// const { CHAT_PORT } = require('./common')


// const chat = async () => {
//     // @ts-ignore
//     const io = require('socket.io')(http, {
//         cors: {
//             origin: "*",
//             methods: ["GET", "POST"]
//         }
//     });

//     const chatRooms = await ChatRoom.find({})
//     // @ts-ignore
//     io.on('connection', (socket) => {
//         // console.log('새로운 사용자가 연결되었습니다.');

//         socket.on("getChatRooms", () => {
//             socket.emit("chatRooms", chatRooms);
//         });

//         // @ts-ignore
//         socket.on("joinRoom", async (roomId) => {
//             socket.join(roomId);
//             let o_id = new ObjectId(roomId);
//             const roomMessages = await ChatMessage.find({
//                 room : o_id
//             })
//             io.emit('message', roomMessages)
//         });

//         socket.on('chat message', async (message) => {
//             const { roomId, chat, user } = message
//             const chatMessage = new ChatMessage({
//                 room : roomId,
//                 user : user,
//                 chat : chat,
//                 createdAt : moment().format("YYYY-MM-DD hh:mm:ss")
//             })
//             await chatMessage.save()
//             // 모든 클라이언트에게 채팅 메시지 전송
//             io.to(roomId).emit('chat message', message);
//         });

          
//         socket.on("leaveRoom", (roomId) => {
//             socket.leave(roomId);
//         });

//         socket.on('disconnect', () => {
//             console.log('클라이언트가 연결을 해제했습니다.');
//         });
//     });
    
//     http.listen(CHAT_PORT, () => {
//         console.log(`Web Socket listening at ${CHAT_PORT}`);
//     });
// }

// module.exports = {
//     chat
// }