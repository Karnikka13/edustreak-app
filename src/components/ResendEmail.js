import { useState } from 'react';
import styles from '../styles/EmailDashboard.module.css';

export default function ResendEmailRequest({ course }) {
  const [status, setStatus] = useState('');

  const handleResend = () => {
    setStatus('Sending...');
    setTimeout(() => {
      setStatus(`✅ ${course} email resent successfully!`);
    }, 1500);
  };

  return (
    <div>
      <button className={styles.button}>Resend Today's Email</button>

      <p>{status}</p>
    </div>
  );
}
