const fs = require('fs');

type LanguageCodes = {
    [countryCode: string]: string[],
}

const getLanguageCodes = () => {
    const res = fs.readFileSync('backend/db/language-codes.json').toString();
    return JSON.parse(res);
}

const languageCodes: LanguageCodes = getLanguageCodes();

const allLanguages = new Set(Object.values(languageCodes).flat());
     
console.log(allLanguages);
