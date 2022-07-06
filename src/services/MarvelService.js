import { useHttp } from '../hooks/http.hook'

const useMarvelService = () => {

    const {loading, request, error, clearError} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=a27c3efa6718a62fb873029d025734a6';
    const _baseOffset = 210;
    const getAllCharacters = async (offset = _baseOffset) => {
       const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
       return res.data.results.map(_transformCharacter);
    }
    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
 
    }

    const getComic = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return _transformComics(res.data.results[0]);
    }

    const getAllComics = async (offset = 0) => {
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComics);
    }

    const getCharacterByName = async (name) => {
        const res = await request (`${_apiBase}characters?name=${name}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const _transformCharacter = (character) => {
        return{
            comics: character.comics.items,
            id: character.id,
            name: character.name,
            description: character.description,
            thumbnail: character.thumbnail.path + '.' + character.thumbnail.extension,
            homepage: character.urls[0].url,
            wiki: character.urls[1].url
        }
    }

    const _transformComics = (comics) => {
        return{
            id: comics.id,
            title: comics.title,
            description: comics.description || 'There is no description',
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            pageCount: comics.pageCount ? `${comics.pageCount} p.` : 'No information about the number of pages',
            language: comics.textObjects.language || 'en-us',
            price: comics.prices[0].price ? `${comics.prices[0].price}$` : 'not available'
        }
    }
    return {loading, error, getAllCharacters, getCharacter, clearError, getAllComics, getComic, getCharacterByName}
}

export default useMarvelService;