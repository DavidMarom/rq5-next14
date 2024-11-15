"use client";

import React, { useState } from 'react';
import { getAllCars, deleteCar, createCar, updateCar } from "@/services/cars";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Loader, Card } from '@/components/index';

interface Page01Props { }

const Page01: React.FC<Page01Props> = () => {
    const queryClient = useQueryClient()

    const { data, isLoading, isFetching } = useQuery({ queryKey: ['cars'], queryFn: getAllCars, staleTime: 10000 })
    const deleteMutation =    useMutation({ mutationFn: deleteCar, onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['cars'] }) }, })
    const createCarMutation = useMutation({ mutationFn: createCar, onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['cars'] }) }, })
    const updateCarMutation = useMutation({
        mutationFn: ({ id, car }: { id: string, car: any }) => updateCar(id, car),
        onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['cars'] }) },
    })

    const [model_name, setModel_name] = useState('');
    const [color, setColor] = useState('');
    const [plate_number, setPlate_number] = useState('');

    const handleAddCar = async (e: React.FormEvent) => {
        e.preventDefault();
        createCarMutation.mutate({ model_name, color, plate_number });
        setModel_name('');
        setColor('');
        setPlate_number('');
        queryClient.invalidateQueries({ queryKey: ['cars'] });
    };

    return (
        <div>
            {isLoading && isFetching && <Loader />}
            <h1>Cars</h1>
            <form onSubmit={handleAddCar}>
                <input type="text" placeholder="Model" value={model_name} onChange={(e) => setModel_name(e.target.value)} />
                <input type="text" placeholder="Car Model" value={color} onChange={(e) => setColor(e.target.value)} />
                <input type="text" placeholder="Plate Number" value={plate_number} onChange={(e) => setPlate_number(e.target.value)} />
                <button type="submit">Add Car</button>
            </form>

            <br />

            <div className="loader-animation" />
            {data && data.map((book: any, idx: number) => {
                return (
                    <Card
                        key={idx}
                        data={book}
                        onDelete={() => deleteMutation.mutate(book._id)}
                        onUpdate={(car: any) => updateCarMutation.mutate({ id: book._id, car })}
                    />
                );
            })}
        </div>
    );
}

export default Page01;