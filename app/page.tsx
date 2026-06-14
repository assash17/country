'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getAllCountries, filterCountriesByName, type Country } from '@/lib/graphql';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [countries, setCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCountries() {
      const data = await getAllCountries();
      setCountries(data);
      setFilteredCountries(data);
      setLoading(false);
    }
    fetchCountries();
  }, []);

  useEffect(() => {
    const filtered = filterCountriesByName(countries, searchTerm);
    setFilteredCountries(filtered);
  }, [searchTerm, countries]);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 flex flex-col items-center justify-center pt-20">
          <h1 className="mb-8 text-4xl font-bold text-gray-900">
            Country Search
          </h1>
          <input
            type="text"
            placeholder="Enter country name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md rounded-lg border border-gray-400 px-4 py-3 text-lg shadow-sm focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white text-gray-900 placeholder-gray-500"
          />
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <p className="text-lg text-gray-600">Loading...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCountries.map((country) => (
              <Link
                key={country.code}
                href={`/country/${country.code}`}
                className="group flex cursor-pointer flex-col rounded-lg border border-gray-300 bg-white p-6 shadow-sm transition-all hover:border-blue-500 hover:shadow-md"
              >
                <img 
                  src={`https://flagcdn.com/w320/${country.code.toLowerCase()}.png`}
                  alt={`${country.name} flag`}
                  className="mb-2 h-16 w-24 object-cover"
                />
                <h2 className="mb-1 text-xl font-semibold text-gray-800 group-hover:text-blue-700">
                  {country.name}
                </h2>
                <p className="text-sm text-gray-500">{country.capital}</p>
              </Link>
            ))}
          </div>
        )}

        {!loading && filteredCountries.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-lg text-gray-600">No countries found</p>
          </div>
        )}
      </div>
    </div>
  );
}