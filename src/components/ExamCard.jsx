export default function ExamCard({ session, onAdvanceStatus }) {

  const datetime = session.datetime ? session.datetime.slice(0, 10) : "";
  const time = session.datetime ? session.datetime.slice(11, 16) : "";
  const candidateNames = Array.isArray(session?.candidates)
  ? session.candidates.map((c) => c.name).join(", ")
  : "";

  const actionLabel =
  session.status === "Pending"
    ? "Pending"
    : session.status === "Started"
    ? "Finish"
    : null;
    
  //TODO: update display of schedule details

  // console.log('session data on exam card', session);
  return (
    <section className="ExamCard">
      <div className="Potato">
        <div className="InfoCard">
      <div className="SessionDetails">
        <h3>{session.title}</h3>
        <p>{session.id}</p>
        <p>Candidates: {candidateNames}</p>
      </div>
      <div className="LocationDetails">
        <p>{datetime}</p>
        <p>{time}</p>
        <p className="LocationName">{session?.location?.country}</p>
      </div>
        </div>
      <div className="ButtonSection">
        <button
          className="FilterButton"
          disabled={!actionLabel}
          // onClick={() => onAdvanceStatus(session.id, session.status)}
          onClick={() => {
            console.log("BUTTON CLICKED", session.id, session.status);
            onAdvanceStatus(session.id, session.status);
          }}
        >
        {actionLabel ? actionLabel : "Completed"}
        </button>
      </div>
      </div>
    </section>
  );
}