import React, { useEffect, useState } from 'react'
import socketIOClient from "socket.io-client";
import { ChatX } from 'test'
import 'test/dist/index.css'
const ENDPOINT = "http://localhost:3000";
const socket = socketIOClient(ENDPOINT);

const App = () => {

  const [messages, setMessages] = useState<any>([]);
  const [options] = useState<any>({
    isAudioRecord: true,
    isCamera: false,
    isAttachment: false,
    isSmiley: false
  });

  let [user, setUser] = useState<any>({});
  let [self] = useState<any>({
    id: "5f9f797f9a1ab6bc7f81ebdf",
    displayName: "Navjot",
    online: false,
    profile: "https://i.pinimg.com/originals/be/ac/96/beac96b8e13d2198fd4bb1d5ef56cdcf.jpg"
  });


  const handleMessage = (message: string) => {
    let data = {
      id: new Date().getTime().toString(),
      from: self.id,
      to: user.id,
      message: message,
      displayName: self.displayName,
      profile: "https://avatars.githubusercontent.com/u/3865690?s=400&u=2216bc27528edbd01b5226f6731e8f2a080b6f2e&v=4",
      timestamp: "13:35"
    }
    setMessages([...messages, data])

    console.log('Message emit: ', { to: user.id, message })

    socket.emit("message", data)
  }

  const acceptChat = (connectedUser: any) => {
    setUser({ ...user, ...connectedUser, connected: true })
    socket.emit("chat_accepted", connectedUser);
    console.log("chat_accepted for user: ", connectedUser)
  }

  useEffect(() => {
    socket.on('connect', function () {
      console.log("data===> ", JSON.parse(localStorage.getItem('user') || ""));
      socket.emit('storeClientInfo', JSON.parse(localStorage.getItem('user') || ""));
      socket.emit('create', 'agent');
    });
    socket.on("message", (data: any) => {
      console.log('Chat==>', data)
      let payload = {
        id: new Date().getTime().toString(),
        from: data.from,
        to: data.to,
        message: data.message,
        displayName: data.displayName,
        profile: "https://i.pinimg.com/originals/be/ac/96/beac96b8e13d2198fd4bb1d5ef56cdcf.jpg",
        timestamp: "13:35"
      }
      setMessages((messages: any) => {
        return [...messages, payload]
      });
    });

    socket.on("support", (user: any) => {
      //todo: show ui popup to accept or reject chat requet
      console.log('support', user);
      acceptChat(user);
    });
    socket.on("status", (statusData: any) => {
      //todo: show ui popup to accept or reject chat requet
      debugger
      console.log('statusData', statusData);
      user.online = statusData.Status;
      setUser(user);
    });
  }, []);


  return <ChatX
    options={options}
    user={user}
    self={self}
    messages={messages}
    onSend={handleMessage}
  />
}

export default App
