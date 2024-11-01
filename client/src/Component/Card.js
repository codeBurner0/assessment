import React, { useEffect, useState } from 'react'
import './style/Card.css'
import { BsPersonCircle } from 'react-icons/bs'
import { MdEditSquare, MdDelete } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import DefaultImage from './images/download.png'
import { motion } from 'framer-motion'
function Card({ search, contacts }) {
  const navigate = useNavigate()

  async function Delete(id) {
    console.log(id)
    let result = await fetch(
      `https://assessment-zyub.vercel.app/api/contacts/${id}`,
      {
        method: 'delete',
      }
    )
    navigate(0)
  }

  function Update(id, name, url, address, phoneNumber1, phoneNumber2, email) {
    const bool = true
    navigate('/createcontact', {
      state: {
        id: id,
        bool: bool,
        email: email,
        name: name,
        url: url,
        phone1: phoneNumber1,
        phone2: phoneNumber2,
        address: address,
      },
    })
  }
  return (
    <>
      {contacts
        .filter((item) => {
          if (search.toLowerCase() === '') return item

          const searchLower = search.toLowerCase()
          return (
            item.name.toLowerCase().includes(searchLower) ||
            item.address.toLowerCase().includes(searchLower) ||
            item.email.toLowerCase().includes(searchLower) ||
            item.phoneNumber1.toLowerCase().includes(searchLower) ||
            (item.phoneNumber2 &&
              item.phoneNumber2.toLowerCase().includes(searchLower))
          )
        })
        .map((contacts) => {
          return (
            <motion.div
              whileInView={{ opacity: [0, 1], x: [100, 0] }}
              transition={{ duration: 2 }}
              key={contacts._id}
            >
              <div className="card_container2">
                <svg
                  className="card_container"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 191.05 160.8"
                >
                  <path
                    fill={contacts.color}
                    d="M50.82 151.98c4.44.88 8.87 1.78 13.16 3.27 3.41 1.18 6.91 2.07 10.47 2.67 2.49.42 4.98.88 7.5 1.17 3.05.35 6.08.72 9.15.97 3.75.3 7.48.84 11.25.72 1.77-.05 3.54 0 5.31-.03 2.69-.05 5.37-.18 8.06-.17 1.82.01 3.65-.08 5.47.08 3.47.29 6.92-.02 10.34-.5 2.57-.36 5.1-1.06 7.64-1.66a45.19 45.19 0 0 0 16.03-7.33c2.8-2.02 5.61-4.02 8.41-6.04 2.69-1.94 5.13-4.15 7.38-6.59.99-1.08 2-2.13 2.99-3.2 1.05-1.13 2.22-2.17 3.07-3.43.9-1.33 1.85-2.63 2.79-3.93.4-.56.77-1.15 1.1-1.76 1.12-2.09 2.22-4.2 3.31-6.31.17-.33.35-.7.38-1.07.05-.48.22-.86.51-1.24.22-.29.32-.68.44-1.03.62-1.89 1.2-3.78 1.84-5.66.76-2.25 1.47-4.5 1.49-6.91 0-.45-.04-.99.17-1.35.79-1.35.98-2.89 1.37-4.34.62-2.3.83-4.65.37-7.06-.47-2.5-1.14-4.93-1.86-7.35-.71-2.36-1.66-4.63-2.68-6.86-1.95-4.26-4.04-8.45-6.52-12.44-.81-1.3-1.58-2.63-2.33-3.97-1.01-1.81-1.97-3.65-2.99-5.45-.98-1.74-1.87-3.56-3.06-5.14-.93-1.23-1.84-2.38-2.05-3.95-.02-.12-.14-.33-.22-.33-.85-.06-.74-.87-1.04-1.34-.65-1.01-1.08-2.16-2.13-2.84.19-.28.47-.54.42-.63-.91-1.76-1.86-3.51-2.8-5.26-.14-.26-.45-.58-.38-.77.36-.95-.28-1.45-.83-1.96-.41-.38-.61-.83-.84-1.32-.56-1.26-1.16-2.52-1.93-3.64-.52-.76-1.1-1.45-1.35-2.36-.1-.36-.33-.68-.54-1-1.32-2.07-2.73-4.08-3.94-6.2-1.27-2.22-2.68-4.28-4.58-6.01-.97-.88-1.93-1.77-2.8-2.74-2.11-2.32-4.72-3.89-7.46-5.31-2.88-1.49-5.93-2.54-9.04-3.38-2.12-.57-4.3-1.06-6.54-.77.02.24.04.49.07.83-.47-.15-.82-.32-1.19-.36-.45-.06-.9-.01-1.32-.01-.19-.48-.54-.78-.63-.64-.34.53-.83.6-1.39.61-2.07.04-4.13.13-6.18.44-3.03.45-6.09.72-9.12 1.14-1.14.16-2.28.42-3.35.81-.68.25-1.34.39-2.01.33-1.18-.11-2.24.62-3.41.31-.78.61-1.64.76-2.59.47a.538.538 0 0 0-.42.12c-.6.59-1.42.56-2.15.73-3.05.73-6.1 1.46-9.16 2.11-4.35.92-8.69 1.86-13.01 2.95-.37.09-.74.25-1.11.27-1.47.07-2.87.48-4.25.93-1.37.45-2.93.24-4.14 1.23-.1.08-.33.11-.43.06-.78-.43-1.27.09-1.85.46-.58.37-1.25.52-1.96.57-.99.07-1.97.28-2.95.48-1.72.35-3.41.91-5.2.9-.21 0-.45.11-.62.25-.14.11-.18.34-.3.59.69.1 1.28.19 1.8.26.32.55.58.99.9 1.53-2.17.43-4.26.84-6.65 1.31.87.13 1.43.22 2.37.37-2.26.87-4.23 1.1-6.2 1.42.26.18.51.36.84.61-.66.36-1.2.66-1.74.94-3.21 1.64-6.45 3.23-9.63 4.92-4.41 2.35-8.65 4.98-12.63 8.03-2.7 2.07-5.1 4.44-7.08 7.21-2.12 2.96-3.7 6.19-4.55 9.75-.66 2.76-1.14 5.55-1.61 8.35-.24 1.44-.45 2.88-.46 4.34-.01 1.08-.04 2.15 0 3.23.08 2.14.17 4.28.32 6.41.05.66.51 1.2.35 1.99-.12.6.29 1.31.48 1.96.32 1.05.32 2.12.18 3.19-.04.31-.16.59.07.87.43.51.41 1.13.49 1.73.23 1.67.62 3.32.77 4.99.19 2.21.65 4.4.63 6.64-.06 6.15-.03 12.3-.02 18.45 0 2-.12 4.02.12 5.99.19 1.61.24 3.21.26 4.82.04 3.3.13 6.6 1 9.81.28 1.02.32 2.16.99 3 .97 1.21 1.61 2.61 2.38 3.92 1.33 2.27 2.87 4.28 5.14 5.69 1.77 1.11 3.61 2.08 5.61 2.62 3.49.94 7.02 1.72 10.67 1.47.46-.03.92-.01 1.38-.02 2.23-.03 4.44-.21 6.67-.39a47.6 47.6 0 0 1 13.31.76zM136.25 4.04c.04-.01.11.07.16.12l-.18.09c-.06-.02-.13-.04-.19-.06.07-.05.13-.13.21-.15zM124.68.8c.23.05.25.14.06.22-.06.02-.15 0-.21-.03-.03-.02-.04-.09-.05-.14.06-.02.14-.06.2-.05zm-18.46 2.8c.04.03.04.12.06.18-.06-.01-.13-.01-.19-.03-.03-.01-.03-.07-.05-.11.06-.01.15-.06.18-.04zm-1.72.44c.03.01.04.08.06.13-.06.02-.16.07-.19.05-.05-.04-.05-.13-.07-.2.06 0 .14 0 .2.02zm-2.24.2c.03-.01.12.1.12.16.01.07-.03.2-.07.21-.44.06-.88.11-1.32.17 0-.07-.01-.13-.02-.2.43-.12.86-.24 1.29-.34zM74.49 11c-1.12.42-2.25.82-3.76.63 1.36-.63 2.48-1.02 3.76-.63zm-27.17 4.86c.01-.12.13-.31.23-.33.6-.11 1.2-.19 1.71.76-.73-.03-1.23-.04-1.74-.1-.09 0-.21-.22-.2-.33z"
                  />
                </svg>
                <div className="image">
                  <img
                    src={
                      contacts.imageUrl.length === 0
                        ? `https://api.multiavatar.com/${contacts.id}.png?apikey=DjU8a23T0YnxXd`
                        : contacts.imageUrl
                    }
                    alt=""
                    style={{ border: `2px solid ${contacts.colorIcon}` }}
                  />
                </div>
                <BsPersonCircle
                  className="ImageIcon"
                  style={{ color: contacts.colorIcon }}
                />
                <div className="card">
                  <div className="card__header"></div>
                  <div className="card__body">
                    <span className="tag tag-red">{contacts.email}</span>
                    <br />
                    <h4 className="card_h4">{contacts.name}</h4>
                    <h4 className="inline_h3">Phone1: </h4>
                    <p className="inline_p">{contacts.phoneNumber1}</p>
                    <br />
                    {contacts.phoneNumber2 ? (
                      <>
                        <h4 className="inline_h3">Phone2: </h4>
                        <p className="inline_p">{contacts.phoneNumber1}</p>
                        <br />
                      </>
                    ) : (
                      ''
                    )}
                    <h4 className="inline_h3">Address: </h4>
                    <p className="inline_p">{contacts.address}</p>
                  </div>
                </div>
                <div className="card__footer">
                  <span
                    className="update"
                    style={{ backgroundColor: contacts.colorIcon }}
                  >
                    <MdDelete onClick={() => Delete(contacts.id)} />
                  </span>
                  <span
                    className="read"
                    style={{ backgroundColor: contacts.colorIcon }}
                    onClick={() =>
                      Update(
                        contacts.id,
                        contacts.name,
                        contacts.imageUrl,
                        contacts.address,
                        contacts.phoneNumber1,
                        contacts.phoneNumber2,
                        contacts.email
                      )
                    }
                  >
                    <span className="rtext">Update</span>
                    <MdEditSquare className="ricon" />
                  </span>
                </div>
              </div>
            </motion.div>
          )
        })}
    </>
  )
}

export default Card
