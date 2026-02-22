export default function WelcomeContent() {
  return (
    <>
      <h1 className="text-5xl font-bold m-8 p-8 text-black">
        Welcome to <strong>Scam the Granny</strong>
      </h1>
      <img className="w-1/2 m-8 p-8" src="/scamlogo3.png" alt="logo" />
      <p className="text-lg mt-4 m-8 p-8 text-black">
        This is a game where it is your goal to scam people out of their hard earned money.
        (Don't worry they aren't real, just AI (<s>or are they</s>))
      </p>
    </>
  );
}