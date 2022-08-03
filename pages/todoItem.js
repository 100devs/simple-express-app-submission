import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React, { useState } from 'react'
import { useRouter } from "next/router";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';



export default function TodoItem({ title, text, completed=false }) {

  const router = useRouter()

  const handleDelete = async (event) => {
      event.preventDefault()
    
      const data = {
        title: title
      }
  
        const JSONdata = JSON.stringify(data)
    
      const endpoint = '/api/todo'
    
      const options = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSONdata
      }
    
      const response = await fetch(endpoint, options)
    
      const result = await response.json()
      router.push({pathname: `/`}, undefined, {scroll: false})
    }

  const handleComplete = async (event) => {
    if (completed) {
      completed = false
    }
    else {
      completed = true
    }
    event.preventDefault()
    
      const data = {
        title: title,
        text: text,
        completed: completed 
      }
  
        const JSONdata = JSON.stringify(data)
    
      const endpoint = '/api/todo'
    
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSONdata
      }
    
      const response = await fetch(endpoint, options)
    
      const result = await response.json()
      console.log(result)
      router.push({pathname: `/`}, undefined, {scroll: false})
    }


  return (
    <div className={completed ? styles.completed : styles.card}>
        <div onClick={handleComplete}>
            <h2>{title}</h2>
            <p>{text}</p>
        </div>
        <div className="justify-end z-10">
            <DeleteIcon onClick={handleDelete} fontSize="large"/>
        </div>
        </div>
  )

}