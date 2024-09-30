/* eslint-disable no-unused-vars */
import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import AddIcon from "@mui/icons-material/Add";
import Profile from "../Profile/Profile";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import EventIcon from '@mui/icons-material/Event';
import jwtDecode from "jwt-decode";
import axios from "axios";
import { useCallback } from "react";

function SidePanel(props) {
    const { collapseSidebar } = useProSidebar();
    const user = props.Person;
    // console.log("User:" + user);

    const [screenSize, setScreenSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        const handleResize = () => {
            setScreenSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });

            if (screenSize.width <= 756) {
                collapseSidebar(true);
            } else {
                collapseSidebar(false);
            }
        };

        window.addEventListener("resize", handleResize);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [collapseSidebar, screenSize.width]);

    let userSidePanel;
    if (user === "Admin") {
        // console.log("admin");
        userSidePanel = <AdminSidePanel />;
    } else if (user === "Student") {
        // console.log("student");
        userSidePanel = <StudentSidePanel />;
    } else if (user === "Teacher") {
        // console.log("teacher");
        userSidePanel = <TeacherSidePanel />;
    }

    return (
        <div style={({ height: "100vh" }, { display: "flex" })}>
            {userSidePanel}
            <Profile Person={props.Person} />
        </div>
    );
}



//
//
//
//
//
//
//
// 






function StudentSidePanel() {
    const { collapseSidebar } = useProSidebar();
    const navigate = useNavigate();

    const handleLogout = (e) => {
        navigate("/login");
    };

    const [screenSize, setScreenSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        const handleResize = () => {
            setScreenSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });

            if (screenSize.width <= 756) {
                collapseSidebar(true);
            } else {
                collapseSidebar(false);
            }
        };

        window.addEventListener("resize", handleResize);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [collapseSidebar, screenSize.width]);

    return (
		<div
			id="StudentSidePanel"
			style={({ height: "100%" }, { display: "flex" })}
		>
			<Sidebar style={{ height: "100%" }}>
				<Menu>
					<MenuItem
						icon={<MenuOutlinedIcon />}
						onClick={() => {
							collapseSidebar();
						}}
						style={{ textAlign: "center" }}
					>
						{" "}
						<h2>Student</h2>
					</MenuItem>

					<MenuItem
						icon={<HomeOutlinedIcon />}
						onClick={function () {
							navigate("/student/dashboard");
						}}
					>
						{" "}
						Dashboard
					</MenuItem>
					<MenuItem
						icon={<PeopleOutlinedIcon />}
						onClick={() => {
							navigate(`/announcements`);
						}}
					>
						Announcement
					</MenuItem>
					<MenuItem
						icon={<CalendarTodayOutlinedIcon />}
						onClick={function () {
							navigate("/student/attendance");
						}}
					>
						{" "}
						Attendance
					</MenuItem>
					<hr id="hr" />
					<MenuItem
						icon={<FormatListBulletedIcon />}
						onClick={function () {
							navigate("/student/marks");
						}}
					>
						Marks
					</MenuItem>
					<MenuItem icon={<ExitToAppIcon />} onClick={handleLogout}>
						LogOut
					</MenuItem>
				</Menu>
			</Sidebar>
		</div>
	);
}



//
//
//
//
//
//
//
// 






