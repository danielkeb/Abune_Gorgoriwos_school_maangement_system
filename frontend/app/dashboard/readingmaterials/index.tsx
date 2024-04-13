import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';
import styles from '../styles/ReadingMaterialsCss.module.css';
const ReadingMaterials = () => {
    const [materials, setMaterials] = useState([]);
    const [filter, setFilter] = useState("");
    const [selectedGrade, setSelectedGrade] = useState("");
    const [selectedSubject, setSelectedSubject] = useState("");
    const [pdfUrl, setPdfUrl] = useState('');
    const [showPdf, setShowPdf] = useState(false);

    useEffect(() => {
        fetchMaterials();
    }, [filter, selectedGrade, selectedSubject]); // Fetch materials whenever filter or selectedGrade or selectedSubject changes

    const fetchMaterials = async () => {
        try {
            const response = await axios.get("http://localhost:3333/coursematerial/get");
            let filteredMaterials = response.data;

            // Filter materials based on the keyword
            if (filter.trim() !== "") {
                filteredMaterials = filteredMaterials.filter(material =>
                    material.description.toLowerCase().includes(filter.toLowerCase())
                );
            }

            // Filter materials based on grade
            if (selectedGrade !== "") {
                filteredMaterials = filteredMaterials.filter(material =>
                    material.gradeLevel.some(grade => grade.grade === selectedGrade)
                );
            }

            // Filter materials based on subject name
            if (selectedSubject !== "") {
                filteredMaterials = filteredMaterials.filter(material =>
                    material.gradeLevel.some(grade =>
                        grade.subject.some(subject => subject.name.toLowerCase() === selectedSubject.toLowerCase())
                    )
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

    const handleGradeChange = (e) => {
        setSelectedGrade(e.target.value);
    };

    const handleSubjectChange = (e) => {
        setSelectedSubject(e.target.value);
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
                    <div className="w-full max-w-md flex flex-wrap gap-4">
                        <input
                            type="text"
                            className="w-full p-3 border border-gray-300 rounded-md mb-4 block"
                            placeholder="Filter by keyword (e.g., description)"
                            value={filter}
                            onChange={handleFilterChange}
                        />

                        <select
                            className="w-full p-3 border border-gray-300 rounded-md mb-4 block"
                            value={selectedGrade}
                            onChange={handleGradeChange}
                        >
                            <option value="">Select grade</option>
                            {/* Options for grades */}
                            <option value="12">Grade 12</option>
                        <option value="11">Grade 11</option>
                        <option value="10">Grade 10</option>
                        <option value="9">Grade 9</option>
                        <option value="8">Grade 8</option>
                        <option value="7">Grade 7</option>
                        <option value="6">Grade 6</option>
                        <option value="5">Grade 5</option>
                        <option value="4">Grade 4</option>
                        <option value="3">Grade 3</option>
                        <option value="2">Grade 2</option>
                        <option value="1">Grade 1</option>
                        </select>

                        <select
                            className="w-full p-3 border border-gray-300 rounded-md mb-4 block"
                            value={selectedSubject}
                            onChange={handleSubjectChange}
                        >
                            <option value="">Select subject</option>
                            {/* Options for subjects */}
                        <option value="chemistery">Chemistry</option>
                        <option value="mathematics">Mathematics</option>
                        <option value="Biology">Biology</option>
                        <option value="Civics">Civics</option>
                        <option value="History">History</option>
                        <option value="geography">geography</option>
                        <option value="physics">physics</option>
                        <option value="English">English</option>
                        </select>
                    </div>
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
                <div className="pdf-container">
                     <div className={styles.closeButton}> {/* Apply the closeButton class */}
                    <IconButton onClick={handleClosePdf} style={{ color: "black", fontSize: "30px" }}>
                        <CancelIcon />
                    </IconButton>
                </div>
                    <iframe id="pdfViewer" src={pdfUrl} style={{ width: '100%', height: '100%' }} />
                </div>
            )}

            <ToastContainer position="bottom-right" />
        </div>
    );
};

export default ReadingMaterials;
