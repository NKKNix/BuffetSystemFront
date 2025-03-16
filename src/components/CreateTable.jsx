import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { createTable } from '../api/api';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import FormControl from '@mui/material/FormControl';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

import Select from '@mui/material/Select';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function CreateTable({ onUpdate }) {
  const [open, setOpen] = useState(false);
  const [newTable, setnewTable] = useState({ TableNumber: '', capacity: '', status: 'Available' }); // Initialize with default status
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event) => {
    const { value } = event.target;
    setnewTable((prevState) => ({
      ...prevState,
      status: value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setnewTable((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCreateTable = async () => {
    try {
      await createTable(newTable);
      setnewTable({ TableNumber: '', capacity: '', status: 'Available' }); // Reset with default status
      onUpdate();
      handleClose();
    } catch (err) {
      console.error('Error creating menu:', err);
    }
  };

  return (
    <div>
      <Button variant='contained' onClick={handleOpen} style={{ color: "white" }}>
        <AddCircleOutlineRoundedIcon style={{ margin: "2px" }} />
        เพิ่มโต๊ะอาหาร
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            สร้างโต๊ะใหม่
          </Typography>
          <TextField
            margin="normal"
            fullWidth
            label="หมายเลขโต๊ะ"
            name="TableNumber"
            value={newTable.TableNumber}
            onChange={handleInputChange}
          />
          <TextField
            margin="normal"
            fullWidth
            label="จำนวนที่นั่ง"
            name="capacity"
            value={newTable.capacity}
            onChange={handleInputChange}
          />

          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">สถานะ</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={newTable.status}
                name='status'
                label="สถานะ"
                onChange={handleChange}
              >
                <MenuItem value="Available">Available</MenuItem>
                <MenuItem value="Busy">Busy</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateTable}
            style={{ marginTop: '16px' }}
            fullWidth
          >
            สร้าง
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
