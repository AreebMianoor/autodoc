import React, { useState } from "react";

function CodeForm() {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch("https://g3dio2.deta.dev/add-comments", {
      method: "POST",
      body: code,
    })
      .then((response) => response.text())
      .then((output) => {
        setOutput(output);
      });
  };

  return (
    <>
      <h1 style={{ fontSize: "2em", textAlign: "center", fontWeight: "bold", marginBottom: "30px" }}>
        AUTODOC
      </h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: "800px", margin: "0 auto" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="code">
              
            </label>
            <textarea
              style={{ height: "200px", width: "600px", fontSize: "1.2em", fontFamily: "monospace" }}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="code"
              value={code}
              placeholder="Insert code here..."
              onChange={(event) => setCode(event.target.value)}
            />
          </div>
          <button
            style={{ fontSize: "1.2em", backgroundColor: "#3498db", color: "white", border: "none", padding: "12px 20px", borderRadius: "4px", cursor: "pointer" }}
            type="submit"
          >
            Add Comments
          </button>
        </div>
        {output && (
          <pre style={{ fontSize: "1.2em", fontFamily: "monospace", marginTop: "20px", whiteSpace: "pre-wrap" }}>{output}</pre>
        )}
      </form>
    </>
  );
}

export default CodeForm;
