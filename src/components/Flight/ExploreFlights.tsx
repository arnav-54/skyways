import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getRandomFlights } from '../../data/flights';
import { Flight } from '../../types';
import { Globe, MapPin, Calendar, ArrowRight } from 'lucide-react';

const ExploreFlights: React.FC = () => {
  const [randomFlights, setRandomFlights] = useState<Flight[]>([]);
  const [date, setDate] = useState<string>(
    new Date(2025, 4, 15).toISOString().split('T')[0] // May 15, 2025
  );
  
  useEffect(() => {
    setRandomFlights(getRandomFlights(3));
  }, []);

  const handleRefresh = () => {
    setRandomFlights(getRandomFlights(3));
  };

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Explore Destinations</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Discover amazing flights to popular destinations
            </p>
          </div>
          <button 
            onClick={handleRefresh}
            className="btn-secondary flex items-center space-x-2"
          >
            <Globe className="h-4 w-4" />
            <span>Refresh</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {randomFlights.map((flight) => (
            <div 
              key={flight.id}
              className="card hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200 overflow-hidden"
            >
              <div 
                className="h-48 bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white p-6 -mx-6 -mt-6 mb-6"
              >
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-2">{flight.departureCity} to {flight.arrivalCity}</h3>
                  <div className="inline-block bg-white/20 rounded-full px-3 py-1 text-sm backdrop-blur-sm">
                    {flight.departureCode} → {flight.arrivalCode}
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">From</p>
                    <p className="text-gray-600 dark:text-gray-400">{flight.departureAirport}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">To</p>
                    <p className="text-gray-600 dark:text-gray-400">{flight.arrivalAirport}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Date</p>
                    <p className="text-gray-600 dark:text-gray-400">{flight.date}</p>
                  </div>
                </div>
                
                <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Starting from</p>
                    <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
                      ₹{flight.price.toLocaleString()}
                    </p>
                  </div>
                  
                  <Link
                    to={`/search?from=${flight.departureCity}&to=${flight.arrivalCity}&date=${flight.date}`}
                    className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                  >
                    <span className="mr-1">View Flights</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExploreFlights;