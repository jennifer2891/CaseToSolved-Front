import { infoProject } from "../utils/user";
import { useEffect, useState } from "react";
import ModifyProjectById from "./ModifyProjectById";
import Link from "next/link";

export default function ProjectID({ id }) {
  const [token, setToken] = useState(null);
  const [recordProject, setRecordProject] = useState({});
  const [error, setError] = useState(null);
  const [showModifyForm, setShowModifyForm] = useState(false);
  const [storeProjectID, setProjectID] = useState(null);
  const [storeClientID, setClientID] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("jwt");
      setToken(storedToken);
      localStorage.setItem("projectId", id);
      console.log("id del proyecto", id);
    }
  }, [id]);

  useEffect(() => {
    if (token) {
      const fetchClientDataByID = async () => {
        try {
          const recordProject = await infoProject(id, token);
          setRecordProject(recordProject);
          setClientID(recordProject.clientId);
          setProjectID(recordProject._id);
          console.log("recordProject:", recordProject);
          console.log("recordProject.clientId:", recordProject.clientId);
          console.log("recordProject.projectId:", recordProject._id);
        } catch (err) {
          setError(err.message);
        }
      };

      fetchClientDataByID();
    }
  }, [token, id, storeClientID, storeProjectID]);

  const updateProjectData = async () => {
    if (token) {
      try {
        const updatedProject = await infoProject(id, token);
        setRecordProject(updatedProject);
      } catch (err) {
        setError(err.message);
      }
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container border w-full bg-white text-black p-4 rounded-lg shadow-lg">
      <h1>Client Information</h1>
      <pre className="text-white bg-slate-950 ">
        {JSON.stringify(recordProject, null, 2)}
      </pre>
      <button
        className="mt-4 p-2 bg-blue-500 text-white"
        onClick={() => setShowModifyForm(!showModifyForm)}
      >
        Modificar Información
      </button>
      {showModifyForm && (
        <ModifyProjectById
          projectId={id}
          projectData={recordProject}
          updateProjectData={updateProjectData}
        />
      )}
      <div className="border mt-10 flex">
        <Link
          className="border p-5 bg-white"
          href="/user/deliverynotes/new/hour"
        >
          Agregar un albaran horas
        </Link>
        <Link
          className="border p-5 bg-white"
          href="/user/deliverynotes/new/material"
        >
          Agregar un albaran material
        </Link>
      </div>
    </div>
  );
}
