
import './App.css';
import BoxPlotChart from './component/box_plot_chart';
import LineChart from './component/line_chart';
import { BrowserRouter, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Alert from 'react-bootstrap/Alert';
import ThirdQuestion from './component/third_question';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import Navigation from './component/nav';

function App() {
  return (
    <BrowserRouter>
      <div className="App">

        <Route path="/" exact component={BoxPlotChart} />
        <Route path="/q1/" component={BoxPlotChart} />
        <Route path="/q2/" component={LineChart} />
        <Route path="/q3" component={ThirdQuestion} />
      </div>
    </BrowserRouter>
  );
}

const Home = () => (

  <div>
    <Container fluid>
      <Row>
        <Col sm={2} id="sidebar-wrapper">
          <Navigation />
        </Col>
        <Col sm={10} id="page-content-wrapper">
          <Alert variant="success">
            <Alert.Heading>Hey, nice to see you</Alert.Heading>
            <p>
              Aww yeah, you successfully read this important alert message. This example
              text is going to run a bit longer so that you can see how spacing within an
              alert works with this kind of content.
            </p>
            <hr />
          </Alert>

        </Col>

      </Row>
    </Container>

  </div>
);

export default App;
