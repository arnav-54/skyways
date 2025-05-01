import { Booking } from '../types';

// Initial empty bookings array
let mockBookings: Booking[] = [];

// Function to add a new booking
export const addBooking = (booking: Booking): Booking => {
  mockBookings.push(booking);
  return booking;
};

// Function to get all bookings for a user
export const getUserBookings = (userId: string): Booking[] => {
  return mockBookings.filter(booking => booking.userId === userId);
};

// Function to get bookings by status for a user
export const getBookingsByStatus = (userId: string, status: Booking['status']): Booking[] => {
  return mockBookings.filter(booking => booking.userId === userId && booking.status === status);
};

// Function to get a booking by ID
export const getBookingById = (id: string): Booking | undefined => {
  return mockBookings.find(booking => booking.id === id);
};

// Function to update a booking status
export const updateBookingStatus = (id: string, status: Booking['status']): Booking | undefined => {
  const bookingIndex = mockBookings.findIndex(booking => booking.id === id);
  if (bookingIndex !== -1) {
    mockBookings[bookingIndex] = {
      ...mockBookings[bookingIndex],
      status
    };
    return mockBookings[bookingIndex];
  }
  return undefined;
};