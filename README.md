# wa-multi-baron

Leichte Bibliothek zur Verwaltung mehrerer WhatsApp-Sessions – mit **einer** universellen `sendMessage`-Funktion für **alle** Nachrichtentypen.


## 🔌 Import & Setup

Verwende den klassischen Import-Stil:

```js
// CommonJS
const wa = require('wa-multi-baron');

// ES Module
import * as wa from 'wa-multi-baron';
```

Danach stehen dir alle Funktionen unter dem Namespace `wa` zur Verfügung.

## 🚀 Session Management

```js
// Neue Session erzeugen und QR-Code scannen
const session = await wa.startSession('meineSession');

// Alternativ: per Pairing-Code starten
const paired = await wa.startSessionWithPairingCode('meineSession', { phoneNumber: '491234567890' });

// Alle aktiven Sessions abrufen
const sessions = wa.getAllSession(); // z.B. ['meineSession']

// Metadaten einer Session abrufen
const data = wa.getSession('meineSession');

// Vorhandene Sessions aus Ordner automatisch laden
const loaded = await wa.loadSessionsFromStorage();
console.log('Geladene Sessions:', loaded);
```

## 💬 Nachrichten senden mit `sendMessage`

Eine **einzige** Funktion für **Text**, **Media**, **Polls**, **Reaktionen**, **Löschen/Pinning**, **Kontakte**, **Standort**, **Weiterleiten** u.v.m.

```js
await wa.sendMessage(
  'meineSession',             // sessionId
  '49123342524523@s.whatsapp.net',         // JID oder Telefonnummer
  content,                     // AnyMessageContent-Objekt
  options                      // MiscMessageGenerationOptions (optional)
);
```

### Beispiele für `content` & `options`

| Typ          | content-Beispiel                                                                                | optionale Flags        | Beschreibung                                  |
| ------------ | ----------------------------------------------------------------------------------------------- | ---------------------- | --------------------------------------------- |
| **Text**     | `{ text: 'Hallo Welt!' }`                                                                       | `{ quoted, mentions }` | Einfache Textnachricht                        |
| **Quote**    | `{ text: 'Antwort...' }`, `options: { quoted: msgObj }`                                         |                        | Text als Antwort (Quote)                      |
| **Mention**  | `{ text: '@491234567890 Hallo' }`, `options: { mentions: ['491234567890@s.whatsapp.net'] }`     |                        | Erwähnung in Text                             |
| **Bild**     | `{ image: { url:'./bild.png' }, caption:'Bild', viewOnce:true }`                                | `viewOnce`             | Bild senden; `viewOnce` für Einmaldarstellung |
| **Video**    | `{ video: { url:'./video.mp4' }, caption:'Video', gifPlayback:true }`                           | `gifPlayback`          | Video oder GIF (als MP4)                      |
| **Audio**    | `{ audio: { url:'./audio.ogg' }, mimetype:'audio/ogg', ptt:true }`                              | `ptt`                  | Audio/Sprachnachricht                         |
| **Dokument** | `{ document: { url:'./doc.pdf', filename:'D.pdf' } }`                                           |                        | Datei/Dokument                                |
| **Umfrage**  | `{ poll: { name:'Umfrage?', values:['A','B'], selectableCount:1, toAnnouncementGroup:false } }` |                        | Neue Umfrage                                  |
| **Reaktion** | `{ react: { text:'👍', key:msgObj.key } }`                                                      |                        | Nachricht mit Emoji reagieren                 |
| **Löschen**  | `{ delete: msgObj.key }`                                                                        |                        | Nachricht für alle löschen                    |
| **Pinning**  | `{ pin: { type:1, time:86400, key:msgObj.key } }`                                               |                        | Nachricht pinnen (1) oder entpinnen (0)       |
| **Kontakte** | `{ contacts:{ displayName:'Max', contacts:[{ vcard }] } }`                                      |                        | Kontaktkarte                                  |
| **Standort** | `{ location:{ degreesLatitude:52.52, degreesLongitude:13.405 } }`                               |                        | Standort                                      |
| **Weiterl.** | `{ forward: msgToForward }`                                                                     |                        | Nachricht weiterleiten                        |

> **Hinweis:** Weitere Flags und Optionen (`edit`, `mentions`, `quoted`, etc.) können über das `options`-Objekt übergeben werden.

## 🎧 Listener

```js
// Eingehende Nachrichten
wa.onMessageReceived(msg => console.log('Neue Message:', msg));

// QR-Code zum Scannen aktualisiert
wa.onQRUpdated(({ sessionId, qr }) => console.log(`Scan QR (${sessionId}):`, qr));

// Session erfolgreich verbunden
wa.onConnected(sessionId => console.log(`Session online: ${sessionId}`));
```

## ⚠️ Fehlerbehandlung

Alle Fehler werden als `WhatsappError` geworfen:

```js
try {
  await wa.sendMessage(...);
} catch (e) {
  if (e instanceof wa.WhatsappError) {
    console.error('WhatsApp-Fehler:', e.message);
  }
}
```
