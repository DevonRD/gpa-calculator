import React, { useState } from 'react'; 
import {
    Button,
    Modal,
    Popup,
    Segment,
    Header,
    Checkbox,
    Grid,
    Table,
    Input,
} from 'semantic-ui-react'

const Semester = (props) => { 
    const [open, setOpen] = useState(false);

    const handleClassChange = (e, type, classIndex) => {
        props.editClass(props.index, classIndex, type, e.target.value)
    }

    const handleSemesterChange = (e, type) => {
        props.editSemester(props.index, type, e.target.value);
    }

    const deleteSemester = () => {
        props.editSemester(props.index, 'delete', '');
    }

    const addClass = () => {
        props.addClass(props.index);
    }

    const deleteClass = (classIndex) => {
        props.editClass(props.index, classIndex, 'delete', '');
    }

    const buildEditTable = () => {
        if (props.collegeMode) {
            return <Table singleLine>
                <Table.Header>
                    <Table.HeaderCell>Course Name</Table.HeaderCell>
                    <Table.HeaderCell>Credits</Table.HeaderCell>
                    <Table.HeaderCell>Grade</Table.HeaderCell>
                    <Table.HeaderCell></Table.HeaderCell>
                </Table.Header>
                <Table.Body>
                    {props.data.courses.map((cla, i) => (
                        <Table.Row key={cla.id}>
                            <Table.Cell>
                                <Input fluid
                                    defaultValue={cla.name}
                                    placeholder='Course name'
                                    onChange={(e) => handleClassChange(e, 'name', i)}/>
                            </Table.Cell>
                            <Table.Cell>
                                <Input fluid
                                    defaultValue={cla.credits}
                                    placeholder='Number of credits'
                                    onChange={(e) => handleClassChange(e, 'credits', i)}/>
                            </Table.Cell>
                            <Table.Cell>
                                <Input fluid
                                    defaultValue={cla.grade}
                                    placeholder='Course grade'
                                    onChange={(e) => handleClassChange(e, 'grade', i)}/>
                            </Table.Cell>
                            <Table.Cell collapsing>
                                <Popup
                                    content='Delete Course'
                                    trigger={
                                        <Button negative
                                            icon='trash alternate outline'
                                            onClick={() => deleteClass(i)}/>}/>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>;
        }
        else {
            return <Table singleLine>
                <Table.Header>
                    <Table.HeaderCell>Course Name</Table.HeaderCell>
                    <Table.HeaderCell>Grade</Table.HeaderCell>
                    <Table.HeaderCell></Table.HeaderCell>
                </Table.Header>
                <Table.Body>
                    {props.data.courses.map((cla, i) => (
                        <Table.Row key={cla.id}>
                            <Table.Cell>
                                <Input fluid
                                    defaultValue={cla.name}
                                    placeholder='Class name'
                                    onChange={(e) => handleClassChange(e, 'name', i)}/>
                            </Table.Cell>
                            <Table.Cell>
                                <Input fluid
                                    defaultValue={cla.grade}
                                    placeholder='Class grade'
                                    onChange={(e) => handleClassChange(e, 'grade', i)}/>
                            </Table.Cell>
                            <Table.Cell collapsing>
                                <Button negative icon='trash alternate outline' onClick={() => deleteClass(i)}/>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>;
        }
    }

    const buildDisplayTable = () => {
        if (props.collegeMode) {
            return <Table basic='very'>
                <Table.Header>
                    <Table.HeaderCell>Course</Table.HeaderCell>
                    <Table.HeaderCell>Credits</Table.HeaderCell>
                    <Table.HeaderCell>Grade</Table.HeaderCell>
                </Table.Header>
                <Table.Body>
                    {props.data.courses.map((cla, i) => (
                        <Table.Row>
                            <Table.Cell>
                                {cla.name}
                            </Table.Cell>
                            <Table.Cell>
                                {cla.credits}
                            </Table.Cell>
                            <Table.Cell>
                                {cla.grade}
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
                <Table.Footer>
                    <Table.Row>
                        <Table.HeaderCell><b>Total</b></Table.HeaderCell>
                        <Table.HeaderCell><b>{props.data.credits}</b></Table.HeaderCell>
                        <Table.HeaderCell><b>{props.data.gpa}</b></Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>;
        }
        else {
            return <Table basic='very'>
                <Table.Header>
                    <Table.HeaderCell>Course</Table.HeaderCell>
                    <Table.HeaderCell>Grade</Table.HeaderCell>
                </Table.Header>
                <Table.Body>
                    {props.data.courses.map((cla, i) => (
                        <Table.Row>
                            <Table.Cell>
                                {cla.name}
                            </Table.Cell>
                            <Table.Cell>
                                {cla.grade}
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
                <Table.Footer>
                    <Table.Row>
                        <Table.HeaderCell><b>Semester Total</b></Table.HeaderCell>
                        <Table.HeaderCell><b>{props.data.gpa}</b></Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        }
    }

    return (
        <Segment className="semester">
            <Grid verticalAlign='middle' columns={2} padded>
                <Grid.Column floated='left' textAlign='left'>
                    <Header as='h2'>{props.data.name}</Header>
                </Grid.Column>
                <Grid.Column floated='right' textAlign='right'>
                    <Modal onClose={() => setOpen(false)}
                            onOpen={() => setOpen(true)}
                            open={open}
                            trigger={<Button icon='pencil'/>}>
                        <Modal.Header>
                            <Grid verticalAlign='middle' columns={2}>
                                <Grid.Column floated='left' textAlign='left'>
                                    <Header as='h2'>Edit Semester</Header>
                                </Grid.Column>
                                <Grid.Column floated='right' textAlign='right'>
                                    <Popup
                                        content='Delete Semester'
                                        trigger={
                                            <Button negative
                                                icon='trash alternate outline'
                                                onClick={deleteSemester}/>}/>
                                </Grid.Column>
                            </Grid>
                        </Modal.Header>
                        <Modal.Content>
                            <Input fluid
                                defaultValue={props.data.name === 'New Semester' ? '' : props.data.name}
                                placeholder='Semester name'
                                onChange={(e) => handleSemesterChange(e, 'name')}/>
                            {buildEditTable()}
                            <Segment basic className='ultra-compact' textAlign='right'>
                                <Button
                                    content='Add Class'
                                    onClick={addClass}
                                    icon='plus'
                                    labelPosition='left'/>
                                <Button positive
                                    content='Done'
                                    icon='check'
                                    onClick={() => setOpen(false)}
                                    labelPosition='left'/>
                            </Segment>
                        </Modal.Content>
                    </Modal>
                </Grid.Column>
                {buildDisplayTable()}
            </Grid>
        </Segment>
    );

}; 

export {Semester};