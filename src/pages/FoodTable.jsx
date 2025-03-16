import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { getTable } from "../api/api";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { deleteTable } from "../api/api";
import CreateTable from "../components/CreateTable";
import EditTable from "../components/EditTable";
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import Box from '@mui/system/Box';
import QRCodeGenerator from "./GenQR";
const FoodTable = () => {
    const [table, setTable] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        FetchTable();
    }, []);

    const FetchTable = async () => {
        try {
            const response = await getTable();
            setTable(response.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteTable(id);
            setTable(table.filter((item) => item.id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    function handleButtonClick(params) {
        navigate(`/โต๊ะอาหาร/${params.row.id}`);
    }

    const columns = [
        { field: 'TableNumber', headerName: 'โต๊ะที่', width: 200 },
        { field: 'capacity', headerName: 'จำนวนที่นั่ง', width: 200 },
        { field: 'status', headerName: 'สถานะ', width: 100 },
        {
            field: 'update',
            headerName: 'Action',
            width: 150,
            renderCell: (params) => (
                <EditTable tableData={params.row} onUpdate={FetchTable} />
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
                    onClick={() => handleDelete(params.row.id)}
                >
                    <DeleteForeverIcon />
                    delete
                </Button>
            ),
        },
        {
            field: 'detail',
            headerName: '',
            width: 150,
            renderCell: (params) => (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleButtonClick(params)}
                >
                    <LibraryBooksOutlinedIcon />
                    ไปยังโต๊ะ
                </Button>
            ),
        },
        {
            field: 'qrcode',
            headerName: 'QR Code',
            width: 200,
            renderCell: (params) => (
                <QRCodeGenerator id={params.row.id} />
            ),
        },
    ];

    return (
        <Box sx={{ m: 4 }}>
            <div>
                <h1 style={{ margin: "20px" }}>โต๊ะอาหาร</h1>
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={table}
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
                    <div style={{ margin: "10px" }}>
                        <CreateTable onUpdate={FetchTable} />
                    </div>
                </div>
            </div>
        </Box>
    );
};

export default FoodTable;
