import React, { useState } from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

function BasicModal({ id, details }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>รายละเอียดออเดอร์</Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ padding: 4, backgroundColor: 'white', maxWidth: '500px', margin: 'auto', marginTop: '20%' }}>
          <Typography variant="h6" gutterBottom>
            รายละเอียดออเดอร์ #{id} 
          </Typography>
          {details.map((detail) => (
            <div key={detail.id}>
              <Typography>{detail.FoodMenu.name} จำนวน: {detail.amount}</Typography>
            </div>
          ))}
          <br />
          <br />
          <Button onClick={handleClose} variant="contained" color="primary">
            Close
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default BasicModal;
