import React , { useState }from "react"
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import CategoryIcon from '@material-ui/icons/Category';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';
import './Form.css'
import ExpenseService from '../Services/ExpenseService'

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
    },join: {
        background: '#B31D14',
        '& > *': {
          textTransform: 'none !important',
        }
    }
  });

function ExpenseItem(props) {
    const [id] = useState({id: props.id})

    const classes = useStyles()

    const category = () => {
        switch(props.category) {
        case "food":
            return <div>
                    <FastfoodIcon />
                    <small className="icon">Food</small>
                   </div>;
        case "indulgent":
            return <div>
                        <LocalMallIcon />
                        <small className="icon">Indulgent</small>
                    </div>;
        case "lifestyle":
            return <div>
                        <DirectionsRunIcon />
                        <small className="icon">Lifestyle</small>
                    </div>;
        default:
            return <div>
                    <CategoryIcon />
                    <small className="icon">Other</small>
                   </div>;
        }
    }

    const onClick = e => {
        ExpenseService.deleteSpending(id).then((data) => {
            props.callback()
            return data;
        });
    }

    return(
        <div className="container wrapper cardname">
            <div className="row"> 
                <div className="col-md-6 offset-md-3"> 
                    <Card variant= "outlined">
                        <CardContent>
                            <div> 
                                <Grid container direction="row" alignItems="center">    
                                    <Grid item md={10} xs={10}>      
                                        {category()}
                                        <small><h5 className="cardname">{props.date.toString().substring(0,10)}</h5></small>
                                    </Grid> 
                                    <Grid item md={2} xs={2}>  
                                        <Button
                                        className={classes.join}
                                        variant={'contained'}
                                        color={'secondary'}
                                        onClick={onClick}>
                                        Delete
                                        </Button>
                                    </Grid>
                                </Grid>    

                                <h4 font-family= "Montserrat" sans-serif className="cardname">{props.name}</h4> 
                                <h4 className="cardname"> $ {props.cost}</h4>

                            </div> 
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default ExpenseItem