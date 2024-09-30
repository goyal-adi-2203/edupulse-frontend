/* eslint-disable no-unused-vars */
import axios from "axios";
import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import AnnCard from "./AnnCard";
import AnnPopUp from "./AnnPopUp";
import "./TeacherAnns.css";

function TeacherAnns() {
    // JWT token
    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    const user_id = decodedToken.username;
    var userType = decodedToken.userType;

    // Announcements
    const [announcements, setAnnouncements] = useState([]);
    const [tempAnnouncement, setTempAnnouncements] = useState(announcements);
    const [error, setError] = useState("");

    const values = {
        user_id: user_id,
        userType: userType,
    };

    const [classTeacher, setClassTeacher] = useState([{}]);
    // var classes = [];
    const [classes, setClasses] = useState([]);
    const [error2, setError2] = useState("");

    const getAnn = () => {
        axios
            .post("http://localhost:4000/admin/getAnnouncements", values)
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
            .post("http://localhost:4000/teacher/getClasses", values)
            .then((res) => {
                if (res.data.Status === "Success") {
                    // console.log([...res.data.data[1]], "data from database");
                    setClasses([...res.data.data[0]]);
                    setClassTeacher([...res.data.data[1]]);
                } else {
                    console.log(res.data.Error);
                    setError2(res.data.Error);
                }
            })
            .catch((err) => console.log(err));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [value, setValue] = useState("");

    const [keyword, setKeyword] = useState("");
    const [filters, setFilters] = useState({
        userCategory: "",
        word: keyword,
        sortTitle: false,
        class_teacher_flag: false,
        class_id: 0,
        subject_name: "",
    });

    // console.log(filters);

    const handleSearch = () => {
        filters.word = keyword;
        // console.log(classTeacher[0].class_teacher_flag);
        // console.log(filters.class_teacher_flag);

        var updatedAnnouncements = announcements.filter((obj) => {
            // console.log(classTeacher[0].class_teacher_flag);

            // console.log(obj.class_id == classTeacher[0].class_teacher_flag);
            return (
                (filters.userCategory ? obj.usertype === filters.userCategory : true) &&
                (filters.class_teacher_flag
                    ? parseInt(obj.class_id) === classTeacher[0].class_teacher_flag
                    : true) &&
                (filters.class_id ? obj.class_id === filters.class_id : true) &&
                (filters.subject_name
                    ? obj.subject_name === filters.subject_name
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
        filters.class_id = 0;
        filters.class_teacher_flag = false;
        filters.subject_name = "";

        setKeyword("");
        getAnn();
    };

    const handleWordSearch = (e) => {
        filters.word = keyword;

        var updatedAnnouncements = [];
        if (
            filters.sortTitle ||
            filters.userCategory ||
            filters.class_id ||
            filters.class_teacher_flag ||
            filters.subject_name
        ) {
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

    // console.log(classTeacher);
    // console.log(classes);

    return (
        <div>
            <h1 className="teacher-announcement-heading">Announcements</h1>

            {/* <div className="dlt-success" id="ann-dlt-popup">
                <button
                    className="box-close"
                    id="close-popup-dlt-success"
                    onClick={(e) => {
                        const ele = document.getElementById("ann-dlt-popup");
                        ele.style.translate = "0px -2000px";
                    }}
                >
                    x
                </button>

                <div className="central-success-icon">
                    <i className="fa-sharp fa-regular fa-circle-check leave-accept"></i>
                </div>

                <div className="submit-success-statement">
                    Deleted Successfully!!
                </div>
            </div> */}

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
                {/* Search for teacher's class if class teacher */}
                {classTeacher[0] && Object.values(classTeacher[0])[1] !== "No" && (
                    <div>
                        <input
                            type="checkbox"
                            checked={filters.class_teacher_flag}
                            onChange={(e) => {
                                setFilters({
                                    ...filters,
                                    class_teacher_flag: !filters.class_teacher_flag,
                                });
                            }}
                        />{" "}
                        Search for my class (Class : {classTeacher[0].class_name})
                    </div>
                )}
                <br />
                {/* Search for teacher's subjects */}
                <select
                    value={`${filters.class_id}-${filters.subject_name}`}
                    onChange={(e) => {
                        var t = e.target.value;
                        var a = t.slice(0, t.lastIndexOf("-"));
                        var b = t.slice(t.lastIndexOf("-") + 1);

                        setFilters({ ...filters, class_id: a, subject_name: b });
                    }}
                    className="selectSubject"
                    aria-label="Default select example"
                >
                    <option defaultValue value="">
                        Select Subject
                    </option>
                    {classes.map((val, key) => {
                        return (
                            <option
                                value={classes[key].class_id + "-" + classes[key].subject_name}
                            >
                                {classes[key].class_id + "-" + classes[key].subject_name}
                            </option>
                        );
                    })}
                </select>
                <br />
                <button onClick={handleSearch}>Search</button> <br />
                <button onClick={handleRemoveFilters}>Remove Filters</button>
            </div>

            <div className="search-filter">
                <input
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

export default TeacherAnns;
