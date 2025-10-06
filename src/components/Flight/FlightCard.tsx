import React from 'react';
import { Link } from 'react-router-dom';
import { Flight } from '../../types';
import { Clock, IndianRupee, Users } from 'lucide-react';

interface FlightCardProps {
  flight: Flight;
}

const FlightCard: React.FC<FlightCardProps> = ({ flight }) => {

  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(flight.price);

 
  let priceBadgeColor = 'bg-green-100 text-green-800';
  if (flight.price > 10000) {
    priceBadgeColor = 'bg-yellow-100 text-yellow-800';
  }
  if (flight.price > 30000) {
    priceBadgeColor = 'bg-red-100 text-red-800';
  }

  return (
    <div className="card hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200">
      <div className="flex flex-col md:flex-row md:items-center">
        <div className="mb-4 md:mb-0 md:mr-6 md:w-1/4">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">{flight.airline}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{flight.flightNumber}</p>
        </div>

        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
       
          <div className="text-center">
            <p className="text-xl font-bold text-gray-900 dark:text-white">{flight.departureTime}</p>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{flight.departureCity}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{flight.departureCode}</p>
          </div>

       
          <div className="relative flex flex-col items-center justify-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-700 absolute top-1/2"></div>
            <div className="bg-white dark:bg-gray-800 px-2 z-10 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">{flight.duration}</p>
              <div className="flex items-center justify-center text-gray-400 mt-1">
                <Clock className="h-4 w-4 mr-1" />
                <span className="text-xs">Direct</span>
              </div>
            </div>
          </div>

       
          <div className="text-center">
            <p className="text-xl font-bold text-gray-900 dark:text-white">{flight.arrivalTime}</p>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{flight.arrivalCity}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{flight.arrivalCode}</p>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center space-x-4 mb-4 md:mb-0">
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${priceBadgeColor}`}>
            <IndianRupee className="inline-block h-4 w-4 mr-1" />
            {formattedPrice}
          </div>
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <Users className="h-4 w-4 mr-1" />
            <span className="text-sm">{flight.availableSeats} seats available</span>
          </div>
        </div>
        <Link
          to={`/book/${flight.id}`}
          className="btn-primary md:min-w-[120px] text-center"
        >
          Book Now
        </Link>
      </div>
    </div>
  );
};

export default FlightCard;