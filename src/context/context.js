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

  // Search github User
  const searchGithubUser = async (user) => {
    // setting error to default before checking again
    toggleError()

    // setLoading(true)
    const resp = await axios(`${rootUrl}/users/${user}`).catch((err) => {
      console.log(err)
    })

    console.log(resp)

    if (resp) {
      setGithubUser(resp.data)
    } else {
      toggleError(true, "there's no user with that username")
    }
  }

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

  // Adding a default value
  function toggleError(show = false, msg = "") {
    setError({ show, msg })
  }

  useEffect(() => {
    checkRequest()
  }, [])

  return (
    <GithubContext.Provider
      value={{
        repos,
        githubUser,
        followers,
        requests,
        error,
        searchGithubUser,
      }}
    >
      {children}
    </GithubContext.Provider>
  )
}

export { GithubProvider, GithubContext }
