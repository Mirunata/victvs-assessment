import { useEffect, useState } from "react";
import ExamCard from "./ExamCard";
import FilterModal from "./FilterModal";
import api from "../utils/api";

export default function ExamList() {
  const [examSessions, setExamSessions] = useState([]);
  const [originalExamSessions, setOriginalExamSessions] = useState([]);
  const [hideFilterModal, setHideFilterModal] = useState(true);
  const [filtersObject, setFiltersObject] = useState({
    date: "",
    name: "",
    location: "",
  });

  // TODO: Update the component with the exam session data

  useEffect(() => {
    const fetchExamSessions = async () => {
      try{
        const res = await api.get("/api/exams");
        setExamSessions(res.data);
        setOriginalExamSessions(res.data)
      } catch (error)  {
        setExamSessions([]);
        setOriginalExamSessions([]);
      }
    }

    fetchExamSessions();
  }, []);

  useEffect(() => {

    setExamSessions(originalExamSessions);

    const dateFilter = filtersObject.date;
    const nameFilter = filtersObject.name;
    const locationFilter = filtersObject.location;

    if (dateFilter !== "") {
      setExamSessions((currentSessions) => {
        return currentSessions.filter((session) =>
          session.Date.slice(0, 10) === filtersObject.date ? session : null
        );
      });
    }

    if (nameFilter !== "") {
      setExamSessions((currentSessions) => {
        return currentSessions.filter((session) =>
        session.CandidateName === filtersObject.name ? session : null
        );
      });
    }

    if (locationFilter !== "") {
      setExamSessions((currentSessions) => {
        return currentSessions.filter((session) =>
          session.LocationName === filtersObject.location ? session : null
        );
      });
    }
  }, [filtersObject]);

  return (
    <main className="ExamList">
      <div>
        <h2>Upcoming Sessions</h2>
        <FilterModal
          hide={hideFilterModal}
          setHide={setHideFilterModal}
          setFiltersObject={setFiltersObject}
        />
        <div className="FilterContainer">
          <button
            className="FilterButton"
            onClick={() => setHideFilterModal(false)}
          >
            👁 Show Filters
          </button>
          <button
            className="FilterButton"
            onClick={() => setExamSessions(originalExamSessions)}
          >
            ↻ Reset Filters
          </button>
        </div>
      </div>
      <div id="SessionList">
        {examSessions.length ? (
          examSessions.map((session) => (
            <ExamCard session={session} key={session.id} />
          ))
        ) : (
          <p>No sessions to display...</p>
        )}
      </div>
    </main>
  );
}
