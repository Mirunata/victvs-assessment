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

  return (
      <div className="CardContainer">
        <div className="SessionDetails">
          <div className="ExamTitle">
                <h3>{session.title}</h3>
          </div>
          <div className="InfoCard">
              <div className="InfoTest">
                <p className="DatetimeMobile">{datetime}</p>
                <p>Exam id: {session.id}</p>
                <p>Candidates: {candidateNames}</p>
              </div>
              <div className="LocationDetails">
                <p className="DatetimeWeb">{datetime}</p>
                <p>{time}</p>
                <p className="LocationName">{session?.location?.country}</p>
              </div>
          </div>
        </div>
        <div>
          <button
            className="StatusButton"
            disabled={!actionLabel}
            onClick={() => {
              onAdvanceStatus(session.id, session.status);
            }}
          >
          {actionLabel ? actionLabel : "Completed"}
          </button>
        </div>
      </div>
  );
}