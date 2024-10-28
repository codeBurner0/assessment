import React, { useEffect } from 'react'
import './style/CreateContact.css'
import ForeGround from './images/createContact/foregeound_create.png'
import Background from './images/createContact/cloud-background.gif'
import Bird from './images/createContact/bird.svg'
import Cloud from './images/createContact/moon-birds.png'
import { motion } from "framer-motion";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from 'react-router-dom'
function WithoutLogin() {
    const {isAuthenticated} = useAuth0();
    const navigate=useNavigate()
    useEffect(()=>{
        if(isAuthenticated){
            navigate('/')
        }
    })
    return (
        <motion.div
            whileInView={{ opacity: [0, 1], y: [100, 0] }}
            transition={{ duration: 2 }}>
            <div className="createContact_grid">
                <div>
                    <div className='contact-form contact-form2'>
                        <h1 className="withoutloginh">
                            SignIn first to add contacts
                        </h1>
                        <p className='withoutloginp'>
                        "Step into a world where your contacts take center stage. Log in now and manage your conatacts in our app where connections meet simplicity, manage your circle effortlessly."
                        </p>
                    </div>
                </div>
                <img src={Cloud} alt="" className='createContact_cloud' />
            </div>
            <div className="createContact_sec1">
                <img src={ForeGround} alt="" className='createContact_img' />
                <img src={Background} alt="" className='createContact_img2' />
                <img src={Bird} alt="" className='createContact_bird' />
            </div>
        </motion.div>
    )
}
export default WithoutLogin
