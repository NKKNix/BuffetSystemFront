import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { updateMenu } from '../api/api'; // Assuming updateMenu is the correct function to update by ID
import CreateIcon from '@mui/icons-material/Create';

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

export default function EditMenu({ menuData, onUpdate }) {
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState({ id: '', name: '', description: '', category: '' });

  useEffect(() => {
    if (menuData) {
      setMenu(menuData); // Populate the form with existing menu data
    }
  }, [menuData]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMenu((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdateMenu = async () => {
    try {
      await updateMenu(menu.id, menu); // Update the menu item based on its ID
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
            แก้ไขเมนู
          </Typography>
          <TextField
            margin="normal"
            fullWidth
            label="ชื่อเมนู"
            name="name"
            value={menu.name}
            onChange={handleInputChange}
          />
          <TextField
            margin="normal"
            fullWidth
            label="คำอธิบาย"
            name="description"
            value={menu.description}
            onChange={handleInputChange}
          />
          <TextField
            margin="normal"
            fullWidth
            label="ประเภท"
            name="category"
            value={menu.category}
            onChange={handleInputChange}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdateMenu}
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
