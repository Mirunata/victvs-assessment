import { useEffect, useState } from "react";
import ExamCard from "./ExamCard";
import FilterModal from "./FilterModal";
import api, { updateExamStatus } from "../utils/api";

export default function ExamList() {
  const [examSessions, setExamSessions] = useState([]);
  const [originalExamSessions, setOriginalExamSessions] = useState([]);
  const [hideFilterModal, setHideFilterModal] = useState(true);
  const [filtersObject, setFiltersObject] = useState({
    date: "",
    name: "",
    location: "",
  });

  const status = examSessions.status;

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
          session.datetime.slice(0, 10) === dateFilter? session : null
        );
      });
    }

    if (nameFilter !== "") {
      setExamSessions((currentSessions) => {
        return currentSessions.filter((session) =>
        Array.isArray(session.candidates) && 
        session.candidates.some((c) => c.name === nameFilter)
        );
      });
    }

    if (locationFilter !== "") {
      setExamSessions((currentSessions) => {
        return currentSessions.filter((session) =>
          session.location.country === locationFilter ? session : null
        );
      });
    }
  }, [filtersObject, originalExamSessions]);

  // const handleAdvanceStatus = async (examId, currentStatus) => {

  //   console.log("CLICKED:", examId, currentStatus);

  //   const nextStatus =
  //     currentStatus === "Pending" ? "started" :
  //     currentStatus === "Started" ? "finished" :
  //     null;
  
  //   if (!nextStatus) return;

  //   console.log("NEXT STATUS:", nextStatus);
  
  //   try {
  
  //     await updateExamStatus(examId, nextStatus);
  
  //     const applyUpdate = (list) =>
  //       list.map((item) =>
  //         item.id === examId
  //           ? { ...item, status: nextStatus[0].toUpperCase() + nextStatus.slice(1) } // "started" -> "Started"
  //           : item
  //       );
  
  //     setOriginalExamSessions((prev) => applyUpdate(prev));
  //     setExamSessions((prev) => applyUpdate(prev));
  //   } catch (error) {
  //     console.error("PATCH failed:", error);
  //   }
  // };

  const handleAdvanceStatus = async (examId, currentStatus) => {

    // ✅ 1 — Did the click reach the handler?
    console.log("CLICKED:", examId, currentStatus);
  
    const nextStatus =
      currentStatus === "Pending" ? "started" :
      currentStatus === "Started" ? "finished" :
      null;
  
    // ✅ 2 — Did we compute the next status correctly?
    console.log("NEXT STATUS:", nextStatus);
  
    if (!nextStatus) return;
  
    try {
  
      // ✅ 3 — Are we sending the correct PATCH data?
      console.log("SENDING PATCH:", examId, nextStatus);
  
      await updateExamStatus(examId, nextStatus);
  
      // ✅ 4 — Did the backend accept it?
      console.log("PATCH SUCCESS");
  
      const applyUpdate = (list) =>
        list.map((item) =>
          item.id === examId
            ? { ...item, status: nextStatus[0].toUpperCase() + nextStatus.slice(1) }
            : item
        );
  
      setOriginalExamSessions((prev) => applyUpdate(prev));
      setExamSessions((prev) => applyUpdate(prev));
  
      // ✅ 5 — Did state update run?
      console.log("STATE UPDATED");
  
    } catch (error) {
      console.error("PATCH FAILED:", error);
    }
  };
    
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
            <ExamCard 
            session={session} 
            key={session.id} 
            onAdvanceStatus={handleAdvanceStatus}
            />
          ))
        ) : (
          <p>No sessions to display...</p>
        )}
      </div>
    </main>
  );
}
