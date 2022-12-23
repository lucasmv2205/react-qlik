import React, { useState } from 'react';
import { TSQlik, QSApp, QSProps } from 'ts-qlik'
import './App.css';
 
function App(props) {
  const [active, setActive] = useState('qlik');
  const [qlik, setQlik] = useState(null);
  const config = {
    "host": "localhost",
    "port": 80,
    "prefix": "/",
    "isSecure": false
};
 
  const changeTab = (data) => {
    setActive(data);
    if(data === 'app') {
      // Open Qlik Sense application
      QSApp('031ec68a-9247-4fc5-9ddd-3b1764924aab', config).then((q) => {
        q.currApp.app.getObject('obj1', 'fNGRa')
        q.currApp.app.getObject('obj2', 'JcJvj')
      })
    }
  }
 
// Get Qlik Properties
 
  const callQlikFn = () => {  
  TSQlik(config).then((q) => {
    setQlik(q);
  })
  }
 
  return (
    <div className="App">
      <div className="Header">
        TS-Qlik Application
     </div>
      { qlik && 
            <div className="Content">
              <div className="tabs">
                <div onClick={() => changeTab('qlik')} className={(active === 'qlik') ? 'tab active' : 'tab'}>TSQlik function</div>
                <div onClick={() => changeTab('app')} className={active === 'app' ? 'tab active' : 'tab'}>OpenApp function</div>
              </div>
              {active === 'qlik' && <div className="Qlik">
                <div className="directoryName">Directory: {qlik.qlikUser.directory}</div>
                <div className="userName">UserName: {qlik.qlikUser.userid}</div>
              </div> }
              {active === 'app' && <div className="OpenApp">
                <div id="obj1" className="object"></div>
                <div id="obj2" className="object"></div>
              </div> }
      </div> }
      { !qlik && 
            <div className="Content">
              <div className="qlikBtn">
                <button onClick={() => callQlikFn()}>Call Qlik</button>
              </div>
      </div> }
    </div>
  );
}
 
export default App;