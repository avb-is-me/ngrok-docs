import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import Modal from 'react-modal';

// Modal.setAppElement('#root');

interface SearchResult {
  objectID: string;
  name: string;
}

const AlgoliaSearchModal: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const APPLICATION_ID = 'SPPRT3GDNI';
  const SEARCH_ONLY_API_KEY = 'e02fb8e0c4d8c7968396981d7ecb9fa8';
  const INDEX_NAME = 'dev_ngrok';

  useEffect(() => {
    if (!query) return;

    const fetchResults = async () => {
      const url = `https://${APPLICATION_ID}-dsn.algolia.net/1/indexes/${INDEX_NAME}/query`;
      const headers = {
        'X-Algolia-API-Key': SEARCH_ONLY_API_KEY,
        'X-Algolia-Application-Id': APPLICATION_ID,
        'Content-Type': 'application/json',
      };
      const data = {
        query,
      };

      try {
        const response = await fetch(url, {
          method: 'POST',
          headers,
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error(`Error fetching search results: ${response.statusText}`);
        }

        const resultData = await response.json();
        setResults(resultData.hits);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    fetchResults();
  }, [query]);

  const handleSearch = (event: FormEvent) => {
    event.preventDefault();
    setModalIsOpen(true);
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search"
          value={query}
          onChange={(event: ChangeEvent<HTMLInputElement>) => setQuery(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        <button onClick={() => setModalIsOpen(false)}>Close</button>
        <h2>Search Results</h2>
        <ul>
          {results.map((result) => (
            <li key={result.objectID}>{result.name}</li>
          ))}
        </ul>
      </Modal>
    </div>
  );
};

export default AlgoliaSearchModal;
