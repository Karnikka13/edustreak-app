import React, { useState } from 'react';
import styles from '../styles/login.module.css';
import Link from 'next/link';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../util/firebase'; // or '../lib/firebase' if that's your file path
import { useRouter } from 'next/router';


export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // ✅ Update lastLogin timestamp
      await updateDoc(doc(db, 'users', user.uid), {
        lastLogin: new Date()
      });

      alert('Login successful!');
      router.push('/index1');
      // You can redirect here if needed (e.g., window.location.href = "/profile")

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <header>
        <div className="right">
          <Link href="/">
            <button className="btn">Back</button>
          </Link>
        </div>
        <div className="right">
          <Link href="/SignUp">
            <button className="btn">SignUp</button>
          </Link>
        </div>
      </header>

      <div className={styles.page}>
        <div className={styles.wrapper}>
          <div className={styles['form-box']}>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
              <div className={styles['input-box']}>
                <span className={styles.icon}>
                  <ion-icon name="mail-outline"></ion-icon>
                </span>
                <input type="email" required onChange={(e) => setEmail(e.target.value)} />
                <label>Email</label>
              </div>

              <div className={styles['input-box']}>
                <span className={styles.icon}>
                  <ion-icon name="lock-closed-outline"></ion-icon>
                </span>
                <input type="password" required onChange={(e) => setPassword(e.target.value)} />
                <label>Password</label>
              </div>

              {error && <p style={{ color: 'red' }}>{error}</p>}

              <br />

              <div className={styles['remember-forgot']}>
                &nbsp;<a href="/resetpass">Forgot Password?</a>
              </div>

              <br />

              <button type="submit" className={styles.btn}>
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
