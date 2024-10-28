import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './style/CreateContact.css'
import './style/Contact.css'

import ForeGround from './images/createContact/foregeound_create.png'
import Background from './images/createContact/cloud-background.gif'
import Bird from './images/createContact/bird.svg'
import Cloud from './images/createContact/moon-birds.png'
import { useAuth0 } from '@auth0/auth0-react'
import { motion } from 'framer-motion'

function CreateContact() {
  const [name, setName] = useState('')
  const [phone, setPhone1] = useState('')
  const [email, setEmail] = useState('')
  const [phone2, setPhone2] = useState('')
  const [imageUrl, setImageUrl] = useState("")
  const [color, setColor] = useState('#99c4b9')
  const [coloricon, setColorIcon] = useState('rgb(98, 142, 144)')
  const [address, setAddress] = useState('')
  const [col1, setCol1] = useState(false)
  const [col2, setCol2] = useState(false)
  const [col3, setCol3] = useState(false)
  const [err, setErr] = useState(false)
  const [errName, seterrName] = useState(false)
  const [errPhone, setErrPhone] = useState(false)
  const [errEmail, setErrEmail] = useState(false)
  const [errAddress, setErrAddress] = useState(false)
  const [updating, setUpdating] = useState(false)
  const [contactId, setContactId] = useState(null)
  const { isAuthenticated, user } = useAuth0()

  const location = useLocation()
  useEffect(() => {
    // if(!isAuthenticated){
    //   navigate('/without')
    // }

    if (location.state) {
      setUpdating(location.state.bool)
      setName(location.state.name)
      setEmail(location.state.email)
      setImageUrl(location.state.url)
      setPhone1(location.state.phone1)
      setPhone2(location.state.phone2)
      setAddress(location.state.address)
      setContactId(location.state.id)
    } else {
      setUpdating(false)
    }
  }, [])
  const navigate = useNavigate()

  const createContact = async () => {
    if ((phone?.length === 0 && name?.length === 0) || address.length === 0) {
      if (phone?.length === 0) setErrPhone(true)
      if (name?.length === 0) seterrName(true)
      if (address?.length === 0) setErrAddress(true)
      if (email?.length === 0) setErrEmail(true)
      navigate('/createContact')
    } else {
      if (imageUrl.length === 0) {
        setImageUrl('')
      }
      let result = await fetch('http://localhost:5000/api/contacts', {
        method: 'post',
        body: JSON.stringify({
          name,
          email,
          imageUrl,
          phoneNumber1: phone,
          phoneNumber2: phone2,
          address,
          color,
          colorIcon: coloricon,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      let res = await result.json()
      if (res.error) {
        setErr(res.error)
      } else {
        navigate('/contacts')
      }
    }
  }

  async function updateContact() {
    let result = await fetch(
      `http://localhost:5000/api/contacts/${contactId}`,
      {
        method: 'put',
        body: JSON.stringify({
          name,
          email,
          imageUrl,
          phoneNumber1: phone,
          phoneNumber2: phone2,
          address,
          color,
          colorIcon: coloricon,
        }),
        headers: {
          'Content-type': 'application/json;charset=UTF-8',
        },
      }
    )
    result = await result.json()
    navigate('/contacts')
    console.log('done')
  }

  return (
    <motion.div
      whileInView={{ opacity: [0, 1], y: [100, 0] }}
      transition={{ duration: 2 }}
    >
      <div className="createContact_grid">
        <div>
          <div className="contact-form contact-form2">
            <div
              id="form"
              className="text-center"
              style={{ width: '100%', maxWidth: '350px' }}
            >
              <h2 className="cont-h2">Create Contact</h2>
              <input
                type="text"
                placeholder="Enter image url (optional)"
                value={imageUrl}
                onChange={(e) => {
                  setImageUrl(e.target.value)
                }}
                className="cont-input create_input"
              />
              <input
                type="text"
                style={
                  errName
                    ? { border: '2px solid red' }
                    : { border: '1px solid grey' }
                }
                placeholder="Enter name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                }}
                className="cont-input create_input"
                required
              />
              <input
                type="text"
                style={
                  errEmail
                    ? { border: '2px solid red' }
                    : { border: '1px solid grey' }
                }
                placeholder="Enter email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
                className="cont-input create_input"
                required
              />
              <input
                type="text"
                style={
                  errPhone
                    ? { border: '2px solid red' }
                    : { border: '1px solid grey' }
                }
                placeholder="Enter Phone no."
                value={phone}
                onChange={(e) => {
                  setPhone1(e.target.value)
                }}
                className="cont-input create_input"
                required
              />
              <input
                type="text"
                placeholder="Enter Phone no.2 (optional)"
                value={phone2}
                onChange={(e) => {
                  setPhone2(e.target.value)
                }}
                className="cont-input create_input"
                required
              />
              <input
                style={
                  errAddress
                    ? { border: '2px solid red' }
                    : { border: '1px solid grey' }
                }
                type="text"
                placeholder="Enter address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="cont-input create_input"
                required
              />
              <div className="choose_color">
                {(errAddress || errName || errPhone) && (
                  <div className="color_text errortext">
                    Please! Fill all fields
                  </div>
                )}
                {err ? <div className="color_text errortext">{err}+"anki</div> : ''}
                <div className="color_text">Choose your color</div>
                <div
                  className="c_color color1"
                  style={
                    col1 ? { border: '2px solid black' } : { border: 'none' }
                  }
                  onClick={() => {
                    setColor('#99c4b9')
                    setColorIcon('rgb(98, 142, 144)')
                    setCol1(true)
                    setCol2(false)
                    setCol3(false)
                  }}
                >
                  {' '}
                </div>
                <div
                  className="c_color color2"
                  style={
                    col2 ? { border: '2px solid black' } : { border: 'none' }
                  }
                  onClick={() => {
                    setColor('#eabbbb')
                    setColorIcon('#c59090')
                    setCol2(true)
                    setCol1(false)
                    setCol3(false)
                  }}
                ></div>
                <div
                  className="c_color color3"
                  style={
                    col3 ? { border: '2px solid black' } : { border: 'none' }
                  }
                  onClick={() => {
                    setColor('#97c297')
                    setColorIcon('#6fb16f')
                    setCol3(true)
                    setCol1(false)
                    setCol2(false)
                  }}
                ></div>
              </div>
              <button
                onClick={
                  updating ? () => updateContact() : () => createContact()
                }
                className="contact-button create_button"
              >
                <span>{updating ? 'Update' : 'Add'}</span>
              </button>
            </div>
          </div>
        </div>
        <img src={Cloud} alt="" className="createContact_cloud" />
      </div>
      <div className="createContact_sec1">
        <img src={ForeGround} alt="" className="createContact_img" />
        <img src={Background} alt="" className="createContact_img2" />
        <img src={Bird} alt="" className="createContact_bird" />
      </div>
    </motion.div>
  )
}

export default CreateContact
