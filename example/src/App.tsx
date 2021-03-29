import React, { useEffect, useState } from 'react';
import { ChatX } from 'test';

const App = () => {
  const [show, setShow] = useState<any>([]);

  const [messages, setMessages] = useState<any>([]);
  const [options] = useState<any>({
    isAudioRecord: true,
    isCamera: false,
    isAttachment: false,
    isSmiley: false
  });

  let [user] = useState<any>({
    profile: "https://avatars.githubusercontent.com/u/3865690?s=400&u=2216bc27528edbd01b5226f6731e8f2a080b6f2e&v=4"
  });

  let [recepient] = useState<any>({
    id: "5f9f797f9a1ab6bc7f81ebdf",
    displayName: "Navjot",
    online: false,
    profile: "https://i.pinimg.com/originals/be/ac/96/beac96b8e13d2198fd4bb1d5ef56cdcf.jpg"
  });


  const handleMessage = (message: string) => {
    let data = {
      id: new Date().getTime().toString(),
      to: recepient.id,
      from: user.id,
      message: message,
      displayName: recepient.displayName,
      profile: user.profile,
      timestamp: "13:35"
    }
    setMessages([...messages, data]);
  }
  
  useEffect(() => {
    let flag = Math.round(Math.random())
    let data = {
      id: new Date().getTime().toString(),
      from: flag ? recepient.id : user.id,
      to: flag ? user.id : recepient.id,
      message: Math.random(),
      displayName: recepient.displayName,
      profile: flag ? recepient.profile : user.profile,
      timestamp: "13:35"
    }
    
    let interval = setInterval(() => {
      setMessages([...messages, data]);
    }, 1000);

    return () => {
      clearInterval(interval)
    };
  }, [messages]);

  const onHide = () => {
    setShow(false)
  }
  const onShow = () => {
    setShow(true)
  }

  const style: any = {
    zIndex: '111',
    bottom: '0',
    fontSize: '12px',
    right: '24px',
    position: 'fixed',
    width: '360px',
    height: '500px',
    background: '#ffffff'
  }

  return <ChatX
    isTyping={true}
    options={options}
    user={user}
    recepient={recepient}
    show={show}
    onHide={onHide}
    onShow={onShow}
    messages={messages}
    onSend={handleMessage}
    style={style}
  />
}

export default App
