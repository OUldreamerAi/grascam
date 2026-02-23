"use client";
import { useState } from "react";
import { money, setMoney, purchasedBackgrounds, purchaseBackground, setActiveBackground } from "@/lib/state";
import { url } from "inspector";

const SHOP_ITEMS = [
  { id: "bg1", name: "gun( just joking)",  price: 50,  file: "/bg_space.png" },
  { id: "bg2", name: "blahjah",   price: 100, file: "/bg_city.png" },
  { id: "bg3", name: "framework 16", price: 150, file: "/bg_forest.png" },
];


interface Tab {
  id: number;
  url: string;      
  currentSite: string;
}

function getSite(url: string) {
  if (url.includes("shop.scam")) return "shop";
  if (url.includes("recognisethespecies")) return "species";
  if (url.includes("scamschool.com")) return "scamschool";
  if (url.includes("search")) return "search";
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
          {tabs.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); onClose(tab.id); }}
              className="text-gray-400 hover:text-black text-base leading-none ml-1"
            >
              ×
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

function Species() {
  const species = [
    { name: "kuusi", image: "image1.jpg" },
    { name: "rauduskoivu", image: "image2.jpg" },
    { name: "puolukka", image: "image3.jpg" },
  ];

  const [revealed, setRevealed] = useState([false, false, false]);

  const toggle = (i: number) => {
    setRevealed(revealed.map((v, idx) => (idx === i ? !v : v)));
  };

  return (
    <div className="text-black p-2 m-2">
      <h2 className="text-5xl">Recognise the species</h2>
      <div style={{ display: "flex", gap: "20px" }}>
        {species.map((s, i) => (
          <div key={s.name} style={{ textAlign: "center" }}>
            <img src={"media/" + s.image} alt="species"  style={{ width: 200, height: 160, objectFit: "cover" }} />
            <div>
              {revealed[i] ? (
                <span>{s.name}</span>
              ) : (
                <button onClick={() => toggle(i)}>Reveal name</button>
              )}
            </div>
          </div>
        ))}
      </div>
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

What do you. say?:
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
      content: `hgjfshjgfjhgswehjkfgj.

jgjgwjehfgjwygefjyg"`,
    },
    {
      title: "Lesson 5: gasdgjay",
      content: `bvhjdbvkjhskdjhf.

hjjhhjgvjygiygkighjkgjy`,
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

function ComboBox({ options, value, onChange }: { options: { label: string; value: string }[]; value: string; onChange: (value: string) => void }) {
  const [open, setOpen] = useState(false);

  const filtered = options.filter((opt) =>
    opt.label.toLowerCase().includes(value.toLowerCase())
  );

  return (
    <div style={{ position: "relative", flex: 1 }}>
      <input
        type="text"
        value={value}
        placeholder="enter or pick a url..."
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 100)}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => { if (e.key === "Enter") setOpen(false); }}//MAke enter work
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

export default function BrowserContent() {
  const [tabs, setTabs] = useState<Tab[]>([
    { id: 1, url: "search", currentSite: "search" },
  ]);
  const [activeId, setActiveId] = useState(1);
  const [nextId, setNextId] = useState(2);

  const [inputUrl, setInputUrl] = useState("");
  const [balance, setBalance] = useState(money);

  const activeTab = tabs.find((t) => t.id === activeId)!;

  function selectTab(id: number) {
    setActiveId(id);
    const tab = tabs.find((t) => t.id === id)!;
    setInputUrl(tab.url);
  }

  function closeTab(id: number) {
    const newTabs = tabs.filter((t) => t.id !== id);
    setTabs(newTabs);
    if (activeId === id) {
      const fallback = newTabs[newTabs.length - 1];
      setActiveId(fallback.id);
      setInputUrl(fallback.url);
    }
  }

  const siteOptions = [
    { label: "scamschool.com", value: "scamschool.com" },
    { label: "shop.scam", value: "shop.scam" },
    { label: "recognisethespecies.com", value: "recognisethespecies.com" },
  ];

  function navigate(target = inputUrl) {
    const site = getSite(target);

    if (target === activeTab.url) {

      setTabs((prev) =>
        prev.map((t) => (t.id === activeId ? { ...t, currentSite: site } : t))
      );
    }

    const newTab: Tab = { id: nextId, url: target, currentSite: site };
    setTabs((prev) => [...prev, newTab]);
    setActiveId(nextId);
    setInputUrl(target);
    setNextId((n) => n + 1);
  }

  function handleUrlChange(value: string) {
    setInputUrl(value);
    if (siteOptions.some((opt) => opt.value === value)) navigate(value);
  }

  return (
    <div className="flex flex-col" style={{ height: "550px" }}>
      <TabBar
        tabs={tabs}
        activeId={activeId}
        onSelect={selectTab}
        onClose={closeTab}
      />

      <div className="flex gap-2 p-2 bg-gray-100 border-b items-center">
        <ComboBox
          options={siteOptions}
          value={inputUrl}
          onChange={handleUrlChange}
        />
        <button
          onClick={() => navigate()}
          className="bg-blue-500 px-3 py-1 rounded text-sm"
        >
          Go
        </button>
      </div>

      <div className="flex-1 overflow-y-auto bg-white">
        {activeTab.currentSite === "scamschool" && <ScamSchool />}
        {activeTab.currentSite === "species" && <Species />}
        {activeTab.currentSite === "shop" && (
          <Shop balance={balance} setBalance={setBalance} />
        )}
        {activeTab.currentSite === "404" && (
          <div className="p-8 text-center text-gray-400">
            <p className="text-8xl mb-2">404</p>
            <p className="text-2xl mb-2">page not found</p>
          </div>
        )}
        {activeTab.currentSite === "search" && (
          <div className="p-8 text-center text-black">
            <p className="text-8xl mb-2">Search</p>
            <p className="text-2xl mb-2">All the information of the world in your fingertips. Use it for good or bad we dont care. </p>
          </div>
        )}
      </div>
    </div>
  );
}