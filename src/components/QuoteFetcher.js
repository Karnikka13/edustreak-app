import React, { useState, useEffect } from 'react';

const QuoteFetcher = () => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const res = await fetch('/api/quote');
        if (!res.ok) throw new Error('Network response was not ok');
        const data = await res.json();
        setQuote(data.content);
        setAuthor(data.author);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch:', err);
        setQuote('Failed to fetch quote.');
        setAuthor('');
        setLoading(false);
      }
    };

    fetchQuote();
  }, []);

  return (
    <div style={{ padding: '1rem', backgroundColor: 'black', borderRadius: '8px' }}>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <p style={{ fontStyle: 'italic' }}>{quote}</p>
          <p style={{ textAlign: 'right', marginTop: '0.5rem' }}>— {author}</p>
        </>
      )}
    </div>
  );
};

export default QuoteFetcher;
