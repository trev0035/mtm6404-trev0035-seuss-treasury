import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function BooksPage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('https://seussology.info/api/books');
        if (!response.ok) {
          throw new Error('Failed to fetch books');
        }
        const data = await response.json();
        console.log('Books data:', data); // Log the data to see its structure
        setBooks(Array.isArray(data) ? data : []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching books:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // Function to split books into shelves of 4 books per shelf
  const createBookshelves = (booksList) => {
    const shelves = [];
    const booksPerShelf = 4;
    
    for (let i = 0; i < booksList.length; i += booksPerShelf) {
      shelves.push(booksList.slice(i, i + booksPerShelf));
    }
    
    return shelves;
  };

  if (loading) return <div className="loading">Loading books...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (books.length === 0) return <div className="error">No books found</div>;

  // Create bookshelves from the books array
  const bookshelves = createBookshelves(books);

  return (
    <div className="books-page">
      <h2>Dr. Seuss Books</h2>
      <div className="books-grid">
        {bookshelves.map((shelf, shelfIndex) => (
          <div key={shelfIndex} className="bookshelf">
            {shelf.map((book, index) => (
              <Link 
                to={`/book/${book.id}`} 
                key={book.id || `${shelfIndex}-${index}`} 
                className="book-item"
                aria-label={`View details for ${book.title}`}
              >
                <div className="book-image-wrapper">
                  <img 
                    src={book.image} 
                    alt={book.title || 'Book cover'} 
                    className="book-cover" 
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/200x300?text=No+Image';
                    }}
                  />
                </div>
              </Link>
            ))}
            <div className="shelf-support"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BooksPage; 