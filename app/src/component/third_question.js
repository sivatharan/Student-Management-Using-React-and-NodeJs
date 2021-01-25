import ReactHighchart from 'react-highcharts';
import chartApi from '../api/chart'
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import React, { Component } from "react";
import Navigation from '../component/nav';
import App from '../helper/app';
import '../App.css'

export default class ThirdQuestion extends Component {
    state = {
        filterVal: { student: 1, year: "2010", subjects: ["Subject1", "Subject2", "Subject3", "Subject4", "Subject5"] },
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

        chartApi.getStudentDataByStudentId(this.state.filterVal.student).then(data => {
            // console.info(data);
            this.setState({ loading: false });
            if (data != undefined &&  data.data && data.data.result) {
                // let preparedData = App.groupBySubject(data.data.result);
                let years = [];
                let marks = [];

                let yearData = data.data.result;
                //Update the chart for new data
                let chart = this.refs.chart.getChart();
                console.info(yearData.year)
                chart.series[1].setData(yearData.marks);
                chart.xAxis[0].setCategories(yearData.year);
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
                    {this.state.loading}
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
