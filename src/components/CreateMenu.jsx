import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { createMenu } from '../api/api';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';

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

export default function CreateMenu({onUpdate}) {
  const [open, setOpen] = useState(false);
  const [newMenu, setNewMenu] = useState({ name: '', description: '', category: '' });
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMenu((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCreateMenu = async () => {
    try {
      await createMenu(newMenu);
      setNewMenu({ name: '', description: '', category: '' });
      onUpdate();
      handleClose();
    } catch (err) {
      console.error('Error creating menu:', err);
    }
  };

  return (
    <div>
        
      <Button variant='contained' onClick={handleOpen} style={{ color: "white" }}>
        <AddCircleOutlineRoundedIcon style={{margin:"2px"}}/>
        เพิ่ม Menu
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            สร้างเมนูใหม่
          </Typography>
          <TextField
            margin="normal"
            fullWidth
            label="ชื่อเมนู"
            name="name"
            value={newMenu.name}
            onChange={handleInputChange}
          />
          <TextField
            margin="normal"
            fullWidth
            label="คำอธิบาย"
            name="description"
            value={newMenu.description}
            onChange={handleInputChange}
          />
          <TextField
            margin="normal"
            fullWidth
            label="ประเภท"
            name="category"
            value={newMenu.category}
            onChange={handleInputChange}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateMenu}
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
