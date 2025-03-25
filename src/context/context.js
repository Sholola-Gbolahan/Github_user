import React, { useState, useEffect, createContext } from "react"
import mockUser from "./mockData.js/mockUser"
import mockRepos from "./mockData.js/mockRepos"
import mockFollowers from "./mockData.js/mockFollowers"
import axios from "axios"

const rootUrl = "https://api.github.com"

const GithubContext = React.createContext()

// Provider, Consumer - GithubContext.Provider

const GithubProvider = ({ children }) => {
  const [githubUser, setGithubUser] = useState(mockUser)
  const [repos, setRepos] = useState(mockRepos)
  const [followers, setFollowers] = useState(mockFollowers)

  const [requests, setRequest] = React.useState("")
  const [loading, SetLoading] = React.useState(false)

  const checkRequest = () => {
    axios(`${rootUrl}/rate_limit`)
      .then(({ data }) => {
        let {
          rate: { remaining },
        } = data
        setRequest(remaining)
        if (remaining === 0) {
          // throw error
        }
      })
      .catch((err) => console.log(err))
  }

  useEffect(checkRequest(), [])

  return (
    <GithubContext.Provider value={{ repos, githubUser, followers, requests }}>
      {children}
    </GithubContext.Provider>
  )
}

export { GithubProvider, GithubContext }
