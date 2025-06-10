import styles from '../styles/EmailDashboard.module.css';
import React from 'react';
import SmartScheduler from '../components/SmartScheduler';
import RecentEmailsLog from '../components/RecentEmailsLog';
import ResendEmailRequest from '../components/ResendEmail';

export default function EmailDashboard() {
  return (
    <div style={{ backgroundColor: 'black', minHeight: '100vh', padding: '2rem', fontFamily: 'Arial' }}>
    <div className={styles.container}>
      <h1 className={styles.header}>📧 Email Dashboard</h1>
      
      <section className={styles.section}>
        <h2 className={styles.subheader}>⏰ Schedule Your Daily Email</h2>
        <SmartScheduler />
      </section>

      <section className={styles.section}>
        <h2 className={styles.subheader}>📬 Your Recent Emails</h2>
        <RecentEmailsLog />
      </section>

      <section className={styles.section}>
        <h2 className={styles.subheader}>🔁 Missed an Email?</h2>
        <ResendEmailRequest course="DBMS" />
      </section>
    </div>
    </div>
  );
}
