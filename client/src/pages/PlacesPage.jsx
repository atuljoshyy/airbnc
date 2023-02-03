import React from 'react'
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom'
import Perks from '../Perks';

const PlacesPage = () => {
    const { action } = useParams();
    const [title, setTitle] = useState('')
    const [address, setAddress] = useState('')
    const [addedPhotos, setAddedPhotos] = useState([])
    const [photoLink, setPhotoLink] = useState('')
    const [description, setDescription] = useState('')
    const [perks, setPerks] = useState([])
    const [extraInfo, setExtraInfo] = useState('')
    const [checkIn, setCheckIn] = useState('')
    const [checkOut, setChekOut] = useState('')
    const [maxGuests, setMaxGuests] = useState(1)

    function inputHeader(text) {
        return (
            <h2 className='text-2xl mt-4'>{text}</h2>
        )
    }
    function inputDescription(text) {
        return (
            <p className='text-gray-500 text-sm'>{text}</p>

        )
    }
    function preInput(header, description) {
        return (
            <>
                {inputHeader(header)}
                {inputDescription(description)}
            </>
        )
    }

    return (
        <div>
            {action !== 'new' && (
                <div className='text-center'>
                    <Link className='inline-flex gap-1 bg-[#FF395C] text-white py-2 px-6 rounded-full' to={'/account/places/new'}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.0} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Add new place
                    </Link>
                </div>
            )}
            {action === 'new' && (
                <div>
                    <form action="">
                        {preInput('Title', 'Title for your place. should be short and catchy')}
                        <input type="text" placeholder='Title' value={title} onChange={extraInfo.setTitle(e.target.value)} />

                        {preInput('Address', 'Address to this place')}
                        <input type="text" placeholder='Address' value={address} onChange={extraInfo.setAddress(e.target.value)} />

                        {preInput('Photos', 'More = better')}
                        <div className='flex gap-2'>
                            <input type="text" placeholder='Add using a link....jpg' value={photoLink} onChange={extraInfo.setPhotoLink(e.target.value)} />
                            <button className=' bg-gray-200 grow  px-4  rounded-2xl'>Add&nbsp;photo</button>
                        </div>

                        <div className='grid grid-cols-3  lg:grid-col-6 md:grid-col-4'>
                            <button className=' flex items-center justify-center gap-2 border bg-transparent rounded-2xl p-8 text-2xl text-gray-600'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                                </svg>
                                Upload
                            </button>
                        </div>

                        {preInput('Description', 'description of the place')}
                        <textarea className=''></textarea>

                        {preInput('Perks', 'Select all the perks')}
                        <div className='gap-2 mt-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2'>
                            <Perks
                                selected={perks}
                                onChange={setPerks}
                            />
                        </div>

                        {preInput('Extra info', 'Provide with more details')}
                        <textarea className=''></textarea>

                        {preInput('Check in & out times', 'Provide with check in & out details')}
                        <div className='grid gap-2 sm:grid-cols-3'>
                            <div>
                                <h3 className='mt-2 -mb-1'>Check in time</h3>
                                <input type="text" placeholder='14:00' />
                            </div>
                            <div>
                                <h3>Check out time</h3>
                                <input type="text" />
                            </div>
                            <div>
                                <h3>Max number of guests</h3>
                                <input type="text" />
                            </div>
                        </div>
                        <div>
                            <button className='bg-[#FF395C] text-white w-full rounded-2xl px-4 py-2'>Save</button>
                        </div>

                    </form>
                </div>
            )}
        </div>
    )
}

export default PlacesPage