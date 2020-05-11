import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from '@material-ui/icons/Edit';

export default function Edittraining(props) {
    const [open, setOpen] = React.useState(false);
    const [training, setTraining] = React.useState({
        date: '', duration: '', activity: '', 
    })

    const handleClickOpen = () => {
        console.log(props.training)
        setTraining({date: props.training.date, duration: props.training.duration,
        activity: props.training.activity})
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleInputChange = (event) => {
        setTraining({...training, [event.target.name]: event.target.value })

    }
    //Asiakkaan tietojen päivittäminen
    const updateTraining = () => {
        props.updateTraining(training, props.training.links[0].href);
        handleClose();
    }

    return(
        <div>
    <EditIcon color="primary" onClick={handleClickOpen}>
        Edit
    </EditIcon>
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
    <DialogTitle id="form-dialog-title">Edit</DialogTitle>
    <DialogContent>
    <TextField
            autoFocus
            margin="dense"
            name="date"
            value={training.date}
            onChange={e => handleInputChange(e)}
            label="Date"
            fullWidth
          />
    <TextField
            autoFocus
            margin="dense"
            name="duration"
            type="number"
            step="1"
            value={training.duration}
            onChange={e => handleInputChange(e)}
            label="Duration"
            fullWidth
          />
    <TextField
            autoFocus
            margin="dense"
            name="activity"
            value={training.activity}
            onChange={e => handleInputChange(e)}
            label="Activity"
            fullWidth
          />
    </DialogContent>
    <DialogActions>
        <Button onClick={handleClose} color="primary">
            Cancel
        </Button>
        <Button onClick={updateTraining} color="primary">
            Save
        </Button>
    </DialogActions>
    </Dialog>
    </div>
    )
}