let mockBookings = [];

export const addBooking = (booking) => {
  mockBookings.push(booking);
  return booking;
};

export const getUserBookings = (userId) => {
  return mockBookings.filter(booking => booking.userId === userId);
};

export const getBookingsByStatus = (userId, status) => {
  return mockBookings.filter(booking => booking.userId === userId && booking.status === status);
};

export const getBookingById = (id) => {
  return mockBookings.find(booking => booking.id === id);
};

export const updateBookingStatus = (id, status) => {
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