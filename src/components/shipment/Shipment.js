import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import './Shipment.css';
const Shipment = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const onSubmit = data =>{
        console.log(data);
    };

    console.log(watch("example"));
    return (
        <form onSubmit={handleSubmit(onSubmit)}  className="ship-form">
            < input name="name" defaultValue={loggedInUser.name} ref={register({ required: true })}  placeholder="your name"/>
            { errors.name&& <span className='error'>Name is required</span>}

            < input name="email" defaultValue={loggedInUser.email} ref={register({ required: true })} placeholder="your email"/>
            { errors.email&& <span className='error'>Email is required</span>}

            < input name="address" ref={register({ required: true })} placeholder="your address"/>
            { errors.address&& <span className='error'>Address is required</span>}

            < input name="phone" ref={register({ required: true })} placeholder="your phone number"/>
            { errors.phone&& <span className='error'>Phone no is required</span>}
            <input type="submit" />
        </form >
    );
};

export default Shipment;