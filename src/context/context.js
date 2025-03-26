import React, { useState, useEffect, Context } from "react"
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
  const [error, setError] = React.useState({ show: false, msg: "" })

  // Check Rate
  const checkRequest = () => {
    axios(`${rootUrl}/rate_limit`)
      .then(({ data }) => {
        let {
          rate: { remaining },
        } = data

        setRequest(remaining)

        if (remaining === 0) {
          // throw error
          toggleError(true, "you have exceeded your search limit")
        }
      })
      .catch((err) => console.log(err))
  }

  function toggleError(show, msg) {
    setError({ show, msg })
  }

  useEffect(() => {
    checkRequest()
  }, [])

  return (
    <GithubContext.Provider
      value={{ repos, githubUser, followers, requests, error }}
    >
      {children}
    </GithubContext.Provider>
  )
}

export { GithubProvider, GithubContext }
