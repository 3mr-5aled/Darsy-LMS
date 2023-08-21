import React, { useState } from "react"

type Props = {
  title: string
  options: string[]
  setState: (state: string) => void
  data: string
}

const SelectMenu = ({ title, options, setState, data }: Props) => {
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value
    setState(selectedValue)
  }

  return (
    <div>
      <select
        title={title}
        className="select select-bordered w-full max-w-xs"
        defaultValue="default"
        onChange={handleSelectChange}
      >
        <option disabled value="default">
          {title}
        </option>
        {options.map((option, index) => (
          <option value={option} key={index}>
            {option}
          </option>
        ))}
      </select>
      {data === "" && (
        <p className="text-xs text-error">Please select an option</p>
      )}
    </div>
  )
}

export default SelectMenu
