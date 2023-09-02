import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LogOut = () => {
    const navigate = useNavigate()

    useEffect(() => {
        var session = sessionStorage.removeItem("student_username")
        var sessionId = sessionStorage.removeItem("student_id")
        navigate("/")
    }, [])

    return(
        <div>
            <h1>Log Out</h1>
        </div>
    )
};

export default LogOut;