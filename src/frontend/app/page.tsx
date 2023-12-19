import Image from 'next/image';
import styles from '/app/styles/PrimeiraTela.module.css';
import Link from 'next/link';
import LoginCard from './components/LoginCard';

export default function PrimeiraTela() {
  return (
    <div className={styles.container}>
        <LoginCard></LoginCard>
    </div>
  );
};
