import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import MainLayout from '../components/Layout/MainLayout';
import FlightCard from '../components/Flight/FlightCard';
import { searchFlights } from '../data/flights';
import { ArrowUpDown, ArrowUp, ArrowDown, Clock, IndianRupee, Calendar, Search, Filter } from 'lucide-react';

const FlightSearchPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const from = searchParams.get('from') || '';
  const to = searchParams.get('to') || '';
  const date = searchParams.get('date') || '';
  
  const [flights, setFlights] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOption, setSortOption] = useState('departureTime');
  const [sortDirection, setSortDirection] = useState('asc');
  const [showFilters, setShowFilters] = useState(false);
  
  // Search form state
  const [searchFrom, setSearchFrom] = useState(from);
  const [searchTo, setSearchTo] = useState(to);
  const [searchDate, setSearchDate] = useState(date);

  useEffect(() => {
    // Update form values when URL params change
    setSearchFrom(from);
    setSearchTo(to);
    setSearchDate(date);
    
    // Search flights
    const fetchFlights = async () => {
      if (from && to && date) {
        setIsLoading(true);
        try {
          const results = await searchFlights(from, to, date);
          setFlights(results);
        } catch (error) {
          console.error('Error fetching flights:', error);
          setFlights([]);
        } finally {
          setIsLoading(false);
        }
      } else {
        setFlights([]);
        setIsLoading(false);
      }
    };

    fetchFlights();
  }, [from, to, date]);

  // Sort flights
  const sortedFlights = [...flights].sort((a, b) => {
    let comparison = 0;
    
    switch (sortOption) {
      case 'price':
        comparison = a.price - b.price;
        break;
      case 'duration':
        // Parse duration strings (assume format like "2h 30m")
        const getDurationMinutes = (duration) => {
          const match = duration.match(/(\d+)h\s+(\d+)m/);
          if (match) {
            const hours = parseInt(match[1], 10);
            const minutes = parseInt(match[2], 10);
            return hours * 60 + minutes;
          }
          return 0;
        };
        
        comparison = getDurationMinutes(a.duration) - getDurationMinutes(b.duration);
        break;
      case 'departureTime':
        // Parse time strings (format)
        const getMinutes = (time) => {
          const [hours, minutes] = time.split(':').map(Number);
          return hours * 60 + minutes;
        };
        
        comparison = getMinutes(a.departureTime) - getMinutes(b.departureTime);
        break;
    }
    
    return sortDirection === 'asc' ? comparison : -comparison;
  });

  const toggleSort = (option) => {
    if (sortOption === option) {
      // Toggle direction if same option
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new option and reset direction to asc
      setSortOption(option);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (option) => {
    if (sortOption !== option) {
      return <ArrowUpDown className="h-4 w-4" />;
    }
    
    return sortDirection === 'asc' ? 
      <ArrowUp className="h-4 w-4" /> : 
      <ArrowDown className="h-4 w-4" />;
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?from=${searchFrom}&to=${searchTo}&date=${searchDate}`);
  };

  return (
    <MainLayout>
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-6">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-white">Flight Search</h1>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center space-x-1 bg-white/20 text-white px-3 py-1 rounded-md backdrop-blur-sm"
            >
              <Filter className="h-4 w-4" />
              <span>Filters</span>
            </button>
          </div>
          
          {/* Search form */}
          <form 
            onSubmit={handleSearch}
            className={`bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg transition-all duration-200 ${showFilters ? 'block' : 'hidden md:block'}`}
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label 
                  htmlFor="searchFrom" 
                  className="block text-2xl font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  From
                </label>
                <input
                  type="text"
                  id="searchFrom"
                  value={searchFrom}
                  onChange={(e) => setSearchFrom(e.target.value)}
                  className="input-field"
                  placeholder="City or Airport"
                />
              </div>
              
              <div>
                <label 
                  htmlFor="searchTo" 
                  className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  To
                </label>
                <input
                  type="text"
                  id="searchTo"
                  value={searchTo}
                  onChange={(e) => setSearchTo(e.target.value)}
                  className="input-field"
                  placeholder="City or Airport"
                />
              </div>
              
              <div>
                <label 
                  htmlFor="searchDate" 
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Date
                </label>
                <input
                  type="date"
                  id="searchDate"
                  value={searchDate}
                  onChange={(e) => setSearchDate(e.target.value)}
                  className="input-field"
                />
              </div>
              
              <div className="flex items-end">
                <button 
                  type="submit" 
                  className="w-full btn-primary py-2 flex items-center justify-center space-x-2"
                >
                  <Search className="h-4 w-4" />
                  <span>Search</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            {/* Results header */}
            <div className="mb-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    {flights.length > 0 
                      ? `${flights.length} flights found from ${from} to ${to}`
                      : `No flights found from ${from} to ${to}`
                    }
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    <Calendar className="inline-block h-4 w-4 mr-1" />
                    {new Date(date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Sort by:</span>
                  
                  <button
                    onClick={() => toggleSort('departureTime')}
                    className={`flex items-center space-x-1 px-3 py-1 rounded-md ${
                      sortOption === 'departureTime' 
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' 
                        : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
                    }`}
                  >
                    <Clock className="h-4 w-4" />
                    <span>Time</span>
                    {getSortIcon('departureTime')}
                  </button>
                  
                  <button
                    onClick={() => toggleSort('price')}
                    className={`flex items-center space-x-1 px-3 py-1 rounded-md ${
                      sortOption === 'price' 
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' 
                        : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
                    }`}
                  >
                    <IndianRupee className="h-4 w-4" />
                    <span>Price</span>
                    {getSortIcon('price')}
                  </button>
                  
                  <button
                    onClick={() => toggleSort('duration')}
                    className={`flex items-center space-x-1 px-3 py-1 rounded-md ${
                      sortOption === 'duration' 
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' 
                        : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
                    }`}
                  >
                    <Clock className="h-4 w-4" />
                    <span>Duration</span>
                    {getSortIcon('duration')}
                  </button>
                </div>
              </div>
            </div>
            
            {/* Flight results */}
            {flights.length > 0 ? (
              <div className="space-y-6">
                {sortedFlights.map((flight) => (
                  <FlightCard key={flight.id} flight={flight} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">
                  No flights found for your search criteria.
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  Try different dates or cities.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default FlightSearchPage;