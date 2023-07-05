import React, { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Button } from "@material-ui/core";
import axios from "axios";
import { Link } from "react-router-dom";
 import { green } from "@material-ui/core/colors";

import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {CircularProgress} from "@material-ui/core";


toast.configure()


const notify = ()=>{
  
  toast.success('Customer deleted succesfully', {autoClose:3000,position:"bottom-left",onClose:()=>{
    window.location.reload()
  }})
    
}


const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 50,
    margin:"100px auto 200px",
   width:"70%"
  },
});
 
 
export default function Customers() { 
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);

  const [data, setData] = useState([]);
  const handleViewUser = (user) => {
    setSelectedUser(user);
  };

  useEffect(async () => {
    await axios.get(`${process.env.REACT_APP_SERVER_URL}/customers`).then((res) => {
      setData(res.data);
      setLoading(false);

    });
  }, []);
 
const deleteDocument = async (_id) => {   
      console.log(_id);
    await axios.delete(`${process.env.REACT_APP_SERVER_URL}/customers/'+_id`)
        .then((result) => {
          //this.props.history.push("/")

        });
    
  };

const showAlert=(_id) => {
    const confirmation = window.confirm("Are you sure you want to delete this customer?");
    if (confirmation) {
      deleteDocument(_id)
      notify()
          
    } 
    else {
      window.alert("Customer not delted");
    }
  } 
  return (
    <div>
      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
          <CircularProgress style={{ color: green[500] }} size={50} />
        </div>
      ) : (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>S No.</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="right">Amount</StyledTableCell>
              <StyledTableCell align="right">Transfer</StyledTableCell>
              <StyledTableCell align="right">Delete customer</StyledTableCell>
              <StyledTableCell align="right">View user</StyledTableCell>

            </TableRow>
          </TableHead>
          {data.length > 0 ? (
            <TableBody>
              {data.map((item, index) => {
                return (
                  <StyledTableRow key={item.name}>
                    <StyledTableCell component="th" scope="row">
                      {index + 1}
                    </StyledTableCell>
                    <StyledTableCell align="left" component="th" scope="row">
                      {item.name}
                    </StyledTableCell>
                    <StyledTableCell align="right">{item.amount}</StyledTableCell>
                    <StyledTableCell align="right">
                      <Link to={`/customers/${item._id}`}>
                        <Button variant="contained" color="primary">
                          Transfer
                        </Button>
                      </Link>
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <Button variant="contained" color="secondary" onClick={() => showAlert(item._id)}>
                        Delete
                      </Button>
                    </StyledTableCell>
                    <TableCell align="right">
                    <Link to={`/customerdata/${item._id}`}>
                    <Button
                          variant="contained"
                          color="primary"
                        
                        >
                          View User
                        </Button>
                      </Link>

                        
                      </TableCell>

                  </StyledTableRow>
                );
              })}
            </TableBody>
          ) : (
            <TableBody>
              <StyledTableRow>
                <StyledTableCell colSpan={5} align="center">
                 <h4> No customers found.<Link to="/add"> click here</Link> to add a customer.</h4>
                </StyledTableCell>
              </StyledTableRow>
            </TableBody>
          )}
        </Table>
      </TableContainer>
      )
      }
      </div>
      
  );
    }   
    
              