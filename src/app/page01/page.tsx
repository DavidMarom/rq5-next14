"use client";

import React from 'react';
import { getAllBooks } from "@/services/books";
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider, } from '@tanstack/react-query'

interface Page01Props { }

const Page01: React.FC<Page01Props> = () => {
    const { data } = useQuery({
        queryKey: ['books'],
        queryFn: getAllBooks,
        staleTime: 5000


    })
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
};

export default Page01;