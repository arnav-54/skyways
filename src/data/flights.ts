import { Flight } from '../types';


const generateFlights = (): Flight[] => {
  const airlines = [
    'Air India', 'IndiGo', 'Vistara', 'SpiceJet', 'Go First',
    'Emirates', 'British Airways', 'United Airlines', 'Singapore Airlines', 'Lufthansa'
  ];
  
  const cities = [
 
    { city: 'Delhi', airport: 'Indira Gandhi International Airport', code: 'DEL' },
    { city: 'Mumbai', airport: 'Chhatrapati Shivaji International Airport', code: 'BOM' },
    { city: 'Bangalore', airport: 'Kempegowda International Airport', code: 'BLR' },
    { city: 'Pune', airport: 'Pune International Airport', code: 'PNQ' },
    { city: 'Hyderabad', airport: 'Rajiv Gandhi International Airport', code: 'HYD' },
    { city: 'Chennai', airport: 'Chennai International Airport', code: 'MAA' },
    { city: 'Kolkata', airport: 'Netaji Subhas Chandra Bose International Airport', code: 'CCU' },
    { city: 'Kochi', airport: 'Cochin International Airport', code: 'COK' },
    { city: 'Jaipur', airport: 'Jaipur International Airport', code: 'JAI' },
    { city: 'Ahmedabad', airport: 'Sardar Vallabhbhai Patel International Airport', code: 'AMD' },
    
   
    { city: 'Dubai', airport: 'Dubai International Airport', code: 'DXB' },
    { city: 'London', airport: 'Heathrow Airport', code: 'LHR' },
    { city: 'New York', airport: 'John F. Kennedy International Airport', code: 'JFK' },
    { city: 'Paris', airport: 'Charles de Gaulle Airport', code: 'CDG' },
    { city: 'Singapore', airport: 'Changi Airport', code: 'SIN' },
    { city: 'Tokyo', airport: 'Narita International Airport', code: 'NRT' },
    { city: 'Sydney', airport: 'Sydney Airport', code: 'SYD' },
    { city: 'Bangkok', airport: 'Suvarnabhumi Airport', code: 'BKK' },
    { city: 'Toronto', airport: 'Toronto Pearson International Airport', code: 'YYZ' },
    { city: 'Frankfurt', airport: 'Frankfurt Airport', code: 'FRA' }
  ];

  const flights: Flight[] = [];
  
 
  const startDate = new Date('2025-05-01');
  const endDate = new Date('2025-09-30');
  const dates: string[] = [];
  
  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    dates.push(d.toISOString().split('T')[0]);
  }
  
  let id = 1;
  
  
  for (const date of dates) {
    for (let i = 0; i < cities.length; i++) {
      for (let j = 0; j < cities.length; j++) {
        if (i !== j) { // Don't create flights from a city to itself
          const departureCity = cities[i];
          const arrivalCity = cities[j];
          
        
          const isPopularRoute = (
           
            (departureCity.code === 'PNQ' && ['DEL', 'BOM', 'BLR', 'HYD', 'DXB'].includes(arrivalCity.code)) ||
            (['DEL', 'BOM', 'BLR', 'HYD', 'DXB'].includes(departureCity.code) && arrivalCity.code === 'PNQ') ||
     
            (departureCity.code === 'DEL' && ['BOM', 'BLR', 'HYD'].includes(arrivalCity.code)) ||
            (['BOM', 'BLR', 'HYD'].includes(departureCity.code) && arrivalCity.code === 'DEL')
          );
          
          const numFlights = isPopularRoute ? 5 : 2 + Math.floor(Math.random() * 2);
          
          for (let k = 0; k < numFlights; k++) {
           
            const departureHour = Math.floor((24 / numFlights) * k + Math.random() * (24 / numFlights));
            
        
            let durationHours: number;
            let basePrice: number;
            
       
            if (departureCity.code === 'PNQ' || arrivalCity.code === 'PNQ') {
              if (['DEL', 'CCU'].includes(departureCity.code) || ['DEL', 'CCU'].includes(arrivalCity.code)) {
                durationHours = 2 + Math.floor(Math.random() * 1); // ~2-3 hours
                basePrice = 5000 + Math.floor(Math.random() * 3000);
              } else if (['BOM', 'BLR', 'HYD'].includes(departureCity.code) || ['BOM', 'BLR', 'HYD'].includes(arrivalCity.code)) {
                durationHours = 1 + Math.floor(Math.random() * 1); // ~1-2 hours
                basePrice = 3000 + Math.floor(Math.random() * 2000);
              } else {
              
                durationHours = 6 + Math.floor(Math.random() * 8);
                basePrice = 35000 + Math.floor(Math.random() * 25000);
              }
            } else if (cities[i].code.match(/^[A-Z]{3}$/) && cities[j].code.match(/^[A-Z]{3}$/)) {
     
              durationHours = 1 + Math.floor(Math.random() * 3);
              basePrice = 3000 + Math.floor(Math.random() * 4000);
            } else if (departureCity.code === 'DEL' && ['JFK', 'YYZ', 'SYD'].includes(arrivalCity.code)) {
          
              durationHours = 14 + Math.floor(Math.random() * 4);
              basePrice = 75000 + Math.floor(Math.random() * 25000);
            } else {
        
              durationHours = 6 + Math.floor(Math.random() * 6);
              basePrice = 35000 + Math.floor(Math.random() * 25000);
            }
            
            const durationMinutes = Math.floor(Math.random() * 60);
            
        
            const totalMinutes = departureHour * 60 + durationHours * 60 + durationMinutes;
            const arrivalHour = Math.floor((totalMinutes / 60) % 24);
            const arrivalMinute = totalMinutes % 60;
            
            const departureTime = `${departureHour.toString().padStart(2, '0')}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`;
            const arrivalTime = `${arrivalHour.toString().padStart(2, '0')}:${arrivalMinute.toString().padStart(2, '0')}`;
            
            const airline = airlines[Math.floor(Math.random() * airlines.length)];
            const flightNumber = `${airline.substring(0, 2).toUpperCase()}${100 + Math.floor(Math.random() * 900)}`;
            
            flights.push({
              id: id.toString(),
              airline,
              flightNumber,
              departureCity: departureCity.city,
              departureAirport: departureCity.airport,
              departureCode: departureCity.code,
              arrivalCity: arrivalCity.city,
              arrivalAirport: arrivalCity.airport,
              arrivalCode: arrivalCity.code,
              departureTime,
              arrivalTime,
              duration: `${durationHours}h ${durationMinutes}m`,
              price: basePrice,
              availableSeats: 10 + Math.floor(Math.random() * 100),
              date
            });
            
            id++;
          }
        }
      }
    }
  }
  
  return flights;
};


