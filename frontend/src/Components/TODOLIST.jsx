import React, { useEffect, useContext } from 'react'
import { FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { MdDoneOutline } from "react-icons/md";
import Modal from './Modal';
import Navbar from './Navbar';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Context from "../Context/Context";

function TODOLIST() {

    const { name } = useParams();
    const { allTODOS, setAllTODOS, alert, alertText, setAllTODOSClone, handleMarkComplete, handleDelete } = useContext(Context);


    useEffect(() => {
        axios.get(`http://localhost:8004/fetchtodos/${name}`)
            .then((response) => {
                const data = response.data;
                const updatedData = data.data.map((e) => {
                    if (e.Status !== "Completed") {
                        let newDueDate = new Date(e.DueDate);
                        let currentDate = new Date();
                        if (newDueDate < currentDate) {
                            e.Status = "Due";
                        }
                    }
                    return e;
                });

                updatedData.sort((a, b) => new Date(b.Date) - new Date(a.Date));
                setAllTODOS(updatedData);
                setAllTODOSClone(updatedData)
            })
            .catch((error) => {
                console.error(error);
            });
    }, [])

    return (
        <>
            <Navbar />
            {alert ? <div className="alert alert-light" role="alert">
                {alertText}
            </div> : ""}
            <div className='container'>
                <div className='row mt-4'>
                    {
                        allTODOS.map((e, i) => {
                            return <div key={i} className='col-4 p-2 position-relative'>
                                <span className={(e.Status == "Active") ? "position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary" : (e.Status == "Completed") ? "position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success" : "position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"}>
                                    {e.Status}
                                    <span className="visually-hidden">unread messages</span>
                                </span>
                                <div className='todos_box'>
                                    <h3>{e.Title}</h3>
                                    <div className='description_box'>
                                        <p className='m-0'>{e.Description}</p>
                                    </div>
                                    <div className='d-flex justify-content-center mt-2'>
                                        <button className='btn icon_btn' disabled={e.Status === "Completed" ? true : false} data-bs-toggle="modal" data-bs-target={`#modal_${e._id}`}><FaPen size={25} /></button>
                                        <button className='btn icon_btn ms-3 bg-dark' disabled={e.Status === "Completed" ? true : false} onClick={() => { handleMarkComplete(e) }}><MdDoneOutline size={28} color='aqua' /></button>
                                        <button className='btn icon_btn ms-3' onClick={() => { handleDelete(e) }}><MdDelete size={28} /></button>
                                    </div>
                                </div>
                                <Modal elem={e} />
                            </div>
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default TODOLIST
