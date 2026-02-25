"use client";
import { useState } from "react";
import { money, setMoney, purchasedBackgrounds, purchaseBackground, setActiveBackground } from "@/lib/state";

const SHOP_ITEMS = [
  { id: "bg1", name: "gun( just joking)",  price: 50,  file: "/bg_space.png" },
  { id: "bg2", name: "blahjah",            price: 100, file: "/bg_city.png" },
  { id: "bg3", name: "framework 16",       price: 150, file: "/bg_forest.png" },
];

interface Tab {
  id: number;
  url: string;
  currentSite: string;
  instanceKey: number; 
}

function getSite(url: string) {
  if (url.includes("shop.scam"))        return "shop";
  if (url.includes("chemi.edu"))        return "chemi";
  if (url.includes("scamschool.com"))   return "scamschool";
  if (url.includes("search"))          return "search";
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
      <ul className="list-disc p-4 text-xl">
        {t.bondTypes.map((item) => <li key={item}>{item}</li>)}
      </ul>

      <p className="text-3xl">{t.groupsTitle}</p>
      <ul className="list-disc p-4 text-xl">
        {t.groups.map((item) => <li key={item}>{item}</li>)}
      </ul>

      <p className="text-3xl">{t.namingTitle}</p>
      <ul className="text-xl p-4">
        {t.naming.map((item) => <li key={item}>{item}</li>)}
      </ul>

      <p className="text-3xl">{t.cycloTitle}</p>
      <ul className="text-xl p-4">
        {t.cyclo.map((item) => <li key={item}>{item}</li>)}
      </ul>

    </div>
  );
}

function ScamSchool() {
  const [lesson, setLesson] = useState(0);

  const lessons = [
    {
      title: "Lesson 1: Email Phishing",
      content: `The most common scam. Pretend to be a trusted institution.

stategy:
- Impersonate banks, police, tax authorities, or prize committees
- Use urgent language: "Your account will be DELETED in 24h!"
- Include fake case numbers and official-looking formatting
- Always have a clear "action" they must take immediately

What to say?:
"Dear Customer, our security team has detected suspicious activity on your account (Case #4829-B). To prevent your account from being suspended, you must verify your details within 24 hours by replying with your card number and the 3-digit security code."
`,
    },
    {
      title: "Lesson 2: Prize & Lottery Scams",
      content: `Everyone wants to win something. Create excitement then extract fees.

How to do it? What to say?:
- "You've been selected from millions of entries!"
- Always require a small "processing fee" to release the prize
- Make the prize just believable enough (not €1 billion, but €5,000)
- Use logos and formatting that look official

strategy:
1. Tell them they won
2. Get them excited  
3. Introduce a small fee (€20)
4. If they pay, introduce another fee ("tax")
5. Keep going until they get suspicious

What do you say?:
"Congratulations! You have been selected as the winner of our quarterly draw. Your prize of €8,500 is ready for transfer. To release your funds, a processing fee of €25 is required by law."`,
    },
    {
      title: "Lesson 3: Romance Scams",
      content: `The long game. Build emotional connection, then exploit it.

How to do it?:
- Create a fake attractive profile
- Spend weeks or months building genuine emotional connection
- Never meet in person (always have excuses: working abroad, military, etc.)
- Strike during emotional moments with a "crisis"
- After weeks of romance: "I'm so embarrassed to ask but I'm stuck abroad and my wallet was stolen. I just need €200 to get home. You're the only person I trust."
`,
    },
    {
      title: "Lesson 4: Catfishing",
      content: `hgjfshjgfjhgswehjkfgj.\n\njgjgwjehfgjwygefjyg"`,
    },
    {
      title: "Lesson 5: gasdgjay",
      content: `bvhjdbvkjhskdjhf.\n\nhjjhhjgvjygiygkighjkgjy`,
    },
  ];

  return (
    <div className="p-4 text-black">
      <div className="bg-yellow-50 border-2 border-yellow-400 rounded p-3 mb-4">
        <h2 className="text-xl font-bold text-yellow-800">ScamSchool.com</h2>
        <p className="text-xs text-yellow-600">Advanced Social Engineering Academy</p>
      </div>
      <div className="flex gap-2 mb-4 flex-wrap">
        {lessons.map((l, i) => (
          <button key={i} onClick={() => setLesson(i)}
            className={`text-xs px-2 py-1 rounded border ${lesson === i ? "bg-yellow-400 border-yellow-500" : "bg-white border-gray-300 hover:bg-gray-50"}`}>
            Lesson {i + 1}
          </button>
        ))}
      </div>
      <div className="border rounded p-4 bg-white shadow-sm">
        <h3 className="font-bold text-lg mb-3">{lessons[lesson].title}</h3>
        <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans leading-relaxed">
          {lessons[lesson].content}
        </pre>
      </div>
    </div>
  );
}

