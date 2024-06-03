'use client'
import { useState } from 'react';
import { ResponsiveContainer, BarChart, LineChart, PieChart, Bar, Line, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell } from 'recharts';

const data = [
    { city: 'City A', population: 4000 },
    { city: 'City B', population: 3000 },
    { city: 'City C', population: 2000 },
    { city: 'City D', population: 2780 },
    { city: 'City E', population: 1890 },
];

const ChartComponent = () => {
    const [selectedState, setSelectedState] = useState('');
    const [chartType, setChartType] = useState('bar');

    const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedState(e.target.value);
    };

    const handleChartTypeChange = (type: string) => {
        setChartType(type);
    };

    const renderChart = () => {
        switch (chartType) {
            case 'line':
                return (
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="city" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="population" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                );
            case 'pie':
                return (
                    <PieChart>
                        <Pie data={data} dataKey="population" nameKey="city" cx="50%" cy="50%" outerRadius={50} fill="#8884d8" label>
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'][index % 5]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                );
            case 'bar':
            default:
                return (
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="city" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="population" fill="#8884d8" />
                    </BarChart>
                );
        }
    };

    return (
        <div className="container mx-auto p-4">
            <div className="mb-4">
                <label htmlFor="state" className="mr-2">Select State:</label>
                <select id="state" onChange={handleStateChange} className="border p-2">
                    <option value="">Select a state</option>
                    <option value="State1">State 1</option>
                    <option value="State2">State 2</option>
                    <option value="State3">State 3</option>
                </select>
            </div>
            <div className="mb-4">
                <button onClick={() => handleChartTypeChange('bar')} className={`mr-2 p-2 ${chartType === 'bar' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Bar Chart</button>
                <button onClick={() => handleChartTypeChange('line')} className={`mr-2 p-2 ${chartType === 'line' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Line Chart</button>
                <button onClick={() => handleChartTypeChange('pie')} className={`mr-2 p-2 ${chartType === 'pie' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Pie Chart</button>
            </div>
            <div className="w-full h-64">
                <ResponsiveContainer>
                    {renderChart()}
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default ChartComponent;