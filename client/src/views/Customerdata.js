import React, { useContext,useEffect,useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import {CircularProgress} from "@material-ui/core";
 import { green } from "@material-ui/core/colors";

import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { multiStepContext } from "../Context/StepContext";
import { Grid, Button, colors } from "@material-ui/core";
import { useParams } from "react-router-dom";
import axios from "axios";


const useStyles = makeStyles({
  table: {
    // minWidth: 65,
    border:"1px"    


  },
  
});
export default function Customerdata() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [customer, setCustomer] = useState({});
  const classes = useStyles();

  useEffect(async () => {
    await axios.get(`${process.env.REACT_APP_SERVER_URL}/customers/${id}`).then((res) => {
      setCustomer(res.data);
      setLoading(false);
    });
  }, [id]);

  return (
    <div>
     {loading ? (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
          <CircularProgress style={{ color: green[500] }} size={50} />
        </div>
      ) : (
        <div>
        <hr></hr>
        <h2>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>Details of customer : {customer.firstName+" " +customer.lastName}</b></h2>
      <br></br>
      <Grid  container>
        <Grid item xs={6} style={{ border: '1px solid black' }}>
          <TableContainer component={Paper}>
            <Table  className={classes.table}  aria-label="simple table">
              <TableHead>
                <TableRow  >
                  <TableCell style={{ border: '1px solid black' }}>Categories</TableCell>
                  <TableCell  style={{ border: '1px solid black' }} align="centre">Details</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell component="th" scope="row">
                    First Name
                  </TableCell>
                  <TableCell align="centre">{customer.firstName}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    Last Name
                  </TableCell>
                  <TableCell align="centre">{customer.lastName}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    Address
                  </TableCell>
                  <TableCell align="centre">{customer.Address}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    Gender
                  </TableCell>
                  <TableCell align="centre">{customer.gender}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    Phone Number
                  </TableCell>
                  <TableCell align="centre">{customer.Phone}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    DOB
                  </TableCell>
                  <TableCell align="centre">{customer.DOB}</TableCell>

                </TableRow>
                
 
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={6} style={{ border: '1px solid black' }}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell style={{ border: '1px solid black' }}>Categories</TableCell>
                  <TableCell style={{ border: '1px solid black' }} align="centre">Details</TableCell>
                </TableRow>
              </TableHead>
              <TableBody style={{ border: '1px solid black' }}>
                <TableRow >
                  <TableCell component="th" scope="row">
                    Account Name
                  </TableCell>
                  <TableCell align="centre">{customer.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    Account - Type
                  </TableCell>
                  <TableCell align="centre">{customer.accountType}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell  component="th" scope="row">
                    E-mail
                  </TableCell>
                  <TableCell align="centre">{customer.email}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    Deposit Amount
                  </TableCell>
                  <TableCell align="centre">{customer.amount}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    Employment Status
                  </TableCell>
                  <TableCell align="centre">{customer.employment}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
       
        
      </Grid>
      <br></br>
      <h4 style={{color:"red"}}> *** Note: You cannot modify the details of customer.</h4>
      <br></br>
      <br></br>
      <br></br>
      <br></br><br></br>
    </div>
      )}
    </div>
  );
}

