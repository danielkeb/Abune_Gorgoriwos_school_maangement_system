import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';

const ReadingMaterials = () => {
    const [materials, setMaterials] = useState([]);
    const [filter, setFilter] = useState("");
    const [pdfUrl, setPdfUrl] = useState('');
    const [showPdf, setShowPdf] = useState(false);

    useEffect(() => {
        fetchMaterials();
    }, [filter]); // Fetch materials whenever filter changes

    const fetchMaterials = async () => {
        try {
            const response = await axios.get("http://localhost:3333/coursematerial/get");
            let filteredMaterials = response.data;

            // Filter materials based on the keyword
            if (filter.trim() !== "") {
                filteredMaterials = response.data.filter(material =>
                    material.description.toLowerCase().includes(filter.toLowerCase())
                );
            }

            setMaterials(filteredMaterials);
        } catch (error) {
            console.error("Error fetching materials:", error);
        }
    };

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    const handleOpenMaterial = async (filename) => {
        setShowPdf(true);
        try {
            const response = await axios.get(`http://localhost:3333/${filename}`, { responseType: 'blob' });
            const url = URL.createObjectURL(response.data);
            setPdfUrl(url);
        } catch (error) {
            console.error("Error opening material:", error);
            toast.error("Error opening material");
        }
    };

    const handleClosePdf = () => {
        setShowPdf(false);
    };

    return (
        <div className="w-full p-2 mt-0 text-center">
            {!showPdf && (
                <div className="w-full max-w-md">
                    <input
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded-md mb-4 block"
                        placeholder="Filter by keyword (e.g., description)"
                        value={filter}
                        onChange={handleFilterChange}
                    />

                    {materials.map((material) => (
                        <div key={material.id} className="flex justify-between items-center border border-gray-300 rounded-md p-3 mb-2">
                            <div>{material.description}</div>
                            <div>
                                <button className="text-blue-500 hover:underline mr-2" onClick={() => handleOpenMaterial(material.file)}>
                                    Open
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {pdfUrl && showPdf && (
                <div>
                    <div className="p-0 mt-0 px right-0" style={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-start" }}>
                            <IconButton onClick={handleClosePdf} style={{ color: "black"}}>
                                <CancelIcon />
                            </IconButton>
                        </div>

                    <iframe id="pdfViewer" src={pdfUrl} style={{ width: '100%', height: '650px' }} />
                </div>
            )}

            <ToastContainer position="bottom-right" />
        </div>
    );
};

export default ReadingMaterials;
