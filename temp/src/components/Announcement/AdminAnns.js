/* eslint-disable no-unused-vars */
import axios from "axios";
import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import AnnCard from "./AnnCard";
import "./AdminAnns.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import AnnPopUp from "./AnnPopUp";

function AdminAnns() {
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
        getAnn();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [value, setValue] = useState("");
    // console.log(announcements);

    const [keyword, setKeyword] = useState("");
    const [filters, setFilters] = useState({
        userCategory: "",
        word: keyword,
        sortTitle: false,
    });

    // console.log(filters);

    const handleSearch = () => {
        filters.word = keyword;
        var updatedAnnouncements = announcements.filter((obj) => {
            return (
                (filters.userCategory ? obj.usertype === filters.userCategory : true) &&
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

        setKeyword("");
        getAnn();
    };

    const handleWordSearch = (e) => {
        filters.word = keyword;

        var updatedAnnouncements = [];
        if (filters.sortTitle || filters.userCategory) {
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
            <h1 className="teacher-announcement-heading">Announcements</h1>

            {/* <Dropdown >

                <Dropdown.Toggle id="button-ann">
                    Default Dropdown
                </Dropdown.Toggle>

                <Dropdown.Menu className="dropdown-menu">
                    <select
                        value={value}
                        onChange={(e) => { setValue(e.target.value) }}
                        class="form-select selectRole"
                        // className="selectRole"
                        aria-label="Default select example"
                    // autoComplete="outside"
                    >
                        <option selected value="">Select Role</option>
                        <option value="Admin">Admin</option>
                        <option value="Teacher">Teacher</option>
                    </select>
                    
                    <label>Search by Title
                    <input type="checkbox" />
                    </label><br/>
                    <button onClick={handleSearch}>Search</button>
                    <button onClick={handleRemoveFilters}>Remove Filters</button>
                </Dropdown.Menu>
            </Dropdown> */}

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
                <input
                    type="checkbox"
                    checked={filters.sortTitle}
                    onChange={(e) => {
                        setFilters({ ...filters, sortTitle: !filters.sortTitle });
                    }}
                />{" "}
                Sort by title
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
                        // console.log("hello");
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

export default AdminAnns;
