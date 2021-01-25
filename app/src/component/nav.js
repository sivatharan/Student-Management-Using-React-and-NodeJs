
import { Link } from 'react-router-dom'
import { Row, Col, Button, DropdownButton, Dropdown, Nav, NavItem, Container } from 'react-bootstrap';
import { Multiselect } from 'multiselect-react-dropdown';
import React, { useState } from 'react';

const Navigation = (props) => {
    
    const [year, setYear] = useState(1);    
    const [student,setStudent] = useState(1);
    // setYear(2010)
    let array = [];
    for (let i = 0; i < 20; i++) {
        array.push(
            <Dropdown.Item eventKey={i + 1} onClick={() => props.clickStudent(i + 1)}>Student {i + 1}</Dropdown.Item>
        );
    };
    let yearArray = [];
    for (let i = 0; i < 10; i++) {
        yearArray.push(
            <Dropdown.Item eventKey={2010+i} onClick={() => props.clickYear(2010+i)}>201{i}</Dropdown.Item>
        );
    };
    //prepare subject array
    let subjectArray = [];
    for(let i = 1; i < 100; i++){
        subjectArray.push({name: 'Subject'+i, id: i})
    }
    let state = {
        options:subjectArray,
        selectedValue:[{name: 'Subject1', id: 1},{name: 'Subject2', id: 2},{name: 'Subject3', id: 3},{name: 'Subject4', id: 4},{name: 'Subject5', id: 5}]
    };

    function onSelect(selectedList,selectedVal){
        console.info(selectedVal);
        let subjectTemArray = [];
        for(let i = 0; i < selectedList.length; i++){
            subjectTemArray.push(selectedList[i].name);
        }
        props.clickSubject(subjectTemArray);
    }

    function onRemove(selectedList,selectedVal){
        let subjectTemArray = [];
        for(let i = 0; i < selectedList.length; i++){
            subjectTemArray.push(selectedList[i].name);
        }
        props.clickSubject(subjectTemArray);
    }

    const selectStudent = (e) => {
        setStudent(e)
    }
    const selectYear = (e) => {
        console.info(e);
        setYear(e)
    }

    return (

        <>

            <Nav className="col-md-12 d-none d-md-block bg-light sidebar"  activeKey="/home">
                <div className="sidebar-sticky"></div>
                <Nav.Item>
                    {/* <Nav.Link to="/box_chart">Plot chart</Nav.Link> */}
                    <Container fluid>
                        <div className=" row">
                            <div className="col-4">
                                <Link to="/q1"><Button variant="secondary">Q1</Button></Link>
                            </div>
                            <div className="col-4">
                                <Link to="/q2"><Button variant="secondary">Q2</Button></Link>
                            </div>
                            <div className="col-4">
                                <Link to="/q3"><Button variant="secondary">Q3</Button></Link>
                            </div>
                        </div>

                    </Container>

                </Nav.Item>

                <Nav.Item className="pt-5" >

                    <b>Select Student</b>
                    <div className="row px-5">
                        <DropdownButton btn btn-block title={"Student " + student} id="dropdown-basic-button"
                            onSelect={selectStudent}>
                            {array}
                        </DropdownButton>
                    </div>

                </Nav.Item>
                <Nav.Item className="pt-2">
                    <b>Select Year</b>
                    <div className="row px-5">
                        <DropdownButton btn btn-block title={year==1?2010:year} id="basic-nav-dropdown" onSelect={selectYear}>


                            {yearArray}
                        </DropdownButton>
                    </div>

                </Nav.Item>
                <Nav.Item className="pt-3">
                <b>Select Subjects</b>
                    <div className="row px-5 ">
                        <Multiselect
                            options={state.options}
                            selectedValues={state.selectedValue}
                            onSelect={onSelect}
                            onRemove={onRemove}
                            displayValue="name" />
                    </div>

                </Nav.Item>
                <Nav.Item className="pt-3">
                    <div className="row px-5">
                        <Button className="btn btn-block " variant="outline-primary" onClick={() => props.clickFilter()}>Filter</Button>
                    </div>
                </Nav.Item>
            </Nav>

        </>

    );
}
export default Navigation; 