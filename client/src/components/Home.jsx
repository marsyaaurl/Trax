import React from "react";
import '../index.css';
import { Link } from "react-router-dom";

function Home() {
    return (
        <>
            <div className="ml-72">
                <h1 className="p-10 text-blacktext font-extrabold text-4xl">
                    <i className="fa-solid fa-house text-3xl mr-4 font-blacktext"></i>
                    Home
                </h1>
                <div className="px-10 pt-0 pb-5 grid grid-cols-2 gap-5">
                    <Link to="/Todo" className="bg-bluebox h-[210px] rounded-xl pl-5 pb-5 pt-40 flex items-end">
                        <h1 className="text-primary text-2xl font-semibold bg-transparent">
                            <i className="fa-solid fa-square-check bg-transparent text-2xl mr-2"></i>
                            To-do
                        </h1>
                    </Link>
                    <Link to="/Notes" className="bg-greenbox h-[210px] rounded-xl pl-5 pb-5 pt-40 flex items-end">
                        <h1 className="text-primary text-2xl font-semibold bg-transparent">
                            <i className="fa-solid fa-book-open text-2xl bg-transparent mr-2"></i>
                            Notes
                        </h1>
                    </Link>
                    <Link to="/Myreadings" className="bg-redbox h-[210px] rounded-xl pl-5 pb-5 pt-40 flex items-end">
                        <h1 className="text-primary text-2xl font-semibold bg-transparent">
                            <i className="fa-solid fa-book text-2xl bg-transparent mr-2"></i>
                            My Readings
                        </h1>
                    </Link>
                </div>
            </div>
        </>
    );
}

export default Home;
