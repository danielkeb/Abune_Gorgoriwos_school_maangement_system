import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';
import styles from '../styles/ReadingMaterialsCss.module.css';
import { AppContext } from "@/components/context/UserContext";
const ReadingMaterials = () => {
    const [materials, setMaterials] = useState([]);
    const [filter, setFilter] = useState("");
    const [selectedGrade, setSelectedGrade] = useState("");
    const [selectedSubject, setSelectedSubject] = useState("");
    const [pdfUrl, setPdfUrl] = useState('');
    const [showPdf, setShowPdf] = useState(false);
    const { decodedToken, token } = useContext(AppContext);
    


    useEffect(() => {
        fetchMaterials();
        
    }, [filter, selectedGrade, selectedSubject]); // Fetch materials whenever filter or selectedGrade or selectedSubject changes

    const fetchMaterials = async () => {
        const schoolId= parseInt(decodedToken.school_Id);
        try {
            const response = await axios.get("http://localhost:3333/coursematerial/get");
            
            let filteredMaterials = response.data.filter(material => material.schoolId === schoolId); 

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
        <div className="w-full p-2 mt-0 text-center  ">
            {!showPdf && (
                <div className="w-full flex-col p-4   ">
                    <div className=" w-full  flex justify-center items-center  gap-2 p-6 boxshadow ">
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6 w-[80%] mx-auto">
  {materials.map((material) => (
    <div key={material.id} className="bg-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-xl overflow-hidden shadow-xl hover:scale-105 hover:shadow-2xl transform duration-500 cursor-pointer">
        <div className="p-2">
          <h1 className="mt-2 text-lg font-bold hover:underline cursor-pointer">
            {material?.subject}
          </h1>
          <p className="mt-2 font-sans text-gray-700">
            {material?.description}
          </p>
        </div>
        <div className="relative">
          <img
            className="w-80 h-[300px]"
            src="https://sp-uploads.s3.amazonaws.com/uploads/services/6693546/20230219163649_63f250211f33c_ethiopian_grade_10_english_student_textbookpage1.jpg"
            alt={material?.subject}
          />
     <p
  onClick={() => handleOpenMaterial(material?.file)}
  className="absolute text-lg sm:text-sm md:text-base transform translate-x-20 -translate-y-24 bg-blue-600 text-white py-2 sm:py-1 md:py-2 px-4 sm:px-2 md:px-3 rounded-full cursor-pointer hover:scale-105 duration-500"
>
  Read Material
</p>

        </div>
      </div>
    </div>
  ))}
</div>
                    {/* {materials.map((material) => (
                        <div key={material.id} className="flex justify-between items-center border border-gray-300 rounded-md p-3 mb-2">
                            <div>{material.description}</div>
                            <div>
                                <button className="text-blue-500 hover:underline mr-2" onClick={() => handleOpenMaterial(material.file)}>
                                    Open
                                </button>
                            </div>
                        </div>
                    ))} */}
                </div>
            )}

            {pdfUrl && showPdf && (
            

                <div className="pdf-container">
                     <div className={styles.closeButton}> {/* Apply the closeButton class */}
                    <IconButton onClick={handleClosePdf} style={{ color: "black", fontSize: "30px" }}>
                        <CancelIcon />
                    </IconButton>
                </div>
                    <iframe id="pdfViewer" src={pdfUrl} style={{ width: '100%', height: '800px' }} />
                </div>


  

  
             
            )}

            <ToastContainer position="bottom-right" />
        </div>
    );
};

export default ReadingMaterials;
