import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../util/firebase';
import styles from '../styles/SelectCourses.module.css';

const coursesList = [
  'Web Development',
  'Data Structures & Algorithms',
  'Machine Learning',
  'Artificial Intelligence',
  'Cybersecurity',
  'Mobile App Development',
  'Cloud Computing',
  'Blockchain',
];

export default function SelectCourses() {
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) setUser(currentUser);
    else router.push('/Login');
  }, []);

  const toggleCourse = (course) => {
    setSelectedCourses((prev) =>
      prev.includes(course)
        ? prev.filter((c) => c !== course)
        : [...prev, course]
    );
  };

  const handleSubmit = async () => {
    if (!user) return;

    await updateDoc(doc(db, "users", user.uid), {
      selectedCourses,
    });

    alert('✅ Courses saved! You will receive daily emails.');
    router.push('/');
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2>Select Your CS Courses</h2>
        <p>Choose topics you're interested in. We’ll send daily emails on them!</p>
        <ul className={styles.courseList}>
          {coursesList.map((course) => (
            <li key={course}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  value={course}
                  checked={selectedCourses.includes(course)}
                  onChange={() => toggleCourse(course)}
                />
                <span>{course}</span>
              </label>
            </li>
          ))}
        </ul>
        <button onClick={handleSubmit} className={styles.button}>
          Save Courses
        </button>
      </div>
    </div>
  );
}
