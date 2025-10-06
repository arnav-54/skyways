import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Search } from 'lucide-react';
import { getAvailableCities, getAvailableDates } from '../../data/flights';

const FlightSearchForm: React.FC = () => {
  const navigate = useNavigate();
  const [departure, setDeparture] = useState('');
  const [arrival, setArrival] = useState('');
  const [date, setDate] = useState<string>(
    new Date(2025, 4, 15).toISOString().split('T')[0] 
  );
  const [cities, setCities] = useState<{ city: string; code: string }[]>([]);
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [departureSuggestions, setDepartureSuggestions] = useState<{ city: string; code: string }[]>([]);
  const [arrivalSuggestions, setArrivalSuggestions] = useState<{ city: string; code: string }[]>([]);
  const [showDepartureSuggestions, setShowDepartureSuggestions] = useState(false);
  const [showArrivalSuggestions, setShowArrivalSuggestions] = useState(false);
  const [errors, setErrors] = useState({
    departure: '',
    arrival: '',
    date: ''
  });


  useEffect(() => {
    const allCities = getAvailableCities();
    setCities(allCities);
  }, []);


  useEffect(() => {
    if (departure && arrival) {
      const dates = getAvailableDates(departure, arrival);
      setAvailableDates(dates);
      
    
      if (date && !dates.includes(date)) {
        setDate(dates[0] || '');
      }
    }
  }, [departure, arrival]);

  const handleDepartureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDeparture(value);
    setShowDepartureSuggestions(true);
    
    if (value.length > 1) {
      const matches = cities.filter(city => 
        city.city.toLowerCase().includes(value.toLowerCase()) ||
        city.code.toLowerCase().includes(value.toLowerCase())
      );
      setDepartureSuggestions(matches);
    } else {
      setDepartureSuggestions([]);
    }
  };

  const handleArrivalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setArrival(value);
    setShowArrivalSuggestions(true);
    
    if (value.length > 1) {
      const matches = cities.filter(city => 
        city.city.toLowerCase().includes(value.toLowerCase()) ||
        city.code.toLowerCase().includes(value.toLowerCase())
      );
      setArrivalSuggestions(matches);
    } else {
      setArrivalSuggestions([]);
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;
    if (availableDates.includes(selectedDate)) {
      setDate(selectedDate);
      setErrors(prev => ({ ...prev, date: '' }));
    } else {
      setDate(selectedDate);
      setErrors(prev => ({ ...prev, date: 'No flights available on selected date' }));
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      departure: '',
      arrival: '',
      date: ''
    };

    if (!departure) {
      newErrors.departure = 'Departure city is required';
      valid = false;
    }

    if (!arrival) {
      newErrors.arrival = 'Arrival city is required';
      valid = false;
    }

    if (departure && arrival && departure.toLowerCase() === arrival.toLowerCase()) {
      newErrors.arrival = 'Departure and arrival cities cannot be the same';
      valid = false;
    }

    if (!date) {
      newErrors.date = 'Date is required';
      valid = false;
    } else if (!availableDates.includes(date)) {
      newErrors.date = 'No flights available on selected date';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      navigate(`/search?from=${departure}&to=${arrival}&date=${date}`);
    }
  };


  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('#departure-container')) {
        setShowDepartureSuggestions(false);
      }
      if (!target.closest('#arrival-container')) {
        setShowArrivalSuggestions(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <form 
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transition-colors duration-200"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  
        <div id="departure-container" className="relative">
          <label 
            htmlFor="departure" 
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            From
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              id="departure"
              placeholder="City or Airport Code"
              value={departure}
              onChange={handleDepartureChange}
              onFocus={() => setShowDepartureSuggestions(true)}
              className={`input-field pl-10 ${errors.departure ? 'border-red-500' : ''}`}
              autoComplete="off"
            />
          </div>
          {showDepartureSuggestions && departureSuggestions.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 max-h-60 overflow-auto">
              {departureSuggestions.map((city, index) => (
                <button
                  key={index}
                  type="button"
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex justify-between items-center"
                  onClick={() => {
                    setDeparture(city.city);
                    setShowDepartureSuggestions(false);
                  }}
                >
                  <span className="text-gray-900 dark:text-gray-100">{city.city}</span>
                  <span className="text-gray-500 dark:text-gray-400">{city.code}</span>
                </button>
              ))}
            </div>
          )}
          {errors.departure && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.departure}</p>
          )}
        </div>
        
  
        <div id="arrival-container" className="relative">
          <label 
            htmlFor="arrival" 
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            To
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              id="arrival"
              placeholder="City or Airport Code"
              value={arrival}
              onChange={handleArrivalChange}
              onFocus={() => setShowArrivalSuggestions(true)}
              className={`input-field pl-10 ${errors.arrival ? 'border-red-500' : ''}`}
              autoComplete="off"
            />
          </div>
          {showArrivalSuggestions && arrivalSuggestions.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 max-h-60 overflow-auto">
              {arrivalSuggestions.map((city, index) => (
                <button
                  key={index}
                  type="button"
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex justify-between items-center"
                  onClick={() => {
                    setArrival(city.city);
                    setShowArrivalSuggestions(false);
                  }}
                >
                  <span className="text-gray-900 dark:text-gray-100">{city.city}</span>
                  <span className="text-gray-500 dark:text-gray-400">{city.code}</span>
                </button>
              ))}
            </div>
          )}
          {errors.arrival && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.arrival}</p>
          )}
        </div>
        
    
        <div>
          <label 
            htmlFor="date" 
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Date
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Calendar className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="date"
              id="date"
              value={date}
              onChange={handleDateChange}
              min={availableDates[0]}
              max={availableDates[availableDates.length - 1]}
              className={`input-field pl-10 ${errors.date ? 'border-red-500' : ''}`}
              disabled={!departure || !arrival || availableDates.length === 0}
            />
          </div>
          {errors.date && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.date}</p>
          )}
          {availableDates.length > 0 && (
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {availableDates.length} dates available
            </p>
          )}
        </div>
      </div>
      
      <div className="mt-6">
        <button 
          type="submit" 
          className="w-full btn-primary py-3 flex items-center justify-center space-x-2"
        >
          <Search className="h-5 w-5" />
          <span>Search Flights</span>
        </button>
      </div>
    </form>
  );
};

export default FlightSearchForm;