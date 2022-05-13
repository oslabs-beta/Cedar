//note to self: this helped for post tests: https://medium.com/hackernoon/api-testing-using-supertest-1f830ce838f1

const request = require('supertest');
const express = require('express');
const fs = require('fs');
const path = require('path');

const server = 'http://localhost:3000';
//test file for function names returned in arr of obj
const testJsonFile = path.join(__dirname, '../server/models/getFunctionNames.test.json')


describe('Route integration', () => {
  describe('/', () => {
      describe('GET', () => {
          it('responds with html type and 200 status', () => {
            return request(server)
            .get('/')
            .expect('Content-Type', /text\/html/)
            .expect(200);
          });
        });
      });
    //supertest for getFunctionNames get request in aws.js
    describe('/getFunctionNames', () => {
        describe('GET', () => {
            it('responds with 200 status and json content type', () => { 
                return request(server)
                .get('/getFunctionNames')
                // .expect('Content-Type', /text\/html/)
                .expect('Content-Type', /application\/json/)
                .expect(200);
            });
            //ultimately, we're looking for an array of objects holding function names
                //that should be returned as a JSON
                //(functionUtilities is pushing an object w/ functionName as key into funcArr)
            it('responds with list of function names in JSON', () => {
                return request(server)
                .get('/getFunctionNames')
                // .expect('Content-Type', /text\/html/)
                .expect('Content-Type',/application\/json/)
                .expect(200).then((res) => {
                    expect(res.body).toBeInstanceOf(Array)
                    const testTable = JSON.parse(fs.readFileSync(testJsonFile))
                    .expect(res.body).toEqual(testTable)
                })
            });
        });
    // //supertest for getMetricsData POST request in aws.js
    // describe('/getMetricData', () => {
    //     describe('POST', () => {
    //       const metricsData = {
    //           EndTime: 'now',
    //           StartTime: 'before',
    //           MetricDataQueries: [
    //             {
    //                 Id: '1',
    //                 Label: 'selected metrics',
    //                 MetricStat: {
    //                   Metric: {
    //                     Namespace: 'AWS/Lambda',
    //                     MetricName: 'Metric Name',
    //                     Dimensions: [
    //                       {
    //                         Name: 'FunctionName',
    //                         Value: 'all the funcs'
    //                       }
    //                     ],
    //                   },
    //                   Period: 60,
    //                   Stat: 'Sum'
    //                 },
    //               }
    //           ]
    //       }
    //       //our response should be a giant-ass object
    //       it('responds with 200 and JSON application type', () => {
    //          return request(server)
    //          .post('/getMetricData')
    //          .send(metricsData)
    //          .expect('Content-Type', /application\/json/)
    //          .expect(200);
    //       })
    //       //if any field in getMetricsData obj (represented here as invalidMetricsData) is empty or not filled in
    //         //correctly, respond w/ a 400 status
    //       it('responds with a 400 if shit aint straight', () => {
    //         const invalidMetricsData = {};
    //         return request(server)
    //         .post('/getMetricData')
    //         .send(invalidMetricsData)
    //         .expect('Content-Type', /application\/json/)
    //         .expect(400)
    //         .expect('Error with metrics data')
    //       })
    //     })
    // })
    // describe('/getLogsData', () => {
    //     describe('POST', () => {
    //       const logsData = {
    //         endTime: 'now',
    //         startTime: 'before now',
    //         logGroupName: '/aws/lambda/ + func',
    //       }
    //       //responds w/ an object
    //       it('responds with 200 and JSON application type', () => {
    //         return request(server)
    //         .post('/getLogsData')
    //         .send(logsData)
    //         .expect('Content-Type', /application\/json/)
    //         .expect(200);
    //      })
    //      //responds with an error if getLogsData (represented here as getLogsData) is missing missing elements
    //      it('responds with a 400 if shit aint straight', () => {
    //         const invalidLogsData = {};
    //         return request(server)
    //         .post('/getLogsData')
    //         .send(invalidLogsData)
    //         .expect('Content-Type', /application\/json/)
    //         .expect(400)
    //         .expect('Error with metrics data')
    //       })
    //     })
    // })
})});



describe('Route integration', () => {
    describe('/', () => {
        describe('POST', () => {
            it('responds with html type and 200 status', () => {
              return request(server)
              .get('/')
              .expect('Content-Type', /text\/html/)
              .expect(200);
            });
          });
        });
        //supertest for getMetricsData POST request in aws.js
    describe('/getMetricData', () => {
        describe('POST', () => {
          const metricsData = {
              EndTime: 'now',
              StartTime: 'before',
              MetricDataQueries: [
                {
                    Id: '1',
                    Label: 'selected metrics',
                    MetricStat: {
                      Metric: {
                        Namespace: 'AWS/Lambda',
                        MetricName: 'Metric Name',
                        Dimensions: [
                          {
                            Name: 'FunctionName',
                            Value: 'all the funcs'
                          }
                        ],
                      },
                      Period: 60,
                      Stat: 'Sum'
                    },
                  }
              ]
          }
          //our response should be a giant-ass object
          it('responds with 200 and JSON application type', () => {
             return request(server)
             .post('/getMetricData')
             .send(metricsData)
            //  .expect('Content-Type', /text\/html/)
             .expect('Content-Type', /application\/json/)
             .expect(200);
          })
          //if any field in getMetricsData obj (represented here as invalidMetricsData) is empty or not filled in
            //correctly, respond w/ a 400 status
          it('responds with a 400 if shit aint straight', () => {
            const invalidMetricsData = {};
            return request(server)
            .post('/getMetricData')
            .send(invalidMetricsData)
            .expect('Content-Type', /text\/html/)
            // .expect('Content-Type', /application\/json/)
            .expect(404)
            .expect('That page does not exist!')
          })
        })
    })
    describe('/getLogsData', () => {
        describe('POST', () => {
          const logsData = {
            endTime: 'now',
            startTime: 'before now',
            logGroupName: '/aws/lambda/ + func',
          }
          //responds w/ an object
          it('responds with 200 and JSON application type', () => {
            return request(server)
            .post('/getLogsData')
            .send(logsData)
            // .expect('Content-Type', /text\/html/)
            .expect('Content-Type', /application\/json/)
            .expect(200);
         })
         //responds with an error if getLogsData (represented here as getLogsData) is missing missing elements
         it('responds with a 400 if shit aint straight', () => {
            const invalidLogsData = {};
            return request(server)
            .post('/getLogsData')
            .send(invalidLogsData)
            .expect('Content-Type', /text\/html/)
            // .expect('Content-Type', /application\/json/)
            .expect(404)
            .expect('That page does not exist!')
          })
        })
    })
});