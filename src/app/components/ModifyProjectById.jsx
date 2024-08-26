"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { modifyInfoProject } from "../utils/user";
import { useEffect, useState } from "react";

export default function ModifyProjectById({ projectId, projectData, updateProjectData }) {
  const [token, setToken] = useState(null);
  console.log(projectId);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: projectData,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("jwt");
      setToken(storedToken);

      console.log("token :", storedToken);
      console.log("idProjecto en ProjectForm", projectId);

      // Inicializar valores del formulario
      if (projectData) {
        Object.keys(projectData).forEach((key) => {
          setValue(key, projectData[key]);
        });
        if (projectData.address) {
          Object.keys(projectData.address).forEach((key) => {
            setValue(`address.${key}`, projectData.address[key]);
          });
        }
      }
    }
  }, [projectData, setValue]);

  const router = useRouter();

  const onSubmit = async (data) => {
    console.log("data en componente", data);
    console.log("id", projectId);
    console.log("token", typeof token);
    console.log("tipoe de data", typeof data);

    try {
      const res = await modifyInfoProject(projectId, token, data);
      alert("El proyecto ha sido asignado al cliente con éxito");
      await updateProjectData(); // Actualizar los datos del proyecto
      router.push(`/user/projects/${projectId}`);
      if (res.token) {
        localStorage.setItem("jwt", res.token);
      } else {
        throw new Error("Failed to register project.");
      }
    } catch (error) {
      console.error("Error during submission:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="p-10 w-full">
        <h1 className="mt-8 text-4xl font-extrabold p-1 text-blue-500">
          Integra los nuevos datos del proyecto
        </h1>
        <div className="p-4 mt-10 ">
          <div className="text-xl">
            <label className="p-2" htmlFor="name">
              Nombre del Proyecto
            </label>
            <input
              className="mt-3 peer block w-full rounded-md border border-gray-200 p-3 text-xl outline-2 text-scale-600"
              type="text"
              id="name"
              {...register("name", { required: true, maxLength: 20 })}
            />
            {errors.name && <p>{errors.name.message}</p>}
          </div>

          <div className="text-xl">
            <label className="p-2" htmlFor="code">
              Codigo
            </label>
            <input
              className="mt-3 peer block w-full rounded-md border border-gray-200 p-3 text-xl outline-2 text-scale-600"
              type="text"
              id="code"
              {...register("code", { required: true })}
            />
            {errors.code && <p>{errors.code.message}</p>}
          </div>

          <div className="text-xl">
            <label className="p-2" htmlFor="email">
              Email
            </label>
            <input
              className="mt-3 peer block w-full rounded-md border border-gray-200 p-3 text-xl outline-2 text-scale-600"
              type="email"
              id="email"
              {...register("email", { required: true })}
            />
            {errors.email && <p>{errors.email.message}</p>}
          </div>
        </div>

        <div className="p-4 m text-xl h-10">
          <label htmlFor="address">Domicilio Fiscal: </label>
        </div>
        <div className="text-xl">
          <label className="p-2" htmlFor="address.street">
            Calle
          </label>
          <input
            className="peer block w-full rounded-md border border-gray-200 p-3 text-xl outline-2 text-scale-600"
            type="text"
            id="address.street"
            {...register("address.street", {
              required: "Street is required",
            })}
          />
          {errors.address?.street && <p>{errors.address.street.message}</p>}
        </div>

        <div className="text-xl">
          <label className="p-2" htmlFor="address.number">
            Número
          </label>
          <input
            className="peer block w-full rounded-md border border-gray-200 p-3 text-xl outline-2 text-scale-600"
            type="text"
            id="address.number"
            {...register("address.number", {
              required: "Number is required",
            })}
          />
          {errors.address?.number && <p>{errors.address.number.message}</p>}
        </div>

        <div className="text-xl">
          <label className="p-2" htmlFor="address.postal">
            Código Postal
          </label>
          <input
            className="peer block w-full rounded-md border border-gray-200 p-3 text-xl outline-2 text-scale-600"
            type="text"
            id="address.postal"
            {...register("address.postal", {
              required: "Postal code is required",
            })}
          />
          {errors.address?.postal && <p>{errors.address.postal.message}</p>}
        </div>

        <div className="text-xl">
          <label className="p-2" htmlFor="address.city">
            Ciudad
          </label>
          <input
            className="peer block w-full rounded-md border border-gray-200 p-3 text-xl outline-2 text-scale-600"
            type="text"
            id="address.city"
            {...register("address.city", {
              required: "City is required",
            })}
          />
          {errors.address?.city && <p>{errors.address.city.message}</p>}
        </div>

        <div className="text-xl">
          <label className="p-2" htmlFor="address.province">
            Provincia
          </label>
          <input
            className="peer block w-full rounded-md border border-gray-200 p-3 text-xl outline-2 text-scale-600"
            type="text"
            id="address.province"
            {...register("address.province", {
              required: "Province is required",
            })}
          />
          {errors.address?.province && <p>{errors.address.province.message}</p>}
        </div>

        <button
          type="submit"
          className="mt-4 p-2 bg-green-500 text-white rounded-lg"
        >
          Guardar Cambios
        </button>
      </form>
    </>
  );
}
