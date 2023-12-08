"use client";
import { useState, useEffect } from "react";

import styles from '../styles/chatbot.module.css';




export default function Chat() {
    const [incoming, setIncoming] = useState( { role: "ai", message: "" });
    const [newMessage, setNewMessage] = useState( { role: "ai", message: "" } );
    const [input, setInput] = useState("");
    const [history, setHistory] = useState([]);
    const [finished, setFinished] = useState(true);
    const [messages, setMessages] = useState([
        {
            role: "human",
            message: "Oi, tudo bem?👋",
        },
        {
            role: "ai",
            message: "🤖 beep boop. Oi, como posso te ajudar?",
        },
    ]);




{/*useEffect para atualizar as mensagens recebidas*/}
    useEffect(() => {
        setNewMessage(incoming);
    }, [incoming])



{/*useEffect para atualizar os históricos de mensagens*/}
    useEffect(() => {
        if (newMessage.message) {
            setMessages((prevMsgs) => [...prevMsgs, newMessage]);
        }
    }, [finished])

    
    
    const handleSubmit = async (e) => {
        e.preventDefault();{/*captura de evento*/}


        {/*aqui atualiza o histórico de mensagens */}
        setFinished(false);
        setMessages((prev) => [...prev, { role: "human", message: input }]);
        console.log(input)




   {/*requisição à API*/}
        const res = await fetch("/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                query: input,
                history: [],
            }),
        });




        {/*Limpeza de estados e leituras da resposta da API*/}
        setInput("");{/*limpando o campo de mensagem*/}
        setIncoming( { role: "ai", message: "" });{/*reseta a mensagem recebida para preparar para a resposta da API*/}

        const stream = res.body;{/*prepara a resposta da API*/}
        console.log(stream)
        const reader = stream.getReader();

        {/*aqui é onde API é lida*/}
        try {
            while (true) {
                const { done, value } = await reader.read();
                if (done) {
                    break;
                }

                const decodedValue = new TextDecoder().decode(value);
                console.log(decodedValue)

                setIncoming( ({ role, message }) => ({ role, message: message + decodedValue }));
            }

        } catch (error) {
            console.error(error);
        } finally {
            reader.releaseLock();
            setIncoming( { role: "ai", message: "" });
            setFinished(true)
        }
    };




    return (
        
            <div className={styles.container}>
                <div className="flex-grow overflow-y-auto p-4 mt-4">
                    
                    <div className="flex flex-col ">{/*exibição das mensagens*/}
                        {messages.map((message, index) => {
                            return (
                                <div key={index} className={`flex ${message.role !== "ai"
                                            ? "justify-end"
                                            : "justify-start"
                                    }`}
                                >
                                    <div className={`${message.role !== "ai"? "bg-blue-500 text-white" : "bg-gray-100"}  text-1xl p-2 rounded-md mb-2 max-w-sm`}>
                                        {message.message}
                                    </div>

                                </div>
                            );
                        })}

                        {!finished && (
                            <div className="flex justify-start bg-gray-200 text-2xl p-2 rounded-md mb-2 max-w-sm">
                                {incoming.message && incoming.message}
                            </div>
                            
                        )}
                    </div>
                </div>


                <div>
                    <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleSubmit(e);
                        }
                    }}
                    rows={4}
                    maxLength={200}
                    className={styles.input}
                    placeholder={"Digite algo..."}
                />

                {finished ? (
                            <button
                                className="bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-400 hover:to-blue-500 rounded-md mt-2 px-4 py-2 text-white font-semibold focus:outline-none text-xl" onClick={handleSubmit}>
                                Enviar
                            </button>
                        ) : (
                            <button disabled className="w-full">
                                <div className="animate-pulse font-bold">...</div>
                            </button>
                        )}
    </div>

            </div>
        
    );
}