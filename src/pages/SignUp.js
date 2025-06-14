// pages/SignUp.js
import React, { useState } from 'react';
import styles from '../styles/signup.module.css';
import Link from 'next/link';
import { auth, db } from '../util/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';

export default function SignUp() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
    
    const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {
        username,
        email,
        createdAt: new Date()
      });

      setSuccess(true);
      router.push('/select-courses'); // ✅ redirect to course selection
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  return (
    <div>
      <header>
        <div className="right">
          <Link href="/"><button className="btn">Back</button></Link>
        </div>
        <div className="right">
          <Link href="/Login"><button className="btn">Login</button></Link>
        </div>
      </header>

      <div className={styles.wrapper}>
        <div className={`${styles['form-box']} ${styles.register}`}>
          <h2>Sign Up</h2>
          <form onSubmit={handleSignup}>
            <div className={styles['input-box']}>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
              <label>👤 Username</label>
            </div>
            <div className={styles['input-box']}>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <label>📧 Email</label>
            </div>
            <div className={styles['input-box']}>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              <label>🔒 Password</label>
            </div>
            <div className={styles['remember-forgot']}>
              <label><input type="checkbox" required /> I agree to terms</label>
            </div>

            <button type="submit" className={styles.btn}>Register</button>

            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>🎉 Registration successful!</p>}

            <div className={styles['login-register']}>
              <p>Already have an account? <Link href="/Login">Login</Link></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
