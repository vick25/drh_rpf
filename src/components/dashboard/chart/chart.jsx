"use client"

import { useEffect, useState } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Tooltip, CartesianGrid, XAxis, YAxis, Legend, Cell, ResponsiveContainer } from 'recharts';
import styles from './chart.module.css';
import { useContext } from 'react';
import { FormsContext } from '@/contexts/formsContext';
import { generateChartData, generateChartDataByProvince } from '@/lib/utils';
import { FaChartLine } from "react-icons/fa6";
import { BsBarChartLine } from "react-icons/bs";
import { RiPieChart2Line } from "react-icons/ri";

const Chart = ({ formDatas }) => {
  const { dispatch } = useContext(FormsContext);
  const [kbformDatas, setKbFormDatas] = useState([]);
  const [provincesDatas, setProvincesDatas] = useState([]);

  const [selectedState, setSelectedState] = useState('Kinshasa');
  const [chartType, setChartType] = useState('bar');

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
  };

  useEffect(() => {
    const retrieveFormDatas = () => {
      if (formDatas) {
        setKbFormDatas(formDatas);

        dispatch({
          type: 'SELECTED_FORMS',
          payload: {
            selectedForm: formDatas
          }
        })
        localStorage.setItem("forms", JSON.stringify(formDatas));
      }
    };

    retrieveFormDatas();
  }, [dispatch, formDatas])

  useEffect(() => {
    // setProvincesDatas(generateChartData(kbformDatas));
    setProvincesDatas(generateChartDataByProvince(kbformDatas));
  }, [kbformDatas])

  const renderChart = () => {
    const chartDatas = provincesDatas[selectedState];
    switch (chartType) {
      case 'line':
        return (
          <ResponsiveContainer width="100%" height="80%">
            <LineChart
              width={500}
              height={300}
              data={chartDatas}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="1 1" />
              <XAxis dataKey="name"
                padding={{
                  left: 10,
                  right: 10
                }} />
              <YAxis />
              <Tooltip contentStyle={{ background: "#151c2c", border: "none" }} />
              <Legend />
              <Line type="monotone" dataKey="Superficie" stroke="#8884d8" strokeDasharray="5 5" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="Restauration" stroke="#82ca9d" strokeDasharray="3 4 5 2" />
            </LineChart>
          </ResponsiveContainer>
        );
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height="80%">
            <PieChart>
              <Pie data={chartDatas} dataKey="Superficie" nameKey="name" cx="50%" cy="50%" outerRadius={130} fill="#8884d8" label>
                {chartDatas.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'][index % 5]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ color: "white", border: "none", borderRadius: "10px" }} />
            </PieChart>
          </ResponsiveContainer>
        );
      case 'bar':
      default:
        return (
          <ResponsiveContainer width="100%" height="80%">
            <BarChart
              width={500}
              height={300}
              data={chartDatas}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="1 1" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip contentStyle={{ background: "#151c2c", border: "none" }} />
              <Legend />
              <Bar dataKey="Superficie" stackId="a" fill="#8884d8" />
              <Bar dataKey="Restauration" stackId="a" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        );
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Superficie reboisée (ha) par province</h2>
      <div className="flex flex-col gap-3 items-center lg:flex-row justify-between mb-4">
        <div className="flex items-baseline gap-1 sm:flex-row">
          <label className="block text-sm font-bold" htmlFor="state-select">
            Choississez la province :
          </label>
          <select id="state-select" className="pbg-gray-100 dark:bg-gray-800 py-1 px-4 rounded-md border" value={selectedState} onChange={handleStateChange}>
            {Object.keys(provincesDatas).map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>
        <div className="text-sm gap-2 flex flex-col text-nowrap sm:flex-row">
          <button className={`w-full p-2 flex gap-2 rounded hover:bg-gray-500 ${chartType === 'bar' ? 'bg-blue-700 text-white focus:ring-4 focus:outline-none focus:ring-green-300' : 'bg-blue-500 text-white'}`}
            onClick={() => setChartType('bar')}>
            <BsBarChartLine className="w-5 h-5" />
            Bar
          </button>
          <button className={`w-full p-2 flex gap-2 rounded hover:bg-gray-500 ${chartType === 'line' ? 'bg-green-700 text-white focus:ring-4 focus:outline-none focus:ring-green-300' : 'bg-green-500 text-white'}`}
            onClick={() => setChartType('line')}>
            <FaChartLine className="w-5 h-5" />
            Line
          </button>
          <button className={`w-full p-2 flex gap-2 rounded hover:bg-gray-500 ${chartType === 'pie' ? 'bg-yellow-700 text-white focus:ring-4 focus:outline-none focus:ring-green-300' : 'bg-yellow-500 text-white'}`}
            onClick={() => setChartType('pie')}>
            <RiPieChart2Line className="w-5 h-5" />
            Pie
          </button>
        </div>
      </div>

      {renderChart()}
    </div>
  )
}

export default Chart;