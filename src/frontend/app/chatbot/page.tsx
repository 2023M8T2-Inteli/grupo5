"use client";
import React, { KeyboardEvent, ChangeEvent, useState } from 'react';
import Link from 'next/link';
import styles from '../styles/chatbot.module.css';
import axios from 'axios';
import '../globals.css';

const ChatbotPage = () => {

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  console.log(apiUrl)

  const [inputText, setInputText] = useState('');
  const [audioFile, setAudioFile] = useState(null);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const handleSendClick = async () => {
    console.log('send click')
    if (inputText) {
      try {
        const response = await axios.post(`http://localhost:8000/tts/`, { text: inputText });
        if (response.data) {
          const audioUrl = URL.createObjectURL(new Blob([response.data]));
          const audio = new Audio(audioUrl);
          audio.play();
        }
      } catch (error) {
        console.error('Erro ao enviar texto para TTS:', error);
      }
    }
    setInputText('');
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSendClick();
    }
  };

  const handleMicrophoneClick = async () => {
    if (audioFile) {
      const formData = new FormData();
      formData.append('file', audioFile);

      try {
        const response = await axios.post('http://localhost:8000/audio-to-text/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log(response.data);
      } catch (error) {
        console.error('Erro ao enviar áudio para transcrição:', error);
      }
    }
  }


  return (
    <div className={styles.container}>
      <div className={styles.containerModalSaida}>
        <Link href="/instructions">
          <button type="button" className={styles.backIcon}>
            <img src="/arrow-left.png" alt="back"/> 
          </button>
        </Link>
        
        <div className={styles.robotBlueIcon}>
            <img src='/blue-robot.png' alt='blue_robot'/>
        </div>
      </div>

      <div className={styles.instructionsContainer}>

        <button type="button" className={styles.volumeIcon}>
          <img src="/volume-high.svg" alt="volume"/> 
        </button>

        <p className={styles.textoInserido}></p>

        <div className={styles.inputWithIcon}>
          <input type="text" placeholder="Digite algo..." className={styles.input} value={inputText} onChange={handleInputChange} onKeyDown={handleKeyPress}/>
          <button className={styles.sendIcon} onClick={handleSendClick}>
              <img src="/send.png" alt="send"/> 
          </button>

          <button onClick={handleMicrophoneClick} className={styles.microphoneIcon}>
              <img src="/microphone-2.svg" alt="microfone"/> 
          </button>
        </div>
        
      </div>
    </div>
  );
}

export default ChatbotPage;
