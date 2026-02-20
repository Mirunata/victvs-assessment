import { useEffect, useState } from "react";
import ExamCard from "./ExamCard";
import FilterModal from "./FilterModal";
import api, { updateExamStatus } from "../utils/api";
import SortModal from "./SortModal";

export default function ExamList() {
  const [examSessions, setExamSessions] = useState([]);
  const [originalExamSessions, setOriginalExamSessions] = useState([]);
  const [hideFilterModal, setHideFilterModal] = useState(true);
  const [filtersObject, setFiltersObject] = useState({
    date: "",
    name: "",
    location: "",
  });

  const [hideSortModal, setHideSortModal] = useState(true);
  const [sortObject, setSortObject] = useState({ field: "date", direction: "asc" });
  

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
    let updated = [...originalExamSessions];
  
    const { date, name, location } = filtersObject;
  
    if (date !== "") {
      updated = updated.filter(
        (session) => session.datetime.slice(0, 10) === date
      );
    }
  
    if (name !== "") {
      updated = updated.filter(
        (session) =>
          Array.isArray(session.candidates) &&
          session.candidates.some((c) => c.name === name)
      );
    }
  
    if (location !== "") {
      updated = updated.filter(
        (session) => session.location.country === location
      );
    }

    const dir = sortObject.direction === "asc" ? 1 : -1;
  
    updated.sort((a, b) => {
      if (sortObject.field === "date") {
        return (a.datetime || "").localeCompare(b.datetime || "") * dir;
      }
  
      if (sortObject.field === "location") {
        return (
          (a.location?.country || "").localeCompare(
            b.location?.country || ""
          ) * dir
        );
      }
  
      if (sortObject.field === "status") {
        return (a.status || "").localeCompare(b.status || "") * dir;
      }
  
      if (sortObject.field === "candidate") {
        const aName = a.candidates?.[0]?.name || "";
        const bName = b.candidates?.[0]?.name || "";
        return aName.localeCompare(bName) * dir;
      }
  
      return 0;
    });
  
    setExamSessions(updated);
  
  }, [filtersObject, originalExamSessions, sortObject]);
  

  const handleAdvanceStatus = async (examId, currentStatus) => {

    // 1 Did the click reach the handler?
    console.log("CLICKED:", examId, currentStatus);
  
    const nextStatus =
      currentStatus === "Pending" ? "started" :
      currentStatus === "Started" ? "finished" :
      null;
  
    // 2 Did we compute the next status correctly?
    console.log("NEXT STATUS:", nextStatus);
  
    if (!nextStatus) return;
  
    try {
  
      // 3 Are we sending the correct PATCH data?
      console.log("SENDING PATCH:", examId, nextStatus);
  
      await updateExamStatus(examId, nextStatus);
  
      // 4 Did the backend accept it?
      console.log("PATCH SUCCESS");
  
      const applyUpdate = (list) =>
        list.map((item) =>
          item.id === examId
            ? { ...item, status: nextStatus[0].toUpperCase() + nextStatus.slice(1) }
            : item
        );
  
      setOriginalExamSessions((prev) => applyUpdate(prev));
      setExamSessions((prev) => applyUpdate(prev));
  
      // 5 Did state update run?
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
        <SortModal 
          hide={hideSortModal}
          setHide={setHideSortModal}
          setSortObject={setSortObject}
        />
        <div className="FilterContainer">
          <button
            className="FilterButton"
            onClick={() => setHideFilterModal(false)}
          >
            👁 Filters
          </button>
          <button
            className="FilterButton"
            onClick={() => setExamSessions(originalExamSessions)}
          >
            ↻ Reset
          </button>
          <button className="FilterButton" onClick={() => setHideSortModal(false)}>
          ✨ Sort
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
