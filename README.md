# Finance Dashboard

## Projectbeskrivning

**Finance Dashboard är en webbaserad applikation som samlar och presenterar finansiell information på ett överskådligt sätt. Applikationen använder flera externa API:er för att hämta relevant data om aktiemarknaden och ekonomi.**

- Finans nyheter: NewsAPI använder vi för att för att visa de senasten nyheterna inom finans och ekonomi.

- Aktiedata: Här använder vi api:et FMP (Financial Market APIs), som hämtar data från de senaste 25 åren och presenterar datan fint i olika grafer så att man kan få en visuell översikt av olika företags aktier.

- Sökfunktion: Man kan även söka på olika NASDAQ-företag. Här finns det en autocomplete-funktion som gör det lättare att hitta företageet man vill söka upp. Informationen man får har är namnet på företaget såklart samt vilken sector företaget befinner sig i, till exempel: Sector: Technology. Man får också info om företagets börsvärde, vad en aktie är värd och en kort beskrivning om företaget.

När man har sökt upp ett företag och fått informationen så finns det också en knapp som visar upp en modal med en graf med företagets aktier över tid.

## Teknikval

-**För att skapa vår applikation så har vi använt oss av följande teknikval:**

-Vite: För snabb utveckling och byggprocess.

-React: För att skapa ett interaktivt användargränssnitt med hjälp av komponenter.

-React router: För navigering mellan olika vyer.

-Redux Toolkit: För global state-hantering.

-Tailwind CSS: För enkel styling och att snabbt kunna skapa responsiva och stiliga användargränssnitt.

-Recharts: För att visualisera data i grafer.

## Installation

**Följ dessa steg för att installera och köra applikationen lokalt:**

1. Klona detta repot i VsCode:
   git clone https://github.com/Samii02/financeDashboard-individuellt.

2. Navigera till projektmappen i din terminal.

3. Installera alla nödvändiga paket och bibliotek:
   Skriv (i terminalen): npm install

4. Starta utvecklingsservern och öppna applikationen i din webbläsare:
   Skriv (i terminalen): npm run dev

5. Följ sedan länken som visas i terminalen för att öppna projektet lokalt.
