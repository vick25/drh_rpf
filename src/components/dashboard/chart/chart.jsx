"use client"

import { useEffect, useState } from 'react';
import { Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts';
import styles from './chart.module.css';
import { useContext } from 'react';
import { FormsContext } from '@/contexts/formsContext';
import { generateChartData } from '@/lib/utils';

const Chart = ({ formDatas }) => {
  const { dispatch } = useContext(FormsContext);
  const [kbformDatas, setKbFormDatas] = useState([]);
  const [chartDatas, setChartDatas] = useState([]);

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
      }
    };

    retrieveFormDatas();
  }, [])

  useEffect(() => {
    setChartDatas(generateChartData(kbformDatas));
  }, [kbformDatas])

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Superficie Reboisée (ha)</h2>
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

export default Chart;