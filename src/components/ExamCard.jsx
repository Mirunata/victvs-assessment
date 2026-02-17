export default function ExamCard({session}) {

  const datetime = session.datetime ? session.datetime.slice(0, 10) : "";
  const time = session.datetime ? session.datetime.slice(11, 16) : "";
  const candidateNames = Array.isArray(session?.candidates)
  ? session.candidates.map((c) => c.name).join(", ")
  : "";

  //TODO: update display of schedule details
  return (
    <section className="ExamCard">
      <div className="SessionDetails">
        <h3>{session.Title}</h3>
        <p>{session.Description}</p>
        <p>{session.CandidateId}</p>
        <p>Candidate: {candidateNames}</p>
      </div>
      <div className="LocationDetails">
        <p>{datetime[0]}</p>
        <p>{time}</p>
        <p className="LocationName">{session?.location?.country}</p>
      </div>
    </section>
  );
}