/* eslint-disable no-unused-vars */
import axios from "axios";
import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import AnnCard from "./AnnCard";
import AnnPopUp from "./AnnPopUp";
import "./StudentAnn.css";
function StudentAnns() {
  // JWT token
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const user_id = decodedToken.username;
  var userType = decodedToken.userType;

  // Announcements
  const [announcements, setAnnouncements] = useState([]);
  const [tempAnnouncement, setTempAnnouncements] = useState(announcements);
  const [subjects, setSubjects] = useState();
  const [error, setError] = useState("");

  const values = {
    user_id: user_id,
    userType: userType,
  };

  const [error2, setError2] = useState("");

  const getAnn = () => {
    axios
      .post("http://localhost:4000/student/getAnnouncements", values)
      .then((res) => {
        if (res.data.Status === "Success") {
          // console.log([...res.data.data], "hello");
          setAnnouncements([...res.data.data]);
          setTempAnnouncements(announcements);
        } else {
          console.log(res.data.Error);
          setError(res.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    // get announcements
    getAnn();
    axios
      .post("http://localhost:4000/student/getSubjects", { user_id })
      .then((res) => {
        if (res.data.Status === "Success") {
          // console.log(res.data.data);
          setSubjects(res.data.data);
        } else {
          console.log(res.data.Error);
          setError2(res.data.Error);
        }
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [keyword, setKeyword] = useState("");
  const [filters, setFilters] = useState({
    userCategory: "",
    word: keyword,
    sortTitle: false,
    subject_name: "",
  });

  // console.log(filters);

  const handleSearch = () => {
    filters.word = keyword;
    // console.log(classTeacher[0].class_teacher_flag);
    // console.log(filters.class_teacher_flag);

    var updatedAnnouncements = announcements.filter((obj) => {
      return (
        (filters.userCategory ? obj.usertype === filters.userCategory : true) &&
        (filters.subject_name
          ? obj.subject_name.toLowerCase() ===
            filters.subject_name.toLocaleLowerCase()
          : true) &&
        Object.values(obj).some((val) => {
          return keyword
            ? val.toString().toLowerCase().includes(keyword.toLowerCase())
            : true;
        })
      );
    });

    if (filters.sortTitle) {
      updatedAnnouncements = updatedAnnouncements.sort((x, y) => {
        if (x.date < y.date) return 1;
        else if (x.date > y.date) return -1;

        if (x.title < y.title) return -1;
        else if (x.title > y.title) return 1;
        return 0;
      });
    }

    // console.log(updatedAnnouncements);
    if (updatedAnnouncements.length === 0) alert("SORRY!! NO RESULTS!!");
    setTempAnnouncements(updatedAnnouncements);
  };

  const handleRemoveFilters = () => {
    filters.word = "";
    filters.sortTitle = false;
    filters.userCategory = "";
    filters.subject_name = "";

    setKeyword("");
    getAnn();
  };

  const handleWordSearch = (e) => {
    filters.word = keyword;

    var updatedAnnouncements = [];
    if (filters.sortTitle || filters.userCategory || filters.subject_name) {
      updatedAnnouncements = tempAnnouncement.filter((obj) => {
        return Object.values(obj).some((val) => {
          return val.toString().toLowerCase().includes(keyword.toLowerCase());
        });
      });
    } else {
      updatedAnnouncements = announcements.filter((obj) => {
        return Object.values(obj).some((val) => {
          return val.toString().toLowerCase().includes(keyword.toLowerCase());
        });
      });
    }

    // console.log(updatedAnnouncements);
    if (updatedAnnouncements.length === 0) alert("SORRY!! NO RESULTS!!");
    setTempAnnouncements(updatedAnnouncements);
  };

  return (
    <div>
      <h1 className="teacher-announcement-heading">Student Announcements</h1>

      <button
        onClick={() => {
          var ele = document.getElementById("filter-menu-admin");
          if (ele.classList.contains("show")) ele.classList.remove("show");
          else ele.classList.add("show");
        }}
        className="filter-admin-btn"
      >
        Filters
      </button>

      <div id="filter-menu-admin" className="filter-menu-admin">
        {/* search by user role */}
        <select
          value={filters.userCategory}
          onChange={(e) => {
            setFilters({ ...filters, userCategory: e.target.value });
          }}
          // class="form-select selectRole"
          className="selectRole"
          aria-label="Default select example"
        >
          <option defaultValue value="">
            Select Role
          </option>
          <option value="Admin">Admin</option>
          <option value="Teacher">Teacher</option>
        </select>
        <br />
        {/* Sort by title */}
        <input
          type="checkbox"
          checked={filters.sortTitle}
          onChange={(e) => {
            setFilters({ ...filters, sortTitle: !filters.sortTitle });
          }}
        />{" "}
        Sort by title
        <br />
        {/* search by subject name */}
        <select
          value={filters.subject_name}
          onChange={(e) => {
            setFilters({ ...filters, subject_name: e.target.value });
          }}
          // class="form-select selectRole"
          className="selectSubject"
          aria-label="Default select example"
        >
          <option defaultValue value="">
            Select Subject
          </option>

          {subjects?.map((val, key) => {
            var sub = val.subject_name;
            return <option value={sub}>{sub}</option>;
          })}
        </select>
        <br />
        <button onClick={handleSearch}>Search</button> <br />
        <button onClick={handleRemoveFilters}>Remove Filters</button>
      </div>

      <div className="search-filter">
        <input
          placeholder="Search Keyword"
          type="text"
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
        />
        <button onClick={handleWordSearch}>
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>

      <div className="ann-container">
        {tempAnnouncement.length > 0 ? (
          tempAnnouncement.map((val, key) => {
            const popupId = `ann-pop-up-id-${key}`;
            const cardId = `ann-card-id-${key}`;
            // console.log(popupId);
            return (
              <>
                <AnnCard data={val} id={cardId} id2={popupId} />
                <AnnPopUp data={val} id={popupId} />
              </>
            );
          })
        ) : announcements.length > 0 ? (
          announcements.map((val, key) => {
            const popupId = `ann-pop-up-id-${key}`;
            const cardId = `ann-card-id-${key}`;
            // console.log(popupId);
            return (
              <>
                <AnnCard data={val} id={cardId} id2={popupId} />
                <AnnPopUp data={val} id={popupId} />
              </>
            );
          })
        ) : (
          <div>SORRY!! NO RESULTS!!</div>
        )}
      </div>
    </div>
  );
}

export default StudentAnns;
