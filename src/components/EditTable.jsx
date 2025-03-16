import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { updateTable } from '../api/api';
import FormControl from '@mui/material/FormControl';
import CreateIcon from '@mui/icons-material/Create';
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

export default function EditTable({ tableData, onUpdate }) {
  const [open, setOpen] = useState(false);
  const [newTable, setnewTable] = useState({ id: '', name: '', description: '', category: '' });

  useEffect(() => {
    if (tableData) {
      setnewTable(tableData); // Populate the form with existing menu data
    }
  }, [tableData]);

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

  const handleupdateTable = async () => {
    try {
      await updateTable(newTable.id, newTable); // Update the menu item based on its ID
      onUpdate(); 
      handleClose();
    } catch (err) {
      console.error('Error updating menu:', err);
    }
  };

  return (
    <div>
      <Button variant='contained' onClick={handleOpen} color='warning' style={{ color: "white" }}>
        <CreateIcon />
        Update
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            แก้ไขโต๊ะอาหาร
          </Typography>
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
            onClick={handleupdateTable}
            style={{ marginTop: '16px' }}
            fullWidth
          >
            อัปเดต
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
