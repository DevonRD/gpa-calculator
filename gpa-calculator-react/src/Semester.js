import React, { useState } from 'react'; 
import {
    Button,
    Modal,
    Popup,
    Segment,
    Header,
    Grid,
    Table,
    Input,
} from 'semantic-ui-react'

const Semester = (props) => { 
    const [open, setOpen] = useState(false);

    const handleClassChange = (e, type, classIndex) => {
        let value = (type === 'delete' || type === 'included') ?
            e : e.target.value;
        props.editClass(props.index, classIndex, type, value);
    }

    const handleSemesterChange = (e, type) => {
        let value = (type === 'delete' || type === 'included') ?
            e : e.target.value;
        props.editSemester(props.index, type, value);
    }

    const addClass = () => {
        props.addClass(props.index);
    }

    const buildEditTable = () => {
        if (props.collegeMode) {
            return <Table singleLine>
                <Table.Header>
                    <Table.HeaderCell>Course Name</Table.HeaderCell>
                    <Table.HeaderCell>Credits</Table.HeaderCell>
                    <Table.HeaderCell>Grade</Table.HeaderCell>
                    <Table.HeaderCell>Count in GPA</Table.HeaderCell>
                </Table.Header>
                <Table.Body>
                    {props.data.courses.map((course, i) => (
                        <Table.Row key={course.id}>
                            <Table.Cell>
                                <Input fluid
                                    defaultValue={course.name}
                                    placeholder='Course name'
                                    onChange={(e) => handleClassChange(e, 'name', i)}/>
                            </Table.Cell>
                            <Table.Cell>
                                <Input fluid
                                    defaultValue={course.credits}
                                    placeholder='Number of credits'
                                    onChange={(e) => handleClassChange(e, 'credits', i)}/>
                            </Table.Cell>
                            <Table.Cell>
                                <Input fluid
                                    defaultValue={course.grade}
                                    placeholder='Course grade'
                                    onChange={(e) => handleClassChange(e, 'grade', i)}/>
                            </Table.Cell>
                            <Table.Cell collapsing>
                                <Popup
                                    content={course.included ? 'Included in GPA' : 'Not included in GPA'}
                                    trigger={
                                        <Button positive={course.included} negative={!course.included}
                                            icon={course.included ? 'check' : 'close'}
                                            onClick={() => handleClassChange(!course.included, 'included', i)}/>}/>
                                <Popup
                                    content='Delete Course'
                                    trigger={
                                        <Button negative
                                            icon='trash alternate outline'
                                            onClick={() => handleClassChange('', 'delete', i)}/>}/>
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
                    <Table.HeaderCell>Count in GPA</Table.HeaderCell>
                </Table.Header>
                <Table.Body>
                    {props.data.courses.map((course, i) => (
                        <Table.Row key={course.id}>
                            <Table.Cell>
                                <Input fluid
                                    defaultValue={course.name}
                                    placeholder='Class name'
                                    onChange={(e) => handleClassChange(e, 'name', i)}/>
                            </Table.Cell>
                            <Table.Cell>
                                <Input fluid
                                    defaultValue={course.grade}
                                    placeholder='Class grade'
                                    onChange={(e) => handleClassChange(e, 'grade', i)}/>
                            </Table.Cell>
                            <Table.Cell collapsing>
                                <Popup
                                    content={course.included ? 'Included in GPA' : 'Not included in GPA'}
                                    trigger={
                                        <Button positive={course.included} negative={!course.included}
                                            icon={course.included ? 'check' : 'close'}
                                            onClick={() => handleClassChange(!course.included, 'included', i)}/>}/>
                                <Popup
                                    content='Delete Course'
                                    trigger={
                                        <Button negative
                                            icon='trash alternate outline'
                                            onClick={() => handleClassChange('', 'delete', i)}/>}/>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>;
        }
    }

    const buildDisplayTable = () => {
        if (props.collegeMode) {
            // const headerRow = ['Course', 'Credits', 'Grade'];
            // let renderBodyRow = ({name, credits, grade, included, id}, i) => ({
            //     key: `display-${id}`,
            //     warning: !included || !props.data.included,
            //     cells: [
            //         name, credits, grade
            //     ]
            // });
            // let footerRow = ['Total', `${props.data.credits}`, `${props.data.gpa}`];
            // let tableData = [];
            // for (const course of props.data.courses) {
            //     tableData.push(course);
            // }
            // console.log(tableData);
            // return <Table basic='very' headerRow={headerRow} renderBodyRow={renderBodyRow} tableData={tableData} footerRow={footerRow}/>
            return <Table basic='very'>
                <Table.Header>
                    <Table.HeaderCell>Course</Table.HeaderCell>
                    <Table.HeaderCell>Credits</Table.HeaderCell>
                    <Table.HeaderCell>Grade</Table.HeaderCell>
                </Table.Header>
                <Table.Body>
                    {props.data.courses.map((course, i) => (
                        <Table.Row key={course.id} warning={!course.included || !props.data.included} error={course.grade == 0 || course.grade.toUpperCase() == 'F'}>
                            <Table.Cell>
                                {course.name}
                            </Table.Cell>
                            <Table.Cell>
                                {course.credits}
                            </Table.Cell>
                            <Table.Cell>
                                {course.grade.toUpperCase()}
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
                <Table.Footer>
                    <Table.Row warning={!props.data.included}>
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
                    {props.data.courses.map((course, i) => (
                        <Table.Row key={course.id} warning={!course.included || !props.data.included}>
                            <Table.Cell>
                                {course.name}
                            </Table.Cell>
                            <Table.Cell>
                                {course.grade.toUpperCase()}
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
                <Table.Footer>
                    <Table.Row warning={!props.data.included}>
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
                                        content={props.data.included ? 'Semester included in GPA' : 'Semester not included in GPA'}
                                        trigger={
                                            <Button positive={props.data.included} negative={!props.data.included}
                                                icon={props.data.included ? 'check' : 'close'}
                                                onClick={() => handleSemesterChange(!props.data.included, 'included')}/>}/>
                                    <Popup
                                        content='Delete Semester'
                                        trigger={
                                            <Button negative
                                                icon='trash alternate outline'
                                                onClick={() => handleSemesterChange('', 'delete')}/>}/>
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