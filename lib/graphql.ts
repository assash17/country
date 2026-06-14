import { GraphQLClient, gql } from 'graphql-request';

const ENDPOINT = 'https://countries.trevorblades.com/graphql';

const client = new GraphQLClient(ENDPOINT);

export interface Country {
  code: string;
  name: string;
  native: string;
  capital: string;
  emoji: string;
  currency: string;
  phone: string;
  continent: {
    name: string;
  };
  languages: {
    code: string;
    name: string;
  }[];
  awsRegion: string;
}

export interface CountriesResponse {
  countries: Country[];
}

export interface CountryResponse {
  country: Country;
}

const COUNTRIES_QUERY = gql`
  query GetCountries {
    countries {
      code
      name
      native
      capital
      emoji
      currency
      phone
      continent {
        name
      }
      languages {
        name
      }
    }
  }
`;

const COUNTRY_QUERY = gql`
  query GetCountry($code: ID!) {
    country(code: $code) {
      code
      name
      native
      capital
      emoji
      currency
      phone
      continent {
        name
      }
      languages {
        code
        name
      }
      awsRegion
    }
  }
`;

export async function getAllCountries(): Promise<Country[]> {
  try {
    const data = await client.request<CountriesResponse>(COUNTRIES_QUERY);
    return data.countries;
  } catch (error) {
    console.error('Failed to fetch countries:', error);
    return [];
  }
}

export async function getCountryByCode(code: string): Promise<Country | null> {
  try {
    const data = await client.request<CountryResponse>(COUNTRY_QUERY, { code });
    return data.country;
  } catch (error) {
    console.error('Failed to fetch country:', error);
    return null;
  }
}

export function filterCountriesByName(
  countries: Country[],
  searchTerm: string
): Country[] {
  if (!searchTerm.trim()) {
    return countries;
  }

  const regex = new RegExp(searchTerm, 'i');
  return countries.filter((country) => regex.test(country.name));
}