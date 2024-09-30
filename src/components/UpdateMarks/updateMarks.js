/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { TeacherSidePanel } from "../SidePanel/SidePanel";
import { ProSidebarProvider } from "react-pro-sidebar";
import { useLocation } from "react-router-dom";
import "./updateMarks.css";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { useEffect } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

function UpdateMarks() {
    const location = useLocation();
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    const user_id = decodedToken.username;

    const data = { ...location.state.data };
    // console.log(data, "data");
    const class_name = data.class_name;
    const class_id = data.class_id;
    const subject_name = data.subject_name;

    // console.log(class_id, subject_name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const values = {
        class_id: class_id,
        subject_name: subject_name,
    };

    // console.log(values);
    // console.log([...location.state.studentData],"hemlo");
    var [studentData, setStudentData] = useState([]);
    const [error, setError] = useState("");

    const values2 = Object.values(values);
    // console.log(values2, "values2");
    useEffect(() => {
        axios
            .post("http://localhost:4000/teacher/getStudentDataMark", values)
            .then((res) => {
                if (res.data.Status === "Success") {
                    // console.log([...res.data.data], "hello");
                    let temp = [...res.data.data];
                    for (let i = 0; i < temp.length; i++) {
                        temp[i].Enable = "disabled";
                    }
                    setStudentData([...res.data.data]);
                } else {
                    console.log(res.data.Error);
                    setError(res.data.Error);
                }
            })
            .catch((err) => console.log(err));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // console.log(studentData, "dsldff");
    // const sub_id = data.sub_id;

    // eslint-disable-next-line react-hooks/exhaustive-deps

    const onChangeInput = (name, value, k) => {
        const updatedData = [...studentData];
        updatedData[k][name] = value;
        setStudentData(updatedData);
    };

    const handleClick = (key) => {
        const updatedData = [...studentData];
        updatedData[key].Enable = "";
        setStudentData(updatedData);
    };

    const handleSubmit = () => {
        const values3 = {
            studentData: [...studentData],
            subject_name: { ...values },
        };

        // console.log(studentData);
        const updatedData = [...studentData];
        for (let i = 0; i < updatedData.length; i++) {
            updatedData[i].Enable = "disabled";
        }

        setStudentData(updatedData);
        axios
            .post("http://localhost:4000/teacher/studentUpdateMarks", values3)
            .then((res) => {
                if (res.data.Status === "Success") {
                    // console.log(res.data.data);
                    // alert("Submitted Successfully!!!");
                    const ele = document.getElementById("marks-submit-success-popup");
                    ele.style.translate = "0px 0px";
                } else {
                    console.log(res.data.Error);
                    setError(res.data.Error);
                }
            })
            .catch((err) => console.log(err));
    };

    let flag = false;
    function calculateFinal() {
        var updatedData = [...studentData];

        const checkRemark = (mark) => {
            if (mark)
                if (mark >= 33) return "Pass";
                else return "Fail";
            else return "-";
        };

        const checkGrade = (val) => {
            const annual = parseFloat(val.annual ? val.annual : 0);
            const halfYearly = parseFloat(val.half_yearly ? val.half_yearly : 0);
            const mst1 = parseFloat(val.MST1 ? val.MST1 : 0);
            const mst2 = parseFloat(val.MST2 ? val.MST2 : 0);
            const mst3 = parseFloat(val.MST3 ? val.MST3 : 0);
            const mst4 = parseFloat(val.MST4 ? val.MST4 : 0);

            let mark = annual + halfYearly + (mst1 + mst2 + mst3 + mst4);
            mark = (mark * 100) / 280;
            mark = parseFloat(mark.toFixed(2));

            var grade = "";

            switch (true) {
                case mark < 33:
                    grade = "F";
                    break;
                case mark < 45:
                    grade = "E";
                    break;
                case mark < 60:
                    grade = "D";
                    break;
                case mark < 75:
                    grade = "C";
                    break;
                case mark < 90:
                    grade = "B";
                    break;
                case mark <= 100:
                    grade = "A";
                    break;
                default:
                    grade = "-";
                    break;
            }

            return [mark, grade];
        };

        updatedData = updatedData.map((val, key) => {
            const [mark, grade] = checkGrade(val);
            const remark = checkRemark(mark);

            if (flag) {
                val.grade = "-";
                val.percent = "-";
                val.remark = "-";
            } else {
                val.percent = mark;
                val.grade = grade;
                val.remark = remark;
            }

            return val;
        });

        if (flag) {
            alert("Exams Remaining!");
        }

        setStudentData(updatedData);
        // console.log(updatedData);
    }

    return (
        <div id="ViewMarks">
            {/* <div id="sidePanel">
                <ProSidebarProvider>
                    <TeacherSidePanel />
                </ProSidebarProvider>
            </div> */}
            <div className="submit-success" id="marks-submit-success-popup">
                <button 
                    className="box-close"
                    id="close-popup-marks-success"
                    onClick={(e) => {
                        const ele = document.getElementById("marks-submit-success-popup");
                        ele.style.translate = "0px -2000px";
                    }}
                >
                    x
                </button>

                <div className="central-success-icon">
                    <i className="fa-sharp fa-regular fa-circle-check leave-accept"></i>
                </div>

                <div className="submit-success-statement">
                    Submitted Successfully!!
                </div>
            </div>

            <div className="classMarks" id="classMarks">
                <h1 className="classHeading">
                    Class {class_name} {subject_name}
                </h1>
                <div className="markList">
                    <MDBTable className="table-marks-update">
                        <MDBTableHead className="student-list-update-heading" dark={true}>
                            <tr>
                                <td colSpan={13}>Student's Marks List</td>
                            </tr>
                        </MDBTableHead>
                        <MDBTableHead>
                            <tr>
                                <th className="updateMarks-th">S. No.</th>
                                <th className="updateMarks-th">Sid</th>
                                <th className="updateMarks-th">Name</th>
                                <th className="updateMarks-th">MST1</th>
                                <th className="updateMarks-th">MST2</th>
                                <th className="updateMarks-th">Half-Yearly</th>
                                <th className="updateMarks-th">MST3</th>
                                <th className="updateMarks-th">MST4</th>
                                <th className="updateMarks-th">Annual</th>
                                <th className="updateMarks-th">Grade</th>
                                <th className="updateMarks-th">Percent</th>
                                <th className="updateMarks-th">Remark</th>
                                <th className="updateMarks-th" id="action">
                                    Edit Details
                                </th>
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                            {studentData.map((val, key) => (
                                <tr key={val.sid}>
                                    <td className="update-marks-td">{key + 1}.</td>
                                    <td className="update-marks-td">{val.student_id}</td>
                                    <td className="update-marks-td">
                                        {val.first_name} {val.last_name}
                                    </td>
                                    <td className="update-marks-td">
                                        <input
                                            name="MST1"
                                            value={val.MST1}
                                            className="td-input-update-marks"
                                            type="text"
                                            onChange={(e) =>
                                                onChangeInput(e.target.name, e.target.value, key)
                                            }
                                            placeholder="MST1"
                                            disabled={val.Enable}
                                        />
                                    </td>
                                    <td className="update-marks-td ">
                                        <input
                                            name="MST2"
                                            className="td-input-update-marks"
                                            value={val.MST2}
                                            type="text"
                                            onChange={(e) =>
                                                onChangeInput(e.target.name, e.target.value, key)
                                            }
                                            placeholder="MST2"
                                            disabled={val.Enable}
                                        />
                                    </td>
                                    <td className="update-marks-td">
                                        <input
                                            name="half_yearly"
                                            className="td-input-update-marks"
                                            value={val.half_yearly}
                                            type="text"
                                            onChange={(e) =>
                                                onChangeInput(e.target.name, e.target.value, key)
                                            }
                                            placeholder="half_yearly"
                                            disabled={val.Enable}
                                        />
                                    </td>
                                    <td className="update-marks-td">
                                        <input
                                            name="MST3"
                                            className="td-input-update-marks"
                                            value={val.MST3}
                                            type="text"
                                            onChange={(e) =>
                                                onChangeInput(e.target.name, e.target.value, key)
                                            }
                                            placeholder="MST3"
                                            disabled={val.Enable}
                                        />
                                    </td>
                                    <td className="update-marks-td">
                                        <input
                                            name="MST4"
                                            className="td-input-update-marks"
                                            value={val.MST4}
                                            type="text"
                                            onChange={(e) =>
                                                onChangeInput(e.target.name, e.target.value, key)
                                            }
                                            placeholder="MST4"
                                            disabled={val.Enable}
                                        />
                                    </td>

                                    <td className="update-marks-td">
                                        <input
                                            name="annual"
                                            className="td-input-update-marks"
                                            value={val.annual}
                                            type="text"
                                            onChange={(e) =>
                                                onChangeInput(e.target.name, e.target.value, key)
                                            }
                                            placeholder="annual"
                                            disabled={val.Enable}
                                        />
                                    </td>
                                    <td className="update-marks-td">{val.grade}</td>
                                    <td className="update-marks-td">{val.percent}</td>
                                    <td className="update-marks-td">{val.remark}</td>
                                    <td className="update-marks-td">
                                        <button
                                            className="button-18"
                                            // role="button"
                                            onClick={() => handleClick(key)}
                                        >
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </MDBTableBody>
                    </MDBTable>
                    <div
                        style={{ padding: "1%", display: "flex", justifyContent: "center" }}
                    >
                        <div style={{ marginRight: "30%" }}>
                            <button
                                onClick={handleSubmit}
                                className="button-89"
                            // role="button"
                            >
                                Submit
                            </button>
                        </div>
                        <div style={{ marginLeft: "20%" }}>
                            <button className="button-89" onClick={calculateFinal}>
                                Calculate Grades
                            </button>
                        </div>
                    </div>

                    <div>
                        <button
                            className="button-89"
                            onClick={(e) => navigate(`/teacher/${user_id}/dashboard`)}
                        >
                            Go to Dashboard
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpdateMarks;

// <input
//     name="MST1"
//     value={val.MST1}
//     type="text"
//     onChange={(e) => onChangeInput(e.target.name, e.target.value, key)}
//     placeholder="MST1 marks"
// />

/* CSS */
