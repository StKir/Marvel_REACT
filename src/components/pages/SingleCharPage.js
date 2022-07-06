import './singleCharPage.scss'
import Thor from '../../resources/img/thor.jpeg'

import { useParams } from 'react-router-dom'
import Spinner from '../spinner/Spiner';
import ErrorMassage from '../errorMassage/ErrorMassage';
import useMarvelService from '../../services/MarvelService';
import { useState, useEffect } from 'react';

const SingleCharPage = () => {
    const {charId} = useParams();
    const [char, setChar] = useState(null);
    const {loading, error, getCharacter, clearError} = useMarvelService();

    useEffect(() => {
        getChar(charId);
    }, [charId])

    const getChar = (id) => {
        clearError();

        getCharacter(id)
                .then(charLoaded)
    }

    const charLoaded = (characther) => {
        setChar(characther) 
    }

    const errorMassage = error ? <ErrorMassage/> : null;
    const spiner = loading? <Spinner/> : null
    const content = !(error || loading || !char)? <View char={char}/> : null

    return(
        <>
            {errorMassage}
            {spiner}
            {content}
        </>
    )
}

const View = ({char}) => {
    return(
        <div className='page_wrp'>
            <img className='char_page-img' src={char.thumbnail} alt={char.name} />
            <div className='char_page_info'>
                <span className='char_page-name'>{char.name}</span>
                <p className='char_page-description'>{char.description}</p>
            </div>
        </div>
    )
}

export default SingleCharPage;