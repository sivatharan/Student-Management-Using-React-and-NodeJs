export default class App{     
    //group by subject
    static groupBySubject = (data) => {    
        let subjectArray = [];
        for(let i = 0; i < data.length; i++){
            let subjectIndex = subjectArray.findIndex(subjectArray=>subjectArray.name===data[i].subject);
            if(subjectIndex>=0){
                subjectArray[subjectIndex]["data"].push(data[i]);
                subjectArray[subjectIndex]["marks"].push(data[i].mark);
            }else{
                subjectArray.push({name:data[i].subject,data:[data[i]],marks:[data[i].mark]})
            }
        }
        return subjectArray;
    }
    //sort by student marks
    static sortByMarks = (data) => {
        return data.sort((a, b) => a - b);
    }
    //find avarage marks for subject
    static findAvarage(data){
        return (data.reduce((a, b) => a + b, 0)/data.length);
    }

    //find student mrkes
    static findStudentMark(data,studentId){
        for(let i = 0; i < data.length; i++){
            if(data[i].studentId === parseInt( studentId)){
                return data[i].mark;
                break;
            }          
        }
        return 0;
    }
   
    //q25
    static q25 = (arr) => {return  quantile(arr,0.25)};
    //q50
    static q50 = (arr) => {return  quantile(arr,0.50)};
    //q75
    static q75 = (arr) => {return  quantile(arr,0.75)}; 
    
    //prepare box lot data
    static boxPlotChart(data){
        return {
            chart: {
                type: 'boxplot'
            },
    
            title: {
                text: 'Subject with marks'
            },
    
            legend: {
                enabled: true
            },
    
            xAxis: {
                categories: ['Subject 1', 'Subject 2', 'Subject 3', 'Subject 4', 'Subject 5'],
                title: {
                    text: 'Subject Name'
                }
            },
    
            yAxis: {
                title: {
                    text: 'Marks'
                }
            },
            tooltip: {
                formatter: function() {
                  if (this.series.userOptions.type === 'scatter') {
                    return 'Marks '+this.y + '';
                  } else {
                    return (
                    '<b>'+this.x+' Marks Data<b/>'+
                      '<br/>Max: ' +
                      this.point.high +
                      '<br/> Q3: ' +
                      this.point.q3 +
                      '<br/>Median: ' +
                      this.point.median +
                      '<br/>Q1: ' +
                      this.point.q1 +
                      '<br/>Min: ' +
                      this.point.low +
                      ''
                    );
                  }
                }
              },
            series: [{
                name: 'Subject',
                data: [
                    
                ],
                tooltip: {
                    headerFormat: '<em>Experiment No {point.key}</em><br/>'
                }
            },
            {
                name: 'Student',
                color: 'rgb(255,0,0)',
                type: 'scatter',
                data: [ // x, y positions where 0 is the first category
                    
                ],
                marker: {
                    fillColor: 'white',
                    lineWidth: 1,
                    lineColor: 'rgb(255,0,0)'
                },
                tooltip: {
                    pointFormat: '{point.value}'
                }
            }],
            plotOptions: {
                    // series: {
                    //     animation: {
                    //         duration: 1000
                    //     }
                    // },
                scatter: {
                    marker: {
                        radius: 2,
                        symbol: 'circle',
                        states: {
                            hover: {
                                enabled: true,
                                lineColor: 'rgb(255,0,0)'
                            }
                        }
                    },
                    states: {
                        hover: {
                            marker: {
                                enabled: false
                            }
                        }
                    }
                }
            },
        }
    }
    //prepare line chart data
    static lineChart(data){
        return {
            chart: {
                zoomType: 'xy'
            },
            title: {
                text: 'Student subject and marks'
            },
            xAxis: [{
                categories: [],
                crosshair: true
            }],
            yAxis: [{ // Primary yAxis
               
                title: {
                    text: 'Marks',
                    style: {
                        color:'rgb(255,0,0)'
                    }
                }
            }, { // Secondary yAxis
                title: {
                    text: 'Avarage',
                    style: {
                        color:'rgb(255,0,0)'
                    },
                    
                },
                
                opposite: true
            }],
            tooltip: {
                shared: true
            },
            legend: {
                layout: 'vertical',
                align: 'left',
                x: 120,
                verticalAlign: 'top',
                y: 100,
                floating: true,
                backgroundColor:
                    // Highcharts.defaultOptions.legend.backgroundColor || // theme
                    'rgba(255,255,255,0.25)'
            },
            series: [{
                name: 'Marks',
                type: 'column',
                yAxis: 1,
                data: [],
                tooltip: {
                    valueSuffix: ''
                }
        
            }, {
                name: 'Avarage',
                type: 'spline',
                data: [],
                tooltip: {
                    valueSuffix: ''
                }
            }]
        }
    }

    //Prepare every student marks
    static prepareMarksPoints(data){
        let temArray = [];
        for(let i = 0; i < data.length; i++){
            for(let j = 0; j < data[i].marks.length; j++){
                temArray.push([getRandomInt(-0.1,0.1)+i, data[i].marks[j]]);
            }
        }
        console.info(temArray);
        return temArray;

    }
}



function  quantile(arr, q){
    const sorted = arr;
    const pos = (sorted.length - 1) * q;
    const base = Math.floor(pos);
    const rest = pos - base;
    if (sorted[base + 1] !== undefined) {
        return sorted[base] + rest * (sorted[base + 1] - sorted[base]);
    } else {
        return sorted[base];
    }
};

function getRandomInt(min, max) {
    return (Math.random() * (max - min)) + min;
}