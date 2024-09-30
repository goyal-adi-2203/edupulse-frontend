import React from "react";
import { SidePanel } from "../SidePanel/SidePanel";
import { ProSidebarProvider } from "react-pro-sidebar";

function Dashboard(props) {
  return (
    <>
      <ProSidebarProvider>
        <SidePanel Person={props.Person} />
      </ProSidebarProvider>
    </>
  );
}

export default Dashboard;
