import React from "react";
import FlightSearchForm from "../components/Flight/FlightSearchForm";
import ExploreFlights from "../components/Flight/ExploreFlights";
import MainLayout from "../components/Layout/MainLayout";
import { MapPin, Layers, Shield, Clock, Plane } from "lucide-react";

const HomePage = () => {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "url(https://images.pexels.com/photos/912050/pexels-photo-912050.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(0.7)",
            zIndex: -1,
          }}
        ></div>

        <div className="container mx-auto px-4 py-24 text-center relative">
          <div className="max-w-3xl mx-auto mb-10">
            <h1 className="text-4xl md:text-6xl font-extrabold drop-shadow-lg leading-tight text-black dark:text-white bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400">
              Travel to Your <span className="underline decoration-blue-500 decoration-4 underline-offset-4">Dream Destination</span> ✈️
            </h1>
            <p className="text-lg md:text-xl mt-6 text-gray-700 dark:text-gray-300 font-medium">
              Find and book flights to <span className="font-bold">hundreds of destinations</span> worldwide
            </p>
          </div>

          {/* Search Form Card */}
          <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8 backdrop-blur-md">
            <FlightSearchForm />
          </div>

          {/* Decorative Plane Icon */}
          <Plane className="absolute right-10 top-10 text-white/20 w-24 h-24 animate-bounce-slow" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">
            Why Choose <span className="text-blue-600 dark:text-blue-400 relative inline-block">
              SkyWays?
              <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-600 dark:bg-blue-400 rounded-full"></span>
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              {
                icon: <MapPin className="h-10 w-10" />,
                title: "Global Coverage",
                desc: "Flights to over <strong>5,000 destinations</strong> worldwide, connecting major cities and remote locations.",
              },
              {
                icon: <Layers className="h-10 w-10" />,
                title: "Best Prices",
                desc: "We guarantee the <strong>best prices</strong> with our price-match promise and exclusive deals.",
              },
              {
                icon: <Shield className="h-10 w-10" />,
                title: "Secure Booking",
                desc: "Your personal and payment info is always protected with <strong>encrypted systems</strong>.",
              },
              {
                icon: <Clock className="h-10 w-10" />,
                title: "24/7 Support",
                desc: "Our customer support team is available <strong>around the clock</strong> for your travel needs.",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 text-center transform transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400" dangerouslySetInnerHTML={{ __html: feature.desc }}></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Explore Flights */}
      <ExploreFlights />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-700 via-blue-600 to-blue-800 text-white relative overflow-hidden">
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-md">
            Ready to Take Off?
          </h2>
          <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto opacity-90">
            Sign up today and get exclusive access to special deals and personalized travel recommendations.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <a
              href="/register"
              className="px-10 py-4 bg-white text-blue-700 font-semibold rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
            >
               Sign Up Now
            </a>
            <a
              href="/search"
              className="px-10 py-4 border-2 border-white font-semibold rounded-xl hover:bg-white/10 transition-colors"
            >
               Search Flights
            </a>
          </div>
        </div>

        {/* Decorative background shapes */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagonal-stripes.png')] opacity-10"></div>
      </section>
    </MainLayout>
  );
};

export default HomePage;