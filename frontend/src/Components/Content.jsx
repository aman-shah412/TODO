import React, { useContext } from 'react'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom';
import Context from "../Context/Context";

function Content() {

    const navigate = useNavigate()
    const { userName, setUserName } = useContext(Context);

    const goToList = (e) => {
        e.preventDefault()
        navigate(`/${userName}`)
    }

    return (
        <>
            <Navbar />
            <form onSubmit={goToList}>
                <div className='name_div d-flex flex-column justify-content-center align-items-center'>
                    <input type="text" required placeholder='Name' onChange={(e) => { setUserName(e.target.value) }} />
                    <button className='enter_btn mt-5'>Enter</button>
                </div>
            </form>
        </>
    )
}

export default Content