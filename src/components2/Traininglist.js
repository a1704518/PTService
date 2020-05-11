import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Addtraining from './Addtraining';
import Edittraining from './Edittraining';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';



export default function Traininglist() {
    const [trainings, setTrainings] = useState([]);
    



    useEffect(() => fetchData(), []);

    const fetchData = () => {
    fetch('https://customerrest.herokuapp.com/api/trainings')
    .then(response => response.json())
    .then(data => setTrainings(data.content))
    }
    //Harjoituksen poistaminen
    const deleteTraining = (link) => {
        if (window.confirm('Are you sure you want to delete?')) {
        fetch(link, {method: 'DELETE'})
        .then(res => fetchData())
        .catch(err => console.error)
        }
    }
    //Uuden harjoituksen lisäys
    const saveTraining = (training) => {
        fetch('https://customerrest.herokuapp.com/api/trainings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(training)
        })
        .then(res => fetchData())
        .catch(err => console.error(err))
    }
    //Harjoituksen tietojen päivitys
    const updateTraining = (training, link) => {
        fetch(link, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(training)
        
    })
        .then(res => fetchData())
        .catch(err => console.error(err))

    }

    //Kolumnit
    const columns = [
         //Harjoituksen poisto painike
        {
            Header: 'Actions',
            sortable: false,
            filterable: false,
            width: 120,
            accessor: 'links[0].href',
            Cell: row => <DeleteForeverIcon fontSize="large" color="secondary" onClick={() => deleteTraining(row.value)}>Delete</DeleteForeverIcon>
        },
        //Harjoituksen editointi painike
        {
            sortable: false,
            filterable: false,
            width: 100,
            Cell: row => <Edittraining updateTraining={updateTraining} training={row.original} />

        },
        {
         Header: 'Date',
         accessor: 'date',
         
        },
        {
            Header: 'Duration',
            accessor: 'duration', 
        },
        {
            Header: 'Activity',
            accessor: 'activity'   
        },
    ]
    

    
    return (
        <div>
        <Addtraining saveTraining={saveTraining} />
        <ReactTable filterable={true} defaultPageSize={10} data={trainings} columns={columns} />
        </div>

    );
}