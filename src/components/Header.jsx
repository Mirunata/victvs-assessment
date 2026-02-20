import Navigation from "./Navigation";

export default function Header() {
  return (
    <header className="Header">
      <div className="LogoSpace">
      <img
          src="https://www.victvs.co.uk/wp-content/uploads/2020/05/VlogoW.png"
          alt="VICTVS logo"
          className="Logo"
        />
        <span>Exam Scheduler</span>
      </div>

      <Navigation />
    </header>
  );
}
