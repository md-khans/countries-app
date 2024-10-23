import React from 'react'
import { useRouteError } from 'react-router-dom'

const ErrorPage = () => {
    const error = useRouteError()
    console.log(error)
  return (
    <div>
      <h2>Some Thing Went Wrong. {error.status}</h2>
    </div>
  )
}

export default ErrorPage
