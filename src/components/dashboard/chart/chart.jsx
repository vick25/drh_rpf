"use client"

import { useEffect, useState } from 'react';
import { Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts';
import styles from './chart.module.css';
import { useContext } from 'react';
import { FormsContext } from '@/contexts/formsContext';
import { generateChartData } from '@/lib/utils';

const data = [
  {
    name: "Sun",
    visit: 4000,
    click: 2400,
  },
  {
    name: "Mon",
    visit: 3000,
    click: 1398,
  },
  {
    name: "Tue",
    visit: 2000,
    click: 3800,
  },
  {
    name: "Wed",
    visit: 2780,
    click: 3908,
  },
  {
    name: "Thu",
    visit: 1890,
    click: 4800,
  },
  {
    name: "Fri",
    visit: 2390,
    click: 3800,
  },
  {
    name: "Sat",
    visit: 3490,
    click: 4300,
  },
];

const Chart = ({ formDatas }) => {
  const { dispatch } = useContext(FormsContext);
  const [kbformDatas, setKbFormDatas] = useState([]);
  const [chartDatas, setChartDatas] = useState([]);

  useEffect(() => {
    const retrieveFormDatas = () => {
      if (formDatas) {
        // console.log(formDatas)
        setKbFormDatas(formDatas);
      }
    };

    retrieveFormDatas();

    dispatch({
      type: 'SELECTED_FORMS',
      payload: {
        selectedForm: kbformDatas
      }
    })
  }, [])

  useEffect(() => {
    setChartDatas(generateChartData(kbformDatas));
    console.log(chartDatas);
  }, [kbformDatas])

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Superficie Reboisé (ha)</h2>
      <ResponsiveContainer width="100%" height="90%">
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
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip contentStyle={{ background: "#151c2c", border: "none" }} />
          <Legend />
          <Line type="monotone" dataKey="Superficie" stroke="#8884d8" strokeDasharray="5 5" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="Restauration" stroke="#82ca9d" strokeDasharray="3 4 5 2" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Chart