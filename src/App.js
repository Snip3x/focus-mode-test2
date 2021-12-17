
import './App.css';
import React, { useState } from 'react';
const electron = window.require("electron");



function App() {
  const [p1, setp1] = useState("Press the button to start the exam");
  const [p2, setp2] = useState("After Pressing the button you will be in focus mode");

  function startExam(){
    const window = electron.remote.getCurrentWindow();


    electron.ipcRenderer.send("exam-started")
    electron.ipcRenderer.once("ok",()=>{
      setp1("You are in focus mode window ALT+TAB and CTRL+ALT+DEL will Close your exam.");
      setp2("Also ALT+F4 is disabled");
    })

    electron.ipcRenderer.once("exam-locked",()=>{
      setp1("Exam has been locked");
      setp2("Please contact your teacher");
    })
    window.setFullScreen(true);
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          {p1}
        </p>
      <p>
        {p2}
      </p>
      <Welcome start={startExam} />
      </header>
    </div>
  );
}

function Welcome(props) {
  return <button onClick={props.start}>start</button>;
}



export default App;