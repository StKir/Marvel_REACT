import './singleCharPage.scss'

import { useParams } from 'react-router-dom'
import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';

import { useState, useEffect } from 'react';
import { Helmet } from "react-helmet";

const SingleCharPage = () => {
    const {charId} = useParams();
    const [char, setChar] = useState(null);
    const {getCharacter, clearError, process, setProcess} = useMarvelService();

    useEffect(() => {
        getChar(charId);
    }, [charId])

    const getChar = (id) => {
        clearError();

        getCharacter(id)
                .then(charLoaded)
                .then(() => setProcess('confirmed'))
    }

    const charLoaded = (characther) => {
        setChar(characther) 
    }

    return(
        <>
             {setContent(process, View, char)}
        </>
    )
}

const View = ({data}) => {
    const {thumbnail, name, description} = data
    return(
        <div className='page_wrp'>
            <Helmet>
                <meta
                    name="description"
                    content={`${name} - character`}
                />
                <title>{name}</title>
            </Helmet>
            <img className='char_page-img' src={thumbnail} alt={name} />
            <div className='char_page_info'>
                <span className='char_page-name'>{name}</span>
                <p className='char_page-description'>{description}</p>
            </div>
        </div>
    )
}

export default SingleCharPage;