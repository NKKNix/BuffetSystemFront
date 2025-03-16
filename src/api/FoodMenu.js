import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getMenu } from "./api";
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from "@mui/material";
import CreateMenu from "../components/CreateMenu";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { deleteMenu } from "./api";
import EditMenu from "../components/EditMenu";
import Box from '@mui/system/Box';

const FoodMenu = () => {
  const [menu, setMenu] = useState([]);
  const location = useLocation();
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
  function getColumns(){
    if(location.pathname === "/%E0%B9%80%E0%B8%A1%E0%B8%99%E0%B8%B9"){
      const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'ชื่อเมนู', width: 200 },
        { field: 'description', headerName: 'รายละเอียด', width: 400 },
        { field: 'category', headerName: 'ประเภท', width: 200 },
        {
          field: 'update',
          headerName: 'Action',
          width: 150,
          renderCell: (params) => (
            
            <EditMenu menuData={params.row} onUpdate={FetchMenu}/>
          ),
        },
        {
          field: 'delete',
          headerName: '',
          width: 150,
          renderCell: (params) => (
            <Button
              variant="contained"
              color="error"
              onClick={()=>handleDelete(params.row.id)}
            >
              <DeleteForeverIcon/>
              delete
            </Button>
          ),
        },
      ];
      return columns
    }else{
      const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'ชื่อเมนู', width: 200 },
        { field: 'description', headerName: 'รายละเอียด', width: 400 },
        { field: 'category', headerName: 'ประเภท', width: 200 },
      ];
      return columns
    }
  }
  const columns = getColumns()
  
  const handleDelete = async (id) => {
    try {
      await deleteMenu(id); 
      setMenu(menu.filter((item) => item.id !== id));
    } catch (err) {
      console.error('Error deleting menu:', err);
    }
  };
  return (
    <Box sx={{m: 2}}>
      <h2>เมนูทั้งหมด</h2>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={menu}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          sx={{ overflow: 'clip' }}
        />
        {location.pathname === "/%E0%B9%80%E0%B8%A1%E0%B8%99%E0%B8%B9" ? (
          <div style={{margin:"10px"}}>
          <CreateMenu onUpdate={FetchMenu}/>
        </div>
        ):(
          <div></div>
        )}
        
      </div>
    </Box>
  );
};

export default FoodMenu;
