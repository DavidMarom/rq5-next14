"use client";

import React from 'react';
import { getAllCars, deleteCar } from "@/services/cars";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Loader, Card } from '@/components/index';

interface Page01Props { }

const Page01: React.FC<Page01Props> = () => {
    const queryClient = useQueryClient()

    const { data, isLoading } = useQuery({ queryKey: ['cars'], queryFn: getAllCars, staleTime: 10000 })

    const mutation = useMutation({ mutationFn: deleteCar, onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['cars'] }) }, })


    return (
        <div>
            {isLoading && <Loader />}
            <h1>Page01</h1>
            <div className="loader-animation" />
            {data && data.map((book: any, idx: number) => {
                return (
                    <Card
                        key={idx}
                        data={book}
                        onDelete={() => mutation.mutate(book._id)}
                    />
                );
            })}
        </div>
    );
}

export default Page01;