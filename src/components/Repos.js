import React from "react"
import styled from "styled-components"
import { GithubContext } from "../context/context"
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from "./Charts"
const Repos = () => {
  const { repos } = React.useContext(GithubContext)
  //  for reduces we pass in the call back func and what we are trying to return from the reduce.
  // total reference the object we're return and the Item is what we're returning
  const languages = repos.reduce((total, item) => {
    const { language, stargazers_count } = item
    // avoid if the language is null
    if (!language) return total
    // if the property on the object does not exit then do something and if it does do something
    if (!total[language]) {
      total[language] = { label: language, value: 1, stars: stargazers_count }
    } else {
      // overidding the initial code to update if more that one language exit
      total[language] = { ...total[language], value: total[language].value + 1 }
    }

    return total
  }, {})

  console.log(languages)

  // converting object into an array
  const mostUsed = Object.values(languages)
    .sort((a, b) => {
      // this return highest to smallest
      return b.value - a.value
    })
    .slice(0, 5)

  // Most star per language
  // Sort by stars
  const mostPopular = Object.values(languages)
    .sort((a, b) => {
      return b.stars - a.stars
    })
    .map((item) => {
      // assigning values to stars
      return { ...item, value: item.stars }
    })
    .slice(0, 5) // Ensures the fist five languages shows

  const chartData = [
    {
      label: "HTML",
      value: "80",
    },
    {
      label: "CSS",
      value: "40",
    },
    {
      label: "JavaScript",
      value: "90",
    },
  ]

  return (
    <section className="section">
      <Wrapper className="section-center">
        <Pie3D data={mostUsed} />
        <div></div>
        <Doughnut2D data={mostPopular} />
        <div></div>
      </Wrapper>
    </section>
  )
}

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`

export default Repos
