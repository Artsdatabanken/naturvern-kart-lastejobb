# naturvern-kart-lastejobb

[![Open Source Love](https://badges.frapsoft.com/os/v2/open-source.svg?v=103)](https://github.com/ellerbrock/open-source-badges/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md#pull-requests)

Laster geometri for [Norske naturvernområder](https://github.com/Artsdatabanken/naturvern-kart).

## Komponenter og dataflyt

### Dataflyt

[![Dataflyt](https://github.com/Artsdatabanken/naturvern-lastejobb/raw/master/doc/dataflyt.png)](https://artsdatabanken.github.io/naturvern-lastejobb/)

### Tegnforklaring

| Symbol                                                                                                   | Forklaring               |
| -------------------------------------------------------------------------------------------------------- | ------------------------ |
| ![Dataflyt](https://github.com/Artsdatabanken/nin-arkitektur-dokumentasjon/raw/master/image/api_24.png)  | API (HTTP REST)          |
| ![Dataflyt](https://github.com/Artsdatabanken/nin-arkitektur-dokumentasjon/raw/master/image/data_24.png) | Åpne data                |
| ![Dataflyt](https://github.com/Artsdatabanken/nin-arkitektur-dokumentasjon/raw/master/image/kart_24.png) | Kart                     |
| ![Dataflyt](https://github.com/Artsdatabanken/nin-arkitektur-dokumentasjon/raw/master/image/last_24.png) | Lastejobb / Konvertering |
| ![Dataflyt](https://github.com/Artsdatabanken/nin-arkitektur-dokumentasjon/raw/master/image/lib_24.png)  | Bibliotek                |
| ![Dataflyt](https://github.com/Artsdatabanken/nin-arkitektur-dokumentasjon/raw/master/image/tool_24.png) | Verktøy                  |
| ![Dataflyt](https://github.com/Artsdatabanken/nin-arkitektur-dokumentasjon/raw/master/image/www_24.png)  | Web-side/applikasjon     |

## Utdatasett

Datasettet som er resultatet av lastejobben havner i repo [naturvern-kart](https://github.com/Artsdatabanken/naturvern-kart).

## Baserer seg på åpne data fra (takk til)

- [Miljødirektoratet: Naturvernområder](https://kartkatalog.geonorge.no/metadata/miljodirektoratet/naturvernomrader/5857ec0a-8d2c-4cd8-baa2-0dc54ae213b4)

### Leses av

- [nin-data-lastejobb](https://github.com/Artsdatabanken/nin-data-lastejobb)

### Bruk i sluttprodukter

- [Natur i Norge kart](https://github.com/Artsdatabanken/nin-kart-frontend)
- [Artsdatabanken åpne data](https://data.artsdatabanken.no/)

## Kataloger

- `stages/download`: Script for å laste ned eksterne datafiler til `temp/`
- `stages/transform`: Script som produserer resultatet og legger det i `build/`
- `build`: Filene som kommer ut av lastejobben
- `data`: Temporær lagring av nedlastede data og mellomformater

## Bruk

### Download

```bash
npm run download
```

Laster ned eksterne avhengigheter som lastejobben er avhengig av for å produsere sitt resultat i "transform". Denne kjører stegene som ligger i `stages/download`. Nedlastede data lagres som en konvensjon i katalog `data`.

### Transform

```bash
npm run transform
```

Bruker allerede nedlastede data til å produsere sitt resultat. Denne brukes gjerne mens man utvikler så man slipper å laste ned data hver gang, og kan også brukes uten at man har tilgang til nett sålenge man har gjort `download` først. Denne kjører stegene som ligger i `stages/transform`

Sluttproduktet av transform skrives som en konvensjon til katalogen `build`.

### Build

```bash
npm run build
```

Kjører hele lastejobben, først `download`, så `transform`.

### Deploy

Tar filene fra `build`-katalogen som er produsert i `build` eller `transform` og publiserer disse offentlig slik at andre lastejobber eller konsumenter kan nå dem uten å kjøre lastejobben.


### 08.03.23
Når byggejobben fullføres opprettes det en release av de tre filene som er nevnt i den historiske "staging.sh", disse hentes ned av et script på hydra, etter at boten har fått melding om at releasen er tilgjengelig. Denne meldingen sendes automatisk, når jobben er fullført. 

I tillegg clones repoet naturvern-kart, filene kopieres hit og disse sjekkes så inn i master og tagges med versjonsnummeret til releasen som er laget under byggejobben. Dette for å sørge for tydelig sporbarhet, om noe skulle skjære seg. 

TODO: Lage jobb og trigge denne, i natuvern-lastejobb, da denne må oppdateres når det er laget nye data her.
