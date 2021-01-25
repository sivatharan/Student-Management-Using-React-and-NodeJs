import ReactHighchart from 'react-highcharts';
import HighchartMore from 'highcharts/highcharts-more';
import chartApi from '../api/chart'
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import React, { Component } from "react";
import Navigation from '../component/nav';
import App from '../helper/app';
import '../App.css'

HighchartMore(ReactHighchart.Highcharts);

export default class BoxPlotChart extends Component {
    state = {
        filterVal: { student: 1, year: 2010, subjects: ["Subject1", "Subject2", "Subject3", "Subject4", "Subject5"] },
        charData: App.boxPlotChart({}),
        loading: false
    }

    constructor(props) {
        super(props);

    }
    componentDidMount() {
        this.filterData();
    }
    getStudentId = (studentId) => {
        this.state.filterVal.student = studentId
    };
    getyear = (year) => {
        this.state.filterVal.year = year;
    }
    getSubject = (subjects) => {
        this.state.filterVal.subjects = subjects;
    }
    getFilterData = () => {
        this.filterData();
    }
    filterData = () => {
        this.setState({ loading: true });

        chartApi.getStudentDataWithYearAndSubjectFilter({ year: this.state.filterVal.year, subjects: this.state.filterVal.subjects }).then(data => {
            this.setState({ loading: false });

            if (data != undefined &&  data.data && data.data.result) {
                let preparedData = App.groupBySubject(data.data.result);
                let subjects = [];
                let marks = [];
                let everyStudentMarks = App.prepareMarksPoints(preparedData);
                for (let i = 0; i < preparedData.length; i++) {
                    let sortedMarks = App.sortByMarks(preparedData[i].marks);
                    subjects.push(preparedData[i].name);
                    marks.push([sortedMarks[0], App.q25(sortedMarks), App.q50(sortedMarks), App.q75(sortedMarks), sortedMarks[19]])
                }
                //Update the chart for new data
                let chart = this.refs.chart.getChart();
                var series = chart.series[0];
                series.setData(marks, false);
                chart.series[1].setData(everyStudentMarks);
                chart.xAxis[0].setCategories(subjects);
                chart.redraw();
            }
        });
    }
    render() {
        return (
            <Container fluid>
                <Row>
                    <Col sm={2} id="sidebar-wrapper">
                        <Navigation clickStudent={this.getStudentId} clickFilter={this.getFilterData} clickYear={this.getyear} clickSubject={this.getSubject} />
                    </Col>
                    <Col sm={10} id="page-content-wrapper">
                        {this.state.loading ?

                            <Spinner animation="border" role="status" className="loading_center" size="50">
                                <span className="sr-only ">Loading...</span>
                            </Spinner> :
                            <ReactHighchart config={this.state.charData} ref="chart" />
                        }

                    </Col>

                </Row>
            </Container>
        );
    }
}

