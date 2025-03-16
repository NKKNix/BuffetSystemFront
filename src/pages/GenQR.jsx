import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { genQrById } from '../api/api';

const QRCodeGenerator = ({ id }) => {  // Receive `id` as a prop
  const [qrCodeUrl, setQrCodeUrl] = useState(null);
  const [open, setOpen] = useState(false);

  // Function to handle QR code generation using Axios
  const handleGenerateQRCode = async () => {
    try {
      // Make a request to the backend to generate the QR code
      const response = await genQrById(id);
      const imgTagRegex = /<img src="([^"]*)"/;
      const match = response.data.match(imgTagRegex);
      if (match && match[1]) {
        setQrCodeUrl(match[1]); // Set the base64 image data as the QR code URL
        setOpen(true); // Open the modal when QR code is generated
      }
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  };

  // Function to handle closing the modal
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div >
      {/* Button to trigger QR code generation */}
      <Button variant="contained" color="secondary" onClick={handleGenerateQRCode}>
        Generate QR Code
      </Button>

      {/* Material-UI Dialog (Modal) to display the QR code */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>QR Code</DialogTitle>
        <DialogContent>
          {qrCodeUrl && <img src={qrCodeUrl} alt="QR Code" style={{ height: '100%' }} />}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default QRCodeGenerator;
