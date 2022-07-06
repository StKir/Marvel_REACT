import './searchChar.scss'
import useMarvelService from '../../services/MarvelService';
import { useState } from 'react';
import * as Yup from 'yup';
import {Link} from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage as FormikErrorMessage  } from "formik";

const SearchChar = () => {
    const [char, setChar] = useState(null)
    const {loading, error, getCharacterByName, clearError} = useMarvelService();

    const getCharacher = (name) => {
        clearError();
        console.log('dsa');
        getCharacterByName(name)
                    .then(onCharLoaded)
    }

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const result = !char ? null : char.length !=0 ? 
        <div className='visit_char_wrapper'>
            <div className='find_char'>There is! Visit {char[0].name} page?</div> 
            <Link to={`/characters/${char[0].id}`} className='button button__secondary'>
                <div className='inner'>TO PAGE</div>
            </Link>
        </div>
        : <div className='error-form'>The character was not found. Check the name and try again</div>

    return(
        <div className='search_panel'>
            <Formik
                initialValues = {{
                    charName: ''
                }}
                validationSchema = {Yup.object({
                    charName: Yup.string().required('This field is required')
                })}
                onSubmit = {({charName}) => {getCharacher(charName)}}>
                <Form className="form">
                    <label htmlFor='charName' className='search_panel-title'>Or find a character by name:</label>
                    <div className='search_panel-input'>
                        <Field
                            className='search_input'
                            type="text"
                            name='charName'
                            placeholder='Enter name' />
                        <button 
                            type='submit' 
                            className="button button__main"
                            disabled={loading}
                            >
                            <div className="inner">FIND</div>
                        </button>
                    </div>
                    <FormikErrorMessage
                            component="div"
                            className='error-form'
                            name='charName'/>
                    {result}
                </Form>
            </Formik>
        </div>
    )
}

export default SearchChar;