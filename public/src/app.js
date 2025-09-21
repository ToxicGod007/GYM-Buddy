const React = require("react");
const { useState } = require("react");

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Hello from React</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increase</button>
    </div>
  );
}

module.exports = App;