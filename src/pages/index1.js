import React from 'react';
import Link from 'next/link';
import styles from '../styles/index1.module.css'; // create and improve this CSS file

export default function Index1() {
  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <h2>📘 My Dashboard</h2><br /><br/>
        <nav>
          <ul>
            <li><a href="/EmailDashboard">📘 Email Settings</a></li>
            <li><Link href="/CourseQuiz">📝 Course Quiz</Link></li>
            <li><Link href="/select-courses">🔄 Change Course</Link></li>
            <li><Link href="/ViewCourses">📚 Selected Courses</Link></li>
          </ul>
        </nav>
      </aside>

      <main className={styles.content}>
        <h1>🎉 Welcome Back!</h1>
        <p>Start by choosing any option from the Dashboard.</p>
      </main>
    </div>
  );
}
