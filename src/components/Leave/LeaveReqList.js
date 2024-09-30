/* eslint-disable no-unused-vars */
import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdb-react-ui-kit";
import "./LeaveReqList.css";


function LeaveReqList() {
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
	const userType = decodedToken.userType;

	// console.log(data, user_id, userType)
	var [leaveData, setLeaveData] = useState([]);
	const [error, setError] = useState("");

	// delete mode
	const [deleteMode, setDeleteMode] = useState(false);
	var [dltReqArr, setDltReqArr] = useState([]);

	const getLeaves = () => {
		axios
			.post("http://localhost:4000/teacher/getLeaveReqs", { class_id })
			.then((res) => {
				if (res.data.Status === "Success") {
					var t = res.data.data;
					// t = t.map((val, key) => {
					// return ({ ...val, accepted: false });
					// });
					// console.log(t, "hello");
					setLeaveData(t);
				} else {
					console.log(res.data.Error);
					setError(res.data.Error);
				}
			})
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		getLeaves();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	function LeaveRow(props) {
		const val = props.props.val;
		const key = props.props.key;

		const [accept, setAccept] = useState(val.accepted);
		// console.log(accept, "leave");
		// console.log(val, "row");

		const handleAcceptance = (e) => {
			const values = {
				...val,
				accepted: accept ? 0 : 1,
			};

			// console.log(values);

			axios
				.post("http://localhost:4000/teacher/leaveAccept", values)
				.then((res) => {
					if (res.data.Status === "Success") {
						alert(
							"Leave " +
								(values.accepted ? "Accepted" : "Denied") +
								" of " +
								val.student_id
						);
					} else {
						alert("Failed to update status!");
						setError(res.data.Error);
					}
				})
				.catch((err) => console.log(err));
		};

		function DelCheck() {
			var [check, setCheck] = useState(() => {
				return dltReqArr.find((o, i) => {
					if (o === val.id) return true;
					else return false;
				})
					? true
					: false;
			});

			// console.log(check);
			const handleDLtCheck = (e) => {
				var updatedArr = dltReqArr;

				if (!check) updatedArr.push(val.id);
				else updatedArr = updatedArr.filter((e) => e !== val.id);
				// console.log(updatedArr);
				setDltReqArr(updatedArr);
				setCheck(!check);
			};

			return (
				<div>
					<input
						type="checkbox"
						onChange={(e) => handleDLtCheck(e)}
						checked={check}
					/>
				</div>
			);
		}

		return (
			<tr>
				<td className="leave-req-td">
					{!deleteMode ? `${key + 1}.` : <DelCheck />}
				</td>
				<td className="leave-req-td">{val.student_id}</td>
				<td className="leave-req-td">
					{val.first_name + " " + val.last_name}
				</td>
				<td className="leave-req-td">{val.class_id}</td>
				<td className="leave-req-td">{val.date_asked}</td>
				<td className="leave-req-td">{val.date_from}</td>
				<td className="leave-req-td">{val.date_to}</td>
				<td className="leave-req-td">{val.subject}</td>
				<td className="leave-req-td leave-reason">
					{val.reason?.length > 10 ? "View Reason..." : ""}
					{val.reason?.length > 10 ? (
						<div className="leave-reason-expanded">
							Reason :
							<br />
							{val.reason}
						</div>
					) : (
						val.reason
					)}
				</td>

				<td className="leave-req-td">
					<button
						className="leave-action-btn"
						onClick={(e) => {
							leaveData[key].accepted = accept ? 0 : 1;
							setAccept(accept ? 0 : 1);
							handleAcceptance(e);
						}}
					>
						{accept ? (
							<i className="fa-sharp fa-regular fa-circle-check leave-accept"></i>
						) : (
							<i className="fa-sharp fa-regular fa-circle-xmark leave-denied"></i>
						)}
					</button>
				</td>

				<td className="leave-req-td">
					{accept ? "Accepted" : "Not Accepted"}
				</td>
			</tr>
		);
	}

	const handleDelReqs = (e) => {
		var dltBtn = document.getElementById(`dlt-leave-btn-id`);

		if (dltBtn.innerHTML === "Submit") {
			// console.log(dltReqArr);
			if (dltReqArr.length === 0) {
				dltBtn.innerHTML = "Delete Reqs";
				// setDltReqArr([]);
				setDeleteMode(!deleteMode);
				// getLeaves();
			} else {
				axios
					.post("http://localhost:4000/teacher/deleteLeaves", {
						dltReqArr,
					})
					.then((res) => {
						if (res.data.Status === "Success") {
							alert("Deleted", dltReqArr);
							// console.log(res.data.data);
							dltBtn.innerHTML = "Delete Reqs";
							setDltReqArr([]);
							setDeleteMode(!deleteMode);
							getLeaves();
						} else {
							alert("Failed to update status!");
							console.log(res.data.Error);
							setError(res.data.Error);
						}
					})
					.catch((err) => console.log(err));
			}

			dltBtn.classList.remove("btn-primary");
			dltBtn.classList.add("btn-danger");
		} else {
			dltBtn.innerHTML = "Submit";
			// console.log(e.target.classList);
			dltBtn.classList.remove("btn-danger");
			dltBtn.classList.add("btn-primary");
			setDeleteMode(!deleteMode);
		}
	};

	return (
		<div className="leave-reqs">
			<div className="leave-req-heading">
				<h1>Leave Requests</h1>
			</div>

			<div className="dlt-leave-btn-container">
				<button
					type="button"
					onClick={(e) => handleDelReqs(e)}
					className="btn btn-danger dlt-leave-btn"
					id="dlt-leave-btn-id"
				>
					Delete Reqs
				</button>
			</div>

			<MDBTable className="leave-req-table">
				<MDBTableHead>
					<tr className="leave-req-col-head">
						<th className="leave-req-th">
							<span className="border-limit"></span>
							{!deleteMode ? `S. No.` : `Delete`}
						</th>
						<th className="leave-req-th">
							<span className="border-limit"></span>
							Student Id
						</th>
						<th className="leave-req-th">
							<span className="border-limit"></span>
							Student Name
						</th>
						<th className="leave-req-th">
							<span className="border-limit"></span>
							Class
						</th>
						<th className="leave-req-th">
							<span className="border-limit"></span>
							Date Asked
						</th>
						<th className="leave-req-th">
							<span className="border-limit"></span>
							From
						</th>
						<th className="leave-req-th">
							<span className="border-limit"></span>
							To
						</th>
						<th className="leave-req-th">
							<span className="border-limit"></span>
							Subject
						</th>
						<th className="leave-req-th leave-reason">
							<span className="border-limit"></span>
							Reason
						</th>
						<th className="leave-req-th">
							<span className="border-limit"></span>
							Accept
						</th>
						<th className="leave-req-th">
							<span
								className="border-limit"
								style={{ border: "none" }}
							></span>
							Status
						</th>
					</tr>
				</MDBTableHead>
				<MDBTableBody>
					{leaveData.map((val, key) => {
						// console.log(key);
						const props = { val: val, key: key };
						return <LeaveRow props={props} key={key} />;
					})}
				</MDBTableBody>
			</MDBTable>

			<div>
				<button
					className="button-89"
					onClick={(e) => navigate(`/teacher/${user_id}/dashboard`)}
				>
					Go to Dashboard
				</button>
			</div>
		</div>
	);
}

export { LeaveReqList };
