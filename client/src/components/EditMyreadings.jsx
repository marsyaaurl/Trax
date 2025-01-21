import React from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '../axios.config';

function EditMyreadings(){
    const [book, setBook] = useState({
        Cover: '',
        Title: '',
        Author: '',
        FinishDate: '',
        Rating: '',
        Review: '',
    });
    const { ID } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`/get_myreadings/${ID}`)
            .then((res) => {
                console.log("Response Data:", res.data); // Debugging
                if (res.data && res.data.length > 0) {
                    setBook(res.data[0]);
                }
            })
            .catch((err) => console.log("Error fetching data:", err));
    }, [ID]);

    function handleSubmit(e) {
        e.preventDefault(); // Tambahkan ini agar form tidak melakukan refresh halaman
        axios
            .post(`/edit_myreadings/${ID}`, book) // Kirim data `book` sebagai body
            .then((res) => {
                console.log("Response:", res.data); // Debugging
                navigate('/Myreadings');
            })
            .catch((err) => {
                console.error("Error on submit:", err.response ? err.response.data : err);
            });
    };    

    return(
        <>
            <div className="ml-72">
                    <h1 className="p-10 text-blacktext font-extrabold text-4xl">
                        <i className="fa-solid fa-book text-3xl text-blacktext mr-4"></i>
                        Edit Book
                    </h1>
                <div className="px-10 pt-0 pb-5 gap-5">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="Cover" className="font-semibold">Cover</label>
                            <input type="text" name="Cover" placeholder="Insert URL" className="text-sm mb-2 p-2 border-2 border-blacktext border-opacity-50 rounded-lg h-[38px] w-full" value={book.Cover} onChange={(e) => setBook({...book, Cover: e.target.value})}/>
                        </div>
                        <div>
                            <label htmlFor="Title" className="font-semibold">Title</label>
                            <input type="text" name="Title" placeholder="Input the book title" className="text-sm mb-2 p-2 border-2 border-blacktext border-opacity-50 rounded-lg h-[38px] w-full" value={book.Title} onChange={(e) => setBook({...book, Title: e.target.value})}/>
                        </div>
                        <div>
                            <label htmlFor="Author" className="font-semibold">Author</label>
                            <input type="text" name="Author" placeholder="Input the author of the book" className="text-sm mb-2 p-2 border-2 border-blacktext border-opacity-50 rounded-lg h-[38px] w-full" value={book.Author} onChange={(e) => setBook({...book, Author: e.target.value})}/>
                        </div>
                        <div>
                            <label htmlFor="FinishDate" className="font-semibold">Finish Date</label>
                            <input type="date" name="FinishDate" className="text-sm mb-2 p-2 border-2 border-blacktext border-opacity-50 rounded-lg h-[38px] w-full" value={book.FinishDate} onChange={(e) => setBook({...book, FinishDate: e.target.value})}/>
                        </div>
                        <div>
                            <label htmlFor="Rating" className="font-semibold">Rating</label>
                            <select name="Rating" className="text-sm mb-2 p-2 border-2 border-blacktext border-opacity-50 rounded-lg h-[38px] w-full" value={book.Rating} onChange={(e) => setBook({...book, Rating: e.target.value})}>
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
                            <input type="text" name="Review" placeholder="Input your honest review" className="text-sm mb-2 p-2 border-2 border-blacktext border-opacity-50 rounded-lg h-[38px] w-full" value={book.Review} onChange={(e) => setBook({...book, Review: e.target.value})}/>
                        </div>
                        <div>
                            <button type="submit" className="bg-redbox text-primary font-semibold text-md px-2 py-1 rounded-lg">Edit Book</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default EditMyreadings;