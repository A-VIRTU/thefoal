# **Specifikace vizuálního jazyka: Etheric Resin & Transformative Teal**

**Projekt:** The Foal | **Verze:** 2.0 (Organic/Chemical Shift)

**Status:** Ready for Implementation

## **1\. Filozofie a estetický záměr**

Předkládaná vizuální transformace opouští dosavadní paradigma "černého monolitu". Namísto digitální temnoty se novým výchozím bodem stává **laboratorní sterilita narušená organickým rozkladem**.

Scéna evokuje prostředí staré pitevny či konzervační laboratoře:

* **Pozadí (Resin/Bone):** Není čistě bílé, nýbrž nese tón kostní moučky či starého papíru. Představuje pasivní, čekající prostor.  
* **Inkoust (Transformative Teal):** Černá je nahrazena hlubokou, oxidovanou sivozelenou. Je to barva chemikálie, hluboké vody, toxického kovu.  
* **Signál (Amber):** Jantarová barva slouží jako akcent. Symbolizuje konzervaci života v pryskyřici, biologický signál, varování.

Cílem je vyvolat pocit chladné, vědecké elegance, jež v sobě skrývá cosi znepokojivého.

## **2\. Chromatická paleta a proměnné**

Základem implementace je redefinice kořenových proměnných v CSS. Systém stále využívá přísnou matematickou mřížku (Phi), avšak barevné spektrum se posouvá do oblasti HSL (Hue-Saturation-Lightness) pro snazší sémantické míchání.

### **Definice barev (CSS Variables)**

Následující blok kódu nahrazuje stávající variables.css. Implementátor nechť dbá na zachování matematických konstant.

:root {  
    /\* \--- MATHEMATICAL CONSTANTS (Neměnný základ) \--- \*/  
    \--phi: 1.61803398875;  
    \--phi-inv: 0.61803398875;  
    \--phi-inv-2: 0.38196601125;  
    \--phi-inv-3: 0.2360679775;

    /\* \--- CHROMATIC DEFINITION \--- \*/  
    /\* Hluboká sivozelená (The Chemical) \*/  
    \--hue-teal: 185;  
    /\* Teplá jantarová (The Organic) \*/  
    \--hue-resin: 40;  
      
    /\* \--- SEMANTIC LAYERS \--- \*/  
      
    /\* POZADÍ: Off-White s nádechem pryskyřice.   
       Působí jako papír nebo stěna galerie. \*/  
    \--c-bg: hsl(var(--hue-resin), 15%, 94%);  
      
    /\* INKOUST: Místo černé používáme oxidovanou hlubinu.   
       Pro text a hlavní prvky. \*/  
    \--c-ink: hsl(var(--hue-teal), 60%, 12%);  
      
    /\* DIM: Desaturovaná teal pro metadata a technické popisky.  
       Evokuje chladný kov chirurgických nástrojů. \*/  
    \--c-dim: hsl(var(--hue-teal), 20%, 55%);  
      
    /\* MŘÍŽKA: Jemná, téměř neviditelná struktura. \*/  
    \--c-line: hsl(var(--hue-teal), 15%, 85%);  
      
    /\* AKCENT: Živá teal pro aktivní prvky interfacu. \*/  
    \--c-accent: hsl(var(--hue-teal), 100%, 28%);  
      
    /\* SIGNÁL: Jantarová záře. Použito pro stavy "Active" a "Glitch". \*/  
    \--c-signal: hsl(var(--hue-resin), 80%, 50%);

    /\* \--- THE VOID (Kontrastní režim pro Video Gate) \--- \*/  
    /\* Video přehrávač musí zůstat temný – je to díra v realitě. \*/  
    \--c-void-bg: hsl(var(--hue-teal), 70%, 8%);   
    \--c-void-text: hsl(var(--hue-resin), 20%, 90%);

    /\* \--- ANIMATION & SPACING \--- \*/  
    \--time-base: 0.618s;  
    \--time-slow: 1.618s;  
    /\* ... (ostatní spacing proměnné zůstávají zachovány) \*/  
}

## **3\. Komponenty a chování (Layout & UI)**

Přechod na světlé pozadí vyžaduje důmyslné zacházení s kontrastem, zejména u prvku Video Gate.

### **A. The Video Gate (Brána)**

Tento prvek nesmí splynout s pozadím. Musí působit jako **monolit**, těžký objekt vznášející se v lehkém prostoru.

