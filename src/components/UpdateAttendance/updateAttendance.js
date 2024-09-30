/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { TeacherSidePanel } from "../SidePanel/SidePanel";
import { ProSidebarProvider } from "react-pro-sidebar";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import "./updateAttendance.css";
// , { useEffect, useState }

function UpdateAttendance() {
	// useNavigate hook
	const navigate = useNavigate();

	// data from previous page
	const location = useLocation();
	const data = { ...location.state.data };
	const class_name = data.class_name;
	const class_id = data.class_teacher_flag;

	// JWT token
	const token = localStorage.getItem("token");
	const decodedToken = jwtDecode(token);
	const user_id = decodedToken.username;

	// studentData
	const [studentData, setStudentData] = useState([]);
	const [error, setError] = useState("");

	// Attendance Data
	var [attendanceData, setAttendanceData] = useState([]);
	const [error2, setError2] = useState("");

	// console.log(attendanceData, "attendancedata");

	const today = new Date();
	let toDay = today.getDate();
	let todayMonth = today.getMonth() + 1;
	let todayYear = today.getFullYear();
	if (today.getMonth() + 1 < 10) todayMonth = "0" + todayMonth;
	if (today.getDate() < 10) toDay = "0" + toDay;

	const TODAY = todayYear + "-" + todayMonth + "-" + toDay;

	const [buttonText, setButtonText] = useState("Edit");
	const [globalEnable, setGlobalEnable] = useState(false);

	const getDateRange = (start, end) => {
		for (
			var arr = [], dt = new Date(start);
			dt <= new Date(end);
			dt.setDate(dt.getDate() + 1)
		) {
			var d = new Date(dt);
			let dDay = d.getDate();
			let dMonth = d.getMonth() + 1;
			let dYear = d.getFullYear();
			if (d.getMonth() + 1 < 10) dMonth = "0" + dMonth;
			if (d.getDate() < 10) dDay = "0" + dDay;

			let t = dYear + "-" + dMonth + "-" + dDay;
			// console.log(t);

			var obj = {
				date: t,
				totPresent: "0",
			};

			arr.push(obj);
		}

		return arr;
	};

	const addDate = () => {
		let obj = attendanceData.find((o, i) => {
			if (o.date === TODAY) {
				return true;
			}

			return false;
		});

		if (obj === undefined) {
			var arr = [...attendanceData];
			studentData.map((val, key) => {
				let obj = {
					student_id: val.student_id,
					class_id: class_id,
					date: TODAY,
					flag: "1",
				};

				attendanceData.push(obj);
				return { ...val };
			});

			// setAttendanceData(arr);
		}
	};
	addDate();
	// console.log(attendanceData, "attendance");

	const [dateArray, setDateArray] = useState(
		getDateRange(
			new Date().setDate(today.getDate() - 3),
			new Date().setDate(today.getDate() + 1)
		)
	);

	if (dateArray === undefined) {
		getDateRange(
			new Date().setDate(today.getDate() - 3),
			new Date().setDate(today.getDate() + 1)
		);
	}

	const values = {
		class_id: class_id,
	};

	const values2 = {
		class_id: class_id,
		dates: [...dateArray],
	};

	useEffect(() => {
		axios
			.post(
				"http://localhost:4000/teacher/getStudentDataAttendance",
				values
			)
			.then((res) => {
				if (res.data.Status === "Success") {
					// console.log([...res.data.data], "hello");
					setStudentData([...res.data.data]);
				} else {
					console.log(res.data.Error);
					setError(res.data.Error);
				}
			})
			.catch((err) => console.log(err));

		axios
			.post("http://localhost:4000/teacher/getAttendanceData", values2)
			.then((res) => {
				if (res.data.Status === "Success") {
					// console.log([...res.data.data], "hello");
					setAttendanceData([...res.data.data]);
				} else {
					console.log(res.data.Error);
					setError(res.data.Error);
				}
			})
			.catch((err) => console.log(err));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleEditButton = () => {
		if (!globalEnable) {
			setGlobalEnable(true);
			setButtonText("Save");
		} else {
			setButtonText("Edit");
			setGlobalEnable(false);
		}
	};

	const [error3, setError3] = useState();
	const handleSubmit = () => {
		const updateAttendanceArray = [...attendanceData];
		// console.log(updateAttendanceArray, "in submit");

		const values3 = {
			class_id: class_id,
			attendanceRecord: updateAttendanceArray,
		};

		// updating Attendance
		axios
			.post("http://localhost:4000/teacher/updateAttendance", values3)
			.then((res) => {
				if (res.data.Status === "Success") {
					alert("Submitted Successfully");
				} else {
					console.log(res.data.Error);
					setError3(res.data.Error);
				}
			})
			.catch((err) => console.log(err));

		var updatedDateArray = [...dateArray];
		updatedDateArray = updatedDateArray.map((val, key) => {
			var count = 0;
			for (let i = 0; i < attendanceData.length; i++) {
				if (val.date === attendanceData[i].date) {
					if (attendanceData[i].flag === "0") {
						count++;
					}
				}
			}
			// alert(count);
			val.totPresent = count;
			// alert(val.totPresent);
			return val;
		});
		// console.log(updatedDateArray);
		setDateArray(updatedDateArray);

		const checkAttend = (val, f) => {
			// eslint-disable-next-line array-callback-return
			var obj = attendanceData.find((o, i) => {
				if (o.student_id === val.student_id && o.date === TODAY) {
					return o.flag === f;
				}
			});
		};

		var updateStudentData = [...studentData];
		updateStudentData = updateStudentData.map((val, key) => {
			var present = parseFloat(val.present);
			var absent = parseFloat(val.absent);

			// present += checkAttend(val.student_id, "0");
			// absent += checkAttend(val.student_id, "1");

			var percent = ((present * 100) / (present + absent)).toFixed(2);
			val.Percent = percent + "%";
			return val;
		});

		// console.log(updateStudentData);
		setStudentData(updateStudentData);
	};

	function ChecklistItem(props) {
		var [isActive, setIsActive] = useState(false);
		// const key = props.key;

		const current = props.val.date;
		const student_id = props.student_id;

		// eslint-disable-next-line react-hooks/exhaustive-deps
		// const updatedDateArray = [...dateArray];
		const updatedArray = [...attendanceData];

		useEffect(() => {
			updatedArray.find((o, i) => {
				if (o.student_id === student_id && o.date === current) {
					if (o.flag === "0") setIsActive(true);
					// else if(o.flag === "2") setIsActive(false);
					else setIsActive(false);
					return true;
				}
				return false;
			});
		});

		var enable = "disabled";
		if (globalEnable) {
			enable = "";
			// eslint-disable-next-line eqeqeq
		} else if (
			// eslint-disable-next-line eqeqeq
			current[8] + current[9] == toDay &&
			// eslint-disable-next-line eqeqeq
			current[5] + current[6] == todayMonth
		) {
			enable = "";
		}

		const handleChange = (active) => {
			// console.log(student_id);

			// console.log(updatedArray);
			let obj = updatedArray.find((o, i) => {
				if (o.student_id === student_id && o.date === current) {
					let t = updatedArray[i].flag;
					if (t !== "2") {
						updatedArray[i].flag = t === "0" ? "1" : "0";
						setIsActive(active);
						// console.log(updatedArray, o);
						setAttendanceData(updatedArray);
						// console.log(updatedArray);
					} else {
						// console.log(document.getElementById(`${student_id}-${TODAY}`).classList);
						// document.getElementById(`${student_id}-${TODAY}`).classList.add("btn-transition");
						// document.getElementById(`${student_id}-${TODAY}`).classList.remove("btn-transition");

						const ele = document.getElementById(
							`${student_id}-${TODAY}`
						);
						ele.style.backgroundColor = "red";
						// ele.classList.add('btn-transition');

						setTimeout(() => {
							ele.style.backgroundColor = "";
							// ele.classList.remove('btn-transition');
						}, 1000);

						// setTimeout(()=>{
						//     console.log("jj");
						// }, 1000);
					}

					return true;
				}
				return false;
			});

			if (obj === undefined) {
				// console.log("hello");
				let obj = {
					student_id: student_id,
					date: current,
					flag: active ? "0" : "1",
				};

				// console.log(obj);
				updatedArray.push(obj);
				setAttendanceData(updatedArray);
				setIsActive(active);
				// console.log(updatedArray);
			}
		};

		return (
			<input
				type="checkbox"
				checked={isActive}
				onChange={(e) => handleChange(e.target.checked)}
				disabled={enable}
				name="attendance_check"
			/>
		);
	}

	function ShowLeave(props) {
		const updateAttendanceArray = [...attendanceData];
		const sid = props.sid;
		const [error5, setError5] = useState();

		const f = attendanceData.find((o, i) => {
			if (o.student_id === sid && o.date === TODAY && o.flag === "2")
				return true;

			return false;
		});

		return (
			<div>
				{f && (
					<button
						type="button"
						className="btn btn-primary onleave-btn"
						id={`${sid}-${TODAY}`}
						onClick={(e) => {
							// console.log(e.target.id);
							const ele = document.getElementById(e.target.id);
							ele.classList.add("btn-tranition");
							ele.classList.remove("btn-tranition");
						}}
					>
						On Leave
					</button>
				)}
			</div>
		);
	}

	const handleStudentRedirection = (val) => {
		console.log(val);
		navigate(`/student/attendance`, {
			state: {
				data: { id: val.student_id, user_id: user_id, data: data },
			},
		});
	};

	return (
		<div id="ViewAttendance">
			{/* <div id="student_idePanel">
                <ProSidebarProvider>
                    <TeacherSidePanel />
                </ProSidebarProvider>
            </div> */}

			<div className="classAttendance" id="classAttendance">
				<h1 className="classHeading">Class {class_name} Attendance</h1>
				<div className="attendanceList">
					<MDBTable className="table-attendance-update ">
						<MDBTableHead
							className="student-list-update-heading"
							dark={true}
						>
							<tr>
								<td colSpan={13}>Attendance List</td>
							</tr>
						</MDBTableHead>
						<MDBTableHead>
							<tr>
								<th className="updateAttendance-th">S. No.</th>
								<th className="updateAttendance-th">Sid</th>
								<th className="updateAttendance-th">SName</th>
								{dateArray.map((val, key) => {
									const date = val.date;
									var mon = "";
									switch (date[5] + date[6]) {
										case "01":
											mon = "Jan";
											break;
										case "02":
											mon = "Feb";
											break;
										case "03":
											mon = "Mar";
											break;
										case "04":
											mon = "Apr";
											break;
										case "05":
											mon = "May";
											break;
										case "06":
											mon = "Jun";
											break;
										case "07":
											mon = "Jul";
											break;
										case "08":
											mon = "Aug";
											break;
										case "09":
											mon = "Sep";
											break;
										case "10":
											mon = "Oct";
											break;
										case "11":
											mon = "Nov";
											break;
										case "12":
											mon = "Dec";
											break;
										default:
											break;
									}
									return (
										<th
											className="updateAttendance-th"
											key={key}
										>
											{date[8] + date[9] + " " + mon}
										</th>
									);
								})}
								<th className="updateAttendance-th">Leave</th>
								{/* <th className="updateAttendance-th">Percent</th> */}
							</tr>
						</MDBTableHead>
						<tbody>
							{studentData.map((val, key) => {
								const student_id = val.student_id;
								return (
									<tr key={student_id}>
										<td className="updateAttendance-td">
											{key + 1}.
										</td>
										<td className="updateAttendance-td">
											{student_id}
										</td>
										<td
											className="updateAttendance-td attendance-stu-name"
											onClick={() => {
												handleStudentRedirection(val);
											}}
										>
											{val.first_name} {val.last_name}
										</td>
										{dateArray.map((val, key) => {
											return (
												<td
													className="updateAttendance-td"
													key={key}
												>
													<ChecklistItem
														val={val}
														key={key}
														student_id={student_id}
													/>
												</td>
											);
										})}
										<td className="updateAttendance-td">
											<ShowLeave sid={student_id} />
										</td>
										{/* <td className="updateAttendance-td">{val.tot_atten_percent}</td> */}
									</tr>
								);
							})}

							<tr id="totPresent">
								<td className="totPresent1 updateAttendance-td"></td>
								<td className="totPresent1 updateAttendance-td">
									Total
								</td>
								<td className="totPresent2 updateAttendance-td">
									Present :
								</td>
								{dateArray.map((val, key) => {
									return (
										<td
											className="totPresentCount"
											key={key}
										>
											{val.totPresent}
										</td>
									);
								})}
							</tr>
						</tbody>
					</MDBTable>

					<div className="attendance-buttons">
						<button
							className="button-55"
							id="attendanceEditButton"
							onClick={handleEditButton}
						>
							{buttonText}
						</button>

						<button
							className="button-55"
							id="attendanceSubmitButton"
							onClick={handleSubmit}
						>
							Submit
						</button>
					</div>
					<button
						style={{ marginBottom: "2%" }}
						className="button-55"
						onClick={() => {
							navigate(`/teacher/${user_id}/dashboard`);
						}}
					>
						Go to Dashboard
					</button>
				</div>
			</div>
		</div>
	);
}

export default UpdateAttendance;
