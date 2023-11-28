import React from "react";

const ErrorPage = (data)=> {
    return <>
        <div className="Error">
            <p>{data.res.message}</p>
        </div>
    </>
}

export default ErrorPage;