/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../../context/authContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import jwtDecode from "jwt-decode";
import Image from "../../assets/img.png";
import axios from "axios";
import "./createAnn.css";
import { Page, Document } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

import { pdfjs } from "react-pdf";

function CreateAnnouncement() {
    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const values = {
        user_id: decodedToken.username,
        userType: decodedToken.userType,
    };

    // date
    var today = new Date();
    let todayDate = today.getDate();
    let todayMonth = today.getMonth() + 1;
    let todayYear = today.getFullYear();
    // console.log(today.getMonth());
    if (today.getMonth() + 1 < 10) todayMonth = "0" + todayMonth;
    if (today.getDate() < 10) todayDate = "0" + todayDate;
    const currentDate = todayYear + "-" + todayMonth + "-" + todayDate;

    // userInfo
    const [userInfo, setUserInfo] = useState(["Admin"]);
    const [error, setError] = useState("");

    // annnoucement
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [classId, setClassId] = useState("");
    const [subject, setSubject] = useState("");
    const [file, setFile] = useState();
    const [imgURL, setImgurl] = useState("");

    const [page, setPage] = useState(1);

    var extension = file
        ? file.name.substring(file.name.lastIndexOf(".") + 1)
        : "";

    useEffect(() => {
        axios
            .post("http://localhost:4000/getData", values)
            .then((res) => {
                if (res.data.Status === "Success") {
                    // console.log([...res.data.data], 'wjdbvjhwb');
                    setUserInfo([...res.data.data]);
                } else {
                    console.log(res.data.Error);
                    setError(res.data.Error);
                }
            })
            .catch((err) => console.log(err));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // alert(title+content);

    // handle Post announcement
    const handlePost = async (e) => {
        e.preventDefault();
        if (title && content) {
            // alert(title + '\n' + content);

            let imgURL = "";
            if (file) {
                const formData = new FormData();
                formData.append("file", file);

                await axios
                    .post("http://localhost:4000/api/upload", formData)
                    .then((res) => {
                        if (res.data.Status === "Success") {
                            imgURL = res.data.data;
                            // console.log(imgURL, "hemlo");
                            setImgurl(res.data.data);
                        } else {
                            console.log(res.data.Error);
                            throw Error("Upload Failed!");
                        }
                    })
                    .catch((err) => console.log(err));
            }

            // console.log(imgURL,"outside");
            // console.log();
            setTitle("");
            setContent("");
            setImgurl("");
            setFile(null);
            setClassId("");
            setSubject("");

            var values2 = [
                values.user_id,
                values.userType,
                userInfo[0].first_name,
                userInfo[0].last_name,
                classId || "",
                subject || "",
                currentDate,
                title,
                content,
                imgURL || "",
            ];

            // console.log(values2);
            axios
                .post("http://localhost:4000/addAnnouncement", values2)
                .then((res) => {
                    if (res.data.Status === "Success") {
                        alert("Post added");
                        window.location.reload();
                    } else {
                        console.log(res.data.Error);
                    }
                })
                .catch((err) => console.log(err));
        } else {
            alert("Please fill all the fields");
        }
    };
    // console.log(imgURL, "handlePost");
    // console.log();

    const MyDocument = () => {
        pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

        return (
            <Document file={URL.createObjectURL(file)} className="pdf-preview">
                <Page
                    pageNumber={page}
                    width={200}
                    onClick={(e) => {
                        // alert(page);
                        if (page === URL.createObjectURL(file).numPages) {
                            alert("pdf completed!!");
                            return;
                        }
                        setPage(page + 1);
                    }}
                    onLoadError={(error) => {
                        alert(`No pages! Redirecting to first`);
                        setPage(1);
                    }}
                />
            </Document>
        );
    };

    return (
        <div className="create-ann-box">
            <div className="ann-heading">
                <h3 className="post-announcement-heading">Post Announcement</h3>
            </div>

            <hr className="horizontal-line" />

            <div className="top-row-create-ann">
                <div className="user-info">
                    <span className="user-type">{values.userType} : </span>
                    <span className="user-name">
                        {userInfo[0].first_name} {userInfo[0].last_name}
                    </span>
                    <span className="user-id"> {values.user_id} </span>
                </div>
                <div className="today-date">
                    <span className="today-date-span">DATE: </span>
                    {currentDate}
                </div>
            </div>

            <hr className="horizontal-line" />

            <div className="post-announcement container">
                {values.userType === "Teacher" && (
                    <>
                        <div className="row create-ann-input-div">
                            <div className="col-1 ">
                                {" "}
                                <label className="label-create-announcement">Class : </label>
                            </div>
                            <div className="col">
                                <input
                                    type="text"
                                    className="input-boxes"
                                    placeholder={`Class`}
                                    value={classId}
                                    onChange={(e) => setClassId(e.target.value)}
                                    required={true}
                                />
                            </div>
                        </div>

                        <div className="row create-ann-input-div">
                            <div className="col-1">
                                <label className="label-create-announcement">Subject : </label>
                            </div>
                            <div className="col">
                                <input
                                    type="text"
                                    className="input-boxes "
                                    placeholder={`Subject`}
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                    required={true}
                                />
                            </div>
                        </div>
                    </>
                )}

                <div className="row create-ann-input-div">
                    <div className="col-1">
                        <label className="label-create-announcement">Title : </label>
                    </div>

                    <div className="col">
                        <input
                            type="text"
                            className="input-boxes"
                            placeholder={`Announcement Title`}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required={true}
                        />
                    </div>
                </div>

                <div className="row create-ann-input-div">
                    <div className="col-1">
                        <label className="label-create-announcement">Content : </label>
                    </div>
                    <div className="col">
                        <textarea
                            className="input-boxes text-content-box"
                            placeholder={`Announcement Content`}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required={true}
                        >
                            Enter content here
                        </textarea>
                    </div>

                    {/* <input
                        type="text"
                        className="ann-content"
                        placeholder={`Create Announcement`}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required={true}
                    /> */}
                </div>

                <div className="img-preview">
                    {file &&
                        (((extension === "pdf" || extension === "PDF") && (
                            <MyDocument />
                        )) || (
                                <img
                                    width={250}
                                    className="ann-img-preview"
                                    alt=""
                                    src={URL.createObjectURL(file)}
                                />
                            ))}
                </div>
            </div>

            <hr className="horizontal-line" />

            <div className="ann-image">
                <input
                    type="file"
                    id="ann-file"
                    style={{ display: "none" }}
                    onChange={(e) => {
                        setPage(1);
                        setFile(e.target.files[0]);
                    }}
                />
                <div className="announcement-upload-buttons">
                    <div>
                        <label htmlFor="ann-file">
                            <div className="ann-file">
                                <span className="btn btn-primary">Upload File</span>
                            </div>
                        </label>
                    </div>
                    <div>
                        <button
                            className="btn btn-danger"
                            onClick={(e) => {
                                setFile(null);
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>

            <div className="submit-ann">
                <button className="button-30" onClick={handlePost}>
                    Post
                </button>
            </div>
        </div>
    );
}

export default CreateAnnouncement;
