"use client";
import React, { useEffect, useState } from 'react';
import Main from '../main/Main';
import axios from 'axios';
import { AppContext } from '@/components/context/UserContext';
import { SchoolSharp } from '@mui/icons-material';

// Define the Section interface
interface Student {
    user_Id: number;
    gradeId: number;
    sectionId: number;
    firstrank: number | null;
    secondtrank: number | null;
    overallrank: number | null;
}

interface GradeLevel {
    grade: string;
    student: Student[];
}

interface Section {
    gradeId: number;
    name: string;
    gradelevel: GradeLevel;
}

const Page = () => {
    const { decodedToken } = React.useContext(AppContext);
    const [sections, setSections] = useState<Section[]>([]); // State to hold fetched section data

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch sections data
                const sectionsResponse = await axios.get('http://localhost:3333/section/get/1/students');
                setSections(sectionsResponse.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [decodedToken]);

    return (
        <Main>
            <div className=''>
                <h2 className='font-bold text-center mb-4 mt-8'>Pick a Section Here</h2>

                <div className="container mx-auto mt-8">
                    {/* Table content */}
                    <div className="container mx-auto mt-8">
                        <table className="min-w-full bg-white border border-gray-300">
                            <thead>
                                <tr>
                                    <th className="py-2 px-4 border-b">ID</th>
                                    <th className="py-2 px-4 border-b">Rank</th>
                                    <th className="py-2 px-4 border-b">Grade Id</th>
                                    <th className="py-2 px-4 border-b">Section name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sections.map((section) => (
                                    <React.Fragment key={section.gradeId}>
                                        {section.gradelevel.student.map((student) => (
                                            <tr key={student.user_Id}>
                                                <td className="py-2 px-4 border-b">{student.user_Id}</td>
                                                <td className="py-2 px-4 border-b">{student.overallrank}</td>
                                                <td className="py-2 px-4 border-b">{student.gradeId}</td>
                                                <td className="py-2 px-4 border-b">{section.name}</td>
                                            </tr>
                                        ))}
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Main>
    )
}

export default Page;
