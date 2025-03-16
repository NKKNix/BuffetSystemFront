import { useEffect, useState } from "react";
import { getMenu } from "../api/api";
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { TextField } from "@mui/material";
import Box from '@mui/system/Box';

const SelectMenu = ({ onSelect }) => {
  const [menu, setMenu] = useState([]);
  const [selectedItems, setSelectedItems] = useState({}); 
  const [selectedRows, setSelectedRows] = useState([]);   

  useEffect(() => {
    FetchMenu();
  }, []);

  const FetchMenu = async () => {
    try {
      const response = await getMenu();
      setMenu(response.data);
    } catch (err) {
      console.error('Error fetching menu:', err);
    }
  };

  // Handle the quantity change for each menu item
  const handleQuantityChange = (menuId, amount) => {
    setSelectedItems((prevItems) => ({
      ...prevItems,
      [menuId]: { ...prevItems[menuId], amount: parseInt(amount) },
    }));
  };

  // Handle selection of rows (checkbox selection)
  const handleSelectionChange = (newSelectionModel) => {
    setSelectedRows(newSelectionModel);  // Correctly update selectedRows with new selection

    // Ensure the selected rows are added to the selectedItems state with default quantity if not already there
    const updatedItems = { ...selectedItems };
    newSelectionModel.forEach((menuId) => {
      if (!updatedItems[menuId]) {
        updatedItems[menuId] = { amount: 1 }; // Default amount
      }
    });
    setSelectedItems(updatedItems);

    // Remove deselected items from selectedItems
    const newSelectedItems = Object.keys(updatedItems)
      .filter((key) => newSelectionModel.includes(parseInt(key)))
      .reduce((obj, key) => {
        obj[key] = updatedItems[key];
        return obj;
      }, {});

    setSelectedItems(newSelectedItems);
  };

  // Generate columns for the DataGrid
  function getColumns() {
    return [
      { field: 'name', headerName: 'ชื่อเมนู', width: 200 },
      { field: 'description', headerName: 'รายละเอียด', width: 400 },
      { field: 'category', headerName: 'ประเภท', width: 200 },
      {
        field: 'quantity',
        headerName: 'จำนวน',
        width: 150,
        renderCell: (params) => (
          <TextField
            type="number"
            inputProps={{ min: 1 }}
            value={selectedItems[params.row.id]?.amount || 1} // Control value explicitly
            onChange={(e) => handleQuantityChange(params.row.id, e.target.value)}
            disabled={!selectedRows.includes(params.row.id)} // Disable if not selected
          />
        ),
      },
    ];
  }

  const columns = getColumns();

  // Whenever selectedItems changes, pass the updated array back to the parent component
  useEffect(() => {
    const selectedItemsArray = Object.entries(selectedItems).map(
      ([menuId, data]) => ({ menuId: parseInt(menuId), amount: data.amount })
    );
    onSelect(selectedItemsArray); 
  }, [selectedItems, onSelect]);

  return (
    <Box sx={{ my: 2 }}>
      <h2>เมนูทั้งหมด</h2>

      <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={menu}
        columns={columns}
        checkboxSelection
        onRowSelectionModelChange={handleSelectionChange}
        rowSelectionModel={selectedRows}
        disableSelectionOnClick  // Disable row selection on cell click
        onCellClick={(params, event) => {
          event.stopPropagation();  // Prevent the cell click from selecting the entire row
        }}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10,20,100]}
        sx={{ overflow: 'clip' }}
      />
      </div>
    </Box>
  );
};

export default SelectMenu;
