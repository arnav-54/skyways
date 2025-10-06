import { Booking } from '../types';
let mockBookings: Booking[] = [];


export const addBooking = (booking: Booking): Booking => {
  mockBookings.push(booking);
  return booking;
};


export const getUserBookings = (userId: string): Booking[] => {
  return mockBookings.filter(booking => booking.userId === userId);
};

export const getBookingsByStatus = (userId: string, status: Booking['status']): Booking[] => {
  return mockBookings.filter(booking => booking.userId === userId && booking.status === status);
};


export const getBookingById = (id: string): Booking | undefined => {
  return mockBookings.find(booking => booking.id === id);
};


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