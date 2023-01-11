import './App.css'
import React, {createRef} from 'react'
import {
  Button,
  Modal,
  Popup,
  Segment,
  Checkbox,
  Statistic,
  Sticky,
} from 'semantic-ui-react'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      helpOpen: false,
      collegeMode: true
    }
    this.contextRef = createRef()
  }

  

  toggleHelp = () => {
    this.setState({helpOpen: !this.state.helpOpen});
  }

  toggleMode = () => {
    this.setState({collegeMode: !this.state.collegeMode});
  }
  
  render() {
    return (
      <div className="App">
        <h1>GPA Calculator 2.0</h1>
        <Button.Group>
          <Popup content='Save' trigger={<Button icon='save' />} />
          <Popup content='Load' trigger={<Button icon='folder open' />} />
          <Popup content='Reset' trigger={<Button icon='trash' />} />
        </Button.Group>
        {' '}
        <Button icon='question' onClick={this.toggleHelp}/>
        <Button icon='moon' onClick={this.toggleNightMode}/>
        <div className="mode-selector">
            {/* <a className={this.collegeMode ? styles.textGray : styles.textBlack}>Grade School</a> */}
            <a style={{color: this.state.collegeMode ? 'gray' : 'black'}}>Grade School</a>
            <Checkbox slider onChange={this.toggleMode} checked={this.state.collegeMode}/>
            <a style={{color: this.state.collegeMode ? 'black' : 'gray'}}>College</a>
        </div>
        <Modal open={this.state.helpOpen} >
          <Modal.Header>Test modal</Modal.Header>
          <Modal.Actions>
            <Button onClick={this.toggleHelp}>Close</Button>
          </Modal.Actions>
        </Modal>
        <Segment className='gpa-display'>
          <Statistic label='Credits' value='0' />
          <Statistic label='GPA' value='0.0' />
        </Segment>
        
        <Segment basic>
          <Button content='Add semester' icon='plus' labelPosition='left'/>
        </Segment>
      </div>
    );
  }
}

export default App;
