import { useState } from 'react';

function Counter() {
  const [total, setTotal] = useState(0);

  return (
    <>
      <h1>計數器</h1>
      <h1>{total}</h1>
      <button
        onClick={() => {
          setTotal((prevCount) => prevCount + 1);
          setTotal((prevCount) => prevCount + 1);
          setTotal((prevCount) => prevCount + 1);
        }}
      >
        +1
      </button>
      <button
        onClick={() => {
          setTotal(total - 1);
        }}
      >
        -1
      </button>
    </>
  );
}
export default Counter;
