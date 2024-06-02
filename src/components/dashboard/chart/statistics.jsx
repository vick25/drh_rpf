'use client'

import { useState } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Tooltip, CartesianGrid, XAxis, YAxis, Legend, Cell, ResponsiveContainer } from 'recharts';
import { FaChartLine } from "react-icons/fa6";
import { BsBarChartLine } from "react-icons/bs";
import { RiPieChart2Line } from "react-icons/ri";

const citiesData = {
    "California": [
        { name: "Los Angeles", population: 3970000 },
        { name: "San Diego", population: 1420000 },
        { name: "San Jose", population: 1035000 }
    ],
    "Texas": [
        { name: "Houston", population: 2320000 },
        { name: "San Antonio", population: 1547000 },
        { name: "Dallas", population: 1340000 }
    ]
};

const Statistics = () => {
    const [selectedState, setSelectedState] = useState('California');
    const [chartType, setChartType] = useState('bar');

    const handleStateChange = (e) => {
        setSelectedState(e.target.value);
    };

    const renderChart = () => {
        const data = citiesData[selectedState];
        switch (chartType) {
            case 'line':
                return (
                    <ResponsiveContainer width="100%" height={400}>
                        <LineChart data={data} margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="population" stroke="#8884d8" />
                        </LineChart>
                    </ResponsiveContainer>
                );
            case 'pie':
                return (
                    <ResponsiveContainer width="100%" height={400}>
                        <PieChart>
                            <Pie data={data} dataKey="population" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={['#0088FE', '#00C49F', '#FFBB28'][index % 3]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                );
            case 'bar':
            default:
                return (
                    <ResponsiveContainer width="100%" height="90%">
                        <BarChart width={600} height={300} data={data} margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="population" fill="#2563eb" />
                        </BarChart>
                    </ResponsiveContainer>
                );
        }
    };

    return (
        <div className="px-4 py-8 md:py-12 min-h-screen w-full mx-auto">
            <div class="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold mb-4">US State Statistics</h1>
                <div className="mb-4 flex items-baseline gap-1">
                    <label className="block text-sm font-bold mb-2" htmlFor="state-select">
                        Select State:
                    </label>
                    <select id="state-select" className="pbg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-md border" value={selectedState} onChange={handleStateChange}>
                        {Object.keys(citiesData).map(state => (
                            <option key={state} value={state}>{state}</option>
                        ))}
                    </select>
                </div>
                <div className="flex space-x-2 items-center mb-4">
                    <button className={`p-2 flex gap-2 rounded hover:bg-gray-400 ${chartType === 'bar' ? 'bg-blue-700 text-white' : 'bg-blue-500 text-white'}`}
                        onClick={() => setChartType('bar')}>
                        <BsBarChartLine className="w-5 h-5" />
                        Bar Chart
                    </button>
                    <button className={`p-2 flex gap-2 rounded hover:bg-gray-400 ${chartType === 'line' ? 'bg-green-700 text-white' : 'bg-green-500 text-white'}`}
                        onClick={() => setChartType('line')}>
                        <FaChartLine className="w-5 h-5" />
                        Line Chart
                    </button>
                    <button className={`p-2 flex gap-2 rounded hover:bg-gray-400 ${chartType === 'pie' ? 'bg-yellow-700 text-white' : 'bg-yellow-500 text-white'}`}
                        onClick={() => setChartType('pie')}>
                        <RiPieChart2Line className="w-5 h-5" />
                        Pie Chart
                    </button>
                </div>
            </div>
            <div className="bg-white p-4 rounded shadow-md">
                {renderChart()}
            </div>
        </div>
    );
};

export default Statistics;