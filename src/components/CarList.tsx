import { use, useEffect, useState } from "react"
import { DataGrid } from '@mui/x-data-grid';

// Import GirdColDef type
import type { GridColDef } from '@mui/x-data-grid';

type TCar = {
    Brand: string;
    Model: string;
    Color: string;
    Fuel: string;
    Year: number;
    Price: number;
}


export default function CarList () {
    const [cars, setCars] = useState<TCar[]>([]);

    // Define columns
    const columns: GridColDef[] = [
    { field: 'Brand' },
    { field: 'Model' },
    { field: 'Color' },
    { field: 'Fuel' },
    { field: 'Year' },
    { field: 'Price' }
]

    const getCars = async () => {
        try {
            const response = await fetch('https://car-rest-service-carshop.2.rahtiapp.fi/cars')
            if (!response) {
                throw new Error('Error fetching cars: ${response.statusText}' )
            }
            const data = await response.json()
            setCars(data._embedded.cars)
            } catch (error) {
            console.log(error)
            }
    }

    useEffect(() => { getCars(); })

    return (
        <>
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