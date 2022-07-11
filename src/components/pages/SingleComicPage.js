import './singleComicPage.scss';
import { useParams, Link, unstable_HistoryRouter as HistoryRouter} from 'react-router-dom';
import { createBrowserHistory } from "history";
import useMarvelService from '../../services/MarvelService';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import setContent from '../../utils/setContent';

const SingleComic = () => {
    const {comicId} = useParams();
    const [comic, setComic] = useState(null);
    const {getComic, clearError, process, setProcess} = useMarvelService();

    useEffect(() => {
        updateComic();
    }, [comicId])


    const updateComic = () => {
        clearError();
        getComic(comicId)
                          .then(onComicLoaded)
                          .then(() => setProcess('confirmed'));
    }

    const onComicLoaded = (comic) => {
        setComic(comic);
    }
    return (
        <>
            {setContent(process, View, comic)}
        </>
    )
}

const View = ({data}) => {
    const history = createBrowserHistory({ window });
    const {description, language, price, thumbnail, title, pageCount} = data;
    return (
        <div className="single-comic">
            <Helmet>
                <meta
                    name="description"
                    content={`${title} - comics book`}
                />
                <title>{title}</title>
            </Helmet>
            <img src={thumbnail} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount.length < 8 ? pageCount.slice(0,pageCount.length - 2) + "Pages" : null}</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <div onClick={() => history.back()} className="single-comic__back">Back to all</div>
        </div>
    )
}


export default SingleComic;
