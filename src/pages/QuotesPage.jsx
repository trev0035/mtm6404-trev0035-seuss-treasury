import { useState, useEffect } from 'react';

function QuotesPage() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await fetch('https://seussology.info/api/quotes/random/10');
        if (!response.ok) {
          throw new Error('Failed to fetch quotes');
        }

        const data = await response.json();
        console.log('Quotes data:', data);
        
        // data should be an array of 10 quotes
        setQuotes(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuotes();
  }, []);

  if (loading) return <div className="loading">Loading quotes...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (quotes.length === 0) return <div className="error">No quotes found</div>;

  return (
    <div className="quotes-page">
      <h2>Dr. Seuss Quotes</h2>
      <div className="quotes-list">
        {quotes.map((quote, index) => (
          <div key={index} className="quote-card">
            <blockquote className="quote-text">
              "{quote.text || 'No quote text available'}"
            </blockquote>
            {quote.book && quote.book.title && (
              <div className="quote-source">
                — From <em>{quote.book.title}</em>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuotesPage;
