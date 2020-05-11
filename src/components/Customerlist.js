import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Addcustomer from './Addcustomer';
import Editcustomer from './Editcustomer';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';



export default function Customerlist() {
    const [customers, setCustomers] = useState([]);



    useEffect(() => fetchData(), []);

    const fetchData = () => {
    fetch('https://customerrest.herokuapp.com/api/customers')
    .then(response => response.json())
    .then(data => setCustomers(data.content))
    }
    //Käyttäjän poistaminen
    const deleteCustomer = (link) => {
        if (window.confirm('Are you sure you want to delete?')) {
        fetch(link, {method: 'DELETE'})
        .then(res => fetchData())
        .catch(err => console.error)
        }
    }
    //Uuden käyttäjän lisäys
    const saveCustomer = (customer) => {
        fetch('https://customerrest.herokuapp.com/api/customers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
        })
        .then(res => fetchData())
        .catch(err => console.error(err))
    }
    //Asiakkaan tietojen päivitys
    const updateCustomer = (customer, link) => {
        fetch(link, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(customer)
    })
        .then(res => fetchData())
        .catch(err => console.error(err))
    }

    //Kolumnit
    const columns = [
         //Asiakkaan poisto painike
        {
            Header: 'Actions',
            sortable: false,
            filterable: false,
            width: 100,
            accessor: 'links[0].href',
            Cell: row => <DeleteForeverIcon fontSize="large" color="secondary" onClick={() => deleteCustomer(row.value)}>Delete</DeleteForeverIcon>
        },
        //Asiakkaan editointi painike
        {
            sortable: false,
            filterable: false,
            width: 100,
            Cell: row => <Editcustomer updateCustomer={updateCustomer} customer={row.original} />

        },
        {
         Header: 'Firstname',
         accessor: 'firstname'   
        },
        {
            Header: 'Lastname',
            accessor: 'lastname'   
        },
        {
            Header: 'Address',
            accessor: 'streetaddress'   
        },
        {
            Header: 'Postcode',
            accessor: 'postcode'   
        },
        {
            Header: 'City',
            accessor: 'city'   
        },
        {
            Header: 'Email',
            accessor: 'email'   
        },
        {
            Header: 'Phone',
            accessor: 'phone'   
        },
    ]

    
    return (
        <div>
        <Addcustomer saveCustomer={saveCustomer} />
        <ReactTable filterable={true} defaultPageSize={15} data={customers} columns={columns} />
        </div>

    );
}