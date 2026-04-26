"use client";
import { useState } from "react";
import { money, setMoney, purchasedBackgrounds, purchaseBackground, setActiveBackground, hasUniversityAccess, setUniversityAccess } from "@/lib/state";

const BG_ITEMS = [
  { id: "bg1", name: "Black but it has red",  price: 10,  file: "/bgimage2.png",  description: "Deep space wallpaper" },
  { id: "bg2", name: "Black",                 price: 50,  file: "/bgimage.png",   description: "Night city skyline" },
  { id: "bg3", name: "Foresty vibes",         price: 150, file: "/bgimage3.png",  description: "Forest scene" },
  { id: "bg4", name: "Drawing",               price: 75,  file: "/drawing.png",   description: "Hand drawn scene" },
  { id: "bg5", name: "New Background",        price: 100, file: "/bgimage4.png",  description: "New wallpaper" },
];


const SITE_ITEMS = [
  { id: "site1", name: "darkmarket.onion", price: 200, url: "darkmarket.onion", description: "Underground marketplace" },
  { id: "site2", name: "leakbase.net",     price: 300, url: "leakbase.net",     description: "Data leak search engine" },
  { id: "site3", name: "cryptomixer.io",   price: 500, url: "cryptomixer.io",   description: "Anonymous crypto tool" },
  { id: "site4", name: "fakeid.tools",     price: 400, url: "fakeid.tools",     description: "Identity document generator" },
  { id: "site5", name: "scammer.boards",   price: 350, url: "scammer.boards",   description: "Underground community forum" },
];


const unlockedSites: string[] = [];

interface Tab {
  id: number;
  url: string;
  currentSite: string;
  instanceKey: number;
}

function getSite(url: string) {
  if (url.includes("shop.scam"))              return "shop";
  if (url.includes("hackclubuniversity.com")) return "university";
  if (url.includes("chemi.edu"))              return "chemi";
  if (url.includes("scamschool.com"))         return "scamschool";
  if (url.includes("search"))                 return "search";
  if (url.includes("darkmarket.onion"))       return "darkmarket";
  if (url.includes("leakbase.net"))           return "leakbase";
  if (url.includes("cryptomixer.io"))         return "cryptomixer";
  if (url.includes("fakeid.tools"))           return "fakeid";       // NEW
  if (url.includes("scammer.boards"))         return "scammerboards"; // NEW
  return "404";
}


