import { getAllCountries } from '@/lib/graphql';
import CountryDetail from './CountryDetail';

export async function generateStaticParams() {
  const countries = await getAllCountries();
  return countries.map((country) => ({ code: country.code }));
}

export default async function CountryPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  return <CountryDetail code={code} />;
}
