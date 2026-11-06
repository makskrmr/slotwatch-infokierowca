// Rekordy PRZYKŁADOWE (verified:false) – bez adresów i kontaktów. Dopisuj kolejne po weryfikacji.
const raw: [string, string][] = [["Warszawa","mazowieckie"],["Radom","mazowieckie"],["Kraków","małopolskie"],["Tarnów","małopolskie"],["Gdańsk","pomorskie"],["Słupsk","pomorskie"],["Wrocław","dolnośląskie"],["Poznań","wielkopolskie"],["Łódź","łódzkie"],["Katowice","śląskie"],["Lublin","lubelskie"],["Szczecin","zachodniopomorskie"],["Białystok","podlaskie"],["Rzeszów","podkarpackie"]];
export const WORD_CENTERS = raw.map(([city, voivodeship]) => ({ id: `sample-${city}`, name: `WORD ${city} (przykład)`, city, voivodeship, verified: false }));
export type WordCenter = (typeof WORD_CENTERS)[number];
