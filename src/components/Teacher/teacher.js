/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { AdminSidePanel } from "../SidePanel/SidePanel";
import { ProSidebarProvider } from "react-pro-sidebar";
import jwtDecode from "jwt-decode";
import "./teacher.css";

function Teacher() {
	const [data, setData] = useState([]);
	const token = localStorage.getItem("token");
	const decodedToken = jwtDecode(token);
	const username = decodedToken.username;
	useEffect(() => {
		axios
			.get("http://localhost:4000/getTeacher")
			.then((res) => {
				if (res.data.Status === "Success") {
					setData(res.data.Result);
				} else {
					alert("Error");
				}
			})
			.catch((err) => console.log(err));
	}, []);

	const handleDelete = (teacher_id) => {
		axios
			.delete(`http://localhost:4000/delete/${teacher_id}`)
			.then((res) => {
				if (res.data.Status === "Success") {
					alert("Successfully Deleted");
					window.location.reload(true);
				} else {
					alert("Error");
				}
			})
			.catch((err) => console.log(err));
	};

	return (
		<div id="manageTeacher" style={{ display: "flex" }}>
			<ProSidebarProvider>
				<AdminSidePanel />
			</ProSidebarProvider>

			<div className="container px-5 py-3">
				<div className="row">
					<div className="d-flex justify-content-center">
						<h3>Teacher List</h3>
					</div>
					<div>
						<Link
							to={`/admin/${username}/register`}
							className="btn btn-success"
						>
							Add Teacher
						</Link>
					</div>
				</div>
				<div className="mt-3">
					<table className="table">
						<thead>
							<tr>
								<th>Teacher Id</th>
								<th>First Name</th>
								<th>Last Name</th>
								{/* <th>Email</th> */}
								<th>Phone No</th>
								<th>Gender</th>
								<th>Address</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{data.map((teacher, index) => {
								return (
									<tr key={index}>
										<td>{teacher.teacher_id}</td>
										<td>{teacher.first_name}</td>
										<td>{teacher.last_name}</td>
										{/* <td>{teacher.email}</td> */}
										<td>{teacher.phone_no}</td>
										<td>{teacher.gender}</td>
										<td>
											{teacher.flat_no +
												" " +
												teacher.colony +
												" " +
												teacher.district}
										</td>
										<td className="action-btns">
											<Link
												to={`/admin/editTeacher/${teacher.teacher_id}`}
												className="btn btn-primary btn-sm me-2"
											>
												edit
											</Link>
											<button
												onClick={() =>
													handleDelete(
														teacher.teacher_id
													)
												}
												className="btn btn-sm btn-danger"
											>
												delete
											</button>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}

export default Teacher;
