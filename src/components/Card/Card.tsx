import React, { useState } from 'react';
import Style from './Card.module.css';
import { FaRegTrashAlt } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";

interface CardProps {
    data: {
        color: string;
        model_name: string;
        plate_number: string;
        _id: string;
    },
    onDelete: (id: string) => void;
    onUpdate: (car: object) => void;
}

const Card: React.FC<CardProps> = ({ data, onDelete, onUpdate }) => {

    const [isEdit, setIsEdit] = useState(false);
    const toggleEdit = () => { setIsEdit(!isEdit) }

    const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const car = {
            color: (form[1] as HTMLInputElement).value,
            model_name: (form[0] as HTMLInputElement).value,
            plate_number: (form[2] as HTMLInputElement).value,
            _id: data._id
        }
        onUpdate(car);
        setIsEdit(false);
    }


    const form = () => {
        return (
            <form onSubmit={handleUpdate} className='form-layout'>
                <input type="text" placeholder={data.model_name} defaultValue={data.model_name} />
                <input type="text" placeholder={data.color} defaultValue={data.color} />
                <input type="text" placeholder={data.plate_number} defaultValue={data.plate_number} />
                <div className='row'>
                    <button onClick={toggleEdit}>Cancel</button>
                    <button type="submit"><b>Update Car</b></button>
                </div>
            </form>
        );
    }

    if (!isEdit) {
        return (
            <div className={Style.container}>
                <div>
                    <h3>{data.model_name}</h3>
                    <p>{data.color}</p>
                    <p>{data.plate_number}</p>
                </div>
                <div className='col'>
                    <button onClick={() => onDelete(data._id)}><FaRegTrashAlt /></button>

                    <button onClick={toggleEdit}><CiEdit /></button>
                </div>
            </div>
        );
    }
    else {
        return (
            <div>
                {form()}
                <br />
            </div>

        );
    }
}

export default Card;