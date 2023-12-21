'use client';
import styles from '../styles/Modal.module.css'
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { format } from 'date-fns'; 

interface ModalProps {
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ onClose }) => {

  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [name_P, setName_P] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState<Date | null>(null);

  const handleConfirm = async () => {

    try {
      const token = window.localStorage.getItem("token");
        const formattedDate = date ? format(date, 'yyyy-MM-dd') : null;
      const response = await axios.post('http://127.0.0.1:8000/historic',{
        Id_P: id,
        Name: name,
        Name_P: name_P,
        amount: amount,
        data: formattedDate
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
      );

      console.log('Resposta do backend:', response.data);
  
      onClose();
    } catch (error) {
      console.error('Erro ao enviar os dados:', error);
    }
  };
  
  return (
    <>
        <div className={styles.backdrop}> </div>
        <div className={styles.modal} id="modal">
        <div className={styles.modalHeader}>
            Nova Requisição
        </div>
            <div className={styles.inputContainer}>
                <label className={styles.label}>Id SAS:</label>
                <input autoComplete="off" type="text" className={styles.inputField} id="id" value={id} onChange={(e) => setId(e.target.value)}/>
            </div>
            <div className={styles.inputContainer}>
                <label className={styles.label}>Nome usuário:</label>
                <input autoComplete="off" type="text" className={styles.inputField} id="name" value={name} onChange={(e) => setName(e.target.value)}/>
            </div>
            <div className={styles.inputContainer}>
                <label className={styles.label}>Nome da peça:</label>
                <input autoComplete="off" type="text" className={styles.inputField} id="name_P" value={name_P} onChange={(e) => setName_P(e.target.value)}/>
            </div>
            <div className={styles.inputContainer}>
                <label className={styles.label}>Quantidade:</label>
                <input autoComplete="off" type="text" className={styles.inputField} id="amount" value={amount} onChange={(e) => setAmount(e.target.value)}/>
            </div>
            <div className={styles.inputContainer}>
                <label className={styles.labelDatePicker}>Data:</label>
                <DatePicker autoComplete="off" selected={date} className={styles.inputFieldDatePicker} onChange={(date: Date | null) => setDate(date)} dateFormat="dd/MM/yyyy"/>
            </div>
            <div className={styles.modalFooter}>
                <button className={`${styles.button} ${styles.cancelButton}`} onClick={onClose}>Cancelar</button>
                <button className={`${styles.button} ${styles.registerButton}`} onClick={handleConfirm}>Enviar</button>
            </div>
        </div>
    </>
    );
}

export default Modal;