// import React, { Component } from 'react';
// import DataStreamer, { ServerRespond } from './DataStreamer';
// import Graph from './Graph';
// import './App.css';

// /**
//  * State declaration for <App />
//  */
// interface IState {
//   data: ServerRespond[],

//   //Add property to Istate to show/hide the graph with true/false value
//   showGraph: boolean,
// }

// /**
//  * The parent element of the react app.
//  * It renders title, button and Graph react element.
//  */
// class App extends Component<{}, IState> {
//   constructor(props: {}) {
//     super(props);

//     this.state = {
//       // data saves the server responds.
//       // We use this state to parse data down to the child element (Graph) as element property
//       data: [],

//       //Set the showGraph to false which hides the graph upon initilization.
//       showGraph: false,
//     };
//   }

//   /**
//    * Render Graph react component with state.data parse as property data
//    */
//   renderGraph() {
//     return (<Graph data={this.state.data}/>)

//     //This condition ensures that the graph doesn’t render until a user
//     //clicks the ‘Start Streaming’ button,
//     //The graph renders only when the application state’s
//     //`showGraph` property is `true
//    if (this.state.showGraph) {
//      return (<Graph data={this.state.data}/>)
//    }

//   }

//   /**
//    * Get new data from server and update the state with the new data
//    */
//   getDataFromServer() {
//     // Update the state by creating a new array of data that consists of
//     // Previous data in the state and the new data from server
//     let x= 0;
//     const interval = setInterval(() => {
//       DataStreamer.getData((serverResponds: ServerRespond[]) => {
//         this.setState({
//           data: serverResponds,
//           showGraph: true, //Set showGraph to true to show the graph when data is received
//         });
//       });
//       x++;
//       if (x > 1000) {
//         clearInterval(interval);
//       }
//     }, 100);
//   }

//   /**
//    * Render the App react component
//    */
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           Bank & Merge Co Task 2
//         </header>
//         <div className="App-content">
//           <button className="btn btn-primary Stream-button"
//             // when button is click, our react app tries to request
//             // new data from the server.
//             // As part of your task, update the getDataFromServer() function
//             // to keep requesting the data every 100ms until the app is closed
//             // or the server does not return anymore data.
//             onClick={() => {this.getDataFromServer()}}>
//             Start Streaming Data
//           </button>
//           <div className="Graph">
//             {this.renderGraph()}
//           </div>
//         </div>
//       </div>
//     )
//   }
// }

// export default App;

// App.tsx

// import React, { Component } from 'react';
// import DataStreamer, { ServerRespond } from './DataStreamer';
// import Graph from './Graph';
// import './App.css';

// interface IState {
//   data: ServerRespond[];
//   showGraph: boolean;
// }

// class App extends Component<{}, IState> {
//   constructor(props: {}) {
//     super(props);
//     this.state = {
//       data: [],
//       showGraph: false,
//     };
//   }

//   renderGraph() {
//     // Return JSX for graph with animation classes
//     return <Graph data={this.state.data} />;
//   }

//   getDataFromServer() {
//     let x = 0;
//     const interval = setInterval(() => {
//       DataStreamer.getData((serverResponds: ServerRespond[]) => {
//         this.setState({
//           data: serverResponds,
//           showGraph: true,
//         });
//       });
//       x++;
//       if (x > 1000) {
//         clearInterval(interval);
//       }
//     }, 100);
//   }

//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">A simple data visualization project</header>
//         <div className="App-content">
//           <p>This project is designed to visualize data based on a certain criteria</p>
//           <button
//             className="btn btn-primary Stream-button"
//             onClick={() => {
//               this.getDataFromServer();
//             }}
//           >
//             Start Streaming Data
//           </button>
//           <div className="Graph">{this.renderGraph()}</div>
//         </div>
//       </div>
//     );
//   }
// }

// export default App;

// adding button to stop streaming data

// App.tsx

// App.tsx

import React, { Component } from "react";
import DataStreamer, { ServerRespond } from "./DataStreamer";
import Graph from "./Graph";
import "./App.css";

interface IState {
  data: ServerRespond[];
  showGraph: boolean;
}

class App extends Component<{}, IState> {
  private interval: NodeJS.Timeout | null = null;

  constructor(props: {}) {
    super(props);
    this.state = {
      data: [],
      showGraph: false,
    };
  }

  renderGraph() {
    return (
      <div className="Graph">
        <div className="Graph-description">
          {/* Brief description of the graph */}
          Real-time data visualization of a certain metric.
        </div>
        <Graph data={this.state.data} />
      </div>
    );
  }

  getDataFromServer() {
    let x = 0;
    this.interval = setInterval(() => {
      DataStreamer.getData((serverResponds: ServerRespond[]) => {
        this.setState({
          data: serverResponds,
          showGraph: true,
        });
      });
      x++;
      if (x > 1000) {
        this.stopStreaming();
      }
    }, 100);
  }

  stopStreaming() {
    if (this.interval !== null) {
      clearInterval(this.interval);
      this.interval = null;
      this.setState({
        showGraph: false,
      });
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">Bank & Merge Co Task 2</header>
        <div className="App-content">
          <p className="App-description">
            We are tasked with fixing the client-side web application so that it
            displays a graph that automatically updates as it gets data from the
            server application. Currently, the web application only gets data
            every time you click on the 'Start Streaming Data' button and does
            not aggregate duplicated data.
          </p>
          <div className="Buttons-container">
            <button
              className="Start-button"
              onClick={() => {
                this.getDataFromServer();
              }}
            >
              Start Streaming Data
            </button>
            <button
              className="Stop-button"
              onClick={() => {
                this.stopStreaming();
              }}
            >
              Stop Streaming Data
            </button>
          </div>
          {this.renderGraph()}
        </div>
      </div>
    );
  }
}

export default App;
