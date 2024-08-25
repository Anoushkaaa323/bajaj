import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [dropdownOptions] = useState([
    { value: 'alphabets', label: 'Alphabets' },
    { value: 'numbers', label: 'Numbers' },
    { value: 'highest_lowercase_alphabet', label: 'Highest lowercase alphabet' }
  ]);

  useEffect(() => {
    // Set the document title when the component mounts
    document.title = '21bce0616';
  }, []);

  const handleSubmit = async () => {
    try {
      const result = await axios.post('http://localhost:3000/bfhl', {
        data: JSON.parse(data),
      });
      setResponse(result.data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDropdownChange = (event) => {
    const value = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setSelectedOptions(value);
  };

  const filteredResponse = () => {
    if (!response) return null;
    
    const filteredData = {};

    if (selectedOptions.includes('alphabets')) {
      filteredData.alphabets = response.alphabets;
    }
    if (selectedOptions.includes('numbers')) {
      filteredData.numbers = response.numbers;
    }
    if (selectedOptions.includes('highest_lowercase_alphabet')) {
      filteredData.highest_lowercase_alphabet = response.highest_lowercase_alphabet;
    }

    return filteredData;
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h1>ENTER YOUR DATA HERE</h1>
      <textarea
        value={data}
        onChange={(e) => setData(e.target.value)}
        placeholder='Enter JSON data here'
        rows='10'
        cols='50'
        style={{ display: 'block', margin: '0 auto 10px auto' }}
      />
      <select
        multiple
        value={selectedOptions}
        onChange={handleDropdownChange}
        style={{ display: 'block', margin: '0 auto 10px auto' }}
      >
        {dropdownOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <button
        onClick={handleSubmit}
        style={{ display: 'block', margin: '0 auto' }}
      >
        Submit
      </button>
      {response && (
        <pre>{JSON.stringify(filteredResponse(), null, 2)}</pre>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default App;
