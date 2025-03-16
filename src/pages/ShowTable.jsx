import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; 
import { getTableById, placeOrder } from "../api/api"; 
import Box from '@mui/system/Box';
import SelectMenu from "../components/SelectMenu";
import Button from '@mui/material/Button';

const ShowTable = () => {
  const { id } = useParams();  // Get the table ID from the URL
  const [tableData, setTableData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]); 

  useEffect(() => {
    const fetchTableData = async () => {
      try {
        const response = await getTableById(id);  
        setTableData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchTableData();
  }, [id]);

  const handleOrder = async () => {
    const orderData = {
      tableId: id,
      orderDetails: selectedItems
    };

    try {
      const response = await placeOrder(orderData);
      console.log(response)
      alert("Order placed successfully!");
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Box sx={{ m: 2 }}>
      <div>
        <h2>โต๊ะที่ #{tableData.TableNumber}</h2>
        <SelectMenu onSelect={setSelectedItems} />
      </div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOrder}
        disabled={selectedItems.length === 0} 
      >
        สั่งอาหาร
      </Button>
    </Box>
  );
};

export default ShowTable;
