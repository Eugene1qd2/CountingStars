import React, { useState, useRef } from 'react';

const WebSock = (props) => {
    const [messages, setMessages] = useState([]); //массив принятых с сервака сообщений
    const [value, setValue] = useState(''); //стэйт для обновления input с сообщением

    // const socket = useRef(); //перенести в app
    // const [connected, setConnected] = useState(false);//перенести в app

    const [username, setUsername] = useState(''); //пока закомментить


    const [currentNumber, setCurrentNumber] = useState(0); //пока хз
    const [currentOnline, setCurrentOnline] = useState(0); //пока хз


    // function connect() {
    //     //delete later
    //     console.log(props.userData);
    //     setUsername(props.userData.userName);

    //     socket.current = new WebSocket('ws://localhost:5000');

    //     //подключение к серваку
    //     socket.current.onopen = () => {
    //         setConnected(true)
    //         const message = {
    //             event: 'connection',
    //             username: username,
    //             password: "some pass",
    //             email: 'some mail',
    //             id: Date.now()
    //         }
    //         socket.current.send(JSON.stringify(message))
    //     }

    //     //по принятию сообщения с сервера
    //     socket.current.onmessage = (event) => {
    //         const message = JSON.parse(event.data)

    //         if (message.event === 'updateNumber') {
    //             setMessages(prev => [message, ...prev]);
    //             setCurrentNumber(message.currentNumber);
    //         }
    //         if (message.event === 'updateOnlineStats')
    //             updateOnlineStats(message);
    //     }

    //     //по закрытию сокета
    //     socket.current.onclose = () => {
    //         console.log('Socket закрыт')
    //     }

    //     //если возникла ошибка
    //     socket.current.onerror = () => {
    //         console.log('Socket произошла ошибка')
    //     }

    // }

    function updateOnlineStats(message) {
        setCurrentNumber(message.currentNumber);
        setCurrentOnline(message.usersCount);
    }

    const sendMessage = async () => {
        // const message = {
        //     username: username,
        //     message: value,
        //     id: Date.now(),
        //     event: 'message'
        // }
        // socket.current.send(JSON.stringify(message));
        setValue('');
    }


    // if (!connected) {
    //     connect();
    //     setConnected(true);
    //     // return (
    //     //     <div className="center">
    //     //         Error! Entered without id!
    //     //     </div>
    //     // )
    // }


    return (
        <div className="center">
            <div>
                <div className='block'>
                    <div>
                        Текущий онлайн: {currentOnline}
                    </div>
                </div>
                <div className="form">
                    <div>{currentNumber}</div>
                    <input value={value} onChange={e => setValue(e.target.value)} type="text" />
                    <button onClick={sendMessage}>Отправить</button>
                </div>
                <div className="messages">
                    {messages.map(mess =>
                        <div key={mess.id}>
                            {
                                mess.event === 'updateNumber'
                                    ? <div className="message">
                                        {mess.username}: {mess.currentNumber}
                                    </div>
                                    : {} //проверку не пришла ли история последних цифр 
                            }
                        </div>
                    )}
                </div>
            </div>
        </div>
    );


};

export default WebSock;

