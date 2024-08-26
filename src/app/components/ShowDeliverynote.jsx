import Link from "next/link";
import { listDeliverynote, downloadDeliverynote } from "../utils/user"; // Importa la función de descarga
import { useEffect, useState } from "react";
import ImageRandom from "./ImageRandom";

export default function ShowDeliverynote() {
  const [token, setToken] = useState(null);
  const [deliverynoteData, setDeliverynoteData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("jwt");
      setToken(storedToken);
      console.log("token :", storedToken);
    }
  }, []);

  useEffect(() => {
    if (token) {
      const fetchClientData = async () => {
        try {
          const recordDeliverynote = await listDeliverynote(token); // Cambiar storedToken por token
          setDeliverynoteData(recordDeliverynote);
        } catch (err) {
          setError(err.message);
        }
      };

      fetchClientData();
    }
  }, [token]);

  const handleDownload = async (id) => {
    try {
      const pdfBlob = await downloadDeliverynote(id, token);
      const url = window.URL.createObjectURL(new Blob([pdfBlob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `albaran_${id}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (err) {
      console.error("Error downloading the delivery note:", err);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }
  if (deliverynoteData.length === 0 || !deliverynoteData) {
    return (
      <>
        <div className="">
          <h2 className="text-2xl">
            Parece que no tienes ningún albaran todavia!
          </h2>
          <div className=" text-center mt-20 mb-10">
            <Link
              href="/user/deliverynotes/note"
              className="rounded-sm text-white font-bold bg-cyan-700 w-fit p-4"
            >
              Crea tu primer albaran
            </Link>
          </div>
        </div>
      </>
    );
  }
  console.log(deliverynoteData);

  return (
    <div>
      <div className="grid grid-cols-1 w-full">
        <div className="flex">
          <div>
            {deliverynoteData.map((deliveryNotes) => (
              <div
                className="flex justify-center items-center"
                key={deliveryNotes._id}
              >
                <div className="flex justify-center items-center bg-blue-100 p-4 m-4 rounded-md w-full ">
                  <div>
                    <ImageRandom />
                  </div>
                  <Link href={`/user/deliveryNotes/${deliveryNotes._id}`}>
                    <div className="p-4">
                      <h2 className=" text-xl text-orange-600 text-right font-bold">
                        Id del Albaran: {deliveryNotes._id}
                      </h2>
                      <p>Id cliente: {deliveryNotes.clientId}</p>
                      <div>
                        Informacion de su proyecto:
                        <pre>
                          {JSON.stringify(deliveryNotes.projectId, null, 2)}
                        </pre>
                      </div>
                    </div>
                  </Link>
                  <button
                    className="mt-4 p-2 bg-green-500 text-white rounded-lg"
                    onClick={() => handleDownload(deliveryNotes._id)}
                  >
                    Descargar Albarán
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
