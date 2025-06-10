import React from 'react';
import styles from '../styles/signup.module.css'; // Make sure the path is correct
import Link from 'next/link';

export default function SignUp() {
  return (
    <div>
    <header>
        <div className="right">
            <Link href="/">
          <button className="btn">Back</button>
          </Link>
        </div>
        <div className="right">
  <Link href="/Login">
    <button className="btn">Login</button>
  </Link>
</div>

      </header>
    <div className={styles.wrapper}>
      <div className={`${styles['form-box']} ${styles.register}`}>
        <h2>Sign Up</h2>
        <form>
          <div className={styles['input-box']}>
            <input type="text" required />
            <label>👤 Username</label>
          </div>
          <div className={styles['input-box']}>
            <input type="email" required />
            <label>📧 Email</label>
            
          </div>
          <div className={styles['input-box']}>
            <input type="password" required />
            <label>🔒 Password</label>
          </div>
          <div className={styles['remember-forgot']}>
            <label><input type="checkbox" /> I agree to terms</label>
          </div>
          <button type="submit" className={styles.btn}>Register</button>
          <div className={styles['login-register']}>
            <p>Already have an account? <Link href="/Login">Login</Link></p>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
}
