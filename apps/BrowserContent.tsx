"use client";
import { useState } from "react";
import { money, setMoney, purchasedBackgrounds, purchaseBackground, setActiveBackground } from "@/lib/state";

const SHOP_ITEMS = [
  { id: "bg1", name: "gun( just joking)",  price: 50,  file: "/bg_space.png" },
  { id: "bg2", name: "blahjah",   price: 100, file: "/bg_city.png" },
  { id: "bg3", name: "framework 16", price: 150, file: "/bg_forest.png" },
];

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
      title: "kjdhfkhekufhaskeuhfkjwgef",
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

export default function BrowserContent() {
  const [url, setUrl] = useState("scamschool.com");
  const [currentSite, setCurrentSite] = useState("scamschool");
  const [balance, setBalance] = useState(money);

  function navigate() {
    if (url.includes("shop")) setCurrentSite("shop");
    else if (url.includes("scamschool")) setCurrentSite("scamschool");
    else setCurrentSite("404");
  }

  return (
    <div className="flex flex-col" style={{ height: "550px" }}>

      {/* URL bar */}
      <div className="flex gap-2 p-2 bg-gray-100 border-b">
        <input
          className="flex-1 border border-gray-300 rounded px-2 py-1 text-sm text-black"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && navigate()}
        />
        <button onClick={navigate} className="bg-blue-500 text-white px-3 py-1 rounded text-sm">Go</button>
      </div>

      {/* change this to drop down */}
      <div className="flex gap-2 px-2 py-1 bg-gray-50 border-b text-xs">
        <button onClick={() => { setUrl("scamschool.com"); setCurrentSite("scamschool"); }} className="text-blue-600 hover:underline"> ScamSchool</button>
        <button onClick={() => { setUrl("shop.scam"); setCurrentSite("shop"); }} className="text-blue-600 hover:underline"> Shop</button>
      </div>

      <div className="flex-1 overflow-y-auto bg-white">
        {currentSite === "scamschool" && <ScamSchool />}
        {currentSite === "shop" && <Shop balance={balance} setBalance={setBalance} />}
        {currentSite === "404" && (
          <div className="p-8 text-center text-gray-400">
            <p className="text-4xl mb-2">404</p>
            <p className="text-sm">Site not found. Try{" "}
              <span className="text-blue-500 cursor-pointer" onClick={() => { setUrl("scamschool.com"); setCurrentSite("scamschool"); }}>scamschool.com</span>
              {" "}or{" "}
              <span className="text-blue-500 cursor-pointer" onClick={() => { setUrl("shop.scam"); setCurrentSite("shop"); }}>shop.scam</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}