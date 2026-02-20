import { useState } from "react";
import { toast } from "react-hot-toast";

export default function SortModal(props) {
  const [sortField, setSortField] = useState("date"); // date | candidate | location | status
  const [sortDirection, setSortDirection] = useState("asc"); // asc | desc

  const toastStyle = {
    style: {
      borderRadius: "12px",
      padding: "12px",
      color: "#02020a",
      backgroundColor: "#FFFFFF",
    },
  };

  if (props.hide) {
    return null;
  }

  const handleApplySort = () => {
    const params = { field: sortField, direction: sortDirection };

    toast(
      `Sorting by: ${params.field}\nDirection: ${params.direction}`,
      toastStyle
    );

    props.setSortObject(params);
    props.setHide(true);
  };

  const handleClose = () => {
    props.setHide(true);
  };

  return (
    <div className="FilterModal">
      <div className="ModalContentSort">
        <div className="ModalHeader">
          <h4 className="ModalTitle">Sort Exam Sessions</h4>
        </div>

        <div className="ModalBodySort">
          <div className="FilterField">
            <label htmlFor="sort-field" className="SortLabel">Sort By</label>
            <select
              id="sort-field"
              value={sortField}
              onChange={(e) => setSortField(e.target.value)}
            >
              <option value="date">Date</option>
              <option value="candidate">Candidate</option>
              <option value="location">Location</option>
              <option value="status">Status</option>
            </select>
          </div>

          <div className="FilterField">
            <label htmlFor="sort-direction" className="SortLabel">Direction</label>
            <select
              id="sort-direction"
              value={sortDirection}
              onChange={(e) => setSortDirection(e.target.value)}
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>

          <div className="ButtonField">
            <button className="AddFilterBtn" onClick={handleApplySort}>
              ⇅ Apply Sort
            </button>
          </div>
        </div>

        <div className="ModalFooter">
          <button className="Button" onClick={handleClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
