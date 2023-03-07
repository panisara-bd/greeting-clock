const fs = require('fs');

const { Translate } = require('@google-cloud/translate').v2;

type LanguageCodes = {
  [countryCode: string]: string[];
};

const getLanguageCodes = () => {
  const res = fs.readFileSync('data/language-codes.json').toString();
  return JSON.parse(res);
};

const languageCodes: LanguageCodes = getLanguageCodes();

const allLanguages = new Set(Object.values(languageCodes).flat());

const translate = new Translate();

const main = async () => { 
  const translatePromises = await Promise.all(
    Array.from(allLanguages).map(async languageCode => {
      const [translatedPhrases]: string[][] = await translate.translate(
        ['Good morning!', 'Good afternoon!', 'Good evening!'],
        languageCode
      );
      return { translatedPhrases, languageCode };
    })
  );
  const output = translatePromises.reduce(
    (acc, curr) => ({
      ...acc,
      [curr.languageCode]: curr.translatedPhrases,
    }),
    {}
  );
  console.log(JSON.stringify(output, null, 2));
};

main();