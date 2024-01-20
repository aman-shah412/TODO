import React, { useState, useEffect } from 'react';
import Context from './Context';
import axios from 'axios';

const State = (props) => {

    // Variable Declarations
    const [userName, setUserName] = useState("")
    const [addTODOS, setAddTODOS] = useState({
        Name: "",
        Title: "",
        Description: "",
        DueDate: "",
        Status: "Active"
    })
    const [allTODOS, setAllTODOS] = useState([])
    const [allTODOSClone, setAllTODOSClone] = useState([])
    const [search, setSearch] = useState("")
    const [alert, setAlert] = useState(false)
    const [alertText, setAlertText] = useState("")
    const [filtering, setFiltering] = useState("All")


    // Functions
    const handleAddTODOS = (e) => {
        e.preventDefault()
        if (addTODOS.Title.length <= 50) {
            axios.post("http://localhost:8004/addtodo", addTODOS, {
                headers: {
                    "Content-Type": "application/json",
                }
            })
                .then((response) => response.data)
                .then((data) => {
                    if (data.data === "TODO added") {
                        setAddTODOS({
                            Name: "",
                            Title: "",
                            Description: "",
                            DueDate: "",
                            Status: "Active"
                        })
                        setAlert(true)
                        setAlertText("ToDo added successfully")
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            setAlert(true)
            setAlertText("Max 50 charachter allowed in Title")
        }
    }

    const handleMarkComplete = (e) => {
        let obj = { ...e }
        obj.Status = "Completed"

        axios.post("http://localhost:8004/updatetodo", obj, {
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then((response) => response.data)
            .then((data) => {
                setAlert(true)
                setAlertText("Marked as complete")
                setTimeout(() => {
                    location.reload();
                }, 2100);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const handleDelete = async (e) => {
        setAllTODOS(allTODOS.filter((elem) => {
            return e != elem
        }))

        axios.post("http://localhost:8004/deletetodo", e, {
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then((response) => response.data)
            .then((data) => {
                setAlert(true)
                setAlertText("Task deleted")
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const handleSearch = (e) => {
        e.preventDefault()
        if (search !== "") {
            setAllTODOS(allTODOSClone.filter((e) => {
                return e.Title.toUpperCase().includes(search.toUpperCase()) || e.Description.toUpperCase().includes(search.toUpperCase());
            }))
        } else {
            setAllTODOS(allTODOSClone)
        }
    }

    useEffect(() => {
        if (alert) {
            setTimeout(() => {
                setAlert(false)
                setAlertText("")
            }, 2000);
        }
    }, [alert])

    useEffect(() => {
        if (filtering !== "All") {
            setAllTODOS(allTODOSClone.filter((e) => {
                return filtering == e.Status
            }))
        } else {
            setAllTODOS(allTODOSClone)
        }
    }, [filtering])

   
    return (
        <Context.Provider
            value={{
                search,
                setSearch,
                userName,
                setUserName,
                addTODOS,
                setAddTODOS,
                allTODOS,
                setAllTODOS,
                allTODOSClone,
                setAllTODOSClone,
                alert,
                setAlert,
                alertText,
                setAlertText,
                filtering,
                setFiltering,
                handleSearch,
                handleAddTODOS,
                handleMarkComplete,
                handleDelete,
            }}
        >
            {props.children}
        </Context.Provider>
    );
};

export default State;