# StockFlow ERP - Guida al Primo Utilizzo

## Indice
1. [Primo Accesso e Setup](#1-primo-accesso-e-setup)
2. [Configurazione Negozio](#2-configurazione-negozio)
3. [Aggiungere Prodotti](#3-aggiungere-prodotti)
4. [Fare una Vendita (POS)](#4-fare-una-vendita-pos)
5. [Fare un Reso](#5-fare-un-reso)
6. [Gestione Inventario](#6-gestione-inventario)
7. [Clienti e Fidelity](#7-clienti-e-fidelity)
8. [Sconti e Promozioni](#8-sconti-e-promozioni)
9. [Domande Frequenti](#9-domande-frequenti)

---

## 1. Primo Accesso e Setup

### Registrazione
1. Vai alla pagina di login di StockFlow
2. Clicca **"Registrati"**
3. Inserisci: nome, cognome, email, password
4. Dopo la registrazione verrai reindirizzato alla pagina di **Setup iniziale**

### Setup Iniziale (prima volta)
La prima cosa da fare è creare il tuo negozio:

1. **Codice negozio** - Un codice breve (es. `GF1` per Grotte, `GF2` per Racalmuto). Massimo 10 caratteri.
2. **Nome negozio** - Il nome completo (es. "Grandi Firme - Grotte")
3. **Città** - (opzionale)
4. **Indirizzo** - (opzionale)
5. **Telefono** - (opzionale)

Sotto al form del negozio c'è una sezione opzionale **"Dati iniziali"** dove puoi inserire:
- **Brand** - I marchi che vendi (es. Nike, Adidas, Levi's...)
- **Categorie** - Le tipologie di prodotto (es. T-shirt, Pantaloni, Scarpe, Giacche...)

> Questi si possono aggiungere anche dopo dalle impostazioni.

Clicca **"Crea Negozio"** e verrai portato alla Dashboard.

---

## 2. Configurazione Negozio

### Impostazioni (menu laterale -> Impostazioni)

Qui puoi configurare:

- **Nome azienda** e **Logo** (URL dell'immagine)
- **Dominio personalizzato** (per il sito vetrina)
- **Politica sconti**:
  - Sconto massimo applicabile in vendita (default: 50%)
  - Permettere doppio sconto (sconto manuale + prodotto già in saldo)
- **Gestione negozi**: aggiungere, modificare o disattivare punti vendita

---

## 3. Aggiungere Prodotti

### Singolo Prodotto (Prodotti -> Nuovo Prodotto)

1. Dal menu laterale clicca **"Prodotti"**
2. Clicca il pulsante **"Nuovo Prodotto"**
3. Compila i campi:
   - **SKU** - Codice univoco del prodotto (es. `NK-AIRMAX-90`)
   - **Nome** - Nome del prodotto
   - **Descrizione** - (opzionale)
   - **Brand** - Seleziona dalla lista
   - **Categoria** - Seleziona dalla lista
   - **Genere** - Unisex / Maschile / Femminile
   - **Stagione** - Tutte / Primavera-Estate / Autunno-Inverno
   - **Prezzo di costo** - Quanto lo paghi tu (visibile solo admin)
   - **Prezzo di vendita** - Quanto lo vendi

4. **Varianti** (IMPORTANTE):
   Ogni prodotto ha delle varianti = combinazione taglia + colore.
   Per ogni variante puoi assegnare un **codice a barre** (barcode).

   Esempio:
   | Taglia | Colore | Barcode |
   |--------|--------|---------|
   | S | Nero | 8001234567890 |
   | M | Nero | 8001234567891 |
   | L | Nero | 8001234567892 |
   | S | Bianco | 8001234567893 |

5. Clicca **"Salva"**

### Import Massivo (Prodotti -> Import)
Se hai molti prodotti, puoi importarli da un file CSV. Dalla pagina di import trovi le istruzioni sul formato del file.

---

## 4. Fare una Vendita (POS)

Questa è la parte più importante. Dal menu laterale clicca **"Vendite"** poi **"Nuova Vendita"**.

### La schermata è divisa in due parti:

#### PARTE SINISTRA - Carrello

**Aggiungere prodotti:**
- In alto c'è il campo **"Scansiona barcode"**
- Puoi:
  - Usare un **lettore barcode** (scansiona e il prodotto si aggiunge automaticamente)
  - Digitare il barcode a mano e premere **Invio**
- Se scansioni lo stesso barcode due volte, la **quantità si incrementa** automaticamente

**Per ogni prodotto nel carrello vedi:**

| Prodotto | Prezzo | Sconto % | Qtà | Totale | Azione |
|----------|--------|----------|-----|--------|--------|
| Nike Air Max (42) | €89,00 | `[0]` | `[1]` | €89,00 | [Elimina] |

- **Sconto %** - Campo editabile! Puoi inserire una percentuale di sconto per quel singolo articolo (es. 10, 20, 30...)
- **Quantità** - Campo editabile! Puoi modificare la quantità manualmente
- **Elimina** - Rimuove l'articolo dal carrello

> **NOTA SUGLI SCONTI:** Lo sconto massimo applicabile dipende dalla politica sconti configurata nelle Impostazioni (default 50%). Se il prodotto è già in saldo e la politica non permette il "doppio sconto", non potrai aggiungere ulteriore sconto manuale.

#### PARTE DESTRA - Dettagli Pagamento

1. **Cliente** (opzionale):
   - Cerca per nome nel campo di ricerca
   - Se selezionato, vedi il codice fidelity e i punti attivi
   - Puoi usare i punti fidelity come sconto

2. **Gift Card** (opzionale):
   - Inserisci il codice della gift card
   - Il sistema verifica il saldo disponibile
   - Puoi usare tutto o parte del saldo

3. **Metodo di pagamento**:
   - Contanti
   - Carta
   - Misto (contanti + carta)
   - Gift Card

4. **Note** (opzionale): Appunti sulla vendita

5. **Riepilogo**:
   - Subtotale (somma di tutti gli articoli con sconti applicati)
   - Gift Card (importo scalato)
   - **Totale** (in grassetto)

6. Clicca **"Registra Vendita"** per completare

### Dopo la vendita:
- Lo stock viene decrementato automaticamente
- Se c'era un cliente, i punti fidelity vengono calcolati e accreditati
- Se è stata usata una gift card, il saldo viene aggiornato
- La vendita appare nella lista Vendite con un codice tipo `VEN260228-5431`
- Puoi visualizzare e stampare lo scontrino

---

## 5. Fare un Reso

Il reso si fa **a partire da una vendita esistente**.

### Come fare un reso:

1. Vai in **"Vendite"** dal menu laterale
2. Trova la vendita originale nella lista
3. Apri il dettaglio della vendita
4. Clicca il pulsante **"Reso"** (o vai su Resi -> Nuovo Reso)
5. Il sistema carica tutti gli articoli della vendita originale

### Nella schermata del reso:

Per ogni articolo venduto vedi:
| Prodotto | Prezzo originale | Qtà venduta | Qtà da rendere |
|----------|-----------------|-------------|----------------|
| Nike Air Max (42) | €89,00 | 2 | `[0]` |
| Adidas Stan Smith (40) | €69,00 | 1 | `[0]` |

- Modifica la **quantità da rendere** per ogni articolo (non può superare la quantità venduta)
- Seleziona il **motivo del reso**:
  - Difettoso
  - Taglia errata
  - Non piace
  - Altro
- Aggiungi **note** (opzionale)

Clicca **"Registra Reso"**.

### Cosa succede automaticamente:
- Lo stock viene **ripristinato** (gli articoli resi tornano in magazzino)
- Se il cliente aveva guadagnato punti fidelity, vengono **stornati** proporzionalmente
- Il reso viene registrato con codice tipo `RES260228-1234`
- Il reso è collegato alla vendita originale

---

## 6. Gestione Inventario

### Carico Merce (Movimenti -> Movimento Rapido)
Per caricare nuova merce in magazzino:
1. Vai su **"Movimenti"** -> **"Movimento Rapido"**
2. Scansiona il barcode o cerca il prodotto
3. Inserisci la quantità
4. Seleziona il tipo di movimento: **CARICO**
5. Conferma

### Inventario (menu -> Inventario)
Visualizza lo stock di ogni prodotto nel negozio corrente:
- Filtra per nome/SKU o mostra solo "sotto scorta"
- Vedi: prodotto, taglia, barcode, quantità, valore

### Trasferimenti (menu -> Trasferimenti)
Per spostare merce tra negozi:
1. Crea un nuovo trasferimento
2. Seleziona negozio di origine e destinazione
3. Aggiungi gli articoli con le quantità
4. Il negozio destinatario conferma la ricezione

---

## 7. Clienti e Fidelity

### Aggiungere un Cliente (Clienti -> Nuovo Cliente)
- Nome, Cognome
- Telefono, Email
- Codice fidelity (generato automaticamente)

### Programma Fidelity (menu -> Fidelity)
Configura quanti punti vengono assegnati per ogni euro speso.
I clienti accumulano punti con ogni acquisto e possono usarli come sconto.

---

## 8. Sconti e Promozioni

### Sconto durante la vendita (manuale)
- Nella schermata POS, per ogni articolo nel carrello c'è il campo **"Sconto %"**
- Inserisci la percentuale desiderata (es. 20 per il 20%)
- Il totale si aggiorna in tempo reale

### Sconti massivi su catalogo (Saldi/Sconti)
Dal menu **"Saldi/Sconti"** puoi:
1. Selezionare prodotti per brand, categoria o singolarmente
2. Inserire la **percentuale di sconto** (es. 30%)
3. Impostare date di inizio e fine saldo
4. Applicare lo sconto a tutti i prodotti selezionati in un colpo

I prodotti in saldo mostrano:
- Il prezzo originale barrato
- Il prezzo scontato in evidenza
- Il badge "In Saldo" con la percentuale

---

## 9. Domande Frequenti

### "Non trovo dove cambiare lo sconto in vendita"
Lo sconto è **per ogni singolo articolo** nel carrello. Accanto alla colonna della quantità c'è il campo "Sconto %" editabile. Se non riesci a modificarlo, controlla:
- Che la politica sconti permetta sconti (Impostazioni -> Politica Sconti)
- Che il prodotto non sia già in saldo con "doppio sconto" disabilitato

### "Non trovo dove fare il reso"
Il reso parte sempre da una **vendita esistente**:
1. Vendite -> trova la vendita -> apri dettaglio -> pulsante Reso
2. Oppure: Resi -> Nuovo Reso -> inserisci il codice vendita

### "Non riesco a cambiare la quantità"
La quantità si modifica direttamente nel carrello. Accanto a ogni prodotto c'è il campo numerico della quantità. Puoi:
- Modificarlo manualmente digitando il numero
- Scansionare lo stesso barcode più volte (si incrementa da solo)

### "Come faccio a caricare la merce iniziale?"
1. Crea i prodotti (Prodotti -> Nuovo Prodotto)
2. Vai su Movimenti -> Movimento Rapido
3. Scansiona ogni barcode e inserisci la quantità come CARICO

### "Posso lavorare senza internet?"
Sì! StockFlow supporta la modalità offline. Le vendite vengono salvate localmente e sincronizzate quando torni online.

---

## Schema Rapido - Flusso Giornaliero

```
APERTURA
  └── Login -> Dashboard (vedi situazione generale)

DURANTE IL GIORNO
  └── Nuova Vendita (POS)
      ├── Scansiona barcode
      ├── [Modifica quantità / sconto se serve]
      ├── [Seleziona cliente se ha fidelity]
      ├── Scegli metodo pagamento
      └── Registra Vendita

  └── Reso (se necessario)
      ├── Trova vendita originale
      ├── Seleziona articoli da rendere
      ├── Scegli motivo
      └── Registra Reso

  └── Carico Merce (quando arriva nuova merce)
      ├── Movimento Rapido
      ├── Scansiona barcode
      └── Inserisci quantità

CHIUSURA
  └── Report -> vedi vendite del giorno
```
