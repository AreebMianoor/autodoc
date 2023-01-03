import React, { useState } from "react";
import "./tailwind.css";


function CodeForm() {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch("http://localhost:4000/add-comments", {
      method: "POST",
      body: code,
    })
      .then((response) => response.text())
      .then((output) => {
        setOutput(output);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="code">
          Code
        </label>
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="code"
          value={code}
          onChange={(event) => setCode(event.target.value)}
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-blue font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Add Comments
        </button>
      </div>
      {output && (
        <pre className="mt-4 text-sm leading-5 text-gray-700">{output}</pre>
      )}
    </form>
  );
}

export default CodeForm;