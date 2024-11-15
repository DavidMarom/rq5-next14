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

    const [model_name, setModel_name] = useState('');
    const [color, setColor] = useState('');
    const [plate_number, setPlate_number] = useState('');

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        onUpdate({ model_name, color, plate_number });
        setModel_name('');
        setColor('');
        setPlate_number('');
        setIsEdit(false);
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
                <form onSubmit={handleUpdate}>
                    <input type="text" placeholder={data.model_name} value={model_name} onChange={(e) => setModel_name(e.target.value)} />
                    <input type="text" placeholder={data.color} value={color} onChange={(e) => setColor(e.target.value)} />
                    <input type="text" placeholder={data.plate_number} value={plate_number} onChange={(e) => setPlate_number(e.target.value)} />
                    <button type="submit">Update Car</button>
                </form>
                <br />
            </div>

        );
    }
}

export default Card;