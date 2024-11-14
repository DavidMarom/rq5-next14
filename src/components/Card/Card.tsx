import React from 'react';
import Style from './Card.module.css';
import { FaRegTrashAlt } from "react-icons/fa";

interface CardProps {
    data: {
        color: string;
        model_name: string;
        plate_number: string;
        _id: string;
    },
    onDelete: (id: string) => void;
}

const Card: React.FC<CardProps> = ({ data, onDelete }) => {
    return (
        <div className={Style.container}>
            <div>
                <h3>{data.model_name}</h3>
                <p>{data.color}</p>
                <p>{data.plate_number}</p>
            </div>
            <div>
                <button onClick={() => onDelete(data._id)}
                ><FaRegTrashAlt /></button>

            </div>
        </div>
    );
};

export default Card;