import React, { FC, useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import styles from './FollowersGraph.module.scss';
import GraphData from '../../models/GraphData';
import { downloadCsv } from '../../utils/fetch-vacations';
import {getGraphData} from '../../utils/fetch-followers';
import { NavLink } from 'react-router-dom';
import { FaFileCsv } from 'react-icons/fa6';

interface FollowersGraphProps {
}

const FollowersGraph: FC<FollowersGraphProps> = () => {

  const [graphData,setGraphData] = useState<GraphData[]>([]);

    useEffect(() => {
    try{
      const graphDataHandler = () => {
        getGraphData().then((graphData) => {
          setGraphData(graphData);
        }).catch((err) => {
          console.log(err);
        })
      }
      graphDataHandler();
      
    }catch(err:any){
      console.log(err.message);
    }
  },[])

  const getCsvFile = async () => {
    try{
      await downloadCsv();
    }catch(err:any){
      console.log(err.message);
    }
  }

  const data = {
    labels: graphData.map(vacation => vacation.destination),
    datasets: [
      {
        label: 'Number of Likes',
        data: graphData.map(vacation => vacation.followers),
        backgroundColor: 'rgb(0, 99, 255)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 0.5,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        precision: 0,
      },
    }
  };

  return(     
  <div className={styles.FollowersGraph__graph}> 
    <div className={styles.FollowersGraph__btn}>
    <NavLink to={'/'} className={styles.Vacations__closeGraph}>Close Statistics</NavLink>
    <button onClick={getCsvFile}>Download Csv &nbsp;<FaFileCsv size={18}/></button>
    </div>
      <Bar data={data} options={options} />
  </div>
  );
}

export default FollowersGraph;
