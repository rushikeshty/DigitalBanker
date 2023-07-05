import React, { useState, useEffect, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import {CircularProgress} from "@material-ui/core";
 import { red } from "@material-ui/core/colors";


import {
  Grid,
  Stepper,
  Step,
  Paper,
  makeStyles,
  StepLabel,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup as MuiRadioGroup,
  FormControlLabel,
  InputLabel,
  Radio,
  MenuItem,
  Select as MuiSelect,
  Button,
  Select,
} from "@material-ui/core";
import "./Customer.css";
import InputAdornment from "@material-ui/core/InputAdornment";
import { multiStepContext } from "../Context/StepContext";

import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



toast.configure() 


export default function Customer() {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [id2, setId2] = useState("");
   const [amount, setAmount] = useState("");
  const [data, setData] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [user, setUser] = useState([]);
  // const { transferData ,setTransferData, sendMoney } = useContext(multiStepContext);
  const history = useHistory();
  useEffect(async () => {
    getData(id);
      await axios.get(`${process.env.REACT_APP_SERVER_URL}/customers`).then((res) => {
      setUser(res.data);
      setLoading(false);
    });
  }, [id]);
 


  const handleMenuItemClick = (val) => {
     setSelectedValue(val);
  };

 
const getData = async (_id) => {
    //console.log(id);
try {
  const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/customers/`+_id);
    if (response) {
      setData(response.data);
      console.log(' '+response.data)
    }
    else{
      console.log('Not getting data')
    }
} catch (error) {
  console.log(error)
} 
    
  };
 

  async function sendMoney() {
    console.log(transferData);   
    await axios.put(`${process.env.REACT_APP_SERVER_URL}/customer/money`, transferData);
    await axios.post(`${process.env.REACT_APP_SERVER_URL}/transactions`, transferData);
    notify();
    history.push("/customers");
    
  }

  const count = Number(amount);
 
  const transferData = {
    count,
    id,
    id2,

  };
  const notify = ()=>{
  
    
    toast.success('Amount transferred succesfully.', {autoClose:3000,position:"bottom-left",onClose: () => {
      console.log('Toast is closed');
    },})
    
  }
  const showAlert=(_name)=> {
    const confirmation = window.confirm("Are you sure you want to transfer the money from "+_name+" to "+selectedValue);
    if (confirmation) {
      notify()    
      sendMoney()
      setTimeout(() => {
              window.location.href = `${process.env.REACT_APP_SERVER_URL}/transactions`;
  
      }, 3000);
  
    } else {
      window.alert("Transaction cancelled.");
    }
  } 
  return (
    <div style={{background:"rgba(0, 0, 0, 0)"}}>
    {loading ? (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
        <CircularProgress style={{ color: red[500] }} size={60} />
      </div>
    ) : (
      <>
  
    <div>
      <div className="app">
        <div className="details">
          <div className="big-img">
            <img
              src="../assets/images/sampleProfile.png"
              style={{ width: "70%" }}
              alt={data.DOB}
            />
          </div>
          <div className="box">
            <div className="row">
               <h4>
                 Customer Name: <b>{data.name}</b>
                 </h4>
                 
                <h4>
                  {/* <i class="fas fa-star" style={{ color: "yellow" }}></i> */}
                 Balance: <b>₹{data.amount}</b>
                  
                  
                </h4>
             
            
              <span>
              
               <b> {data.accountType}</b>
                <i></i>
               <b> Gender: {data.gender}</b>
              </span>
            </div>
            <div className="row">
              <FormControl>
              
                <InputLabel id="countrySelectLabel">Transfer to</InputLabel>
                <Select
                  labelId="countrySelectLabel"
                  id="countrySelect"
                  onChange={(e) => 
                   setId2(e.target.value)
                  }
                  
                  value={id2}
                >
                  {user.map((code, index) =>
                    data.name !== code.name ? (
                      <MenuItem key={index} value={code._id} onClick={() =>
                      handleMenuItemClick(code.name)
                      }>
                      
                      {"Customer name "+code.name+" balance "+ code.amount}
                         
                      </MenuItem>
                    ) : null
                  )}
                </Select>
              <hr></hr>
              </FormControl>
            
              <TextField
                label="Transfer Amount"
                id="standard-start-adornment"
                type="number"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                error={amount > data.amount}
                helperText={
                  (console.log(amount),
                  console.log(data.amount),
                  amount > data.amount
                    ? "The amount is greater than your balance"
                    : " ")
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">₹</InputAdornment>
                  ),
                }}
              />
            </div>
            <div>
              {amount > data.amount ? (
                <Button  size="large" variant="contained" disabled>
                Send Money
                </Button>
              ) : (
                <Button size="large"  variant="contained" color="primary" onClick={() => showAlert(data.name)}>
                Send Money
                </Button>
              )}
            </div>
            {/* <p>
              <button className="cart">{data.Phone}</button>
              <Button variant="outline-primary">{Movie.Genre}</Button>
            </p>
            <p>{Movie.Plot}</p>
            <hr></hr>
            <p>
              <strong style={{ color: "#38b000" }}>
                Director&nbsp;&nbsp;{" "}
              </strong>{" "}
              {"       "}
              {Movie.Director}
            </p>
            <hr></hr>
            <p>
              <strong style={{ color: "#38b000" }}>Actors &nbsp;&nbsp; </strong>{" "}
              {"       "}
              {Movie.Actors}
            </p>
            <hr></hr>
            <p>
              <strong style={{ color: "#38b000" }}>
                Languages&nbsp;&nbsp;{" "}
              </strong>{" "}
              {"       "}
              {Movie.Language}
            </p> */}
          </div>
        </div>
      </div>
    </div>
    </>
    )}
  </div>
  
            )}