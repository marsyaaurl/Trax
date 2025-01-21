import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from '../axios.config';

function Meetings() {
    const [matkul, setMatkul] = useState({
        CourseName: '',
        LecturerName: '',
    });
    const [meeting, setMeeting] = useState({
        Week: '',
        MeetingDate: '',
        Notes: '',
        FileLink: '',
        Title: '',
    });
    const { CourseID, MeetingID } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the meeting details
        axios
            .get(`/get_meeting/${MeetingID}`)
            .then((res) => {
                if (res.data && res.data.length > 0) {
                    setMeeting(res.data[0]);  // Populate the meeting state with the response
                }
            })
            .catch((err) => console.log(err));
    }, [MeetingID]);

    useEffect(() => {
        // Fetch course details
        axios
            .get(`/get_courses/${CourseID}`)
            .then((res) => {
                if (res.data && res.data.length > 0) {
                    setMatkul(res.data[0]);  // Populate the course state
                }
            })
            .catch((err) => console.log(err));
    }, [CourseID]);

    const handleSubmit = (e) => {
        axios
            .post(`/edit_notes/${MeetingID}`, meeting)
            .then((res) => {
                console.log(res);
                // Optionally reset the form after submission or redirect
                // For example, after successfully updating the meeting
                navigate(`/Courses/${CourseID}`); // Navigate back to course page or a different page
            })
            .catch((err) => console.log(err));
    };

    const handleDelete = (meetingID) => {
        axios
            .delete(`/delete_meeting/${meetingID}`)
            .then((res) => {
                if (res.data.success) {
                    navigate(`/Notes`); // Navigate to the notes page after successful deletion
                }
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className="ml-72">
            <div className="p-10">
                <h1 className="text-blacktext font-extrabold text-4xl">
                    {matkul.CourseName}
                </h1>
                <p>{matkul.LecturerName}</p>
            </div>
            <div className="px-10 pt-0 pb-5">
                <form onSubmit={handleSubmit}>
                    <div>
                        <div className="bg-greenbox h-[80px] flex rounded-xl p-5 justify-between items-center mb-4">
                            <div className="items-center bg-transparent">
                                <label htmlFor="Week" className="font-semibold bg-transparent text-primary text-lg">Week </label>
                                <input
                                    type="text"
                                    name="Week"
                                    className="text-primary text-lg font-semibold bg-transparent border-none outline-none"
                                    value={meeting.Week || ""}
                                    onChange={(e) => setMeeting({ ...meeting, Week: e.target.value })}
                                />
                                <br></br>
                                <input
                                    type="date"
                                    name="MeetingDate"
                                    className="bg-transparent text-primary border-none outline-none"
                                    value={meeting.MeetingDate || ""}
                                    onChange={(e) => setMeeting({ ...meeting, MeetingDate: e.target.value })}
                                />
                            </div>
                            <i
                                className="fa-solid fa-trash text-primary text-2xl bg-transparent"
                                onClick={() => handleDelete(MeetingID)} // Correctly pass MeetingID here
                            ></i>
                        </div>
                    </div>
                    <div>
                        <label
                            className="font-semibold"
                            htmlFor="Title"
                        >
                            Title
                        </label>
                        <input
                            className="text-sm mb-2 p-2 border-2 border-blacktext border-opacity-50 rounded-lg h-[38px] w-full"
                            type="text"
                            name="Title"
                            placeholder="Input the title of this week's material"
                            value={meeting.Title}
                            onChange={(e) => setMeeting({ ...meeting, Title: e.target.value })}
                        />
                    </div>
                    <div>
                        <label
                            className="font-semibold"
                            htmlFor="FileLink"
                        >
                            File Link
                        </label>
                        <input
                            className="mb-2 text-sm font-extralight p-2 border-2 border-blacktext border-opacity-50 rounded-lg h-[38px] w-full"
                            type="text"
                            name="FileLink"
                            placeholder="Input any link related to the material"
                            value={meeting.FileLink}
                            onChange={(e) => setMeeting({ ...meeting, FileLink: e.target.value })}
                        />
                    </div>
                    <div>
                        <label
                            className="font-semibold"
                            htmlFor="Notes"
                        >
                            Notes
                        </label>
                        <textarea
                            className="mb-2 text-sm font-extralight p-2 border-none outline-none h-[200px] w-full"
                            name="Notes"
                            placeholder="Type your notes here"
                            value={meeting.Notes}
                            onChange={(e) => setMeeting({ ...meeting, Notes: e.target.value })}
                        ></textarea>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="bg-greenbox text-primary font-semibold text-md px-2 py-1 rounded-lg"
                        >
                            Update Notes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Meetings;
