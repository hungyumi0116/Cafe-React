import React from 'react'

export default function Test() {
  return (
    <select name="pets">
      <option value="">請選擇你最愛的寵物</option>
      <option value="dog">Dog</option>
      <option value="cat" selected>
        Cat
      </option>
      <option value="hamster">Hamster</option>
      <option value="parrot">Parrot</option>
      <option value="spider" disabled>
        Spider
      </option>
      <option value="goldfish">Goldfish</option>
    </select>
  )
}
