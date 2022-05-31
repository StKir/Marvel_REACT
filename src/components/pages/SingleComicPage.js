import './singleComicPage.scss';
import { useParams, Link } from 'react-router-dom';
import Spinner from '../spinner/Spiner';
import ErrorMassage from '../errorMassage/ErrorMassage';
import useMarvelService from '../../services/MarvelService';
import { useState, useEffect } from 'react';

const SingleComic = () => {
    const {comicId} = useParams();
    const [comic, setComic] = useState(null);
    const {loading, error, getComic, clearError} = useMarvelService();

    useEffect(() => {
        updateComic();
    }, [comicId])


    const updateComic = () => {
        clearError();
        getComic(comicId)
                          .then(onComicLoaded)
    }

    const onComicLoaded = (comic) => {
        setComic(comic);
    }
    const errorMassage = error ? <ErrorMassage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(error || loading || !comic)? <View comic={comic}/> : null;
    return (
        <>
            {errorMassage}
            {spinner}
            {content}
        </>
    )
}

const View = ({comic}) => {
    const {description, language, price, thumbnail, title, pageCount} = comic;
    return (
        <div className="single-comic">
            <img src={thumbnail} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount.length < 8 ? pageCount.slice(0,pageCount.length - 2) + "Pages" : null}</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to="/comics" className="single-comic__back">Back to all</Link>
        </div>
    )
}


export default SingleComic;
