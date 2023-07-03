const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (!country[0]) {
    return (
      <div>
        not found...
      </div>
    )
  }

  const countryObject = country[0]

  return (
    <div>
      <h3>{countryObject.name.common} </h3>
      <div>capital {countryObject.capital[0]} </div>
      <div>population {countryObject.population}</div>
      <img src={countryObject.flags.svg} height='100' alt={`flag of ${countryObject.name.common}`} />
    </div>
  )
}

export default Country
