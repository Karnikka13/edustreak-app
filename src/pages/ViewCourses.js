import { useEffect, useState } from 'react';
import { auth, db } from '../util/firebase';
import { doc, getDoc } from 'firebase/firestore';
import styles from '../styles/ViewCourses.module.css';

export default function ViewCourses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const docRef = doc(db, 'users', user.uid);
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        const data = snap.data();
        setCourses(data.selectedCourses || []);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>📚 Your Selected Courses</h2>
      {courses.length ? (
        <ul className={styles.list}>
          {courses.map((c, idx) => (
            <li key={idx} className={styles.item}>{c}</li>
          ))}
        </ul>
      ) : (
        <p className={styles.empty}>No courses selected yet.</p>
      )}
    </div>
  );
}