function Shop({ balance, setBalance }: { balance: number; setBalance: (n: number) => void }) {
  const [message, setMessage] = useState("");

  function buy(item: typeof SHOP_ITEMS[0]) {
    if (purchasedBackgrounds.includes(item.id)) {
      setActiveBackground(item.file);
      setMessage(` Switched to ${item.name}!`);
      return;
    }
    if (balance < item.price) {
      setMessage(" Not enough money!");
      return;
    }
    const newBalance = balance - item.price;
    setMoney(newBalance);
    setBalance(newBalance);
    purchaseBackground(item.id);
    setActiveBackground(item.file);
    setMessage(` Bought and equipped ${item.name}!`);
  }

  return (
    <div className="p-4 text-black">
      <div className="bg-purple-50 border-2 border-purple-400 rounded p-4 mb-4">
        <h2 className="text-2xl font-bold text-purple-800 mb-1">THE ScamyShop</h2>
      </div>
      {message && <div className="mb-3 p-2 bg-gray-100 rounded text-sm text-center">{message}</div>}
      <div className="space-y-3">
        {SHOP_ITEMS.map((item) => {
          const owned = purchasedBackgrounds.includes(item.id);
          return (
            <div key={item.id} className="border rounded p-3 bg-white shadow-sm flex justify-between items-center">
              <div>
                <h3 className="font-bold">{item.name}</h3>
                <p className="text-sm text-gray-500">{owned ? " Owned" : `${item.price}€`}</p>
              </div>
              <button
                onClick={() => buy(item)}
                className={`px-4 py-2 rounded font-bold text-white text-sm
                  ${owned
                    ? "bg-blue-400 hover:bg-blue-500"
                    : balance >= item.price
                      ? "bg-purple-500 hover:bg-purple-600"
                      : "bg-gray-300 cursor-not-allowed"}`}
              >
                {owned ? "Equip" : "Buy"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}


function ComboBox({ options, value, onChange }: {
  options: { label: string; value: string }[];
  value: string;
  onChange: (value: string) => void;
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
        onKeyDown={(e) => { if (e.key === "Enter") setOpen(false); }}
        style={{ width: "100%", height: "30px", border: "1px solid #556", borderRadius: "4px", padding: "0 8px", color: "black", fontSize: "14px", boxSizing: "border-box" }}
      />
      {open && filtered.length > 0 && (
        <div style={{ position: "absolute", top: "32px", left: 0, right: 0, background: "white", border: "1px solid #556", borderRadius: "4px", zIndex: 999, boxShadow: "0 2px 6px rgba(0,0,0,0.15)" }}>
          {filtered.map((opt) => (
            <div
              key={opt.value}
              onMouseDown={() => { onChange(opt.value); setOpen(false); }}
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

  const activeTab = tabs.find((t) => t.id === activeId);

  


  function selectTab(id: number) {
    setActiveId(id);
    const tab = tabs.find((t) => t.id === id)!;
    setInputUrl(tab.url);
  }
if (tabs.length === 0) return null;

function closeTab(id: number) {
  const newTabs = tabs.filter((t) => t.id !== id);
  if (newTabs.length === 0) {
    setTabs([]);
    return;
  }
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
    const newTab: Tab = { id: nextId, url: target, currentSite: site, instanceKey: 0 };
    setTabs((prev) => [...prev, newTab]);
    setActiveId(nextId);
    setInputUrl(target);
    setNextId((n) => n + 1);
  }

  function refresh() {
    setTabs((prev) =>
      prev.map((t) =>
        t.id === activeId ? { ...t, instanceKey: t.instanceKey + 1 } : t
      )
    );
  }

  function handleUrlChange(value: string) {
    setInputUrl(value);
    if (siteOptions.some((opt) => opt.value === value)) navigate(value);
  }

  const siteOptions = [
    { label: "scamschool.com", value: "scamschool.com" },
    { label: "shop.scam",      value: "shop.scam" },
    { label: "chemi.edu",      value: "chemi.edu" },
  ];

  return (
    <div className="flex flex-col" style={{ height: "550px" }}>
      {!hideTabBar && (
        <TabBar
          tabs={tabs}
          activeId={activeId}
          onSelect={selectTab}
          onClose={closeTab}
        />
      )}
      <div className="flex gap-2 p-2 bg-gray-100 border-b items-center">
        <button
          onClick={refresh}
          title="Refresh"
          className="text-gray-600 hover:text-black text-lg leading-none px-1 select-none"
          style={{ fontFamily: "sans-serif" }}
        >
          ↻
        </button>

        <ComboBox
          options={siteOptions}
          value={inputUrl}
          onChange={handleUrlChange}
        />

        <button
          onClick={() => navigate()}
          className="bg-blue-500 px-3 py-1 rounded text-sm text-white"
        >
          Go
        </button>
      </div>

      <div className="flex-1 overflow-y-auto bg-white">
        {activeTab?.currentSite === "scamschool" && <ScamSchool key={`${activeTab.id}-${activeTab.instanceKey}`} />}
        {activeTab?.currentSite === "chemi"      && <Chemi      key={`${activeTab.id}-${activeTab.instanceKey}`} />}
        {activeTab?.currentSite === "shop"       && <Shop       key={`${activeTab.id}-${activeTab.instanceKey}`} balance={balance} setBalance={setBalance} />}
        {activeTab?.currentSite === "404"        && (
          <div className="p-8 text-center text-gray-400">
            <p className="text-8xl mb-2">404</p>
            <p className="text-2xl mb-2">page not found</p>
          </div>
        )}
        {activeTab?.currentSite === "search"     && (
          <div className="p-8 text-center text-black">
            <p className="text-8xl mb-2">Search</p>
            <p className="text-2xl mb-2">All the information of the world in your fingertips. Use it for good or bad we dont care.</p>
          </div>
        )}
      </div>
    </div>
  );
}