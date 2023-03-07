const fs = require('fs');

type CountriesData = {
  [key: string]: {
    name: string;
    native: string;
    phone: number[];
    continent?: string;
    continents?: string[];
    capital: string;
    currency: string[];
    languages: string[];
  };
};

const getCountriesData = () => {
  const res = fs.readFileSync('data/countries-data.json').toString();
  return JSON.parse(res);
}

const countriesData: CountriesData = getCountriesData();

const languageCode = Object.keys(countriesData)
  .map(countryCode => ({
    countryCode,
    languages: countriesData[countryCode].languages,
  }))
  .reduce(
    (acc, curr) => ({
      ...acc,
      [curr.countryCode]: curr.languages,
    }),
    {}
  );

console.log(JSON.stringify(languageCode, null, 2));

//run command: npx ts-node backend/scripts/language-codes.ts > backend/db/language-codes.json