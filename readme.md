# Intesys CodyLab - Rookie - Front-end

Questo repository contiene il codice del corso CodyLab Rookie - Front-end.

---

## **!! Importante !!**

Al fine di poter utilizzare correttamente il progetto è necessario che vi sia un server di backend in esecuzione sulla porta 8080. Per maggiori informazioni fare riferimento al repository: [codylab-rookie-be](https://github.com/intesys/codylab-rookie-be).

---

## Install

    npm ci

## Develop

### Prerequisiti

Abbiamo bisogno di **nodejs** e **git** installati sulla propria macchina.

### Attivare il server di sviluppo

    npm start

### Effettuare la build dell'API Client

Prima di procedere, esportare TS_POST_PROCESS_FILE per abilitare prettier durante la compilazione dei file.

```shell
export TS_POST_PROCESS_FILE='./node_modules/.bin/prettier.cmd --write'
npm run build:api
```

Questa procedura ci permette di generare il client REST dalle api grazie alle specifiche OpenAPI contenute all'interno del file [api.yml](./api.yml).

### Questa applicazione è stata creata con:

- [React](https://reactjs.org/)
- [Parcel](https://parceljs.org/)
- [scss](https://sass-lang.com/)
- [Typescript](https://www.typescriptlang.org/)
- [MUI](https://mui.com/material-ui/)
- [MUI DatePicker](https://mui.com/x/react-date-pickers/)
- [Msw](https://mswjs.io/)
- [OpenAPI Generator](https://github.com/openapitools/openapi-generator)

### Building

Eseguire il seguente comando quando si vuole creare il bundle finale per il deploy:

    npm run build

## Referenze per lo sviluppo

Per il design applicativo fare riferimento ai file .png salvati nella cartella [/doc](./doc/).

---

## Sezioni disponibili da sviluppare

- Patient (Entity)
  - Lista dei pazienti e form di filtro
  - Dettaglio del paziente
  - Creazione di un nuovo paziente
  - Aggiornamento di un paziente
  - Rimozione di un paziente
- Records (Entity)

  - Creazione di un nuovo record legato ad un paziente
  - Cancellazione di un record
  - Lista dei record per paziente

- Doctor (Entity)
  - Lista dei dottori e form di filtro
  - Dettaglio del dottore
  - Creazione di un nuovo dottore
  - Aggiornamento di un dottore
  - Rimozione di un dottore
  - Lista dei pazienti assegnati al dottore

---

## TO DO LIST - CodyLab Rookie - Front-end

- [ ] Doctors Database
  - [x] Lista dei dottori
    - [x] Analizzare come suddividere a livello di componenti le varie sezioni o elementi delle pagine da sviluppare
    - [x] Creare un componente per la scheda di anteprima di un dottore
    - [x] Creare un componente che gestisca la lista dei dottori
    - [x] Creare un componente che gestisca il form di filtro
    - [x] Agganciare le API per far ritornare la lista dei dottori presenti nel database
    - [x] Agganciare le API al filtro di ricerca dei dottori
  - [ ] Dettaglio del dottore
    - [x] Analizzare come suddividere a livello di componenti le varie sezioni o elementi delle pagine da sviluppare
    - [x] Creare un componente che gestisca la scheda di dettaglio di un dottore
    - [ ] Creare un componente che gestisca la lista dei pazienti assegnati al dottore
    - [x] Agganciare le API per far ritornare il dettaglio del dottore
    - [ ] Agganciare le API per far ritornare la lista dei pazienti assegnati al dottore
  - [x] Form gestione delle informazioni di un dottore
    - [x] Analizzare come suddividere a livello di componenti le varie sezioni o elementi delle pagine da sviluppare
    - [x] Creazione del componente che gestisce il form per la creazione/modifica di un dottore
    - [x] Creazione di una pagina che gestisca il form precedentemente creato per la creazione di un nuovo dottore agganciando le relative API di POST
    - [x] Creazione di una pagina che gestisca il form precedentemente creato per l'aggiornamento di un dottore agganciando le relative API di GET e PUT
- [ ] Patients Database
  - [ ] Lista dei pazienti
    - [x] Analizzare come suddividere a livello di componenti le varie sezioni o elementi delle pagine da sviluppare
    - [x] Creare un componente per la scheda di anteprima di un paziente
    - [x] Creare un componente che gestisca la lista dei pazienti
    - [ ] Creare un componente che gestisca il form di filtro
    - [x] Agganciare le API per far ritornare la lista dei pazienti presenti nel database
    - [ ] Agganciare le API al filtro di ricerca dei pazienti
  - [ ] Dettaglio del paziente
    - [x] Analizzare come suddividere a livello di componenti le varie sezioni o elementi delle pagine da sviluppare
    - [x] Creare un componente che gestisca la scheda di dettaglio di un paziente
    - [ ] Creare un componente che gestisca la lista dei record assegnati al paziente
    - [x] Agganciare le API per far ritornare il dettaglio del paziente
    - [ ] Agganciare le API per far ritornare la lista dei record assegnati al paziente
  - [ ] Form gestione delle informazioni di un paziente
    - [x] Analizzare come suddividere a livello di componenti le varie sezioni o elementi delle pagine da sviluppare
    - [x] Creazione del componente che gestisce il form per la creazione/modifica di un paziente
    - [x] Creazione di una pagina che gestisca il form precedentemente creato per la creazione di un nuovo paziente agganciando le relative API di POST
    - [] Creazione di una pagina che gestisca il form precedentemente creato per l'aggiornamento di un paziente agganciando le relative API di GET e PUT
  - [ ] Form gestione delle informazioni di un record di un paziente
    - [ ] Analizzare come suddividere a livello di componenti le varie sezioni o elementi delle pagine da sviluppare
    - [ ] Creazione del componente che gestisce il form per la creazione di un record paziente
    - [ ] Creazione di una pagina che gestisca il form precedentemente creato per la creazione di un nuovo record paziente agganciando le relative API di POST
    - [] Creazione di una pagina che gestisca il form precedentemente creato per l'aggiornamento di un record paziente agganciando le relative API di GET e PUT

## License

This project is licensed under the MIT License
