import { useEffect, useState } from 'react';

export default function RecentEmailsLog() {
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setEmails([
        { date: '2025-06-10', subject: 'DBMS - Normalization' },
        { date: '2025-06-09', subject: 'DSA - Recursion' },
        { date: '2025-06-08', subject: 'AI - Introduction' },
      ]);
    }, 1000);
  }, []);

  return (
    <ul>
      {emails.map((email, i) => (
        <li key={i}>
          <strong>{email.date}</strong>: {email.subject}
        </li>
      ))}
    </ul>
  );
}
