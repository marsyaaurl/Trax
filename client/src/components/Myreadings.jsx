import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '../axios.config';

function Myreadings(){
    const [book, setBook] = useState([]);
    const [deleted, setDeleted] = useState(true);
    useEffect(() => {
        if(deleted){
            setDeleted(false);
        }
        axios.get('/myreadings')
            .then((res) => {
                console.log("Data fetched:", res.data);
                setBook(res.data);
            })
            .catch((err) => {
                console.error('Error fetching data:', err);
            });
    }, [deleted]);

    const [readings, setReadings] = useState({
        Cover: '',
        Title: '',
        Author: '',
        FinishDate: '',
        Rating: '',
        Review: '',
    });

    const navigate = useNavigate();

    function handleSubmit(e){
        axios.post('/add_myreadings', readings)
            .then((res) => {
                console.log(res);
                navigate('/Myreadings');
            })
            .catch((err) => console.log(err));
    }

    function handleDelete(ID) {
        axios.delete(`/delete_myreadings/${ID}`)
            .then((res) => {
                if (res.data.success) {
                    setDeleted(true); // Refresh data setelah penghapusan
                }
            })
            .catch((err) => console.error("Error deleting:", err));
    }    

    return(
        <>
            <div className="ml-72">
                <h1 className="p-10 text-blacktext font-extrabold text-4xl">
                    <i className="fa-solid fa-book text-3xl text-blacktext mr-4"></i>
                    My Readings
                </h1>
                <div className="px-10 pt-0 pb-10 flex gap-5">
                    <table className="border-2 w-full border-blacktext border-opacity-50 rounded-lg border-separate">
                        <thead className="font-semibold">
                            <td className="px-2 border-r border-blacktext border-opacity-50">Cover</td>
                            <td className="px-2 border-r border-blacktext border-opacity-50">Title</td>
                            <td className="px-2 border-r border-blacktext border-opacity-50">Author</td>
                            <td className="px-2 border-r border-blacktext border-opacity-50">Finish Date</td>
                            <td className="px-2 border-r border-blacktext border-opacity-50">Rating</td>
                            <td className="px-2 border-r border-blacktext border-opacity-50">Review</td>
                            <td className="px-2">Edit/Delete</td>
                        </thead>
                        <tbody>
                            {book.map((readings) => {
                                return (
                                    <tr key={readings.ID}>
                                        <td className="px-2 border-t border-r border-blacktext border-opacity-50">
                                            <img src={readings.Cover} alt={readings.Title} className="w-[100px] h-[150px] px-1 py-3 object-cover" />
                                        </td>
                                        <td className="px-2 border-t border-r border-blacktext border-opacity-50">{readings.Title}</td>
                                        <td className="px-2 border-t border-r border-blacktext border-opacity-50">{readings.Author}</td>
                                        <td className="px-2 border-t border-r border-blacktext border-opacity-50">{new Date(readings.FinishDate).toLocaleDateString('en-GB')}</td>
                                        <td className="px-2 border-t border-r border-blacktext border-opacity-50">{readings.Rating}</td>
                                        <td className="px-2 border-t border-r border-blacktext border-opacity-50">{readings.Review}</td>
                                        <td className="px-2 border-t border-blacktext border-opacity-50">
                                            <Link to={`/EditMyreadings/${readings.ID}`}><button className="bg-bluebox text-primary font-semibold mr-2 text-md px-2 py-1 rounded-lg">Edit</button></Link>
                                            <button className="bg-bluebox text-primary font-semibold text-md px-2 py-1 rounded-lg" onClick={()=> handleDelete(readings.ID)}>Delete</button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="px-10 pt-0 pb-5 gap-5">
                    <div className="mb-2">
                        <h1 className="font-bold text-xl">Add New Book</h1>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="Cover" className="font-semibold">Cover</label>
                            <input type="text" name="Cover" placeholder="Insert URL" className="text-sm mb-2 p-2 border-2 border-blacktext border-opacity-50 rounded-lg h-[38px] w-full" onChange={(e) => setReadings({...readings, Cover: e.target.value})}/>
                        </div>
                        <div>
                            <label htmlFor="Title" className="font-semibold">Title</label>
                            <input type="text" name="Title" placeholder="Input the book title" className="text-sm mb-2 p-2 border-2 border-blacktext border-opacity-50 rounded-lg h-[38px] w-full" onChange={(e) => setReadings({...readings, Title: e.target.value})}/>
                        </div>
                        <div>
                            <label htmlFor="Author" className="font-semibold">Author</label>
                            <input type="text" name="Author" placeholder="Input the author of the book" className="text-sm mb-2 p-2 border-2 border-blacktext border-opacity-50 rounded-lg h-[38px] w-full" onChange={(e) => setReadings({...readings, Author: e.target.value})}/>
                        </div>
                        <div>
                            <label htmlFor="FinishDate" className="font-semibold">Finish Date</label>
                            <input type="date" name="FinishDate" className="text-sm mb-2 p-2 border-2 border-blacktext border-opacity-50 rounded-lg h-[38px] w-full" onChange={(e) => setReadings({...readings, FinishDate: e.target.value})}/>
                        </div>
                        <div>
                            <label htmlFor="Rating" className="font-semibold">Rating</label>
                            <select name="Rating" className="text-sm mb-2 p-2 border-2 border-blacktext border-opacity-50 rounded-lg h-[38px] w-full" onChange={(e) => setReadings({...readings, Rating: e.target.value})}>
                                <option value="">Choose Rating</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="Review" className="font-semibold">Review</label>
                            <input type="text" name="Review" placeholder="Input your honest review" className="text-sm mb-2 p-2 border-2 border-blacktext border-opacity-50 rounded-lg h-[38px] w-full" onChange={(e) => setReadings({...readings, Review: e.target.value})}/>
                        </div>
                        <div>
                            <button type="submit" className="bg-redbox text-primary font-semibold text-md px-2 py-1 rounded-lg">Add Book</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Myreadings;