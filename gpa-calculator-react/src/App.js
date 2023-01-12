import './App.css'
import {Semester} from './Semester.js'
import React from 'react'
import $ from 'jquery'
import {
  Button,
  Modal,
  Popup,
  Segment,
  Checkbox,
  Statistic,
  Header,
} from 'semantic-ui-react'

const letterGrades = {
    "A+": [4.0, 97.0],
    "A": [4.0, 93.0],
    "A-": [3.7, 90.0],
    "B+": [3.3, 87.0],
    "B": [3.0, 83.0],
    "B-": [2.7, 80.0],
    "C+": [2.3, 77.0],
    "C": [2.0, 73.0],
    "C-": [1.7, 70.0],
    "D+": [1.3, 67.0],
    "D": [1.0, 63.0],
    "D-": [0.7, 60.0],
    "F": [0.0, 0.0]
};

const initialState = {
    helpOpen: false,
    collegeMode: true,
    gpa: 0.0,
    credits: 0,
    semesters: [],
    runningId: 0
};

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = initialState;
        this.nightMode = false;
    }

    reset = () => {
        this.setState(initialState);
    }

    addSemester = () => {
        var newId = this.state.runningId + 1;
        this.setState({
            semesters: [...this.state.semesters,
                {
                    'name': 'New Semester',
                    'courses': [],
                    'credits': 0,
                    'gpa': 0,
                    'id': newId
                }
            ],
            runningId: newId
        });
    }

    addClass = (semesterIndex) => {
        var newSemesters = this.state.semesters;
        var newId = this.state.runningId + 1;
        newSemesters[semesterIndex].courses.push(
            {
                'name': '',
                'credits': '',
                'grade': '',
                'id': newId
            });
        this.setState({semesters: newSemesters, runningId: newId});
    }

    editSemester = (semesterIndex, type, value) => {
        var newSemesters = this.state.semesters;

        if (type === 'delete') newSemesters.splice(semesterIndex, 1);
        else newSemesters[semesterIndex][type] = value;

        this.setState({semesters: newSemesters}, () => {
            if (type !== 'name') this.calculateGPA();
        });
    }

    editClass = (semIndex, classIndex, type, value) => {
        var newSemesters = this.state.semesters;

        if (type === 'delete') newSemesters[semIndex].courses.splice(classIndex, 1);
        else newSemesters[semIndex].courses[classIndex][type] = value;

        this.setState({semesters: newSemesters}, () => {
            if (type !== 'name') this.calculateGPA();
        });
    }

    calculateGPA = () => {
        var totalCredits = 0;
        var totalPoints = 0;
        var newState = this.state;
        for (let semester = 0; semester < newState.semesters.length; semester++) {
            let semesterCredits = 0;
            let semesterPoints = 0;
            for (const course of newState.semesters[semester].courses) {
                let grade = course.grade.toUpperCase();

                let points = isNaN(grade) ?
                    letterGrades[grade][0] : parseFloat(grade);

                let credits = this.state.collegeMode ?
                    parseInt(course.credits) : 1;

                semesterCredits += credits;
                semesterPoints += points * credits;
            }
            newState.semesters[semester].credits = semesterCredits;
            newState.semesters[semester].gpa = 
                (semesterPoints / semesterCredits).toFixed(3);
            totalCredits += semesterCredits;
            totalPoints += semesterPoints;
        }
        newState.credits = totalCredits;
        newState.gpa = (totalPoints / totalCredits).toFixed(3);
        newState.gpa = isNaN(newState.gpa) ? 'Err' : newState.gpa
        this.setState(newState);
    }

    downloadData = () => {
        let stateString = JSON.stringify(this.state);
        let elem = document.createElement('a');
        elem.setAttribute('href', 'data:text/plain;charset=utf-8,' 
            + encodeURIComponent(stateString));
        elem.setAttribute('download', 'GPACalculatorData.json');
        elem.style.display = 'none';
        document.body.appendChild(elem);
        elem.click();
        document.body.removeChild(elem);
    }

    uploadData = () => {
        let input = document.createElement('input');
        input.type = 'file';
        input.onchange = (e) => {
            let file = e.target.files[0];
            let reader = new FileReader();
            reader.readAsText(file, 'UTF-8');
            reader.onload = readerEvent => {
                let content = readerEvent.target.result;
                let saveData = JSON.parse(content);
                this.setState(saveData);
            };
        }
        input.click();
    }

    toggleHelp = () => {
        this.setState({helpOpen: !this.state.helpOpen});
    }

    toggleMode = () => {
        this.setState({collegeMode: !this.state.collegeMode}, () => {
            this.calculateGPA();
        });
    }

    toggleNightMode = () => {
        this.nightMode = !this.nightMode;
        if (this.nightMode) {
            $('body').find('.ui').addClass('inverted');
            $('body').addClass('night-mode');
            $("#night-mode > i").addClass('yellow sun')
            $("#night-mode > i").removeClass('purple moon');

            document.cookie = 'nightmode=true;path=/';
        }
        else {
            $('body').find('.ui').removeClass('inverted');
            $('body').removeClass('night-mode');
            $("#night-mode > i").removeClass('yellow sun')
            $("#night-mode > i").addClass('purple moon');

            document.cookie = 'nightmode=false;path=/';
        }
    }

    render() {
        let results;
        if (this.state.collegeMode) {
            results = <Segment raised className='gpa-display'>
                            <Statistic label='Credits' value={this.state.credits} />
                            <Statistic label='GPA' value={this.state.gpa} />
                        </Segment>;
        }
        else {
            results = <Segment raised className='gpa-display'>
                            <Statistic label='GPA' value={this.state.gpa} />
                        </Segment>;
        }
        
        return (
            <div className="App">
                <Header as='h1'>GPA Calculator 2.0</Header>
                <Button.Group>
                    <Popup content='Save' trigger={
                        <Button icon='save' onClick={this.downloadData}/>
                    } />
                    <Popup content='Load' trigger={
                        <Button icon='folder open' onClick={this.uploadData}/>
                    } />
                    <Popup content='Reset' trigger={
                        <Button icon='trash' onClick={this.reset}/>
                    } />
                </Button.Group>
                {' '}
                <Button icon='question' onClick={this.toggleHelp}/>
                {/* <Button
                    icon='purple moon'
                    onClick={this.toggleNightMode}
                    id='night-mode'/> */}
                <Segment basic className="mode-selector">
                    <a style={{color: this.state.collegeMode ? 'gray' : 'black'}}>
                        Grade School
                    </a>
                    <Checkbox slider
                        onChange={this.toggleMode}
                        checked={this.state.collegeMode}/>
                    <a style={{color: this.state.collegeMode ? 'black' : 'gray'}}>
                        College
                    </a>
                </Segment>
                <Modal open={this.state.helpOpen} >
                    <Modal.Header>Test modal</Modal.Header>
                    <Modal.Actions>
                        <Button onClick={this.toggleHelp}>Close</Button>
                    </Modal.Actions>
                </Modal>
                
                {results}
                
                <div className='semester-container'>
                    {this.state.semesters.map((sem, i) => (
                        <React.Fragment key={sem.id}>
                            <Semester
                                data={sem}
                                index={i}
                                editSemester={this.editSemester}
                                editClass={this.editClass}
                                addClass={this.addClass}
                                collegeMode={this.state.collegeMode}>
                            </Semester>
                        </React.Fragment>
                    ))}
                </div>

                <Segment basic>
                    <Button
                        content='Add Semester'
                        onClick={this.addSemester}
                        icon='plus'
                        labelPosition='left'/>
                </Segment>
                
            </div>
        );
    }
}

export default App;
