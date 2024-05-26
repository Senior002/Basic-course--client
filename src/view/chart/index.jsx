import React, {useState, useEffect} from 'react';
import { BarChart, Bar, ResponsiveContainer  ,Tooltip,XAxis,YAxis,PieChart,Pie} from 'recharts';
import "./index.css"
import axios from 'axios';
import URL from '../../config'
function Chart(){
    const [data, setData] = useState([])
    const [data2, setData2] = useState([])
    
    useEffect(() => {
        const Foo = () =>{
            axios.get(`${URL}/reports/group`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem("token")}`
                }
            }).then((res) => {setData(res.data)}).catch((err) => {alert(err)});
        }
        Foo()

        const Foo1 = () =>{
            axios.get(`${URL}/reports/groupPrice`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem("token")}`
                },
             params: { month: "Sentyabr" } 
            }).then((res) => {setData2(res.data)}).catch((err) => {alert(err)});
        }
        Foo1()
    }, []);
    console.log(data2)
    const data01 = [
        { name: 'Group A', value: 400 },
        { name: 'Group B', value: 300 },
        { name: 'Group C', value: 300 },
        { name: 'Group D', value: 200 },
        { name: 'Group E', value: 278 },
        { name: 'Group F', value: 189 },
      ];
    return (
     <div className="row full">
         <ResponsiveContainer width="100%" height="100%">
        <BarChart width={150} height={40} data={data}>
        <Tooltip />
        <XAxis dataKey="_id.name" />
        <YAxis />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          <Pie
            dataKey="price"
            isAnimationActive={false}
            data={data2}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          />
          
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
     </div>
    );
}

export default Chart
