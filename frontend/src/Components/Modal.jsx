import React from 'react'
import { useState } from 'react'
import axios from 'axios';

function Modal({ elem }) {

    const [editTODOS, seteditTODOS] = useState({
        Title: elem.Title,
        Description: elem.Description,
        DueDate: elem.DueDate,
        _id: elem._id
    })

    const handleUpdate = (e) => {
        seteditTODOS({ ...editTODOS, [e.target.name]: e.target.value })
    }

    const handleUpdateTODOS = (e) => {
        e.preventDefault()

        axios.post("http://localhost:8004/updatetodo", editTODOS, {
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then((response) => response.data)
            .then((data) => {
                location.reload();
            })
            .catch((error) => {
                console.error(error);
            });
    }

    return (
        <div className="modal fade" id={`modal_${elem._id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-xl modal-dialog-centered">
                <div className="modal-content">
                    <form onSubmit={handleUpdateTODOS}>
                        <div className="modal-body">
                            <div className='inputs d-flex flex-column align-items-center justify-content-center'>
                                <div className='text_input mt-4'>
                                    <input type="text" name="Title" placeholder='Title' value={editTODOS.Title} onChange={handleUpdate} />
                                </div>
                                <div className='text_input mt-4'>
                                    <textarea name="Description" placeholder='Description' rows="10" value={editTODOS.Description} onChange={handleUpdate} ></textarea>
                                </div>
                                <div className='text_input d-flex justify-content-between mt-3'>
                                    <input type="datetime-local" name='DueDate' value={editTODOS.DueDate} onChange={handleUpdate} />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button className="add_btn" data-bs-dismiss="modal">Save changes</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Modal
