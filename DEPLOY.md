# DEPLOY — Landing Page Cena dei Vent'anni

## Scopo

Documentare la procedura per aggiornare la landing page pubblicata, sia lato codice (push su GitHub) sia lato pubblicazione (deploy su Netlify).

Il repository GitHub: https://github.com/enricomanini/ape20anni
La cartella locale del progetto: `/Volumes/T7-EE-Design/Progetti-Cowork/ape-odv/Output/landing-page`

---

## Come funziona

Il flusso a regime è:

1. Modifichi i file della landing page in locale (su disco esterno T7).
2. Fai commit e push delle modifiche sul repo GitHub `ape20anni`.
3. Netlify rileva il push e pubblica automaticamente la nuova versione online.

Non serve più il drag & drop manuale su Netlify: basta il push su GitHub.

---

## Ciclo di aggiornamento quotidiano

Ogni volta che modifichi uno o più file del sito, apri il Terminale e lancia:

```bash
cd /Volumes/T7-EE-Design/Progetti-Cowork/ape-odv/Output/landing-page

git add .
git commit -m "descrizione breve della modifica"
git push
```

Dopo il `push`, Netlify parte in automatico. Il deploy di un sito statico dura in genere meno di un minuto. Puoi seguire l'avanzamento nella tab **Deploys** della dashboard Netlify.

### Esempi di messaggi di commit utili

- `aggiornato countdown alla nuova data`
- `sostituita immagine hero con versione MOON`
- `corretto link sponsor Rossi`
- `fix tipografico sezione programma`

Messaggi chiari servono a te stesso tra sei mesi, quando dovrai capire cosa hai cambiato e quando.

---

## Setup iniziale (già completato — per riferimento)

Questa sezione è per memoria storica o per replicare il setup su un altro progetto.

### 1. File `.gitignore`

Nella root della cartella `landing-page` esiste un file `.gitignore` con questo contenuto:

```
.DS_Store
**/.DS_Store
index_bckp.html
```

Serve a evitare di caricare su GitHub i file di sistema macOS e i backup locali.

### 2. Inizializzazione repository

```bash
cd /Volumes/T7-EE-Design/Progetti-Cowork/ape-odv/Output/landing-page
git init -b main
git add .
git commit -m "Initial commit — landing page Cena dei Vent'anni"
```

### 3. Collegamento al repository remoto

```bash
git remote add origin https://github.com/enricomanini/ape20anni.git
git push -u origin main
```

Se il remote risulta già impostato con un URL errato, si sovrascrive con:

```bash
git remote set-url origin https://github.com/enricomanini/ape20anni.git
```

### 4. Collegamento Netlify ↔ GitHub

Nella dashboard Netlify, sul sito della landing page:

1. **Site configuration** → **Build & deploy** → **Continuous deployment** → **Link repository**
2. Scegli **GitHub** e autorizza l'accesso ai repository
3. Seleziona `enricomanini/ape20anni`
4. Branch da deployare: `main`
5. Build command: **lasciare vuoto** (è un sito statico)
6. Publish directory: **lasciare vuoto** o `.` (root del repo)
7. Deploy

Da quel momento ogni `git push` triggera un nuovo deploy automatico.

---

## Note

- **Disco esterno T7**: il repo vive sul disco esterno. Se il disco non è collegato, i comandi `git` non funzioneranno. Monta il T7 prima di iniziare.
- **Autenticazione GitHub**: la prima volta che si fa push, macOS apre una finestra del browser per il login. Se invece il Terminale chiede username/password, la "password" da inserire è un **Personal Access Token** generato da GitHub → Settings → Developer settings → Personal access tokens (classic) → scope `repo`.
- **Rollback**: se un deploy rompe qualcosa, si può tornare a una versione precedente direttamente dalla tab **Deploys** di Netlify, cliccando "Publish deploy" su una versione vecchia. Nessuna riga di comando necessaria.
- **File di backup**: `index_bckp.html` è escluso dal repo tramite `.gitignore`. Se vuoi salvare altri backup in locale senza farli arrivare su GitHub, usa il suffisso `_bckp` nel nome file o estendi il `.gitignore`.
- **Verifica stato repo**: `git status` mostra cosa è stato modificato rispetto all'ultimo commit; `git log --oneline -10` mostra gli ultimi 10 commit.

---

## Prossimi passi consigliati

- Configurare il collegamento Netlify ↔ GitHub se non è ancora stato fatto.
- Valutare se aggiungere un dominio personalizzato su Netlify (es. `cena20anni.ape-odv.it` o simile).
- Creare un file `README.md` nella root del repo con una descrizione del progetto per chiunque ci capiti sopra su GitHub.
