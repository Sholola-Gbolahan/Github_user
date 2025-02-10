import React from "react"
import styled from "styled-components"
import { GithubContext } from "../context/context"
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from "./Charts"
const Repos = () => {
  const { repos } = React.useContext(GithubContext)
  //  for reduces we pass in the call back func and what we are trying to return from the reduce.
  // total reference the object we're return and the Item is what we're returning
  let languages = repos.reduce((total, item) => {
    const { language } = item
    // avoid if the language is null
    if (!language) return total
    console.log(language)
    // grabbing values in language and setting and assigning values
    total[language] = 30

    return total
  }, {})
  console.log(languages)

  const chartData = [
    {
      label: "HTML",
      value: "160",
    },
    {
      label: "CSS",
      value: "80",
    },
    {
      label: "Javascript",
      value: "40",
    },
  ]

  return (
    <section className="section">
      <Wrapper className="section-center">
        <Pie3D data={chartData} />
        {/* <ExampleChart data={chartData}/>; */}
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
