import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function Addtraining(props) {
    const [open, setOpen] = React.useState(false);
    const [training, setTraining] = React.useState({
        date: '', duration: '', activity: '',
    })

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleInputChange = (event) => {
        setTraining({...training, [event.target.name]: event.target.value })

    }

    const addTraining = () => {
        props.saveTraining(training);
        handleClose();
    }

    return(
        <div>
    <Button fontSize="large" style={{margin: 12}} variant="outlined" color="primary" onClick={handleClickOpen}>
        Add Training
    </Button>
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
    <DialogTitle id="form-dialog-title">New training</DialogTitle>
    <DialogContent>
    <TextField
            autoFocus
            margin="dense"
            name="date"
            type="datetime-local"
            value={training.date}
            onChange={e => handleInputChange(e)}
            fullWidth
          />
    <TextField
            autoFocus
            margin="dense"
            name="duration"
            type="number"
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
        <Button onClick={addTraining} color="primary">
            Save
        </Button>
    </DialogActions>
    </Dialog>
    </div>
    )
}