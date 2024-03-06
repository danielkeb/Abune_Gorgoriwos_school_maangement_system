"use client"
// Client-side code (React component)

import React, { useEffect, useState } from 'react';
import Main from '../main/Main';
import axios from 'axios';
import { AppContext } from '@/components/context/UserContext';

const Page = () => {
    const { decodedToken } = React.useContext(AppContext);
    const [resultsToSubmit, setResultsToSubmit] = useState([]); 
    const [schoolss, setSchoolss] = useState([]);
    const [selectedSection, setSelectedSection] = useState(null); // State to store the selected section

    useEffect(() => {
        const fetchData = async () => {
            try {
                const school = await axios.get(`http://localhost:3333/teachers/grade/${decodedToken?.sub}`);
                setSchoolss(school.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [decodedToken]);
    
    const handleView = (section) => {
        console.log('View button clicked with section:', section);
        setSelectedSection(section);
    };
    
    const handleSubmitAll = async () => {
        try {
            const results = await axios.post('http://localhost:3333/result/add', resultsToSubmit);
            console.log('Results submitted successfully:', results.data);
            // Clear resultsToSubmit after successful submission
            setResultsToSubmit([]);
        } catch (error) {
            console.error('Error submitting results:', error);
        }
    };

    const handleSave = async (resultId) => {
        try {
            // Your logic to save a single result here
            const results = await axios.post('http://localhost:3333/result/add', resultId);
        } catch (error) {
            console.error('Error saving result:', error);
        }
    };

    const handleUpdate = async (resultId) => {
        try {
            // Your logic to update a single result here
            const results = await axios.put(`http://localhost:3333/result/update/${resultId}`);
        } catch (error) {
            console.error('Error updating result:', error);
        }
    };

    const handleDelete = async (resultId) => {
        try {
            // Your logic to delete a single result here
            const results = await axios.delete(`http://localhost:3333/result/delete/${resultId}`);
        } catch (error) {
            console.error('Error deleting result:', error);
        }
    };

    return (
        <Main>
            <div className=''>
                <h2 className='font-bold text-center mb-4 mt-8'>Pick a Section Here</h2>
                <div className='flex justify-center items-center gap-3'>
                    {schoolss[0]?.subject.map(s => (
                        <div key={s.id} className='shadow w-[500px] h-[300] text-center text-lg '>
                            {s.name}  Grade{s.gradeId}
                            <div className='flex justify-center items-center gap-3'>
                            {schoolss[0]?.section.map(sec => (
                                <div key={sec.id} className='shadow w-[300px] h-[300] text-center text-small '>
                                    Section {sec.name} Grade {sec.gradeId}
                                    <div className=" lg:w-6/12 px-4 ">
                                        <button 
                                            className="bg-green-950 mt-2 mb-6 border-0 justify-center text-white w-full p-1 rounded-md"
                                            onClick={() => handleView(sec)} // Pass the specific section to handleView function
                                        >
                                            View
                                        </button>
                                    </div>
                                </div>
                            ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="container mx-auto mt-8">
                    {/* Table content */}
                    <table className="min-w-full bg-white border border-gray-300">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b">ID</th>
                                <th className="py-2 px-4 border-b">Name</th>
                                <th className="py-2 px-4 border-b">Test(10%)</th>
                                <th className="py-2 px-4 border-b">assignement(15%)</th>
                                <th className="py-2 px-4 border-b">mid-exam(25%)</th>
                                <th className="py-2 px-4 border-b">final(50%)</th>
                                <th className="py-2 px-4 border-b">Total</th>
                                <th className="py-2 px-4 border-b">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedSection && selectedSection.student && selectedSection.student.map(student => (
                                <tr key={student.user_Id}>
                                    <td className="py-2 px-4 border-b">{student.user_Id}</td>
                                    <td className="py-2 px-4 border-b">{student.user.frist_name} {student.user.last_name}</td>
                                    <td className="py-2 px-4 border-b">
                                        <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none  w-full  focus:border-2 focus:border-gray-400"
                      placeholder="test"
                      name="test"
                    /></td>
                                    <td className="py-2 px-4 border-b"><input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none  w-full  focus:border-2 focus:border-gray-400"
                      placeholder="assignment score"
                      name="assign"
                    /></td>
                                    <td className="py-2 px-4 border-b"><input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none  w-full  focus:border-2 focus:border-gray-400"
                      placeholder="mid-exam score"
                      name="midterm score"
                    /></td>
                                    <td className="py-2 px-4 border-b"><input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none  w-full  focus:border-2 focus:border-gray-400"
                      placeholder="final score"
                      name="final score"
                    /></td>
                                    <td className="py-2 px-4 border-b">auto filled</td>
                                    <td className="py-2 px-4 border-b">
                                    <button 
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                                            onClick={() => handleSave(result.id)} // Handle save action here
                                        >
                                            Save
                                        </button>
                                        <button 
                                            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2"
                                            onClick={() => handleUpdate(result.id)} // Handle update action here
                                        >
                                            Update
                                        </button>
                                        <button 
                                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                                            onClick={() => handleDelete(result.id)} // Handle delete action here
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="flex justify-center mt-4">
                        <button 
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                            onClick={handleSubmitAll} // Handle submission of all results here
                        >
                            Submit All
                        </button>
                    </div>
                </div>
                </div>
            
        </Main>
    );
};

export default Page;
