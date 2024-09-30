/* eslint-disable no-unused-vars */
import React from "react";
import { StudentSidePanel } from "../SidePanel/SidePanel";
import { ProSidebarProvider } from "react-pro-sidebar";
import "./viewMarks.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import jwtDecode from "jwt-decode";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
// , { useEffect, useState }

function ViewMarks() {
	// const [final, setFinal] = useState(false);

	// useEffect(() => {
	//     if(final){
	//         calculateFinal();
	//     } else {
	//         setFinal(false);
	//     }
	// }, [calculateFinal, final]);

	const token = localStorage.getItem("token");
	const decodedToken = jwtDecode(token);

	const values = {
		user_id: decodedToken.username,
		userType: decodedToken.userType,
	};

	var [studentData, setStudentData] = useState([]);
	const [error, setError] = useState("");

	useEffect(() => {
		axios
			.post("http://localhost:4000/student/getMarks", values)
			.then((res) => {
				if (res.data.Status === "Success") {
					console.log([...res.data.data], "data from database");
					setStudentData(res.data.data);
				} else {
					console.log(res.data.Error);
					setError(res.data.Error);
				}
			})
			.catch((err) => console.log(err));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// console.log(studentData);

	function checkRemark(mark) {
		let m = parseFloat(mark);
		return m >= 33 ? "Pass" : "Fail";
	}

	function checkGrade(val) {
		console.log(val);

		// console.log(parseFloat(val.MST4));
		let mark =
			parseFloat(val.annual || 0) +
			parseFloat(val.half_yearly || 0) +
			(parseFloat(val.MST1 || 0) +
				parseFloat(val.MST2 || 0) +
				parseFloat(val.MST3 || 0) +
				parseFloat(val.MST4 || 0));
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
				grade = "C";
				break;
		}

		// console.log([mark, grade]);
		return [mark, grade];
	}

	// useEffect(() => {
	//     return () => {
	//         axios
	//             .post("http://localhost:4000/student/updateMarks", studentData)
	//             .then((res) => {
	//                 if (res.data.Status === "Success") {
	//                     // console.log([...res.data.data], "data from database");
	//                     setStudentData(res.data.data);
	//                 } else {
	//                     console.log(res.data.Error);
	//                     setError(res.data.Error);
	//                 }
	//             })
	//             .catch((err) => console.log(err));
	//         };
	//         // eslint-disable-next-line react-hooks/exhaustive-deps
	// }, []);

	let percent = 0;
	let status = "Pass";

	function calculateFinal() {
		let count = 0;
		studentData = studentData.map((val, key) => {
			val.remark = checkRemark(val.annual);
			count += val.remark === "Fail" ? 1 : 0;
			[val.percent, val.grade] = checkGrade(val);
			// console.log(val);
			return val;
		});

		if (count > 1) status = "Fail";

		for (let index = 0; index < studentData.length; index++) {
			const element = studentData[index];
			percent += parseFloat(element.percent || 0);
		}

		percent = parseFloat((percent / 5).toFixed(2));
	}
	const HandlePrint = () => {
		window.print();
	};

	calculateFinal();

	return (
		<div id="ViewMarks">
			<ProSidebarProvider>
				<StudentSidePanel />
			</ProSidebarProvider>
			<div className="studentMarks" id="markSheet">
				<div className="marks-heading">Marks</div>
				<MDBTable className="table-marks">
					<MDBTableHead>
						<tr>
							<th className="viewMarks-th">Subject</th>
							<th className="viewMarks-th">MST1</th>
							<th className="viewMarks-th">MST2</th>
							<th className="viewMarks-th">Half Yearly</th>
							<th className="viewMarks-th">MST3</th>
							<th className="viewMarks-th">MST4</th>
							<th className="viewMarks-th">Annual</th>
							<th className="viewMarks-th">Percent(%)</th>
							<th className="viewMarks-th">Grade</th>
							<th className="viewMarks-th">Remark</th>
						</tr>
					</MDBTableHead>
					<MDBTableBody>
						{studentData.map((val, key) => {
							return (
								<tr key={key}>
									<th className="subjects viewMarks-th">
										{val.subject_name}
									</th>
									<td className="viewMarks-td">
										{val.MST1 || "-"}
									</td>
									<td className="viewMarks-td">
										{val.MST2 || "-"}
									</td>
									<td className="viewMarks-td">
										{val.half_yearly || "-"}
									</td>
									<td className="viewMarks-td">
										{val.MST3 || "-"}
									</td>
									<td className="viewMarks-td">
										{val.MST4 || "-"}
									</td>
									<td className="viewMarks-td">
										{val.annual || "-"}
									</td>
									<td className="viewMarks-td">
										{val.percent || "-"}
									</td>
									<td className="viewMarks-td">
										{val.grade || "-"}
									</td>
									<td className="remark viewMarks-td">
										{val.remark || "-"}
									</td>
								</tr>
							);
						})}
					</MDBTableBody>
				</MDBTable>
				<div className="percent-marks">Percent : {percent}%</div>
				<div className="Status status-marks">
					Status : {status}
					<div cl>
						{status === "Fail"
							? "Better Luck next time"
							: "Well done!!!"}
					</div>
				</div>
				<div>
					<h6 style={{ color: "red" }}>
						*Note: Grade is based on the average of all Exams.
					</h6>
					<br />
				</div>

				<div>
					<button onClick={HandlePrint}>Print</button>
				</div>
			</div>
		</div>
	);
}

export default ViewMarks;
