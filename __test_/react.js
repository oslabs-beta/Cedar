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
    describe('LineGraph', () => {
        let lGraph;
        const lGraphProps = {
            responsive: true,
            plugins: {
              legend: {
                position: 'bottom',
              },
              title: {
                text: 'metricName'
              },
            },
            scales: {
              x: {
                type: 'time',
                time: {
                  unit: 'unitName',
                },
                min: 'timeMin',
              },
              y: {
                min: 0,
              }
            },
            cubicInterpolationMode: 'monotone',
          };
        //borrowing from Testing approach lecture where we are going thru lGraphProps defined above
        //beforeAll or beforeEach (unsure which....) (delete this later pls)
          beforeAll(() => {
            lGraph = render(<LineGraph {...lGraphProps} />); 
        //lGraphProps contains objects that will be rendered to line graph
        //I'm aware that this test is (hopefully) rendering an object of objects and not a line graph
            test('renders an object of objects', () => {
                //for every element in the lGraphProps object
                for(const i in lGraphProps){
                //expect the elements w/in the props to be an instance of Node (referencing the DOM node where component is mounted)
                expect(lGraph.getByText(lGraphProps[i])).toBeInstanceOf(Node);
                //if the type of element w/in props object is an object
                if(typeof(lGraphProps[i]) === 'object'){
                    //expect that inner object to be an instance of Node
                    expect(lGraph.getByText(lGraph.lGraphProps[i])).toBeInstanceOf(Node);
                }
              }
            })   
          });

          //a graph is displayed as a <div> in console
          //getByRole may not be the way to dispaly a div--research: .getByText maybe?
          //writing a test to match what the app is already doing (delete this comment later...)
          //how do you make sure you're only getting things: what tells us it's a chart, can't grab chart
          //graphs drawn w/ JS and HTML, but how does HTML and JS know how to differneciate b/w the 3 graphs
       
    })
})

//test using toHaveClass and toHaveAttribute from github jest-dom https://github.com/testing-library/jest-dom#tohaveattribute
const lGraph = <canvas role="img" height="297" width="594" class="testChart" 
style="display: block; box-sizing: border-box; height: 297px; width: 594px;"></canvas>

test('renders line graph with correct properties', () => {
    //lGraph is the <canvas> element
    expect(lGraph).toHaveClass('testChart'); //lGraph should have a class assigned to testChart
    expect(lGraph).toHaveAttribute('role', 'img'); //lGraph should have an attribute role assigned to img
    //unsure if two lines below are necessary:
    expect(lGraph).toHaveAttribute('role', expect.stringContaining('img')) //checks if attribute has specific value or partial match
    expect(lGraph).toHaveClass('testChart', {exact: true}) //checks if element has exactly a set of classes
  })

  

