import React, { useEffect, useState } from "react";
import { TiThList } from "react-icons/ti";
import { someAction } from '../../Actions/DataAction';
import "./NavBar.css";
import { useSelector, useDispatch } from "react-redux";
import { selectData } from "../../Actions/DataAction";

// Utility to get local storage values with a default fallback
const getLocalStorageValue = (key, defaultValue) => {
  return localStorage.getItem(key) || defaultValue;
};

const NavBar = () => {
  const [displayOnClick, setDisplayOnClick] = useState(false);
  const dispatch = useDispatch();
  const { allTickets, allUser } = useSelector((state) => state.DataReducer);
  
  // Get initial values from localStorage
  const [groupValue, setGroupValue] = useState(getLocalStorageValue("group", "status"));
  const [orderValue, setOrderValue] = useState(getLocalStorageValue("order", "priority"));

  const handleGroupValue = (e, isGroup) => {
    const value = e.target.value;
    if (isGroup) {
      setGroupValue(value);
      localStorage.setItem("group", value);
    } else {
      setOrderValue(value);
      localStorage.setItem("order", value);
    }
    setDisplayOnClick(false); // Hide dropdown on selection
  };

  useEffect(() => {
    dispatch(
      selectData(
        groupValue,
        groupValue === "user" ? { allTickets, allUser } : allTickets,
        orderValue
      )
    );
  }, [groupValue, orderValue, allTickets, allUser, dispatch]);

  return (
    <div className="top-header" style={{ paddingLeft: "13px" }}>
      <div className="displayButton">
        <button
          className="p-10 f-16 btn"
          onClick={() => setDisplayOnClick(!displayOnClick)}
        >
          <TiThList /> Display
        </button>
        {displayOnClick && (
          <div className="dropOnClick flex-gap-10 p-10">
            <div className="selectGroup flex-sb">
              <span style={{ fontSize: "14px", color: "#555B5A" }}>Grouping</span>
              <select
                value={groupValue}
                onChange={(e) => handleGroupValue(e, true)}
                className="selectStyle"
              >
                <option value="status">Status</option>
                <option value="user">User</option>
                <option value="priority">Priority</option>
              </select>
            </div>
            <div className="selectGroup flex-sb">
              <span style={{ fontSize: "14px", color: "#555B5A" }}>Ordering</span>
              <select
                value={orderValue}
                onChange={(e) => handleGroupValue(e, false)}
                className="selectStyle"
              >
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
