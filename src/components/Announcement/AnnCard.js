/* eslint-disable no-unused-vars */
import jwtDecode from "jwt-decode";
import React, { useState } from "react";
// import fs from 'fs';

import "./AnnCard.css";
import axios from "axios";

function AnnCard(props) {
    // JWT token
    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    const user_id = decodedToken.username;
    var userType = decodedToken.userType;

    // announcements
    const announcement = props.data;
    const key = props.id;
    const key2 = props.id2;

    // const annCard = document.getElementById(key);
    // const annPopUp = document.getElementById(key2);

    const [error, setError] = useState();
    const handleDelete = () => {
        axios
            .delete(`http://localhost:4000/deleteAnnouncement/${announcement.ann_id}`)
            .then((res) => {
                if (res.data.Status === "Success") {
                    alert("Done");
                    window.location.reload();
                    // const ele = document.getElementById("ann-dlt-popup");
                    // ele.style.translate = "0px 0px";
                } else {
                    console.log(res.data.Error);
                    setError(res.data.Error);
                }
            })
            .catch((err) => console.log(err));
    }


    const MyComp = () => {
        if (announcement.subject_name && announcement.class_id)
            return (
                <div>
                    <hr style={{ color: "black", borderTop: "2px solid" }} />
                    <div className="ann-card-teacher-data">
                        Class : {announcement.class_id}
                    </div>
                    <div className="ann-card-teacher-data">
                        Subject : {announcement.subject_name}
                    </div>
                    <hr style={{ color: "black", borderTop: "2px solid" }} />
                </div>
            );

        return <></>;
    };


    return (
        <div className="ann-card-container">
            

            <div id={key} className="ann-card">
                <h3 className="ann-card-title">{announcement.title}</h3>
                <span className="ann-card-date">Date - {announcement.date} </span>
                <br />
                <span className="ann-card-by">
                    By - {announcement.first_name} {announcement.last_name}
                </span>
                <span className="ann-card-id">{announcement.user_id}</span> <br />
                <MyComp />

                {(user_id === announcement.user_id) ?
                    <div className="popup-card-btns">
                        <button
                            className="popup-announcement-button button-17"
                            onClick={(e) => {
                                document.getElementById(key2).classList.add("show");
                            }}
                        >
                            View More
                        </button>

                        <button
                            className="popup-announcement-button dlt-btn button-17"
                            onClick={handleDelete}
                        >
                            Delete
                        </button>

                    </div>
                    :
                    <button
                        className="popup-announcement-button-org button-17"
                        onClick={(e) => {
                            document.getElementById(key2).classList.add("show");
                        }}
                    >
                        View More
                    </button>
                }
            </div>
        </div>
    );
}

export default AnnCard;
