//https://www.freecodecamp.org/news/react-testing-library-tutorial-javascript-example-code/
// https://github.com/testing-library/jest-dom#tocontainelement
//maybe this can help w/ chart testing: https://github.com/reactchartjs/react-chartjs-2
//import
import React from 'React';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import regeneratorRuntime from 'regenerator-runtime';

//imports 
import LineGraph from '../src/components/LineGraph';
//Renders a line graph displaying metric data for input functions over time.   
describe('Unit testing React presentational components', () => {
  describe('LineGraph', () => { //describe the line graph
    let lGraph;
    const lGraphProps = {
      dataProp: {
        title: 'Random Title',
        xUnit: 'day',
        xMin:1651449600000,
        yMin: 0,
        labels: [
          1651536000000,
          1651622400000,
          1651708800000,
          1651795200000,
          1651881600000,
          1651968000000,
          1652054400000,
          1652140800000,
          1652227200000,
          1652313600000,
          1652400000000,
          1652486400000,
          1652572800000,
          1652659200000
        ],
        datasets:[
          {
            id: "test-func-app-HelloWorldFunction-2DJ2VlqjVGLQ",
            "label": "test-func-app-HelloWorldFunction-2DJ2VlqjVGLQ",
            "backgroundColor": "#88CCEE",
            "borderColor": "#88CCEE",
            "pointStyle": "circle",
            "data": [1, 2, 2, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0]
          },
          {
            "id": "testloop",
            "label": "testloop",
            "backgroundColor": "#DDCC77",
            "borderColor": "#DDCC77",
            "pointStyle": "rect",
            "data": [3, 3, 3, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0]
          },
          {
            "id": "logsdata",
            "label": "logsdata",
            "backgroundColor": "#CC6677",
            "borderColor": "#CC6677",
            "pointStyle": "star",
            "data": [2, 2, 3, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0]
          },
          {
            "id": "sentEmail",
            "label": "sentEmail",
            "backgroundColor": "#AA4499",
            "borderColor": "#AA4499",
            "pointStyle": "triangle",
            "data": [3, 3, 3, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0]
          }
        ]
      }
    };
    beforeAll(() => { // create the line graph before the test
      lGraph = render(<LineGraph {...lGraphProps} />); //render line graph which is a div holding a canvas
      /** lgraph is this whole sandwich/fake DOM:
       * <div>
       *   <canvas> <--- graph is this
       * </div>
       */
    });
    test('renders a canvas element containing a line graph', () => { // run the test
        // grab the canvas element
        //querying graph to get the role that has 'img' in it and assign it to constant graph
        const graph = lGraph.getByRole('img')
        expect(graph).toHaveClass('lineGraph')  
    })   
  });      
});

          //a graph is displayed as a <div> in console
          //getByRole may not be the way to dispaly a div--research: .getByText maybe?
          //writing a test to match what the app is already doing (delete this comment later...)
          //how do you make sure you're only getting things: what tells us it's a chart, can't grab chart
          //graphs drawn w/ JS and HTML, but how does HTML and JS know how to differneciate b/w the 3 graphs
      

//test using toHaveClass and toHaveAttribute from github jest-dom https://github.com/testing-library/jest-dom#tohaveattribute
// const lGraph = <canvas role="img" height="297" width="594" class="lineGraph" 
// style="display: block; box-sizing: border-box; height: 297px; width: 594px;"></canvas>

// test('renders line graph with correct properties', () => {
//     //lGraph is the <canvas> element
//     expect(lGraph).toHaveClass('testChart'); //lGraph should have a class assigned to testChart
//     expect(lGraph).toHaveAttribute('role', 'img'); //lGraph should have an attribute role assigned to img
//     //unsure if two lines below are necessary:
//     expect(lGraph).toHaveAttribute('role', expect.stringContaining('img')) //checks if attribute has specific value or partial match
//     expect(lGraph).toHaveClass('testChart', {exact: true}) //checks if element has exactly a set of classes
//   })

  

