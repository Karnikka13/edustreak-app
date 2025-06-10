export default async function handler(req, res) {
  try {
    const response = await fetch('https://zenquotes.io/api/random');

    if (!response.ok) {
      return res.status(500).json({ error: 'Failed to fetch quote' });
    }

    const data = await response.json();

    // ZenQuotes returns an array like: [{ q: "Quote text", a: "Author name" }]
    const quote = data[0].q;
    const author = data[0].a;

    res.status(200).json({ content: quote, author });
  } catch (error) {
    console.error('Error fetching quote:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