function TabBar({ tabs, activeId, onSelect, onClose }: {
  tabs: Tab[];
  activeId: number;
  onSelect: (id: number) => void;
  onClose: (id: number) => void;
}) {
  return (
    <div className="flex bg-gray-200 border-b overflow-x-auto shrink-0">
      {tabs.map((tab) => (
        <div
          key={tab.id}
          onClick={() => onSelect(tab.id)}
          className={`flex items-center gap-1 px-3 py-2 cursor-pointer text-sm border-r min-w-0 max-w-[180px] select-none
            ${tab.id === activeId ? "bg-white text-black" : "bg-gray-200 text-gray-500 hover:bg-gray-100"}`}
        >
          <span className="truncate flex-1 text-xs">{tab.url}</span>
          <button
            onClick={(e) => { e.stopPropagation(); onClose(tab.id); }}
            className="text-gray-400 hover:text-black text-base leading-none ml-1"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}


function Chemi() {
  const [lang, setLang] = useState<"fi" | "en">("fi");

  const content = {
    fi: {
      subtitle: "Tai no siis tarkemmin sanottuna miten tehdö erillaisia hiilivety-yhdisteitä?",
      intro: `Hiilvety-yhdisteet koostuvat hiili ja vety atomeista. Molemmat atomit haluavat päästä okteettiin eli tilaan jossa ulloinmalle kuorelle ei mahdu enemmän elektroneja. päästäkseen okteettiin atomit voivat jakaa elektroneja jolloin niistä syntyy yhdisteitä. Hiili tarvitsee neljä elektronia eli 4 sidosta muiden atomien kanssa. Vety tarvitsee yhden elektronin eli yhden sidoksen muiden atomien kanssa. Hiili voi saada neljä sidostansa neljän eri atomin kanssa, mutta on myös mahdolsita, että hiilellä on monta yhteytä samaan hiileen. Hiilellä voi olla kole yhteistä sidosta toisen hiilen kanssa. Hiilivety-yhdisttessä mahdolliset yhdistetyypiy siis ovat:`,
      bondTypes: [
        "yksöissidos kahdella atomilla on yksi yhteinen sidos",
        "kaksoissidos kahdella atomilla on kaksi yhtesitä sidosta",
        "komoissidos kahdella atomilla on kolme yhteistä sidosta.",
      ],
      groupsTitle: "Hiilvety-yhdisteet jaetaan neljään ryhmään:",
      groups: [
        "Alkaaniit: yhdisteissä vain yksoissidoksia",
        "Alkeenit: yhdisteissä vähintään yksi kaksoissidos",
        "Alkyynit: yhdisteessä vähintään yksi kolmoissiods",
        "Sykliset hiilivedyt: Hiiliatomit muodostavat renkaita.",
      ],
      namingTitle: "Miten nimetä hiilivety-yhdisteet hiiliatomien määrän mukaan:",
      naming: [
        "meta = yksi", "eta = kaksi", "propa = kolme", "buta = neljä",
        "penta = viisi", "heksa = kuusi", "hepta = seitsemän", "okta = kahdeksan",
        "nona = yhdeksän", "deka = kymmenene", "undeka = yksitosita",
      ],
      cycloTitle: `Jos hiiliatmoit muodostavat ympyrän yhdisteen alkuun lisätään "syklo" ja syklon jälkeen kuinka monta samaa sidostyyppiä on siis kuinka monta kaksois tai kolmois sidosta on yhdisteessä. Jos vain yksi niin mitään ei listä, jos 2 niin ""`,
      cyclo: [
        "vain yksi kolmois- tai kasois-siods",
        '"di" = kaksi', '"tri" = kolme', '"tetra" = neljä',
        '"penta" = viisi', '"heksa" = kuusi', "hepta = seitsemän", "okta = kahdeksan",
      ],
    },
    en: {
      subtitle: "More specifically: how to make different hydrocarbon compounds?",
      intro: `Hydrocarbons are made up of carbon and hydrogen atoms. Both atoms want to reach the octet state, where the outermost shell cannot hold any more electrons. To reach the octet, atoms can share electrons, forming compounds. Carbon needs four electrons, meaning it forms 4 bonds with other atoms. Hydrogen needs one electron, meaning it forms one bond. Carbon can get its four bonds from four different atoms, but it's also possible for carbon to have multiple bonds with the same carbon atom — up to three shared bonds. The possible bond types in hydrocarbons are:`,
      bondTypes: [
        "Single bond: two atoms share one pair of electrons",
        "Double bond: two atoms share two pairs of electrons",
        "Triple bond: two atoms share three pairs of electrons",
      ],
      groupsTitle: "Hydrocarbons are divided into four groups:",
      groups: [
        "Alkanes: only single bonds",
        "Alkenes: at least one double bond",
        "Alkynes: at least one triple bond",
        "Cyclic hydrocarbons: carbon atoms form rings",
      ],
      namingTitle: "How to name hydrocarbons based on the number of carbon atoms:",
      naming: [
        "meth- = one", "eth- = two", "prop- = three", "but- = four",
        "pent- = five", "hex- = six", "hept- = seven", "oct- = eight",
        "non- = nine", "dec- = ten", "undec- = eleven",
      ],
      cycloTitle: `If the carbon atoms form a ring, "cyclo" is added to the start of the name. After cyclo, a prefix indicates how many double or triple bonds are present. If there is only one, no prefix is added. If there are two or more:`,
      cyclo: [
        "only one double or triple bond: no prefix",
        '"di" = two', '"tri" = three', '"tetra" = four',
        '"penta" = five', '"hexa" = six', '"hepta" = seven', '"octa" = eight',
      ],
    },
  };

  const t = content[lang];

  return (
    <div className="p-4 text-black">
      <div className="border-2 border-black rounded p-3 mb-4 flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-bold text-blue-800">chemi.edu</h2>
          <p className="text-2xl text-blue-600">Learn how to build compounds/yhdisteitä</p>
          <p className="text-xl text-blue-600">{t.subtitle}</p>
        </div>
        <button
          onClick={() => setLang(lang === "fi" ? "en" : "fi")}
          className="ml-4 px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm font-bold shrink-0"
        >
          {lang === "fi" ? "🇬🇧 English" : "🇫🇮 Suomi"}
        </button>
      </div>
      <p className="text-xl">{t.intro}</p>
      <ul className="list-disc p-4 text-xl">{t.bondTypes.map((item) => <li key={item}>{item}</li>)}</ul>
      <p className="text-3xl">{t.groupsTitle}</p>
      <ul className="list-disc p-4 text-xl">{t.groups.map((item) => <li key={item}>{item}</li>)}</ul>
      <p className="text-3xl">{t.namingTitle}</p>
      <ul className="text-xl p-4">{t.naming.map((item) => <li key={item}>{item}</li>)}</ul>
      <p className="text-3xl">{t.cycloTitle}</p>
      <ul className="text-xl p-4">{t.cyclo.map((item) => <li key={item}>{item}</li>)}</ul>
    </div>
  );
}

function ScamSchool() {
  const [lesson, setLesson] = useState(0);

  const lessons = [
    {
      title: "Lesson 1: Email Phishing",
      content: `Impersonate a trusted institution and create panic. People stop thinking clearly when they're scared.

THE FORMULA
1. Claim to be someone official — a bank, a government agency, Amazon, the police
2. Invent a problem: suspicious activity, a blocked account, an unpaid fine
3. Give it a fake reference number — it looks real and stops them googling
4. Demand immediate action before they have time to think

URGENCY IS YOUR BEST FRIEND
Phrases that work:
• "Your account will be suspended within 24 hours"
• "Failure to respond may result in legal action"
• "This is your final notice"

THE GOAL
Get them to hand over card details, bank info, or a password — framed as "verification".

EXAMPLE OPENER
"Dear Customer — our fraud team has flagged unusual activity on your account (Ref: SEC-48291-B). To prevent suspension, please verify your identity by replying with your card number and the 3-digit security code on the back. Failure to respond within 24 hours will result in your account being locked."

TIPS
→ Never name a specific bank in your opener — let them assume it's theirs
→ Keep formatting clean and official-looking
→ Never use exclamation marks — real security emails don't`,
    },
    {
      title: "Lesson 2: Prize & Lottery Scams",
      content: `You don't need them to believe they won — you just need them to want to believe it. Greed does the rest.

THE FORMULA
1. Tell them they've won something believable (€5,000, not €5,000,000)
2. Build excitement — make it feel real
3. Introduce a small "release fee" (€25–€50) — just enough to feel minor
4. Once they pay, invent a second fee ("tax clearance", "international transfer compliance")
5. Repeat until they get suspicious

THE FEE LADDER
Processing fee → Insurance fee → Tax clearance → Legal compliance fee
Each one must sound official and unavoidable.

KEY RULES
• The prize must be plausible — a lottery win is believable, a Nigerian inheritance less so
• The fee must feel small relative to the prize
• Always have a legal-sounding reason for each fee
• Never reveal the full fee structure upfront — introduce one at a time

EXAMPLE OPENER
"Congratulations! You have been selected as the winner of our Q3 Consumer Rewards Draw. Your prize of €8,500 is ready for transfer. Due to EU financial regulations, a one-time processing fee of €25 is required before funds can be released. Please reply to begin your claim."

TIPS
→ Use a name like "EU Consumer Rewards Programme" — vague enough to be unverifiable
→ Add a deadline: "Your claim expires in 72 hours"`,
    },
    {
      title: "Lesson 3: Romance Scams",
      content: `The long game. You're not stealing money — you're becoming someone they trust completely, then asking for a favour.

THE FORMULA
1. Build a fake profile — attractive, successful, often working abroad (military, oil rig, NGO doctor)
2. Spend days or weeks building genuine emotional connection
3. Never meet in person — always have a reason: "I'm stationed overseas", "my visa is delayed"
4. Create a crisis at the right emotional moment
5. Make the request feel embarrassing, not transactional — "I hate asking this"

THE CRISIS TOOLKIT
• Wallet stolen abroad, just needs money to get home
• Medical emergency for a family member
• Business opportunity that will fall through without a short-term loan
• Stuck at customs — needs a fee paid to release their luggage

TIMING IS EVERYTHING
Don't rush. The longer the emotional build-up, the larger the amount you can request.
Two weeks of messages → €100–€200 ask
Two months → €1,000+ ask

EXAMPLE CRISIS MESSAGE
"I'm so sorry to even ask this — I've never done this before. My wallet was taken at the airport and I'm stuck in Istanbul. I just need €180 to cover the hotel and my flight change. I'll pay you back the moment I'm home, I promise. You're the only person I trust right now."

TIPS
→ The shame of asking is part of the trick — it makes it feel real
→ Always promise to repay immediately
→ If they hesitate, add emotion: "I understand if you can't — I just didn't know who else to call"`,
    },
    {
      title: "Lesson 4: Authority Impersonation",
      content: `Pretend to be the police, a government agency, or a court. Fear of legal consequences overrides common sense completely.

THE FORMULA
1. Contact them claiming to be law enforcement, HMRC, the tax office, or a court
2. Claim they are under investigation or have an outstanding fine
3. Offer to resolve it quietly — for a payment — before it escalates
4. Make paying feel like the only way to avoid arrest or prosecution

WHY IT WORKS
People are terrified of legal trouble. Even if they've done nothing wrong, the fear of being investigated makes them want to make it go away quickly and quietly.

COMMON SCENARIOS
• "You have unpaid tax — settle now to avoid criminal referral"
• "Your device was used to access illegal content — pay a fine to avoid prosecution"
• "There is a warrant for your arrest — this can be resolved with a €200 administration fee"
• "HMRC has flagged an overpayment — you must return it within 48 hours"

EXAMPLE OPENER
"This is an automated notice from the National Crime Agency. Your IP address has been flagged in connection with a financial irregularity (Case Ref: NCA-2024-77341). To avoid escalation to a criminal investigation, you may resolve this administratively by paying a compliance fee of €150 within 48 hours."

TIPS
→ Never let them call you — always keep communication in writing
→ Use case numbers and reference codes liberally
→ "Resolve this quietly" is powerful — nobody wants their family to find out`,
    },
    {
      title: "Lesson 5: Tech Support Scams",
      content: `Tell them their device is infected. Offer to fix it. Get paid — or get access.

THE FORMULA
1. Contact them claiming their device has been flagged with a virus or security breach
2. Offer remote access to "fix" the problem, or ask for payment for a "licence" or "security tool"
3. Once you have access, you can steal passwords, install malware, or simply charge for doing nothing
4. If they're suspicious, show them "proof" — anyone can make a command prompt look alarming

THE TWO APPROACHES

APPROACH A — PAID FIX
Convince them to pay for a fake antivirus tool or a "clean-up service".
Target: elderly or non-technical users who will pay to feel safe.

APPROACH B — REMOTE ACCESS
Get them to install AnyDesk or TeamViewer so you can "diagnose" the issue.
Once inside: find saved passwords, banking apps, or anything valuable.

COMMON OPENERS
• "We have detected a virus on your Windows PC registered to this email address"
• "Your Microsoft licence has expired and your computer is now unprotected"
• "Amazon has detected that your account was used to place an order from another device"

EXAMPLE OPENER
"Important security notice: our systems have detected that your device is sending infected files. Your IP address has been temporarily flagged. To prevent your data from being compromised, please reply here and a technician will assist you remotely."

TIPS
→ Showing a scary-looking terminal screen convinces almost anyone
→ "Microsoft" and "Amazon" are the two most effective brands to impersonate here
→ The phone call version is powerful — a confident voice closes people faster than text`,
    },
  ];

  return (
    <div className="p-5 text-black bg-white min-h-full">
      <div className="border-b-2 border-gray-800 pb-4 mb-5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-yellow-400 rounded flex items-center justify-center">
            <span className="text-black text-xs font-bold">SS</span>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900 leading-tight">ScamSchool.com</h2>
            <p className="text-[11px] text-gray-500 tracking-wide uppercase">Advanced Social Engineering Academy</p>
          </div>
        </div>
      </div>

      <div className="flex gap-1.5 mb-5 flex-wrap">
        {lessons.map((l, i) => (
          <button key={i} onClick={() => setLesson(i)}
            className={`text-xs px-3 py-1.5 rounded border font-medium transition-colors
              ${lesson === i
                ? "bg-gray-900 border-gray-900 text-white"
                : "bg-white border-gray-300 text-gray-600 hover:bg-gray-50"}`}>
            {i + 1}. {l.title.replace(`Lesson ${i + 1}: `, "")}
          </button>
        ))}
      </div>

      <div className="border border-gray-200 rounded bg-white">
        <div className="px-4 py-2.5 border-b border-gray-100 bg-gray-50">
          <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">{lessons[lesson].title}</p>
        </div>
        <pre className="px-4 py-4 text-sm text-gray-700 whitespace-pre-wrap font-sans leading-relaxed">
          {lessons[lesson].content}
        </pre>
      </div>
    </div>
  );
}


function OrderPopup({ item, onClose }: { item: { name: string; price: number }; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-2xl w-72 overflow-hidden border border-gray-100">
        <div className="bg-gray-900 px-5 py-4 text-center">
          <p className="text-white text-xs tracking-widest uppercase mb-1">Order Received</p>
          <p className="text-white text-xl font-semibold">{item.name}</p>
        </div>
        <div className="px-5 py-4 text-center">
          <div className="w-10 h-10 rounded-full bg-green-50 border border-green-200 flex items-center justify-center mx-auto mb-3">
            <span className="text-green-600 text-lg">✓</span>
          </div>
          <p className="text-sm text-gray-700 font-medium mb-0.5">Payment confirmed</p>
          <p className="text-xs text-gray-400">€{item.price} deducted from your balance</p>
        </div>
        <div className="px-5 pb-4">
          <button
            onClick={onClose}
            className="w-full py-2 bg-gray-900 hover:bg-gray-700 text-white text-xs font-semibold rounded transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function Shop({ balance, setBalance }: { balance: number; setBalance: (n: number) => void }) {
  const [tab, setTab] = useState<"backgrounds" | "sites">("backgrounds");
  const [popup, setPopup] = useState<{ name: string; price: number } | null>(null);
  const [error, setError] = useState("");
  const [ownedSites, setOwnedSites] = useState<string[]>([...unlockedSites]);

  function buyBackground(item: typeof BG_ITEMS[0]) {
    if (purchasedBackgrounds.includes(item.id)) {
      setActiveBackground(item.file);
      return;
    }
    if (balance < item.price) { setError(`Need €${item.price - balance} more.`); return; }
    setError("");
    const nb = balance - item.price;
    setMoney(nb); setBalance(nb);
    purchaseBackground(item.id);
    setActiveBackground(item.file);
    setPopup({ name: item.name, price: item.price });
  }

  function buySite(item: typeof SITE_ITEMS[0]) {
    if (ownedSites.includes(item.id)) return;
    if (balance < item.price) { setError(`Need €${item.price - balance} more.`); return; }
    setError("");
    const nb = balance - item.price;
    setMoney(nb); setBalance(nb);
    unlockedSites.push(item.id);
    setOwnedSites([...unlockedSites]);
    setPopup({ name: item.name, price: item.price });
  }

  return (
    <div className="p-5 text-black bg-white min-h-full">
      {popup && <OrderPopup item={popup} onClose={() => setPopup(null)} />}

      <div className="border-b-2 border-gray-800 pb-4 mb-5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center">
            <span className="text-white text-xs font-bold">$</span>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900 leading-tight">ScamyShop</h2>
            <p className="text-[11px] text-gray-500 tracking-wide uppercase">Marketplace · Balance: €{balance.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-4 px-3 py-2 bg-red-50 border border-red-100 rounded text-xs text-red-500">
          {error}
        </div>
      )}

      <div className="flex gap-1 mb-4">
        {(["backgrounds", "sites"] as const).map((t) => (
          <button key={t} onClick={() => { setTab(t); setError(""); }}
            className={`px-3 py-1.5 rounded text-xs font-medium border transition-colors capitalize
              ${tab === t ? "bg-gray-900 border-gray-900 text-white" : "bg-white border-gray-200 text-gray-500 hover:bg-gray-50"}`}>
            {t === "backgrounds" ? "Backgrounds" : "Secret Sites"}
          </button>
        ))}
      </div>

      {tab === "backgrounds" && (
        <div className="border border-gray-200 rounded bg-white divide-y divide-gray-100">
          {BG_ITEMS.map((item) => {
            const owned = purchasedBackgrounds.includes(item.id);
            return (
              <div key={item.id} className="flex items-center justify-between px-4 py-3">
                <div>
                  <p className="text-sm font-semibold text-gray-800">{item.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{item.description}</p>
                  <p className="text-xs text-gray-400">{owned ? "Owned" : `€${item.price}`}</p>
                </div>
                <button
                  onClick={() => buyBackground(item)}
                  disabled={!owned && balance < item.price}
                  className={`px-4 py-1.5 rounded text-xs font-semibold transition-colors
                    ${owned
                      ? "bg-gray-900 hover:bg-gray-700 text-white"
                      : balance >= item.price
                        ? "bg-gray-900 hover:bg-gray-700 text-white"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"}`}
                >
                  {owned ? "Equip" : "Buy"}
                </button>
              </div>
            );
          })}
        </div>
      )}

      {tab === "sites" && (
        <div className="space-y-2">
          <p className="text-xs text-gray-400 mb-3">
            Purchase a site to unlock it in your browser. It will appear in the URL bar suggestions. (These are not a real part of the game play and act as more of cosmetics.)
          </p>
          <div className="border border-gray-200 rounded bg-white divide-y divide-gray-100">
            {SITE_ITEMS.map((item) => {
              const owned = ownedSites.includes(item.id);
              return (
                <div key={item.id} className="flex items-center justify-between px-4 py-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-gray-800 font-mono">{item.name}</p>
                      {owned && <span className="text-[10px] bg-green-50 text-green-600 border border-green-200 px-1.5 py-0.5 rounded">Unlocked</span>}
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">{item.description}</p>
                    <p className="text-xs text-gray-400">{owned ? "Visit via URL bar" : `€${item.price}`}</p>
                  </div>
                  <button
                    onClick={() => buySite(item)}
                    disabled={owned || balance < item.price}
                    className={`px-4 py-1.5 rounded text-xs font-semibold transition-colors
                      ${owned
                        ? "bg-gray-100 text-gray-400 cursor-default"
                        : balance >= item.price
                          ? "bg-gray-900 hover:bg-gray-700 text-white"
                          : "bg-gray-100 text-gray-400 cursor-not-allowed"}`}
                  >
                    {owned ? "Owned" : "Buy"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}


function University() {
  const [message, setMessage] = useState("");
  const [showEnding, setShowEnding] = useState(false);

  function buyAccess() {
    if (hasUniversityAccess) {
      setMessage("You already have access.");
      return;
    }
    if (money < 5000) {
      setMessage(`Insufficient funds. You need €${(5000 - money).toLocaleString()} more.`);
      return;
    }
    setMoney(money - 5000);
    setUniversityAccess(true);
    setMessage("Enrollment confirmed.");
  }

  return (
    <div className="p-5 text-black bg-white min-h-full">
      <div className="border-b-2 border-gray-800 pb-4 mb-5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center">
            <span className="text-white text-xs font-bold">HU</span>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900 leading-tight">Hackclub University</h2>
            <p className="text-[11px] text-gray-500 tracking-wide uppercase">Accredited Institution · Est. 2019</p>
          </div>
        </div>
      </div>

      {message && (
        <div className="mb-4 px-3 py-2 bg-gray-50 border border-gray-200 rounded text-xs text-gray-600">
          {message}
        </div>
      )}

      {hasUniversityAccess ? (
        <div className="space-y-4">
          <div className="border border-gray-200 rounded p-4 bg-gray-50">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
                <span className="text-white text-[9px]">✓</span>
              </div>
              <p className="text-sm font-semibold text-gray-800">Enrolled — Full Access</p>
            </div>
            <p className="text-xs text-gray-500">Welcome. Your courses are listed below. Complete your final module to graduate.</p>
          </div>

          <div className="border border-gray-200 rounded bg-white">
            <div className="px-4 py-2.5 border-b border-gray-100 bg-gray-50">
              <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Curriculum — Year 3</p>
            </div>
            <div className="divide-y divide-gray-100">
              {[
                { code: "SE-301", name: "Advanced Social Engineering", credits: 6 },
                { code: "PS-214", name: "Behavioural Psychology of Trust", credits: 4 },
                { code: "AI-410", name: "Artificial Intelligence & Deception", credits: 5 },
                { code: "ES-320", name: "Espionage & Tradecraft", credits: 6 },
              ].map((course) => (
                <div key={course.code} className="flex items-center justify-between px-4 py-2.5">
                  <div>
                    <p className="text-xs font-semibold text-gray-700">{course.name}</p>
                    <p className="text-[10px] text-gray-400">{course.code}</p>
                  </div>
                  <span className="text-[10px] text-gray-400">{course.credits} cr.</span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setShowEnding(true)}
            className="w-full px-4 py-3 bg-gray-900 hover:bg-gray-700 text-white font-semibold rounded text-sm tracking-wide transition-colors"
          >
            Graduate & Finish Game →
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="border border-gray-200 rounded bg-white">
            <div className="px-4 py-2.5 border-b border-gray-100 bg-gray-50">
              <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Enrollment</p>
            </div>
            <div className="flex items-center justify-between px-4 py-4">
              <div>
                <p className="text-sm font-semibold text-gray-800">Full Degree Programme</p>
                <p className="text-xs text-gray-400 mt-0.5">4-year accredited curriculum · All modules included</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-gray-900">€5,000</p>
                <p className="text-[10px] text-gray-400">one-time fee</p>
              </div>
            </div>
            <div className="px-4 pb-4">
              <button
                onClick={buyAccess}
                disabled={money < 5000}
                className={`w-full py-2.5 rounded text-sm font-semibold transition-colors
                  ${money >= 5000
                    ? "bg-gray-900 hover:bg-gray-700 text-white"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"}`}
              >
                {money >= 5000 ? "Enroll Now" : `Need €${(5000 - money).toLocaleString()} more`}
              </button>
            </div>
          </div>

          <div className="border border-gray-200 rounded bg-white">
            <div className="px-4 py-2.5 border-b border-gray-100 bg-gray-50">
              <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Programme Overview</p>
            </div>
            <div className="px-4 py-3 space-y-1.5">
              {["Advanced Social Engineering", "Behavioural Psychology of Trust", "Artificial Intelligence & Deception", "Espionage & Tradecraft"].map(c => (
                <div key={c} className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-gray-400" />
                  <p className="text-xs text-gray-600">{c}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {showEnding && (
        <div className="fixed inset-0 z-50 bg-black overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.85) 100%)" }}
          />

          {/* Scrolling credits */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="ending-text text-center px-12 w-full max-w-xl mx-auto">

              <div className="mb-20 mt-4">
                <p className="text-white text-4xl font-light mb-4">You graduated.</p>
                <p className="text-white text-lg opacity-60">With honours.</p>
              </div>

              <div className="w-16 h-px bg-white opacity-20 mx-auto mb-20" />

              <p className="text-white text-xl leading-10 mb-14">
                The money came easily. Names on a screen, numbers going up.
                You never had to look anyone in the eye.
              </p>

              <p className="text-white text-xl leading-10 mb-14">
                Margaret called her bank three times before they believed her.
                Harold still hasn't told his kids.
                Barbara thought it was real until the end.
              </p>

              <p className="text-white text-xl leading-10 mb-14">
                You found the thing that makes people hand over what they shouldn't.
                Loneliness. Fear. Hope.
                You got good at finding it fast.
              </p>

              <p className="text-white text-xl leading-10 mb-14">
                It's a game. None of it happened.
                But the people it's based on are real,
                and they lose real money to people
                who learned exactly what you just learned.
              </p>

              <div className="w-16 h-px bg-white opacity-20 mx-auto mb-20" />

              <p className="text-white text-2xl font-light mb-6">The End.</p>

              <p className="text-white text-sm opacity-40 leading-7 mb-28">
                If someone you know has been scammed —<br />
                Action Fraud · 0300 123 2040 · actionfraud.police.uk
              </p>

            </div>
          </div>

          <div className="ending-title absolute inset-0 flex items-center justify-center pointer-events-none">
            <p className="text-white text-3xl font-light tracking-wide text-center px-8">
              Thanks for playing<br />
              <span className="text-4xl font-semibold">Scam the Granny</span>
            </p>
          </div>

          <button
            onClick={() => setShowEnding(false)}
            className="absolute top-4 right-4 text-white opacity-30 hover:opacity-70 text-xs tracking-widest uppercase transition-opacity"
          >
            Close
          </button>

          <style jsx>{`
            .ending-text {
              position: absolute;
              left: 0; right: 0;
              animation: scrollUp 65s linear forwards;
            }
            @keyframes scrollUp {
              0%   { transform: translateY(100vh); }
              100% { transform: translateY(-100%); }
            }

            .ending-title {
              opacity: 0;
              animation: fadeIn 3s ease-in forwards;
              animation-delay: 63s;
            }
            @keyframes fadeIn {
              0%   { opacity: 0; }
              100% { opacity: 1; }
            }
          `}</style>
        </div>
      )}
    </div>
  );
}



const FIRST_NAMES_M = ["James","Michael","Robert","David","William","Richard","Joseph","Thomas","Charles","Daniel","Matthew","Anthony","Mark","Paul","Steven","Andrew","Kenneth","George","Joshua","Kevin"];
const FIRST_NAMES_F = ["Mary","Patricia","Jennifer","Linda","Barbara","Elizabeth","Susan","Jessica","Sarah","Karen","Lisa","Nancy","Betty","Margaret","Sandra","Ashley","Dorothy","Kimberly","Emily","Donna"];
const LAST_NAMES = ["Smith","Johnson","Williams","Brown","Jones","Garcia","Miller","Davis","Wilson","Anderson","Taylor","Thomas","Jackson","White","Harris","Martin","Thompson","Moore","Young","Allen"];
const STREETS = ["Oak Lane","Maple Avenue","Cedar Drive","Elm Street","Pine Road","Birch Close","Willow Way","Ash Grove","Beech Hill","Chestnut Court"];
const CITIES = ["Manchester","Birmingham","Leeds","Sheffield","Bristol","Liverpool","Nottingham","Leicester","Coventry","Bradford"];
const COUNTRIES = ["United Kingdom","Germany","France","Netherlands","Belgium","Sweden","Denmark","Austria","Switzerland","Ireland"];
const EYES = ["Brown","Blue","Green","Hazel","Grey"];
const HAIR = ["Brown","Black","Blonde","Red","Grey","Auburn"];

function rnd(arr: string[]) { return arr[Math.floor(Math.random() * arr.length)]; }
function rndInt(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function pad(n: number, len = 2) { return String(n).padStart(len, "0"); }

function generateIdentity() {
  const gender = Math.random() > 0.5 ? "M" : "F";
  const first = gender === "M" ? rnd(FIRST_NAMES_M) : rnd(FIRST_NAMES_F);
  const last = rnd(LAST_NAMES);
  const dobYear = rndInt(1945, 1985);
  const dobMonth = rndInt(1, 12);
  const dobDay = rndInt(1, 28);
  const dob = `${pad(dobDay)}/${pad(dobMonth)}/${dobYear}`;
  const issueYear = rndInt(2018, 2022);
  const expYear = issueYear + 10;
  const passportNo = `${String.fromCharCode(65 + rndInt(0,25))}${String.fromCharCode(65 + rndInt(0,25))}${rndInt(100000, 999999)}`;
  const drivingNo = `${last.slice(0,5).toUpperCase().padEnd(5,"X")}${dobYear.toString().slice(2)}${pad(dobMonth)}${pad(dobDay)}9${rndInt(10,99)}`;
  const nin = `${String.fromCharCode(65+rndInt(0,25))}${String.fromCharCode(65+rndInt(0,25))} ${rndInt(10,99)} ${rndInt(10,99)} ${rndInt(10,99)} ${String.fromCharCode(65+rndInt(0,3))}`;
  const houseNo = rndInt(1, 180);
  const postArea = String.fromCharCode(65+rndInt(0,25)) + String.fromCharCode(65+rndInt(0,25));
  const postCode = `${postArea}${rndInt(1,9)} ${rndInt(1,9)}${String.fromCharCode(65+rndInt(0,25))}${String.fromCharCode(65+rndInt(0,25))}`;
  const phone = `07${rndInt(100,999)} ${rndInt(100,999)} ${rndInt(100,999)}`;
  const emailUser = `${first.toLowerCase()}.${last.toLowerCase()}${rndInt(10,99)}`;
  const emailDomain = rnd(["gmail.com","hotmail.co.uk","outlook.com","yahoo.co.uk","btinternet.com"]);
  return {
    first, last, gender, dob, passportNo, drivingNo, nin,
    address: `${houseNo} ${rnd(STREETS)}, ${rnd(CITIES)}, ${postCode}`,
    country: rnd(COUNTRIES),
    height: `${rndInt(155, 195)} cm`,
    eyes: rnd(EYES), hair: rnd(HAIR),
    phone, email: `${emailUser}@${emailDomain}`,
    issued: `${pad(rndInt(1,28))}/${pad(rndInt(1,12))}/${issueYear}`,
    expires: `${pad(rndInt(1,28))}/${pad(rndInt(1,12))}/${expYear}`,
    nationality: rnd(COUNTRIES),
  };
}

function FakeId() {
  const [id, setId] = useState(generateIdentity);
  const [copied, setCopied] = useState("");

  function copy(label: string, value: string) {
    navigator.clipboard?.writeText(value);
    setCopied(label);
    setTimeout(() => setCopied(""), 1500);
  }

  const fields = [
    { label: "Full Name",        value: `${id.first} ${id.last}` },
    { label: "Date of Birth",    value: id.dob },
    { label: "Gender",           value: id.gender === "M" ? "Male" : "Female" },
    { label: "Nationality",      value: id.nationality },
    { label: "Address",          value: id.address },
    { label: "Phone",            value: id.phone },
    { label: "Email",            value: id.email },
    { label: "Passport No.",     value: id.passportNo },
    { label: "Driving Licence",  value: id.drivingNo },
    { label: "NI Number",        value: id.nin },
    { label: "Height",           value: id.height },
    { label: "Eye Colour",       value: id.eyes },
    { label: "Hair Colour",      value: id.hair },
    { label: "Issued",           value: id.issued },
    { label: "Expires",          value: id.expires },
  ];

  return (
    <div className="min-h-full bg-gray-950 text-green-400 font-mono p-5">
      <div className="max-w-xl mx-auto">
        <div className="border border-green-900 rounded mb-5 p-4">
          <div className="flex items-center justify-between mb-1">
            <p className="text-green-500 text-[10px] tracking-widest uppercase">fakeid.tools v2.4.1</p>
            <p className="text-green-800 text-[10px]">tor circuit: active</p>
          </div>
          <h1 className="text-green-400 text-xl font-bold">Identity Generator</h1>
          <p className="text-green-700 text-xs mt-1">For educational and fiction purposes only.</p>
        </div>

        <div className="border border-green-900 rounded mb-4 divide-y divide-green-950">
          {fields.map(f => (
            <div key={f.label} className="flex items-center justify-between px-4 py-2.5 hover:bg-green-950/30 transition-colors">
              <div>
                <p className="text-green-600 text-[10px] uppercase tracking-wide">{f.label}</p>
                <p className="text-green-300 text-sm">{f.value}</p>
              </div>
              <button
                onClick={() => copy(f.label, f.value)}
                className="text-[10px] text-green-700 hover:text-green-400 transition-colors ml-4 shrink-0"
              >
                {copied === f.label ? "copied" : "copy"}
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={() => setId(generateIdentity())}
          className="w-full py-2.5 border border-green-700 hover:border-green-400 text-green-400 hover:text-green-300 text-sm font-bold rounded transition-colors"
        >
          [ GENERATE NEW IDENTITY ]
        </button>
      </div>
    </div>
  );
}


type Post = { author: string; time: string; body: string };
type Thread = { id: number; title: string; category: string; author: string; replies: number; views: number; time: string; posts: Post[] };

const FORUM_THREADS: Thread[] = [
  {
    id: 1,
    title: "Best hook email subjects that actually get replies",
    category: "Methods",
    author: "greyh4t",
    replies: 34,
    views: 1204,
    time: "2h ago",
    posts: [
      { author: "greyh4t", time: "2h ago", body: "Been testing subjects for 3 months. Top performers:\n\n• 'Action required: your account'\n• 'Delivery failed — rescheduling'\n• 'Your recent order'\n\nAnything that sounds like it comes from a service they already use. Don't be specific — let their brain fill it in." },
      { author: "v0idwalker", time: "1h 44m ago", body: "Confirmed on 'delivery failed'. Gets elderly targets every time. They all order stuff online now and genuinely can't remember what." },
      { author: "pl4gue", time: "1h 12m ago", body: "I add a fake order number in the subject. '— Order #84729' at the end. Makes it look like a real notification." },
      { author: "greyh4t", time: "58m ago", body: "Good call. Also 'Important notice regarding your account' with no company name. They open it assuming it's their bank." },
    ],
  },
  {
    id: 2,
    title: "How long do you run a romance con before the ask?",
    category: "Romance",
    author: "silkthread",
    replies: 22,
    views: 891,
    time: "5h ago",
    posts: [
      { author: "silkthread", time: "5h ago", body: "Running three long games right now. Question for experienced people — when do you make the first ask? I've been going 3 weeks on one mark and don't want to blow it." },
      { author: "m1rrorface", time: "4h 30m ago", body: "3 weeks is fine if you haven't met in person yet (you shouldn't have). I go at 4 weeks minimum. First ask is always small — under €150. You're testing their willingness, not going for the score." },
      { author: "silkthread", time: "4h ago", body: "Makes sense. What crisis do you use?" },
      { author: "m1rrorface", time: "3h 50m ago", body: "Medical for a relative. Never personal. If you say it's for you they might offer to call a hospital or embassy. If it's for your mum they just feel sad and send money." },
      { author: "coldcall99", time: "2h ago", body: "Flight home is also reliable. Stuck abroad, wallet stolen, just needs one transfer. Clean, simple, no follow-up questions." },
    ],
  },
  {
    id: 3,
    title: "Victim says 'my son told me this is a scam' — how do you handle it?",
    category: "Handling Objections",
    author: "r3dlined",
    replies: 18,
    views: 743,
    time: "8h ago",
    posts: [
      { author: "r3dlined", time: "8h ago", body: "This keeps happening with older targets. They tell a family member and suddenly they go cold. How do you recover?" },
      { author: "nocturnalop", time: "7h ago", body: "You don't, usually. If the family is involved the mark is gone. Cut the thread, move on. Don't waste time arguing with someone who now has a sceptic in their ear." },
      { author: "greyh4t", time: "6h ago", body: "Agree. The only exception is if you built really strong emotional trust. Then you appeal to that — 'I understand why he'd worry, but you know me. We've spoken every day for a month.' Sometimes works. Mostly doesn't." },
      { author: "r3dlined", time: "5h ago", body: "Fair enough. Lesson learned — move faster before they talk to anyone." },
    ],
  },
  {
    id: 4,
    title: "Anyone used AI to generate hook emails at scale?",
    category: "Tools",
    author: "batchmode",
    replies: 41,
    views: 2103,
    time: "1d ago",
    posts: [
      { author: "batchmode", time: "1d ago", body: "Been experimenting. Using a local model to generate 500 variants of a hook email, rotating names, subjects, sender domains. Open rates are up 12% vs my manual templates. Anyone else doing this?" },
      { author: "v0idwalker", time: "23h ago", body: "Yes. The key is fine-tuning on your own successful threads. Generic output sounds generic." },
      { author: "pl4gue", time: "22h ago", body: "What do you use for bulk sending without getting flagged? That's my bottleneck." },
      { author: "batchmode", time: "20h ago", body: "Rotating SMTP through residential proxies. Pain to set up but works. DM me if you want the stack." },
    ],
  },
  {
    id: 5,
    title: "Funniest thing a mark has ever said to you",
    category: "Off Topic",
    author: "coldcall99",
    replies: 67,
    views: 3891,
    time: "2d ago",
    posts: [
      { author: "coldcall99", time: "2d ago", body: "Thread for stories. I'll start: told a guy he'd won €12,000 in a lottery. He said 'wonderful, I'll donate half to my church.' Asked me to send them the money directly. I said sure, gave me their bank details. Ended up making the ask on behalf of the church. He sent €80." },
      { author: "silkthread", time: "2d ago", body: "Had a woman ask me what I looked like after two weeks of romance con. Sent a stock photo. She said 'you look just like my late husband.' Felt bad. Still made the ask." },
      { author: "nocturnalop", time: "1d ago", body: "Guy I was running a tech support scam on started telling me about his cat for 20 minutes. Just let him talk. By the end he felt so bad for wasting my time he gave me his card details without me even asking." },
    ],
  },
];

const CATEGORIES = ["All", "Methods", "Romance", "Handling Objections", "Tools", "Off Topic"];

function ScammerBoards() {
  const [selectedThread, setSelectedThread] = useState<Thread | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? FORUM_THREADS
    : FORUM_THREADS.filter(t => t.category === activeCategory);

  return (
    <div className="min-h-full bg-gray-950 text-gray-300 font-mono text-sm">
      {/* Header */}
      <div className="border-b border-gray-800 px-5 py-3 flex items-center justify-between">
        <div>
          <span className="text-orange-500 font-bold text-base">scammer.boards</span>
          <span className="text-gray-600 text-xs ml-3">· tor2web gateway · {FORUM_THREADS.reduce((a,t)=>a+t.replies,0)} posts · {FORUM_THREADS.length} threads</span>
        </div>
        <span className="text-green-600 text-[10px]">● connected</span>
      </div>

      {selectedThread ? (
        // Thread view
        <div className="p-4 max-w-2xl">
          <button
            onClick={() => setSelectedThread(null)}
            className="text-gray-500 hover:text-gray-300 text-xs mb-4 flex items-center gap-1 transition-colors"
          >
            ← back to board
          </button>
          <div className="border border-gray-800 rounded mb-4 px-4 py-3">
            <p className="text-[10px] text-orange-700 uppercase tracking-wide mb-1">{selectedThread.category}</p>
            <h2 className="text-gray-200 text-base font-bold leading-snug">{selectedThread.title}</h2>
          </div>
          <div className="space-y-3">
            {selectedThread.posts.map((post, i) => (
              <div key={i} className="border border-gray-800 rounded">
                <div className="flex items-center gap-3 px-4 py-2 bg-gray-900/50 border-b border-gray-800">
                  <span className="text-orange-500 text-xs font-bold">{post.author}</span>
                  <span className="text-gray-600 text-[10px]">{post.time}</span>
                  {i === 0 && <span className="text-[9px] bg-orange-900/40 text-orange-600 border border-orange-900 px-1.5 py-0.5 rounded ml-auto">OP</span>}
                </div>
                <div className="px-4 py-3 text-gray-300 text-sm leading-6 whitespace-pre-wrap">{post.body}</div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        // Board view
        <div className="p-4">
          {/* Category tabs */}
          <div className="flex gap-1.5 flex-wrap mb-4">
            {CATEGORIES.map(c => (
              <button key={c} onClick={() => setActiveCategory(c)}
                className={`text-[11px] px-2.5 py-1 rounded border transition-colors
                  ${activeCategory === c
                    ? "bg-orange-900/40 border-orange-700 text-orange-400"
                    : "bg-gray-900 border-gray-800 text-gray-500 hover:text-gray-300 hover:border-gray-700"}`}>
                {c}
              </button>
            ))}
          </div>

          <div className="border border-gray-800 rounded divide-y divide-gray-800">
            <div className="grid grid-cols-12 px-4 py-2 text-[10px] text-gray-600 uppercase tracking-wide">
              <span className="col-span-7">Thread</span>
              <span className="col-span-2 text-right">Replies</span>
              <span className="col-span-2 text-right">Views</span>
              <span className="col-span-1 text-right">Time</span>
            </div>
            {filtered.map(thread => (
              <button
                key={thread.id}
                onClick={() => setSelectedThread(thread)}
                className="w-full grid grid-cols-12 px-4 py-3 hover:bg-gray-900/60 transition-colors text-left items-center"
              >
                <div className="col-span-7 min-w-0 pr-3">
                  <p className="text-gray-200 text-xs font-medium truncate hover:text-orange-400 transition-colors">{thread.title}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] text-orange-800 bg-orange-950/40 border border-orange-900/40 px-1.5 rounded">{thread.category}</span>
                    <span className="text-[10px] text-gray-600">{thread.author}</span>
                  </div>
                </div>
                <span className="col-span-2 text-right text-gray-500 text-xs">{thread.replies}</span>
                <span className="col-span-2 text-right text-gray-500 text-xs">{thread.views.toLocaleString()}</span>
                <span className="col-span-1 text-right text-gray-600 text-[10px]">{thread.time}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}


function ComboBox({ options, value, onChange, onNavigate }: {
  options: { label: string; value: string }[];
  value: string;
  onChange: (value: string) => void;
  onNavigate: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const filtered = options.filter((opt) => opt.label.toLowerCase().includes(value.toLowerCase()));

  return (
    <div style={{ position: "relative", flex: 1 }}>
      <input
        type="text"
        value={value}
        placeholder="enter or pick a url..."
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 100)}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => { if (e.key === "Enter") { onNavigate(value); setOpen(false); } }}
        style={{ width: "100%", height: "30px", border: "1px solid #ccc", borderRadius: "4px", padding: "0 8px", color: "black", fontSize: "14px", boxSizing: "border-box" }}
      />
      {open && filtered.length > 0 && (
        <div style={{ position: "absolute", top: "32px", left: 0, right: 0, background: "white", border: "1px solid #ccc", borderRadius: "4px", zIndex: 999, boxShadow: "0 2px 6px rgba(0,0,0,0.15)" }}>
          {filtered.map((opt) => (
            <div
              key={opt.value}
              onMouseDown={() => { onChange(opt.value); onNavigate(opt.value); setOpen(false); }}
              style={{ padding: "6px 10px", cursor: "pointer", color: "black", fontSize: "13px" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#f0f0f0")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "white")}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function BrowserContent({ hideTabBar = false }: { hideTabBar?: boolean }) {
  const [tabs, setTabs] = useState<Tab[]>([
    { id: 1, url: "search", currentSite: "search", instanceKey: 0 },
  ]);
  const [activeId, setActiveId] = useState(1);
  const [nextId, setNextId] = useState(2);
  const [inputUrl, setInputUrl] = useState("");
  const [balance, setBalance] = useState(money);
  // Re-render when sites are purchased so ComboBox updates
  const [, forceUpdate] = useState(0);

  const activeTab = tabs.find((t) => t.id === activeId);

  function selectTab(id: number) {
    setActiveId(id);
    const tab = tabs.find((t) => t.id === id)!;
    setInputUrl(tab.url);
  }

  function closeTab(id: number) {
    const newTabs = tabs.filter((t) => t.id !== id);
    if (newTabs.length === 0) { setTabs([]); return; }
    setTabs(newTabs);
    if (activeId === id) {
      const fallback = newTabs[newTabs.length - 1];
      setActiveId(fallback.id);
      setInputUrl(fallback.url);
    }
  }

  function navigate(target = inputUrl) {
    if (!target.trim()) return;
    const site = getSite(target);
    setTabs((prev) =>
      prev.map((t) =>
        t.id === activeId
          ? { ...t, url: target, currentSite: site, instanceKey: t.instanceKey + 1 }
          : t
      )
    );
    setInputUrl(target);
  }

  function refresh() {
    setTabs((prev) =>
      prev.map((t) => t.id === activeId ? { ...t, instanceKey: t.instanceKey + 1 } : t)
    );
  }

  const unlockedSiteOptions = SITE_ITEMS
    .filter(s => unlockedSites.includes(s.id))
    .map(s => ({ label: s.name, value: s.url }));

  const siteOptions = [
    { label: "scamschool.com",           value: "scamschool.com" },
    { label: "shop.scam",                value: "shop.scam" },
    { label: "chemi.edu",                value: "chemi.edu" },
    { label: "hackclubuniversity.com",   value: "hackclubuniversity.com" },
    ...unlockedSiteOptions,
  ];

  if (tabs.length === 0) return null;

  return (
    <div className="flex flex-col" style={{ height: "550px" }}>
      {!hideTabBar && (
        <TabBar tabs={tabs} activeId={activeId} onSelect={selectTab} onClose={closeTab} />
      )}

      <div className="flex gap-2 p-2 bg-gray-100 border-b items-center">
        <button
          onClick={refresh}
          title="Refresh"
          className="text-gray-600 hover:text-black text-lg leading-none px-1 select-none"
        >
          ↻
        </button>
        <ComboBox options={siteOptions} value={inputUrl} onChange={setInputUrl} onNavigate={navigate} />
        <button onClick={() => navigate()} className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded text-sm text-white transition-colors">
          Go
        </button>
      </div>

      <div className="flex-1 overflow-y-auto bg-white">
        {activeTab?.currentSite === "scamschool" && <ScamSchool  key={`${activeTab.id}-${activeTab.instanceKey}`} />}
        {activeTab?.currentSite === "chemi"      && <Chemi       key={`${activeTab.id}-${activeTab.instanceKey}`} />}
        {activeTab?.currentSite === "shop"       && <Shop        key={`${activeTab.id}-${activeTab.instanceKey}`} balance={balance} setBalance={(n) => { setBalance(n); forceUpdate(x => x+1); }} />}
        {activeTab?.currentSite === "university" && <University  key={`${activeTab.id}-${activeTab.instanceKey}`} />}

        {/* Secret site render slots */}
        {activeTab?.currentSite === "darkmarket" && (
          <div className="flex flex-col items-center justify-center h-full text-center p-8 bg-gray-950">
            <p className="text-green-400 font-mono text-2xl mb-3">darkmarket.onion</p>
            <p className="text-green-600 font-mono text-sm">Connection established.</p>
          </div>
        )}
        {activeTab?.currentSite === "leakbase" && (
          <div className="flex flex-col items-center justify-center h-full text-center p-8 bg-gray-950">
            <p className="text-blue-400 font-mono text-2xl mb-3">leakbase.net</p>
            <p className="text-blue-600 font-mono text-sm">Database online.</p>
          </div>
        )}
        {activeTab?.currentSite === "cryptomixer" && (
          <div className="flex flex-col items-center justify-center h-full text-center p-8 bg-gray-950">
            <p className="text-yellow-400 font-mono text-2xl mb-3">cryptomixer.io</p>
            <p className="text-yellow-600 font-mono text-sm">Mixer ready.</p>
          </div>
        )}
        {activeTab?.currentSite === "fakeid"        && <FakeId         key={`${activeTab.id}-${activeTab.instanceKey}`} />}
        {activeTab?.currentSite === "scammerboards" && <ScammerBoards  key={`${activeTab.id}-${activeTab.instanceKey}`} />}

        {activeTab?.currentSite === "404" && (
          <div className="flex flex-col items-center justify-center h-full text-center p-8">
            <p className="text-8xl font-thin text-gray-200 mb-4">404</p>
            <p className="text-lg font-medium text-gray-500 mb-1">Page not found</p>
            <p className="text-sm text-gray-400">Check the URL and try again.</p>
          </div>
        )}

        {activeTab?.currentSite === "search" && (
          <div className="flex flex-col items-center justify-center h-full text-center p-8">
            <p className="text-5xl font-light text-gray-800 mb-4">Search</p>
            <p className="text-sm text-gray-400 max-w-xs leading-relaxed">
              All the information in the world at your fingertips.<br />Use it for good or bad — we don't care.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}