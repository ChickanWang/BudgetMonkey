import React , {useState} from "react";
import Card from '@material-ui/core/Card';
import { Grid } from '@material-ui/core';
import { PieChart, Pie, Sector } from 'recharts';
import "./spendings.css";
import "./Form.css"

function StatItem(props) {
    const [index, setIndex] = useState(0)
    let month

    if (props.month === 1) {
        month = "January"
    }
    if (props.month === 2) {
        month = "February"
    }
    if (props.month === 3) {
        month = "March"
    }
    if (props.month === 4) {
        month = "April"
    }
    if (props.month === 5) {
        month = "May"
    }
    if (props.month === 6) {
        month = "June"
    }
    if (props.month === 7) {
        month = "July"
    }
    if (props.month === 8) {
        month = "August"
    }
    if (props.month === 9) {
        month = "September"
    }
    if (props.month === 10) {
        month = "October"
    }
    if (props.month === 11) {
        month = "November"
    }
    if (props.month === 12) {
        month = "December"
    }


    const data = [
        { name: 'Food', value: props.food },
        { name: 'Indulgent', value: props.indulgent},
        { name: 'Lifestyle', value: props.lifestyle },
        { name: 'Other', value: props.other },
      ];
      
    const renderActiveShape = (poops) => {
        const RADIAN = Math.PI / 180;
        const {
            cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
            fill, payload, percent, value,
        } = poops;
        const sin = Math.sin(-RADIAN * midAngle);
        const cos = Math.cos(-RADIAN * midAngle);
        const sx = cx + (outerRadius + 10) * cos;
        const sy = cy + (outerRadius + 10) * sin;
        const mx = cx + (outerRadius + 30) * cos;
        const my = cy + (outerRadius + 30) * sin;
        const ex = mx + (cos >= 0 ? 1 : -1) * 22;
        const ey = my;
        const textAnchor = cos >= 0 ? 'start' : 'end';
        
        return (
            <g>
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>{payload.name}</text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 10}
                fill={fill}
            />
            <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`$${value}`}</text>
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
                {`${(percent * 100).toFixed(2)}%`}
            </text>
            </g>
        );
    };

    const onPieEnter = (data, index) => {
        setIndex(index)
      };

    return (
        <div className="container wrapper cardname">
            <div className="row"> 
                <div className="col-10 offset-1"> 
                    <Card variant= "outlined">
                        <Grid container direction="row" alignItems="center">  
                            <Grid item md={6} xs={12}> 
                                <div className="left"> 
                                    <h2 style={{textDecorationLine:'underline'}}> {month} {props.year} </h2>
                                    <h5> Food Spending: ${props.food}</h5>
                                    <h5> Lifestyle Spending: ${props.lifestyle}</h5>
                                    <h5> Indulgent Spending: ${props.indulgent}</h5>
                                    <h5> Other Spending: ${props.other}</h5>
                                    <h4> Total Spending: ${props.total}</h4>
                                </div>
                            </Grid>
                            {window.innerWidth >= 1000 ? 
                                <Grid item md={6}> 
                                    {
                                        <PieChart width={800} height={400}>
                                            <Pie
                                            activeIndex={index}
                                            activeShape={renderActiveShape}
                                            data={data}
                                            cx={200}
                                            cy={200}
                                            innerRadius={65}
                                            outerRadius={80}
                                            fill="#00a86b"
                                            dataKey="value"
                                            onMouseEnter={onPieEnter}
                                            />
                                        </PieChart>
                                    }
                                </Grid> 
                            : <> </>}
                        </Grid>
                    </Card>
                </div>
            </div>
        </div>
            )
}

export default StatItem;