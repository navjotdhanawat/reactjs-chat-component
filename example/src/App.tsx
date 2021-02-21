import React, { useEffect, useState } from 'react'

import { ExampleComponent } from 'test'
import 'test/dist/index.css'

const getMessages = (id: string) => {
  return [{
    displayName: 'Shweta',
    message: "Hi this is Shweta!!!",
    id: id,
    profile: "demo.png",
    time: "13:35"
  }, {
    displayName: 'Navjot',
    message: "Hi this is Navjot!!!",
    id: id,
    profile: "demo.png",
    time: "13:35"
  }][Math.round(Math.random())]
}

const App = () => {
  const [messages, setMessages] = useState([{
    displayName: 'Shweta',
    message: "Hi this is Shweta!!!",
    id: new Date().getTime().toString(),
    profile: "demo.png",
    time: "13:35"
  }]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setMessages([...messages, getMessages(new Date().getTime().toString())])
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [messages]);

  let options = {
    isAudioRecord: true,
    isCamera: false,
    isAttachment: false,
    isSmiley: false
  }
  return <ExampleComponent options={options} user={"Shweta"} messages={messages} />
}

export default App
