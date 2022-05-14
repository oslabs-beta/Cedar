//import
import React from 'React';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import regeneratorRuntime from 'regenerator-runtime';

//imports 
import LineGraph from '../src/components/LineGraph';

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
          beforeAll(() => {
            card = render(<LineGraph {...lGraphProps} />);      
          });
          //a graph should be displayed as a <div>
          //getByRole may not be the way to dispaly a div--research
          //writing a test to match what the app is already doing (delete this comment later...)
          //how do you make sure you're only getting things: what tells us it's a chart, can't grab chart
          //graphs drawn w/ JS and HTML, but how does HTML and JS know how to differneciate b/w the 3 graphs
          test('renders line graph with correct properties', () => {
            expect(lGraph.getByRole('img')).toBeVisible();

          })
    })
})


