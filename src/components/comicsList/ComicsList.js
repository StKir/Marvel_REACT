import './comicsList.scss';
import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spiner';
import ErrorMassage from '../errorMassage/ErrorMassage';

const ComicsList = () => {
    const {error, loading, getAllComics, clearError} = useMarvelService();
    const [comicsList, setComicsList] = useState([]);
    const [newItemLoading, setnewItemLoading] = useState(false);
    const [offset, setoffset] = useState(150);

    useEffect(() => {
        onRequest(offset, true)
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setnewItemLoading(false): setnewItemLoading(true);
        getAllComics(offset).then(onComicsListLoaded);
    }


    const onComicsListLoaded = (newComicsList) => {
        setComicsList(comicsList => [...comicsList, ...newComicsList])
        setnewItemLoading(false)
        setoffset(offset => offset + 8);
    }
    
    function renderItems(arr) {
        const items = arr.map((item,i) => {
                return (
                    <li className="comics__item"
                    key={i}
                    tabIndex={0}>
                        <a href="ite">
                            <img src={item.thumbnail} alt="ultimate war" className="comics__item-img"/>
                            <div className="comics__item-name">{item.title}</div>
                            <div className="comics__item-price">{item.price}</div>
                        </a>
                    </li>
                )
        })

        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }
    const items  = renderItems(comicsList);
    const errorMassage = error ? <ErrorMassage/> : null;
    const spinner = loading && !newItemLoading ? <Spinner/> : null;
    return (
        <div className="comics__list">
            {errorMassage}
            {spinner}
            {items}
            <button className="button button__main button__long"
            disabled={newItemLoading}
            onClick={() => onRequest(offset)}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    )
    
}

export default ComicsList;