"use client";

import React from 'react';
import { getAllCars, deleteCar, createCar, updateCar } from "@/services/cars";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Loader, Card } from '@/components/index';

interface Page01Props { }

const Page01: React.FC<Page01Props> = () => {
    const queryClient = useQueryClient()

    const { data, isLoading, isFetching } = useQuery({ queryKey: ['cars'], queryFn: getAllCars, staleTime: 10000 })

    const deleteMutation = useMutation({
        mutationFn: deleteCar,
        onMutate: async (id: string) => {
            await queryClient.cancelQueries({ queryKey: ['cars'] })
            const previousCars = queryClient.getQueryData(['cars'])
            queryClient.setQueryData(['cars'], (old: any) => old.filter((car: any) => car._id !== id))
            return { previousCars }
        },
        onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['cars'] }) },
    })

    const createCarMutation = useMutation({
        mutationFn: createCar,
        onMutate: async (car: any) => {
            await queryClient.cancelQueries({ queryKey: ['cars'] })
            const previousCars = queryClient.getQueryData(['cars'])
            queryClient.setQueryData(['cars'], (old: any) => [...old, car])
            return { previousCars }
        },
        onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['cars'] }) },
    })
    
    const updateCarMutation = useMutation({
        mutationFn: ({ id, car }: { id: string, car: any }) => updateCar(id, car),
        onMutate: async ({ id, car }: { id: string, car: any }) => {
            await queryClient.cancelQueries({ queryKey: ['cars'] })
            const previousCars = queryClient.getQueryData(['cars'])
            queryClient.setQueryData(['cars'], (old: any) => old.map((oldCar: any) => oldCar._id === id ? car : oldCar))
            return { previousCars }
        },
        onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['cars'] }) },
    })

    const handleAddCar = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const car = {
            model_name: (form[0] as HTMLInputElement).value,
            color: (form[1] as HTMLInputElement).value,
            plate_number: (form[2] as HTMLInputElement).value,
        }
        createCarMutation.mutate(car);
    };

    const form = () => {
        return (
            <form onSubmit={handleAddCar} className='form-layout'>
                <input type="text" placeholder={data.model_name} defaultValue={data.model_name} />
                <input type="text" placeholder={data.color} defaultValue={data.color} />
                <input type="text" placeholder={data.plate_number} defaultValue={data.plate_number} />
                <button type="submit">Add Car</button>
            </form>
        );
    }

    return (
        <div>
            {isLoading && isFetching && <Loader />}
            <h1>Cars</h1>
            {data && form()}

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