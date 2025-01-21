import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from '../axios.config';

function Course() {
    const [matkul, setMatkul] = useState({
        CourseName: '',
        LecturerName: '',
    });
    const { CourseID } = useParams();
    const navigate = useNavigate();
    const [week, setWeek] = useState([]);
    const [meeting, setMeeting] = useState({
        Week: '',
        MeetingDate: '',
        Notes: '',
        FileLink: '',
        Title: '',
    });

    useEffect(() => {
        axios
            .get(`/get_courses/${CourseID}`)
            .then((res) => {
                if (res.data && res.data.length > 0) {
                    setMatkul(res.data[0]);  // Set course data
                }
            })
            .catch((err) => console.log(err));
    }, [CourseID]);

    useEffect(() => {
        if(CourseID) {
            axios.get(`/show_meeting?CourseID=${CourseID}`)
            .then((res) => {
                console.log("Data fetched:", res.data);
                setWeek(res.data);  // Corrected to set week data
            })
            .catch((err) => console.log(err));
        }
    }, [CourseID]);

    const handleDelete = (meetingID) => {
        axios
            .delete(`/delete_meeting/${meetingID}`)
            .then((res) => {
                if (res.data.success) {
                    navigate(`/Notes`); // Navigate to Notes after successful deletion
                }
            })
            .catch((err) => console.log(err));
    };

    const handleSubmit = (e) => {
        const meetingData = {
            ...meeting,
            CourseID: CourseID, // Ensure CourseID is included
        };
        axios
            .post("/add_meeting", meetingData)
            .then((res) => {
                console.log(res);
                // Optionally reset the form or navigate
            })
            .catch((err) => console.log(err));
    };

    return (
        <>
            <div className="ml-72">
                <div className="p-10">
                    <h1 className="text-blacktext font-extrabold text-4xl">
                        {matkul.CourseName}
                    </h1>
                    <p>{matkul.LecturerName}</p>
                </div>
                <div className="px-10 pt-0 pb-5 grid grid-cols-3 gap-5">
                    {week.map((weekItem) => (
                        <Link
                            to={`/Meetings/${weekItem.MeetingID}`}
                            key={weekItem.MeetingID}
                            className="bg-greenbox h-[150px] rounded-xl p-5 flex justify-between items-center"
                        >
                            <div className="items-center bg-transparent">
                                <h1 className="text-primary text-2xl font-semibold bg-transparent">
                                    Week {weekItem.Week}
                                </h1>
                                <p className="bg-transparent text-primary">
                                    {new Date(weekItem.MeetingDate).toLocaleDateString('en-GB')}
                                </p>
                            </div>
                            <i 
                                className="fa-solid fa-trash text-primary text-2xl bg-transparent"
                                onClick={(e) => { handleDelete(weekItem.MeetingID); }}
                            ></i>
                        </Link>
                    ))}
                </div>
                <div className="px-10 pt-0 pb-5 gap-5">
                    <div className="mb-2">
                        <h3 className="font-bold text-xl">Add New Meeting</h3>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label className="font-semibold" htmlFor="Week">
                                Week
                            </label>
                            <input
                                className="text-sm mb-2 p-2 border-2 border-blacktext border-opacity-50 rounded-lg h-[38px] w-full"
                                type="number"
                                name="Week"
                                placeholder="Input in number format"
                                value={meeting.Week}
                                onChange={(e) => setMeeting({ ...meeting, Week: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="font-semibold" htmlFor="MeetingDate">
                                Date
                            </label>
                            <input
                                className="mb-2 text-sm font-extralight p-2 border-2 border-blacktext border-opacity-50 rounded-lg h-[38px] w-full"
                                type="date"
                                name="MeetingDate"
                                value={meeting.MeetingDate}
                                onChange={(e) => setMeeting({ ...meeting, MeetingDate: e.target.value })}
                            />
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="bg-greenbox text-primary font-semibold text-md px-2 py-1 rounded-lg"
                            >
                                Add Meeting
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Course;
