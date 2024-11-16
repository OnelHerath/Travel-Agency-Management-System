import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AiOutlineSearch } from 'react-icons/ai';
import '../css/SearchBar.css'; // Import the CSS file

const SearchBar = ({ setFilters }) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(''); // State for error message

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (query.trim() === '') {
                setSuggestions([]);
                setErrorMessage(''); // Clear error when the input is empty
                return;
            }

            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:5557/enquiries/search?query=${query}`);
                const data = response.data.data;

                if (data.length === 0) {
                    setErrorMessage('No enquiries found for the search term'); // Show error if no data
                } else {
                    setErrorMessage(''); // Clear error if there are suggestions
                }

                setSuggestions(data);
            } catch (error) {
                setErrorMessage('Search failed. Please try again later.');
                console.log('Search failed', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSuggestions();
    }, [query]);

    const handleSearch = () => {
        setFilters(prev => ({ ...prev, search: query })); // Update filters with search query
        setSuggestions([]); // Clear suggestions after search
    };

    const handleSuggestionClick = (name) => {
        setQuery(name);
        setFilters(prev => ({ ...prev, search: name })); // Set filter with the selected name
        setSuggestions([]); // Clear suggestions after selecting
    };

    return (
        <div className="search-bar-container">
            <div className="search-bar-wrapper">
                <input
                    type="text"
                    placeholder="Search Enquiries..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="search-input"
                />
                <AiOutlineSearch className="search-icon" />
                <button onClick={handleSearch} className="search-button">
                    {loading ? 'Searching...' : 'Search'}
                </button>

                {errorMessage && <div className="error-message">{errorMessage}</div>} {/* Display error message */}
                
                {suggestions.length > 0 && (
                    <ul className="suggestions-list">
                        {suggestions.map((enquiry) => (
                            <li key={enquiry._id} onClick={() => handleSuggestionClick(enquiry.CustomerName)}>
                                {enquiry.CustomerName}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default SearchBar;
