import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import CategoryIcon from '@material-ui/icons/Category';

const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });

function ExpenseItem(props) {
    const classes = useStyles()
    const category = () => {
        switch(props.category) {
        case "food":
            return <FastfoodIcon />;
            break;
        case "indulgent":
            return <LocalMallIcon />
            break;
        case "lifestyle":
            return <DirectionsRunIcon />
            break;
        default:
            return <CategoryIcon/>
        }
    }

    return(
        <div className="container wrapper">
            <div className="row"> 
                <Card className="col-8" variant= "outlined">
                    <CardContent>
                        {category()}
                        <small>{props.date.toString().substring(0,10)}</small>
                        <h3>{props.name}</h3> 
                        <body> $ {props.cost}</body>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default ExpenseItem