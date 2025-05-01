export interface Flight {
  id: string;
  airline: string;
  flightNumber: string;
  departureCity: string;
  departureAirport: string;
  departureCode: string;
  arrivalCity: string;
  arrivalAirport: string;
  arrivalCode: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  availableSeats: number;
  date: string;
}

export interface Booking {
  id: string;
  flightId: string;
  userId: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  bookingDate: string;
  passengers: number;
  totalPrice: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string; // In a real app, this would be hashed and stored securely
}

export type SortOption = 'price' | 'duration' | 'departureTime';
export type SortDirection = 'asc' | 'desc';