* **Klidový stav:** Temný obdélník (--c-void-bg) s ostrou konturou v barvě \--c-accent. Působí jako vypnutá obrazovka nebo černá díra.  
* **Aktivní stav:** Kontura se rozzáří jantarovou barvou (--c-signal), vrhá jemný jantarový stín (simulace bioluminiscence).  
* **Implementace:** Viz aktualizovaný layout.css.

### **B. Typografie a Metadata**

Texty opouštějí čistou černou.

* **Nadpisy (Serif):** Používají \--c-accent (Vivid Teal). Působí jako starý inkoust.  
* **Metadata (Mono):** Používají \--c-dim. Působí jako technický výpis stroje.  
* **Status Indicators:** Text "ACTIVE PHASE" svítí jantarově.

### **C. Logo Partnera**

Jelikož je pozadí světlé, původní bílá loga by zanikla.

* **Řešení:** Aplikace CSS filtru filter: sepia(100%) hue-rotate(140deg) saturate(0.5);. Tímto získá logo partnera (Karpuchina Gallery) patinu, jež ladí s inkoustem stránky, aniž bychom museli měnit zdrojový soubor.

## **4\. Implementační kód (Layout)**

Níže uvedený CSS kód definuje prostorové vztahy a aplikaci barev. Nahrazuje obsah layout.css.

/\* LAYOUT: Organická laboratoř \*/

.layout-wrapper {  
    width: 100%;  
    min-height: 100vh;  
    padding: var(--layout-padding-y) var(--layout-padding-x);  
    box-sizing: border-box;  
      
    /\* Aplikace organického pozadí \*/  
    background-color: var(--c-bg);  
    color: var(--c-ink);  
    transition: background-color var(--time-slow) ease;  
}

/\* VIDEO GATE: Temný monolit ve světlém prostoru \*/  
.video-gate-container {  
    margin-top: var(--u4);  
      
    /\* Inverzní barvy vytvářejí "díru" v layoutu \*/  
    background-color: var(--c-void-bg);  
    border: 1px solid var(--c-accent);   
      
    max-width: 600px;  
    position: relative;  
    overflow: hidden;  
      
    /\* Teal stín pro hloubku \*/  
    box-shadow: 0 20px 40px \-10px rgba(15, 42, 47, 0.15);  
    transition: all var(--time-base) ease;  
}

/\* Aktivní stav Brány \- Chemická reakce \*/  
.video-gate-container.is-active {  
    border-color: var(--c-signal); /\* Jantarová kontura \*/  
    box-shadow: 0 0 30px rgba(220, 190, 136, 0.2); /\* Jantarová záře \*/  
}

.gate-video-element {  
    opacity: var(--op-base);  
    transition: opacity var(--time-base) ease;  
    width: 100%;  
    display: block;  
    /\* Filtr v neaktivním stavu sjednocuje video s estetikou \*/  
    filter: grayscale(20%) sepia(10%) hue-rotate(130deg);  
}

.video-gate-container.is-active .gate-video-element {  
    opacity: 1;  
    filter: none; /\* Plná barevnost při přehrávání \*/  
}

/\* Textový overlay v Bráně \*/  
.video-gate-container.is-active .play-text {  
    color: var(--c-signal);  
    border-color: var(--c-signal);  
    text-shadow: 0 0 10px rgba(220, 190, 136, 0.4);  
}

.video-gate-container:not(.is-active) .play-text {  
    color: var(--c-void-text); /\* Světlá kost na tmavém pozadí \*/  
    border-color: var(--c-dim);  
}

/\* Patička a Logo \*/  
.partner-logo {  
    display: block;  
    width: var(--u5);  
    height: auto;  
    margin-bottom: var(--u9);  
    /\* Tonování loga do barevnosti stránky \*/  
    filter: sepia(100%) hue-rotate(140deg) saturate(0.5);   
}

## **5\. Závěrečné pokyny pro implementaci**

1. **Aktualizace souborů:** Nahraďte obsah souborů variables.css a layout.css kódem uvedeným výše.  
2. **Kontrola kontrastu:** Ověřte čitelnost textu \--c-dim na pozadí \--c-bg. Pokud by na některých monitorech splýval, zvyšte hodnotu Lightness u pozadí o 2 %.  
3. **Video Assets:** Vzhledem k "resinové" estetice doporučuji, aby náhledové snímky videí (poster images) měly jemně desaturovaný nádech, což zajistí plynulý přechod při načtení přehrávače.

*Viktor Lošťák, A VIRTÙ Research & Technologies*