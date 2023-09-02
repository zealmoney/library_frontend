import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AdminLogOut = () => {
    const navigate = useNavigate()

    useEffect(() => {
        navigate("/admin")
    }, [])

    return(
        <></>
    )
}

export default AdminLogOut;