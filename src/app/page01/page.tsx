"use client";

import React from 'react';
import { getAllCars } from "@/services/cars";
import { useQuery } from '@tanstack/react-query'

interface Page01Props { }

const Page01: React.FC<Page01Props> = () => {
    const { data } = useQuery({ queryKey: ['books'], queryFn: getAllCars, staleTime: 10000 })

    return (
        <div>
            <h1>Page01</h1>
            {data && data.map((book: any, idx: number) => {
                return (
                    <div key={idx}>
                        <h3>{book.model_name}</h3>
                        <p>{book.color}</p>
                    </div>
                );
            })}
        </div>
    );
}

export default Page01;