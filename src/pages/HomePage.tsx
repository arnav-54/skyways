import React from 'react';
import { Link } from 'react-router-dom';
import FlightSearchForm from '../components/Flight/FlightSearchForm';
import ExploreFlights from '../components/Flight/ExploreFlights';
import MainLayout from '../components/Layout/MainLayout';
import { MapPin, Layers, Shield, Clock } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative">
        <div 
          className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 opacity-90"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/912050/pexels-photo-912050.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: -1
          }}
        ></div>
        
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center text-white mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-black dark:text-white">
              Travel to Your Dream Destination
            </h1>
            <p className="text-xl font-normal text-black opacity-90 dark:text-white dark:opacity-80">
              Find and book flights to hundreds of destinations worldwide
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto relative z-10">
            <FlightSearchForm />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Why Choose SkyWays?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-lg transition-transform hover:scale-105">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 mb-4">
                <MapPin className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Global Coverage
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Flights to over 5,000 destinations worldwide connecting major cities and remote locations.
              </p>
            </div>
            
            <div className="text-center p-6 rounded-lg transition-transform hover:scale-105">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 mb-4">
                <Layers className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Best Prices
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                We guarantee the best prices with our price-match promise and exclusive deals.
              </p>
            </div>
            
            <div className="text-center p-6 rounded-lg transition-transform hover:scale-105">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 mb-4">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Secure Booking
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Your personal and payment information is always protected with our secure booking system.
              </p>
            </div>
            
            <div className="text-center p-6 rounded-lg transition-transform hover:scale-105">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 mb-4">
                <Clock className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                24/7 Support
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Our customer support team is available around the clock to assist with any questions or issues.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Explore Section */}
      <ExploreFlights />

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Take Off?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Sign up today and get exclusive access to special deals and personalized travel recommendations.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link 
              to="/register" 
              className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-md shadow hover:bg-gray-100 transition-colors"
            >
              Sign Up Now
            </Link>
            <Link 
              to="/search" 
              className="px-8 py-3 bg-transparent border-2 border-white font-semibold rounded-md hover:bg-white/10 transition-colors"
            >
              Search Flights
            </Link>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default HomePage;