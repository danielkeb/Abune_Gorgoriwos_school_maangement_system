"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';
import styles from '../styles/ReadingMaterialsCss.module.css';
import BookIcon from '@mui/icons-material/Book'; // Example import for the Book icon

const Page = () => {
    const [materials, setMaterials] = useState([]);
    const [filter, setFilter] = useState("");
    const [selectedGrade, setSelectedGrade] = useState("");
    const [selectedSubject, setSelectedSubject] = useState("");
    const [pdfUrl, setPdfUrl] = useState('');
    const [showPdf, setShowPdf] = useState(false);

    useEffect(() => {
        fetchMaterials();
    }, [filter, selectedGrade, selectedSubject]); 

    const fetchMaterials = async () => {
        try {
            const response = await axios.get("http://localhost:3333/coursematerial/get");
            let filteredMaterials = response.data;

            if (filter.trim() !== "") {
                filteredMaterials = filteredMaterials.filter(material =>
                    material.description.toLowerCase().includes(filter.toLowerCase())
                );
            }

            if (selectedGrade !== "") {
                filteredMaterials = filteredMaterials.filter(material =>
                    material.gradeLevel.some(grade => grade.grade === selectedGrade)
                );
            }

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
        }
    };

    const handleClosePdf = () => {
        setShowPdf(false);
    };

    return (
        <div className="w-full p-0 mt-0 text-center">
            {!showPdf && (
                <div className="w-full p-0 mt-10 text-center">
                    <div className="flex justify-center mb-4 mr-14 ">
                        <p className="mr-10 mt-5">courses</p>
                        <input
                            type="text"
                            className="p-3 border border-gray-300 rounded-md mr-2"
                            placeholder="Filter by keyword (e.g., description)"
                            value={filter}
                            onChange={handleFilterChange}
                        />

                        <select
                            className="p-3 border border-gray-300 rounded-md mr-2 w-100"
                            value={selectedGrade}
                            onChange={handleGradeChange}
                        >
                            <option value="">Select grade</option>
                            <option value="12">Grade 12</option>
                            <option value="11">Grade 11</option>
                            <option value="10">Grade 10</option>
                            {/* Other grade options */}
                        </select>

                        <select
                            className="p-3 border border-gray-300 rounded-md w-100"
                            value={selectedSubject}
                            onChange={handleSubjectChange}
                        >
                            <option value="">Select subject</option>
                            <option value="chemistery">Chemistry</option>
                            <option value="mathematics">Mathematics</option>
                            {/* Other subject options */}
                        </select>
                    </div>

                    {materials.map((material) => (
                        <div key={material.id} className="container flex justify-center items-center mb-2">
                            
                            <BookIcon style={{ width: '40px', height: '40px', marginRight: '10px' }}/> 
                            <a href="#" className={styles.materialLink} onClick={() => handleOpenMaterial(material.file)}>
                                {material.description}

                            </a>
                            
                            

                            
                        </div>
                        
                    ))}
                </div>
            )}

            {pdfUrl && showPdf && (
                <div className="pdf-container">
                    <div className={styles.closeButton}>
                        <IconButton onClick={handleClosePdf} style={{ color: "black", fontSize: "30px" }}>
                            <CancelIcon />
                        </IconButton>
                    </div>
                    <iframe id="pdfViewer" src={pdfUrl} style={{ width: '100%', height: '950px' }} />
                </div>
            )}
        </div>
    );
};

export default Page;

