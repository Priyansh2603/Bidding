import React, { useState } from "react";
import axiosAPI from "../api/axiosApi";

const BiddingData = ({ }) => {
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");
    const axios = axiosAPI();
    const [data, setData] = useState([]);
    const getData = async () => {
        try {
            const { data } = await axios.get('/form');
            setData(data.formData);
        } catch (e) {
            console.log(e);
        }
    }
    useEffect(()=>{
        getData();
    },[])
    const filteredData = data?.filter((item) => {
        return (
            (filter === "all" || item.gstStatus === filter) &&
            (item.name.toLowerCase().includes(search.toLowerCase()) ||
                item.companyName.toLowerCase().includes(search.toLowerCase()) ||
                item.mobile.includes(search))
        );
    });

    return (
        <div className="md:max-w-5xl mx-auto p-4 space-y-4">
            <h1 className="flex justify-center text-3xl md:text-5xl">All Collected Data</h1>
            {/* Search & Filter */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <input
                    type="text"
                    placeholder="Search by name, company, or mobile"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="p-2 border border-gray-300 rounded w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="p-2 border border-gray-300 rounded w-full md:w-1/4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="all">All</option>
                    <option value="gst">GST</option>
                    <option value="non-gst">Non-GST</option>
                </select>
            </div>

            {/* Data Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredData.map((item) => (
                    <div
                        key={item._id}
                        className="p-4 shadow-lg border border-gray-200 rounded-lg bg-white transition-transform transform hover:scale-105"
                    >
                        <h2 className="text-xl font-semibold">{item.name}</h2>
                        <p className="text-gray-600">{item.companyName}</p>
                        <p className="text-gray-500">Mobile: {item.mobile}</p>
                        {item.email && <p className="text-gray-500">Email: {item.email}</p>}
                        <p
                            className={`text-sm font-medium ${item.gstStatus === "gst"
                                    ? "text-green-600"
                                    : "text-red-600"
                                }`}
                        >
                            {item.gstStatus.toUpperCase()}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BiddingData;
