import { Button, ButtonGroup } from 'react-bootstrap';

const App = () => (
  <div className="App m-3">
    <ButtonGroup aria-label="Basic example">
      <Button variant="primary">Left</Button>
      <Button variant="primary">Middle</Button>
      <Button variant="primary">Right</Button>
    </ButtonGroup>
  </div>
);

export default App;
