'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getCountryByCode, type Country } from '@/lib/graphql';

export default function CountryDetail({ code }: { code: string }) {
  const [country, setCountry] = useState<Country | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchCountry() {
      const data = await getCountryByCode(code);
      if (data) {
        setCountry(data);
      } else {
        setError(true);
      }
      setLoading(false);
    }

    fetchCountry();
  }, [code]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-lg text-gray-600">Loading...</p>
      </div>
    );
  }

  if (error || !country) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
        <p className="mb-4 text-lg text-red-600">Country not found</p>
        <Link href="/" className="text-blue-600 hover:underline">
          Back to Search
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/"
          className="mb-8 inline-block text-blue-600 hover:underline"
        >
          ← Back to Search
        </Link>

        <div className="rounded-lg border border-gray-300 bg-white p-8 shadow-md">
          <div className="mb-6 flex items-center gap-4">
            <img
              src={`https://flagcdn.com/w320/${country.code.toLowerCase()}.png`}
              alt={`${country.name} flag`}
              className="h-32 w-48 rounded object-cover shadow"
            />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {country.name}
              </h1>
              <p className="text-lg text-gray-600">{country.native}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex border-b border-gray-200 pb-4">
              <div className="w-32 font-semibold text-gray-800">Code</div>
              <div className="text-gray-900">{country.code}</div>
            </div>

            <div className="flex border-b border-gray-200 pb-4">
              <div className="w-32 font-semibold text-gray-800">Native</div>
              <div className="text-gray-900">{country.native}</div>
            </div>

            <div className="flex border-b border-gray-200 pb-4">
              <div className="w-32 font-semibold text-gray-800">Capital</div>
              <div className="text-gray-900">{country.capital}</div>
            </div>

            <div className="flex border-b border-gray-200 pb-4">
              <div className="w-32 font-semibold text-gray-800">Currency</div>
              <div className="text-gray-900">{country.currency}</div>
            </div>

            <div className="flex border-b border-gray-200 pb-4">
              <div className="w-32 font-semibold text-gray-800">Phone</div>
              <div className="text-gray-900">{country.phone}</div>
            </div>

            <div className="flex border-b border-gray-200 pb-4">
              <div className="w-32 font-semibold text-gray-800">Continent</div>
              <div className="text-gray-900">{country.continent.name}</div>
            </div>

            <div className="flex border-b border-gray-200 pb-4">
              <div className="w-32 font-semibold text-gray-800">AWS Region</div>
              <div className="text-gray-900">{country.awsRegion}</div>
            </div>

            <div className="flex pb-4">
              <div className="w-32 font-semibold text-gray-800">Languages</div>
              <div className="text-gray-900">
                {country.languages
                  .map((lang) => `${lang.name} (${lang.code})`)
                  .join(', ')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
