import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import BooksPage from './pages/BooksPage';
import BookDetailPage from './pages/BookDetailPage';
import QuotesPage from './pages/QuotesPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<BooksPage />} />
            <Route path="/book/:id" element={<BookDetailPage />} />
            <Route path="/quotes" element={<QuotesPage />} />
            <Route path="*" element={<div className="error">Page not found</div>} />
          </Routes>
        </main>
        <footer className="footer">
          <p>
            <a href="https://www.trevs.ca" target="_blank" >
            Regina Trevs
            </a> © {new Date().getFullYear()}
            </p> 
        </footer>
      </div>
    </Router>
  );
}

export default App;
