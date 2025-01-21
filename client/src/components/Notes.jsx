import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from '../axios.config';

function Notes() {
    const [matkul, setMatkul] = useState([]);

    useEffect(() => {
        axios.get("/show_courses")
            .then((res) => {
                console.log("Data fetched:", res.data);
                setMatkul(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    const [course, setCourse] = useState({
        CourseName: '',
        LecturerName: '',
    });

    const navigate = useNavigate();

    // Handle adding new course
    function handleSubmit(e) {
        axios.post("/add_course", course)
            .then((res) => {
                console.log(res);
                navigate("/Notes");
            })
            .catch((err) => console.log(err));
    };

    // Handle deleting course and related meetings
    const handleDelete = (CourseID) => {
        // First delete related meetings
        axios.delete(`/delete_meetings_by_course/${CourseID}`)
            .then(() => {
                // Then delete the course itself
                axios.delete(`/delete_course/${CourseID}`)
                    .then((res) => {
                        if (res.data.success) {
                            // Refresh the courses after deletion
                            setMatkul(matkul.filter(course => course.CourseID !== CourseID));
                        }
                    })
                    .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
    };

    return (
        <>
            <div className="ml-72">
                <h1 className="p-10 text-blacktext font-extrabold text-4xl">
                    <i className="fa-solid fa-book-open text-3xl text-blacktext mr-4"></i>
                    Notes
                </h1>
                <div className="px-10 pt-0 pb-5 grid grid-cols-2 gap-5">
                    {matkul.map((matkul) => {
                        return (
                            <div
                                key={matkul.CourseID}
                                className="bg-greenbox h-[100px] rounded-xl p-5 flex justify-between items-center"
                            >
                                <Link
                                    to={`/Course/${matkul.CourseID}`}
                                    className="items-center bg-transparent"
                                >
                                    <h1 className="text-primary text-2xl font-semibold bg-transparent">
                                        {matkul.CourseName}
                                    </h1>
                                    <p className="bg-transparent text-primary">{matkul.LecturerName}</p>
                                </Link>
                                <i
                                    className="fa-solid fa-trash text-primary text-2xl bg-transparent cursor-pointer"
                                    onClick={() => handleDelete(matkul.CourseID)}
                                ></i>
                            </div>
                        );
                    })}
                </div>
                <div className="px-10 pt-0 pb-5 gap-5">
                    <div className="mb-2">
                        <h3 className="font-bold text-xl">Add New Course</h3>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label className="font-semibold" htmlFor="CourseName">
                                Course Name
                            </label>
                            <input
                                className="text-sm mb-2 p-2 border-2 border-blacktext border-opacity-50 rounded-lg h-[38px] w-full"
                                type="text"
                                name="CourseName"
                                placeholder="Input your course name"
                                onChange={(e) => setCourse({ ...course, CourseName: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="font-semibold" htmlFor="LecturerName">
                                Lecturer Name
                            </label>
                            <input
                                className="mb-2 text-sm font-extralight p-2 border-2 border-blacktext border-opacity-50 rounded-lg h-[38px] w-full"
                                type="text"
                                name="LecturerName"
                                placeholder="Input your lecturer name"
                                onChange={(e) => setCourse({ ...course, LecturerName: e.target.value })}
                            />
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="bg-greenbox text-primary font-semibold text-md px-2 py-1 rounded-lg"
                            >
                                Add Course
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Notes;
