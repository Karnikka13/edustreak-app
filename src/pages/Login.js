import React from 'react';
import styles from '../styles/login.module.css';
import Link from 'next/link';
export default function Login() {
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
        <form method="post">
          <div className={styles['input-box']}>
            <span className={styles.icon}>
  <ion-icon name="person-outline"></ion-icon>
</span>

            <input type="text" name="name1" required />
            <label>Username</label>
          </div>

          <div className={styles['input-box']}>
            <span className={styles.icon}>
              <ion-icon name="lock-closed-outline"></ion-icon>
            </span>
            <input type="password" name="pass1" required />
            <label>Password</label>
          </div>

          <br />

          <div className={styles['remember-forgot']}>
            &nbsp;<a href="/resetpass">Forgot Password?</a>
          </div>

          <br />

          <button type="submit" className={styles.btn} name="login">
            Login
          </button>
        </form>
      </div>
    </div>
    </div>
    </div>
  );
}
