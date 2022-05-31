import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './charInfo.scss';
import PropTypes from 'prop-types';

import Skeleton from '../skeleton/Skeleton';
import Spinner from '../spinner/Spiner';
import ErrorMassage from '../errorMassage/ErrorMassage';
import useMarvelService from '../../services/MarvelService';

const CharInfo = (props) => {

    const [char, setChar] = useState(null);
    const {loading, error, getCharacter, clearError} = useMarvelService();

    useEffect(() => {
        updateChar();
    }, [props.charId])


    const updateChar = () => {
        const {charId} = props;
        if(!charId) {
            return;
        }
        clearError();
        getCharacter(charId)
                          .then(onCharLoaded)
    }

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const skeleton = char || loading || error ? null : <Skeleton/>;
    const errorMassage = error ? <ErrorMassage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(error || loading || !char)? <View char={char}/> : null;

    return (
        <div className="char__info">
            {skeleton}
            {errorMassage}
            {spinner}
            {content}
        </div>
    )
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char;
    let imgStyle;
    thumbnail.includes('image_not_available') ? imgStyle = {objectFit: 'contain'} : imgStyle = {objectFit: 'cover'};
    let Nocomics = null;
    if(comics.length === 0){
        Nocomics = 'This character does not appear in the comics';
    }
    let DescTrue = '';
    if(description.length === 0){
        DescTrue = 'This character has no description'
    } else {
        DescTrue = description
    }

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={imgStyle} />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
               {DescTrue}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {Nocomics}
                {   // eslint-disable-next-line
                    comics.map((item, i) => {
                        if(i < 10 && i > 1){
                            const indexLength = item.resourceURI.indexOf('comics/');
                            const comicsLink = item.resourceURI.slice(indexLength + 7 ,item.resourceURI.length);
                            return(
                                <li key={i} className="char__comics-item">
                                    <Link to={`/comics/${comicsLink}`}>{item.name}</Link>
                                </li>
                            )
                        }
                    })
                }
            </ul>
        </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;