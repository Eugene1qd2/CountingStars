import React, { useState, useRef, useEffect } from "react"
import { Login } from "./Login";
import { Register } from "./Register";
import WebSock from './WebSock';


function App() {
  const [currentForm, setCurrentForm] = useState('login');
  const [userInfo, setUserInfo] = useState();

  const socket = useRef();
  const [loggedIn, setLoggedIn] = useState(false);
  const [connected, setConnected] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');


  function connect() {
    //delete later

    socket.current = new WebSocket('ws://localhost:5000');

    //подключение к серваку
    socket.current.onopen = () => {
      const message = {
        event: 'connection',
        id: Date.now()
      }
      socket.current.send(JSON.stringify(message));
      setConnected(true);
    }

    //по принятию сообщения с сервера
    socket.current.onmessage = (event) => {
      const message = JSON.parse(event.data)

      // if (loggedIn) {

      //   // if (message.event === 'updateNumber') {
      //   //   setMessages(prev => [message, ...prev]);
      //   //   setCurrentNumber(message.currentNumber);
      //   // }
      //   // if (message.event === 'updateOnlineStats') {
      //   //   updateOnlineStats(message);
      //   // }

      // }
      // else {

      if (message.event === 'loginSucced') {
        updateCurrentUser(message.userId, message.userName, message.userColor, message.userRank);
        setLoggedIn(true);
        toggleForm('main-form');
      }
      if (message.event === 'loginFailed') {
        setErrorMessage(message.errorMessage);
        toggleForm('some');
        toggleForm('login');
      }

      // }
    }

    //по закрытию сокета
    socket.current.onclose = () => {
      console.log('Socket закрыт')
    }

    //если возникла ошибка
    socket.current.onerror = () => {
      console.log('Socket произошла ошибка')
    }
  }

  // const sendMessage = async () => {
  //   const message = {
  //     username: username,
  //     message: value,
  //     id: Date.now(),
  //     event: 'message'
  //   }
  //   socket.current.send(JSON.stringify(message));
  //   setValue('');
  // }

  if (!connected) {
    connect();
    setConnected(true);
  }


  const toggleForm = (form) => {
    if (form !== 'main-form') {
      setCurrentForm(form);
    }
    else {
      if (loggedIn) {
        setCurrentForm(form);
        console.log(userInfo);
      }
    }
  }

  const tryLogIn = (userInfo) => {
    const message = {
      username: userInfo.username,
      password: userInfo.password,
      id: Date.now(),
      event: 'login'
    }
    socket.current.send(JSON.stringify(message));
  }

  const updateCurrentUser = (userId, userName, userColor) => {
    setUserInfo({
      userId: userId,
      userName: userName,
      userColor: userColor
    });
  }

  const renderComponent = () => {
    console.log(userInfo);
    switch (currentForm) {
      case 'login': return <Login onFormSwitch={toggleForm} onLogin={tryLogIn} errorMessage={errorMessage} />;
      case 'register': return <Register onFormSwitch={toggleForm} />;
      case 'main-form': return <WebSock onFormSwitch={toggleForm} userData={userInfo} />;
      case 'info-form': return {};
      case 'user-form': return {};
      default: return {};
    }
  }

  return (
    <div className="App">
      {renderComponent()}
    </div>

  );


}

export default App;
