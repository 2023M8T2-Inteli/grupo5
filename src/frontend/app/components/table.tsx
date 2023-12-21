import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/Table.module.css';

const Table = () => {
    const [tableData, setTableData] = useState([]);
    const [selectedRow, setSelectedRow] = useState<number | null>(null);

    useEffect(() => {
        // Ao montar o componente, fazer a requisição GET para obter dados da tabela
        const token = window.localStorage.getItem("token");
        axios.get('http://127.0.0.1:8000/historic',{
            headers: { Authorization: `Bearer ${token}`,},
            
          })
            .then(response => setTableData(response.data))
            .catch(error => console.error('Erro ao obter dados da tabela:', error));
    }, []);

    return (
        <table className={styles.tabela}>
            <thead>
                <tr>
                    <th>Id SAS</th>
                    <th>Nome usuário</th>
                    <th>Nome Produto</th>
                    <th>Quantidade</th>
                    <th>Data</th>
                </tr>
            </thead>
            <tbody>
                {tableData.map((item, index) => (
                    <tr
                        key={index}
                        className={selectedRow === index ? styles.selectedRow : ""}
                        onClick={() => setSelectedRow(index)}
                    >
                        <td>{item.Id_P}</td>
                        <td>{item.Name}</td>
                        <td>{item.Name_P}</td>
                        <td>{item.amount}</td>
                        <td>{item.data}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;