function TeacherSidePanel() {
    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const values = {
        user_id: decodedToken.username,
        userType: decodedToken.userType
    };


    // console.log(values);
    

    const [classTeacher, setClassTeacher] = useState([{}]);
    // var classes = [];
    const [classes, setClasses] = useState([]);
    const [error, setError] = useState("");

    // const [studentData, setStudentData] = useState([]);

    useEffect(() => {
        axios
            .post("http://localhost:4000/teacher/getClasses", values)
            .then((res) => {
                if(res.data.Status === "Success"){
                    // console.log([...res.data.data[1]], "data from database");
                    setClasses([...res.data.data[0]]);
                    setClassTeacher([...res.data.data[1]]);
                } else {
                    console.log(res.data.Error);
                    setError(res.data.Error);
                }
            })
            .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // console.log(classes, "classes");
    // console.log(classTeacher, "classTeacher");

    const { collapseSidebar } = useProSidebar();
    const navigate = useNavigate();
    const handleLogout = (e) => {
        // alert("Thankyou for using EduPulse!!");
        navigate("/login");
    };

    const [screenSize, setScreenSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        const handleResize = () => {
            setScreenSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });

            if (screenSize.width <= 756) {
                collapseSidebar(true);
            } else {
                collapseSidebar(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [collapseSidebar, screenSize.width]);


    // const handleMarksClick = useCallback((val) => {
    //     // const values2 = {
    //     //     user_id: values.user_id,
    //     //     userType: values.userType,
    //     //     class_id: val.class_id,
    //     //     subject_name: val.subject_name
    //     // };

        // navigate("/teacher/updateMarks", {
        //     state: {
        //         data: { ...val },
        //         studentData: [...studentData]
        //     },
        // });
    // }, []);

    // useEffect
        // console.log(values2);
        // axios
        //     .post("http://localhost:4000/teacher/getStudentData", values2)
        //     .then((res) => {
        //         if (res.data.Status === "Success") {
        //             console.log([...res.data.data], "hello");
        //             setStudentData([...res.data.data]);

        //         } else {
        //             console.log(res.data.Error);
        //             setError(res.data.Error);
        //         }
        //     })
        //     .catch((err) => console.log(err));

        
    // }
    
    return (
        <div
            id="TeacherSidePanel"
            style={
                ({ height: "100%" }, { display: "flex" })
            }
        >
            <Sidebar style={{ height: "100%" }}>
                <Menu>
                    <MenuItem
                        icon={<MenuOutlinedIcon />}
                        onClick={() => {
                            collapseSidebar();
                        }}
                        style={{ textAlign: "center" }}
                    >
                        {" "}
                        <h2>Teacher</h2>
                    </MenuItem>

                    <MenuItem
                        icon={<HomeOutlinedIcon />}
                        onClick={function () {
                            navigate(`/teacher/${values[0]}/dashboard`);
                        }}
                    >
                        Dashboard
                    </MenuItem>
                    <MenuItem icon={<PeopleOutlinedIcon />} onClick={() => {
                        navigate(`/announcements`);
                    }}>Announcement</MenuItem>
                    {classTeacher[0] && Object.values(classTeacher[0])[1] !== "No" &&
                        <MenuItem icon={<CalendarTodayOutlinedIcon />}
                            onClick={function () {
                                console.log(classTeacher[0]);
                                navigate('/teacher/updateAttendance', { 
                                    state: { data: { ...classTeacher[0] } } 
                                });
                            }}
                        >Class {Object.values(classTeacher[0])[1]} Attendance</MenuItem>
                    }

                    {classTeacher[0] && Object.values(classTeacher[0])[1] !== "No" &&
                        <MenuItem icon={<EventIcon sx={{fontSize: 30}}/>}
                            onClick={(e) => {
                                navigate(`/teacher/${values.user_id}/leaveReqs`, {
                                    state: {data: {...classTeacher[0]}}
                                });
                            }}
                        >Leave Requests</MenuItem>
                    }

                    {classes.map((val, key) => {
                        // console.log(val);
                        return (
                            <MenuItem
                                icon={<AutoStoriesIcon />}
                                onClick={() => {
                                    navigate("/teacher/updateMarks", {
                                        state: {
                                            data: { ...val }
                                            // studentData: [...studentData]
                                        },
                                    });
                                }}
                            >
                                Class {val.class_name} {val.subject_name}
                            </MenuItem>
                        );
                    })}
                    <MenuItem icon={<ExitToAppIcon />} onClick={handleLogout}>
                        LogOut
                    </MenuItem>
                </Menu>
            </Sidebar>
        </div>
    );
}


// 
// 
// 
// 
// 
// 
// 
// 



function AdminSidePanel() {
    const { collapseSidebar } = useProSidebar();
    const navigate = useNavigate();
    const handleLogout = (e) => {
        navigate("/login");
    };

    const handleCreateProfile = (e) => {
        const token = localStorage.getItem("token");
        const decodedToken = jwtDecode(token);
        const id = decodedToken.username;
        navigate(`/admin/${id}/register`);
    };

    const [screenSize, setScreenSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        const handleResize = () => {
            setScreenSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });

            if (screenSize.width <= 756) {
                collapseSidebar(true);
            } else {
                collapseSidebar(false);
            }
        };

        window.addEventListener("resize", handleResize);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [collapseSidebar, screenSize.width]);

    return (
        <div
            id="AdminSidePanel"
            style={
                ({ height: "100%" }, { display: "flex" }, {minHeight: "100vh"})
            }
        >
            <Sidebar style={{ height: "100%" }}>
                <Menu>
                    <MenuItem
                        icon={<MenuOutlinedIcon />}
                        onClick={() => {
                            collapseSidebar();
                        }}
                        style={{ textAlign: "center" }}
                    >
                        {" "}
                        <h2>Admin</h2>
                    </MenuItem>

                    <MenuItem
                        icon={<HomeOutlinedIcon />}
                        onClick={function () {
                            navigate("/admin/dashboard");
                        }}
                    >
                        Dashboard
                    </MenuItem>
                    <MenuItem icon={<PeopleOutlinedIcon />} onClick={() => {
                        navigate(`/announcements`);
                    }}>Announcement</MenuItem>
                    <MenuItem icon={<AddIcon />} onClick={handleCreateProfile}>
                        Create Profile
                    </MenuItem>
                    <MenuItem icon={<BorderColorIcon />} onClick={(e) => {
                        navigate("/admin/manageTeacher");
                    }}>
                        ManageTeacher
                    </MenuItem>
                    <MenuItem icon={<BorderColorIcon />} onClick={(e) => {
                        navigate("/admin/manageStudent");
                    }}>
                        ManageStudent
                    </MenuItem>
                    <MenuItem icon={<ExitToAppIcon />} onClick={handleLogout}>
                        LogOut
                    </MenuItem>
                </Menu>
            </Sidebar>
        </div>
    );
}

// window.onresize = resize();
export { SidePanel, StudentSidePanel, TeacherSidePanel, AdminSidePanel };

// import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
// import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
// import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
// import Collapse from "@mui/material/Collapse";
// import List from "@mui/material/List";
// import { Divider } from "@mui/material";
