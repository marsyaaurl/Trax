import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axios.config';

function Finance() {
    const [month, setMonth] = useState([]);
    const [post, setPost] = useState([]);
    const [deleted, setDeleted] = useState(true)
    const [trans, setTrans] = useState({
        transaction_name: '',
        transaction_date: '',
        category_id: '',
        amount: '',
    });

    const navigate = useNavigate();

    useEffect(() => {
        if(deleted){
            setDeleted(false)
        }
        // Fetch available months
        axios.get('/show_months')
            .then((res) => {
                setMonth(res.data);
            })
            .catch((err) => {
                console.error('Error fetching months:', err);
            });

        // Fetch available posts for categories
        axios.get('/show_posts')
            .then((res) => {
                setPost(res.data);
            })
            .catch((err) => {
                console.error('Error fetching posts:', err);
            });
    }, [deleted]);

    function handleSubmitTrans(e) {
        e.preventDefault();
        axios.post('/add_transaction', trans)
            .then((res) => {
                console.log(res);
                navigate("/Finance");
            })
            .catch((err) => console.log(err));
    }

    const [newPost, setNewPost] = useState({
        post_name: '',
        target_limit: '',
        balance: '',
    });

    function handleSubmitPost(e) {
        axios.post('/add_post', newPost)
            .then((res) => {
                console.log(res);
                navigate("/Finance");
            })
            .catch((err) => console.log(err));
    }

    function handleDeleteTrans(transaction_id){
        axios.delete(`/delete_transaction/${transaction_id}`)
        .then((res)=>{
            if (res.data.success)
                setDeleted(true)
        })
        .catch((err)=> console.log(err))
    }

    return (
        <>
            <div className="ml-72">
                <h1 className="p-10 text-blacktext font-extrabold text-4xl">
                    <i className="fa-solid fa-wallet text-3xl text-blacktext mr-4"></i>
                    Finance
                </h1>
                <div className="px-10 pt-0 pb-10 flex gap-5">
                    <table className="border-2 w-full border-blacktext border-opacity-50 rounded-lg border-separate">
                        <thead className="font-semibold">
                            <tr>
                                <td className="px-2">Current Balance</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <hr className="border-1 border-blacktext mb-4 w-full" />
                <div className="px-10 pt-0 pb-5 gap-5">
                    <form>
                        <div>
                            <label htmlFor="Month" className="font-semibold">Month</label>
                            <select name="Month" className="mb-2 text-sm font-extralight p-2 border-2 border-blacktext border-opacity-50 rounded-lg h-[38px] w-full">
                                <option value="">Choose Month</option>
                                {month.map((month) => (
                                    <option key={month.month_id} value={month.month_name}>
                                        {month.month_name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <button type="submit" className="bg-greenbox text-primary font-semibold text-md px-2 py-1 rounded-lg">Choose Month</button>
                        </div>
                    </form>
                </div>
                <hr className="border-1 border-blacktext mb-4 w-full" />
                <div className="px-10 pt-0 pb-10">
                    <div className="mb-2">
                        <h3 className="font-bold text-xl">Post</h3>
                    </div>
                    <div>
                        <table className="border-2 w-full border-blacktext border-opacity-50 rounded-lg border-separate">
                            <thead className="font-semibold">
                                <tr>
                                    <td className="px-2 border-r border-blacktext border-opacity-50">Post</td>
                                    <td className="px-2 border-r border-blacktext border-opacity-50">Target/Limit</td>
                                    <td className="px-2 border-r border-blacktext border-opacity-50">Balance</td>
                                    <td className="px-2">Edit/Delete</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="px-2 border-t border-r border-blacktext border-opacity-50"></td>
                                    <td className="px-2 border-t border-r border-blacktext border-opacity-50"></td>
                                    <td className="px-2 border-t border-r border-blacktext border-opacity-50"></td>
                                    <td className="px-2 border-t border-blacktext border-opacity-50">
                                        <button className="bg-greenbox text-primary font-semibold mr-2 text-md px-2 py-1 rounded-lg">Edit</button>
                                        <button className="bg-greenbox text-primary font-semibold text-md px-2 py-1 rounded-lg">Delete</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="px-10 pt-0 pb-5 gap-5">
                    <div>
                        <form onSubmit={handleSubmitPost}>
                            <div>
                                <label htmlFor="CategoryName" className="font-semibold">Add New Post</label>
                                <input type="text" className="text-sm mb-2 p-2 border-2 border-blacktext border-opacity-50 rounded-lg h-[38px] w-full" name="CategoryName" placeholder="Input the post name" onChange={(e) => setNewPost({ ...newPost, post_name: e.target.value })} />
                            </div>
                            <div>
                                <label htmlFor="TargetLimit" className="font-semibold">Target/Limit</label>
                                <input type="number" className="text-sm mb-2 p-2 border-2 border-blacktext border-opacity-50 rounded-lg h-[38px] w-full" name="TargetLimit" placeholder="Input the target or limit of the expenses" onChange={(e) => setNewPost({ ...newPost, target_limit: e.target.value })} />
                            </div>
                            <div>
                                <button type="submit" className="bg-greenbox text-primary font-semibold text-md px-2 py-1 rounded-lg">Add Post</button>
                            </div>
                        </form>
                    </div>
                </div>
                <hr className="border-1 border-blacktext mb-4 w-full" />
                <div className="px-10 pt-0 pb-10 flex gap-5">
                    <table className="border-2 w-full border-blacktext border-opacity-50 rounded-lg border-separate">
                        <thead className="font-semibold">
                            <tr>
                                <td className="px-2 border-r border-blacktext border-opacity-50">Transaction Name</td>
                                <td className="px-2 border-r border-blacktext border-opacity-50">Date</td>
                                <td className="px-2 border-r border-blacktext border-opacity-50">Category</td>
                                <td className="px-2 border-r border-blacktext border-opacity-50">Amount</td>
                                <td className="px-2">Delete</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="px-2 border-t border-r border-blacktext border-opacity-50"></td>
                                <td className="px-2 border-t border-r border-blacktext border-opacity-50"></td>
                                <td className="px-2 border-t border-r border-blacktext border-opacity-50"></td>
                                <td className="px-2 border-t border-r border-blacktext border-opacity-50"></td>
                                <td className="px-2 border-t border-blacktext border-opacity-50">
                                    <button className="bg-greenbox text-primary font-semibold text-md px-2 py-1 rounded-lg" onClick={handleDeleteTrans}>Delete</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="px-10 pt-0 pb-5 gap-5">
                    <div className="mb-2">
                        <h3 className="font-bold text-xl">Add New Transaction</h3>
                    </div>
                    <div>
                        <form onSubmit={handleSubmitTrans}>
                            <div>
                                <label className="font-semibold" htmlFor="TransactionName">Transaction Name</label>
                                <input className="text-sm mb-2 p-2 border-2 border-blacktext border-opacity-50 rounded-lg h-[38px] w-full" type="text" name="TransactionName" placeholder="Input your transaction name" onChange={(e) => setTrans({ ...trans, transaction_name: e.target.value })} />
                            </div>
                            <div>
                                <label className="font-semibold" htmlFor="Date">Date</label>
                                <input className="text-sm mb-2 p-2 border-2 border-blacktext border-opacity-50 rounded-lg h-[38px] w-full" type="date" name="Date" onChange={(e) => setTrans({ ...trans, transaction_date: e.target.value })} />
                            </div>
                            <div>
                                <label className="font-semibold" htmlFor="Category">Category</label>
                                <select
                                    className="mb-2 text-sm font-extralight p-2 border-2 border-blacktext border-opacity-50 rounded-lg h-[38px] w-full"
                                    name="Category"
                                    onChange={(e) => setTrans({ ...trans, category_id: e.target.value })}
                                >
                                    <option value="">Choose Category</option>
                                    {post.map((post) => (
                                        <option key={post.id} value={post.id}>
                                            {post.post_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="font-semibold" htmlFor="Amount">Amount</label>
                                <input className="mb-2 text-sm font-extralight p-2 border-2 border-blacktext border-opacity-50 rounded-lg h-[38px] w-full" type="number" name="Amount" placeholder="Input the amount of your transaction" onChange={(e) => setTrans({ ...trans, amount: e.target.value })} />
                            </div>
                            <div>
                                <button type="submit" className="bg-greenbox text-primary font-semibold text-md px-2 py-1 rounded-lg">Add Transaction</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Finance;
