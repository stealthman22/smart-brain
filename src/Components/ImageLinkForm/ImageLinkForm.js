import React from 'react';
import './ImageLinkForm.css'

// Access props oninputchange from App
const ImageLinkForm = ({ onInputChange, onPictureSubmit }) => {
    return (
        <div>
            <p className='f3'>
                {'This smartbrain will detect faces in your pictures, give it a try'}
            </p>
            <div className='center'>
                <div className=' center form pa4 br3 shadow-5'>
                    <input className='f4 pa2 w-70 center' type="text" onChange={onInputChange} />
                    <button
                        onClick={onPictureSubmit}
                        className='w-30 grow f4 link ph3 pv2 dib bg-light-purple' >Detect</button>
                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm;

