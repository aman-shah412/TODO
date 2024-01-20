import React, { useContext } from 'react'
import Navbar from './Navbar'
import { useParams } from 'react-router-dom';
import Context from "../Context/Context";


function TODO() {
    const { name } = useParams();
    const { addTODOS, setAddTODOS, alert, alertText, handleAddTODOS } = useContext(Context);

    const handleUpdate = (e) => {
        setAddTODOS({ ...addTODOS, Name: name, [e.target.name]: e.target.value })
    }

    return (
        <>
            <Navbar />
            {alert ? <div className="alert alert-light" role="alert">
                {alertText}
            </div> : ""}
            <div className='container'>
                <div className='inputs d-flex flex-column align-items-center justify-content-center'>
                    <form onSubmit={handleAddTODOS}>
                        <div className='text_input mt-4'>
                            <input type="text" required name="Title" placeholder='Title' value={addTODOS.Title} onChange={handleUpdate} maxLength={50} />
                        </div>
                        <div className='text_input mt-4'>
                            <textarea required name="Description" placeholder='Description' rows="10" value={addTODOS.Description} onChange={handleUpdate} ></textarea>
                        </div>
                        <div className='text_input d-flex justify-content-between mt-3'>
                            <input type="datetime-local" required name='DueDate' value={addTODOS.DueDate} onChange={handleUpdate} />
                            <button className='add_btn'>Add</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default TODO