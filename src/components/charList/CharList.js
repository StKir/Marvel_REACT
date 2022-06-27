import { useState, useEffect, useRef } from 'react';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

import './charList.scss';
import Spinner from '../spinner/Spiner';
import ErrorMassage from '../errorMassage/ErrorMassage';
import useMarvelService from '../../services/MarvelService';
import PropTypes from 'prop-types';

const CharList = (props) =>{

    const [charList, setcharList] = useState([]);
    const {loading, error, getAllCharacters, clearError} = useMarvelService();
    const [newItemLoading, setnewItemLoading] = useState(false);
    const [offset, setoffset] = useState(210);

    useEffect(() => {
        onRequest(offset, true)
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setnewItemLoading(false): setnewItemLoading(true)
        getAllCharacters(offset)
                          .then(onCharListLoaded)
    }

    const onCharListLoaded = (newCharList) => {
        
        setcharList(charList => [...charList, ...newCharList]);
        setnewItemLoading(false);
        setoffset(offset => offset + 9);
    }
    const itemsRefs = useRef([]);

    const onAddClassSelected = (e) => {
        itemsRefs.current.forEach(el => {
            el.classList.remove('char__item_selected')
            e.currentTarget.classList.add('char__item_selected');
            e.currentTarget.focus();
        });
    }   

    function renderItems(arr) {
        const items = arr.map((item, i) => {
            let imgStyle;
            item.thumbnail.includes('image_not_available') ? imgStyle = {objectFit: 'unset'} : imgStyle = {objectFit: 'cover'};

            return (
                <CSSTransition
                    key={item.id}
                    timeout={500}
                    classNames="char__item">
                    <li
                    className="char__item"
                    key={item.id}
                    tabIndex={0}
                    ref={(el) => itemsRefs.current[i] = el}
                    onClick={(e) => {props.onCharSelected(item.id);
                    onAddClassSelected(e);
                    }}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            props.onCharSelected(item.id);
                            onAddClassSelected(e)
                        }
                    }}>
                        <img src={item.thumbnail} alt={item.name} style={imgStyle} />
                        <div className="char__name">{item.name}</div>
                    </li>
                </CSSTransition>
            )
        })

        return(
            <ul>
                <TransitionGroup className="char__grid">
                    {items}
                </TransitionGroup>
            </ul>
        )

    }

    let BtnStyle;
    if(offset > 1559){BtnStyle = {opacity: "0"}}
    const items  = renderItems(charList);
    const errorMassage = error ? <ErrorMassage/> : null;
    const spinner = loading && !newItemLoading ? <Spinner/> : null;
    return (
        <div className="char__list">
            {errorMassage}
            {spinner}
            {items}
            <button 
                className="button button__main button__long"
                disabled={newItemLoading}
                onClick={() => onRequest(offset,false)}
                style={BtnStyle}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

CharList.propTypes = {
    onCharSelected: PropTypes.func
}

export default CharList;
