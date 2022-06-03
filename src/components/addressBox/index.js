import React, { useEffect, useState } from 'react'
import { gql, useMutation } from '@apollo/client';
import DropImg from '../../assets/dropOffBadgeBlank.svg'
import DropErr from "../../assets/dropOffBadgeError.svg"
import DropPresent from '../../assets/dropOffBadgePresent.svg'
import PickImg from '../../assets/pickUpBadgeBlank.svg'
import PickError from '../../assets/pickUpBadgeError.svg'
import PickPresent from '../../assets/pickUpBadgePresent.svg'

import './styles.css'

const ADD_JOB = gql`
  mutation Job($pickup: String!, $dropoff: String!) {
    job(pickup: $pickup, dropoff: $dropoff ) {
        pickup {
            address
            latitude
            longitude
        },
        dropoff {
            address
            latitude
            longitude
        }
    }
  }
`;

const AddresBox = ({ pickupHandleChange, dropoffHandleChange, show, statusCheck }) => {
    const [formState, setFormState] = useState({
        pick: '',
        drop: ''
    });
    const [iconStatusPick, setIconStatusPick] = useState(PickImg)
    const [iconStatusDrop, setIconStatusDrop] = useState(DropImg)

    const [ job, { loading } ] = useMutation(ADD_JOB, {
        variables: {
            pickup: formState.pick,
            dropoff: formState.drop,
        }, 
        onCompleted(){
            show(true)
        } 
    });

    useEffect(() => {
        pickIconStatus()
        dropIconStatus()
    }, [ statusCheck, formState] )
  
    const handleSubmit = (ev) => {
        ev.preventDefault();
        job()
        setFormState({ pick: '', drop: ''})
    }

    const pickIconStatus = () => {
        if (formState.pick.length > 0 && statusCheck.pick === 'error') {
            setIconStatusPick(PickError)
        } 

        if (statusCheck.pick === 'completed') {
            setIconStatusPick(PickPresent)
        }

        if (formState.pick.length === 0 && statusCheck.pick === 'error') {
            setIconStatusPick(PickImg)
        }

    }

    const dropIconStatus = () => {
        if (formState.drop.length > 0 && statusCheck.drop === 'error') {
            setIconStatusDrop(DropErr)
        } 

        if (statusCheck.drop === 'completed') {
            setIconStatusDrop(DropPresent)
        }

        if (formState.drop.length === 0 && statusCheck.drop === 'error') {
            setIconStatusDrop(DropImg)
        }

    }

    return (
        <div className="input-wrapper">
            <form onSubmit={ handleSubmit }>
                <div className="input-setion">
                    <img src={ iconStatusPick } alt="pick icon"/>
                    <div className="input">
                        <input
                            type="text"
                            value={ formState.pick }
                            placeholder="Pick up address"
                            onChange={ e => {
                                setFormState({ ...formState, pick: e.target.value})
                                pickupHandleChange(e.target.value)
                            } }
                        />
                    </div>
                </div>
                <div className="input-setion">
                    <img src={ iconStatusDrop } alt="drop icon"/>
                    <div className="input">
                        <input
                            type="text"
                            value={ formState.drop }
                            placeholder="Drop off address"
                            onChange={ e => {
                                setFormState({ ...formState, drop: e.target.value })
                                dropoffHandleChange(e.target.value)
                            } }
                        />  
                    </div>   
                </div>
                <input 
                    className={ `button ${loading && 'loading'}`} 
                    type="submit" 
                    value={ loading ? 'Ctreating...' : 'Create Job'} 
                    disabled={ (statusCheck.pick && statusCheck.drop) === 'completed' ? false : true }
                />
            </form>
        </div>
    )   
}

export default AddresBox