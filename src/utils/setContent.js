import Skeleton from "../components/skeleton/Skeleton";
import Spinner from "../components/spinner/Spiner";
import ErrorMassage from "../components/errorMassage/ErrorMassage";
import { Component } from "react";

const setContent = (process, Component, data) => {
    switch(process) {
        case 'waiting':
            return <Skeleton/>;
            break;
        case 'loading':
            return <Spinner/>
            break;
        case 'confirmed':
            return <Component data={data}/>
            break;
        case 'error':
            return <ErrorMassage/>
            break;
        default: 
            throw new Error('Unexpected process state')
    }
}
export default setContent;