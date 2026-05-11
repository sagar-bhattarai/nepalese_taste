"use client"

const SearchByName = ({ setSearchByName, classes=''}) => {

  return (
    <>
      <input
        name="name"
        id="name"
        type="text"
        className={classes}
        onChange={(e) => setSearchByName(e.target.value)} />
    </>
  )
}

export default SearchByName