export const mockFlights = generateFlights();


export const searchFlights = async (from: string, to: string, date: string): Promise<Flight[]> => {
  
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return mockFlights.filter(flight => 
    (flight.departureCity.toLowerCase().includes(from.toLowerCase()) || 
     flight.departureCode.toLowerCase() === from.toLowerCase()) &&
    (flight.arrivalCity.toLowerCase().includes(to.toLowerCase()) || 
     flight.arrivalCode.toLowerCase() === to.toLowerCase()) &&
    flight.date === date
  );
};


export const getFlightById = (id: string): Flight | undefined => {
  return mockFlights.find(flight => flight.id === id);
};


export const getRandomFlights = (count: number): Flight[] => {
  const shuffled = [...mockFlights].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};


export const getAvailableDates = (from: string, to: string): string[] => {
  return Array.from(new Set(
    mockFlights
      .filter(flight => 
        (flight.departureCity.toLowerCase().includes(from.toLowerCase()) || 
         flight.departureCode.toLowerCase() === from.toLowerCase()) &&
        (flight.arrivalCity.toLowerCase().includes(to.toLowerCase()) || 
         flight.arrivalCode.toLowerCase() === to.toLowerCase())
      )
      .map(flight => flight.date)
  )).sort();
};


export const getAvailableCities = (): { city: string; code: string }[] => {
  const cities = new Set<string>();
  const result: { city: string; code: string }[] = [];
  
  mockFlights.forEach(flight => {
    if (!cities.has(flight.departureCity)) {
      cities.add(flight.departureCity);
      result.push({
        city: flight.departureCity,
        code: flight.departureCode
      });
    }
    if (!cities.has(flight.arrivalCity)) {
      cities.add(flight.arrivalCity);
      result.push({
        city: flight.arrivalCity,
        code: flight.arrivalCode
      });
    }
  });
  
  return result.sort((a, b) => a.city.localeCompare(b.city));
};