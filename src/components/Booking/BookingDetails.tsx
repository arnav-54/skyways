import React from 'react';
import { Booking } from '../../types';
import { Flight } from '../../types';
import { Calendar, Clock, DollarSign, Users } from 'lucide-react';

interface BookingDetailsProps {
  booking: Booking;
  flight: Flight;
  onCancelBooking?: () => void;
}

const BookingDetails: React.FC<BookingDetailsProps> = ({ booking, flight, onCancelBooking }) => {
  // Status badge styles
  const getStatusBadgeClass = () => {
    switch (booking.status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  // Format booking date
  const formattedBookingDate = new Date(booking.bookingDate).toLocaleDateString('en-US', {
    year: 'numeric', 
    month: 'long', 
    day: 'numeric'
  });

  // Format flight date
  const formattedFlightDate = new Date(flight.date).toLocaleDateString('en-US', {
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    weekday: 'long'
  });

  return (
    <div className="card">
      <div className="flex justify-between items-start mb-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          Booking #{booking.id}
        </h3>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadgeClass()}`}>
          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Flight Details
          </h4>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">Airline:</span>
              <span className="font-medium text-gray-900 dark:text-white">{flight.airline}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">Flight Number:</span>
              <span className="font-medium text-gray-900 dark:text-white">{flight.flightNumber}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">From:</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {flight.departureCity} ({flight.departureCode})
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">To:</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {flight.arrivalCity} ({flight.arrivalCode})
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <span className="text-gray-800 dark:text-gray-200">{formattedFlightDate}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <span className="text-gray-800 dark:text-gray-200">
                {flight.departureTime} - {flight.arrivalTime} ({flight.duration})
              </span>
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Booking Details
          </h4>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">Booking Date:</span>
              <span className="font-medium text-gray-900 dark:text-white">{formattedBookingDate}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">Passengers:</span>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-2 text-blue-600 dark:text-blue-400" />
                <span className="font-medium text-gray-900 dark:text-white">{booking.passengers}</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">Price per ticket:</span>
              <span className="font-medium text-gray-900 dark:text-white">
                ₹{(flight.price).toLocaleString()}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">Total price:</span>
              <div className="flex items-center">
                <DollarSign className="h-4 w-4 mr-1 text-blue-600 dark:text-blue-400" />
                <span className="font-bold text-xl text-blue-600 dark:text-blue-400">
                  ₹{(booking.totalPrice).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {booking.status === 'upcoming' && onCancelBooking && (
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onCancelBooking}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          >
            Cancel Booking
          </button>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            * Cancellation is free up to 24 hours before departure.
          </p>
        </div>
      )}
    </div>
  );
};

export default BookingDetails;