import { use, useEffect, useState } from "react"
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import AddCar from "./AddCar";

// Import GirdColDef type
import type { GridColDef, GridRowParams } from '@mui/x-data-grid';

type TCar = {
    brand: string;
    model: string;
    color: string;
    fuel: string;
    modelYear: number;
    price: number;
}

export default function CarList () {
    const [cars, setCars] = useState<TCar[]>([]);

    const columns: GridColDef[] = [
    { field: 'brand' },
    { field: 'model' },
    { field: 'color' },
    { field: 'fuel' },
    { field: 'modelYear' },
    { field: 'price' },
    {
    field: 'actions', 
    type: 'actions',
    getActions: (params: GridRowParams) => [
        <Button onClick={()=> handleDelete(params.id as string)}>Delete</Button>
    ]
    },
]
    const getCars = async () => {
        try {
            const response = await fetch('https://car-rest-service-carshop.2.rahtiapp.fi/cars')
            if (!response) {
                throw new Error('Error delete cars: ${response.statusText}' )
            }
            const data = await response.json()
            setCars(data._embedded.cars)
            } catch (err) {
            console.log(err)
            }
    }
    //Delete button
    const handleDelete = async (url: string) => {
        try {
            const options = {
                method: 'DELETE'
            };

            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error('Error deleting car: ${response.statusText}');
            }
            getCars();
        } catch (err) {
            console.log(err);
        }
    }

    //Add button
    const handleAdd = async (car: TCar) => {
        try {
            const options = {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(car)
            }

            const response = await fetch('https://car-rest-service-carshop.2.rahtiapp.fi/cars', options);
            if (!response.ok) {
                throw new Error('Error adding car: ${response.statusText}');
            }
            getCars();
           
        
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => { getCars(); })

    return (
        <>
        {/* Korvattu nappi AddCar-komponentilla */}
        <AddCar onAdded={getCars} />
        <div style={{ height: '100vh', width: '90%', margin: 'auto' }}>
        <DataGrid
            rows={cars}
            columns={columns}
            getRowId={row => row._links.self.href}
        />
        </div>
        <p>{cars.length}</p>
        </>
    )
}