import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function BookDetailPage() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        // Make sure we're using the correct API endpoint for a specific book
        const response = await fetch(`https://seussology.info/api/books/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch book details');
        }
        const data = await response.json();
        console.log('Book detail data:', data); // Log the data to debug
        
        if (!data || !data.title) {
          throw new Error('Invalid book data received from API');
        }
        
        setBook(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching book details:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    if (id) {
      fetchBookDetails();
    } else {
      setError('Book ID is missing');
      setLoading(false);
    }
  }, [id]);

  if (loading) return <div className="loading">Loading book details...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!book) return <div className="error">Book not found</div>;

  return (
    <div className="book-detail-page">
      <Link to="/" className="back-link">Back to Books</Link>
      <div className="book-detail-content">
        <div className="book-image-container">
          <img 
            src={book.image} 
            alt={book.title || 'Book cover'} 
            className="book-detail-cover" 
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/350x500?text=No+Image';
            }}
          />
        </div>
        <div className="book-info">
          <h2 className="book-title">{book.title}</h2>
          <div className="book-description">
            {book.description ? (
              <p>{book.description}</p>
            ) : (
              <p>No description available for this book.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetailPage; 