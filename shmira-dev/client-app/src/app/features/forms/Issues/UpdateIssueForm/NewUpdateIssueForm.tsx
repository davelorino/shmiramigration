import React, { useState } from 'react'
import {
    Button,
    Label,
    Grid,
    Dropdown,
    Input,
    TextArea,
} from 'semantic-ui-react'
import { Formik, Form, ErrorMessage, Field } from 'formik'
import { useStore } from '../../../../stores/store'
import { observer } from 'mobx-react-lite'
import { Sprint } from '../../../../models/sprint'
import { Issue } from '../../../../models/issue'
import * as Yup from 'yup'
import { Assignee } from '../../../../models/assignee'
import { StyledLabelAvatar, StyledAvatar, AvatarIsActiveLabelBorder } from '../../../filters/Styles'
import { InvisibleTextInput, StyledInput } from '../../../../shared/form/Styles'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import parse from 'html-react-parser'
import Icon from '../../../../images/Icon/index'
import IssuePriorityIcon from '../../../../images/IssuePriorityIcon'
import IssueTypeIcon from '../../../../images/IssueTypeIcon'
import { StyledLabel } from '../../Styles'
import { HoverDiv } from '../../Styles'
import UpdateIssueFormTrackingWidget from '../Subcomponents/UpdateIssueFormTimeTrackingWidget'
import moment from 'moment'
import 'quill-mention/dist/quill.mention.css'
import 'quill-mention'
import { v4 as uuid } from 'uuid'
import './Styles.css'

// NEW IMPORTS 
import './Styles.css'

// Utils
import { 
    getAssigneePhoto, 
    getAssigneeName, 
    submitComment,
    addAssigneeToIssue,
    addReporterToIssue,
    removeAssigneeFromIssue,
    removeReporterFromIssue,
    changeIssueType,
    updateIssueTitle,
    updateIssueDescription,
    updateIssueStatus
} from '../Utils/utils'

// Subcomponents 
import IssueTypeSelector from '../Subcomponents/IssueTypeSelector'
import IssueTitle from '../Subcomponents/IssueTitle'
import IssueDescription from '../Subcomponents/IssueDescription'
import SelectedIssueType from '../Subcomponents/SelectedIssueType'
import CommentInput from '../Subcomponents/CommentInput'
import IssueReporter from '../Subcomponents/IssueReporter'
import IssueAssignee from '../Subcomponents/IssueAssignee'
import IssueStatus from '../Subcomponents/IssueStatus'
import EstimatedDurationInput from '../Subcomponents/EstimatedDuration'
import LogTimeInput from '../Subcomponents/LogTime'
import SprintSelector from '../Subcomponents/SprintSelector'
import IssuePriority from '../Subcomponents/IssuePriority'

// Constants
import { IssueStatusOptions } from '../Constants/IssueStatusOptions'
import { IssueTypeOptions } from '../Constants/IssueTypeOptions'
import { IssueTypeOptions2 } from '../Constants/IssueTypeOptions'
import { IssueAssignees } from '../Constants/IssueAssignees'
import { IssueReporters } from '../Constants/IssueReporters'
import { SprintOptions } from '../Constants/SprintOptions'

export default observer(function NewUpdateIssueForm() {
    const { issueStore, commonStore } = useStore()
    const { selectedIssue, selectedProject, updateIssue, updateIssueAndSprint } = issueStore


    const initialState = selectedIssue ?? {
        id: '',
        name: '',
        description: '',
        description_text: '',
        status: '',
        priority: '',
        days: '',
        hours: '',
        minutes: '',
        original_estimated_duration: '',
        sprint: '',
        assignees: [],
    }

    const validationSchema = Yup.object({
        name: Yup.string().required(
            'The issue title is a required MyTextInput.'
        ),
    })

    var projectAssignees = selectedProject!.assignees

    var [quillDescriptionEditText, setQuillDescriptionEditText] = useState('')
    var [selectedAssignees, setSelectedAssignees] = useState()
    var [selectedReporter, setSelectedReporter] = useState()
    const [issue, setIssue] = useState(initialState)
    const [issueTitle, setIssueTitleState] = useState('')
    var [description_edit_state, setDescriptionEditState] = useState(false)
    var [issue_title_edit_state, setIssueTitleEditState] = useState(false)
    var [log_time_edit_state, setLogTimeEditState] = useState(false)
    var [selectedIssueLoggedDays, setSelectedIssueLoggedDays] = useState(0)
    var [selectedIssueLoggedHours, setSelectedIssueLoggedHours] = useState(0)
    var [selectedIssueLoggedMinutes, setSelectedIssueLoggedMinutes] = useState(0)
    var [selectedIssueRemainingDays, setSelectedIssueRemainingDays] = useState(0)
    var [selectedIssueRemainingHours, setSelectedIssueRemainingHours] = useState(0)
    var [selectedIssueRemainingMinutes, setSelectedIssueRemainingMinutes] = useState(0)
    var [comment_edit_state, setCommentEditState] = useState(false)
    var [comment_state, setCommentState] = useState('')
    const [commentHoveredIndex, setCommentHoveredIndex] = useState(99) // To track which div is hovered
    const [isSprintHovered, setIsSprintHovered] = useState(false)
    const [isReporterHovered, setIsReporterHovered] = useState(false)
    const [isAssigneeHovered, setIsAssigneeHovered] = useState(false)
    const [isCommenterNameHoveredIndex, setIsCommenterNameHoveredIndex] = useState(99)
    const [isLogtimeHovered, setIsLogtimeHovered] = useState(false)
    const [isPriorityHovered, setIsPriorityHovered] = useState(false)
    const [isDescriptionHovered, setIsDescriptionHovered] = useState(false)
    const [isAddCommentHovered, setIsAddCommentHovered] = useState(false)
    const [isStatusHovered, setIsStatusHovered] = useState(false)
    const baseStyle = {
        transition: 'brightness 0.0s', // smooth transition for the brightness change
    }
    const hoveredStyle = {
        filter: 'brightness(165%)',
        backgroundFilter: 'brightness(165%)',
    }

    const divStyles = {
        width: '100%',
        paddingTop: '5px',
        paddingBottom: '5px',
        filter: 'brightness(130%)'
    }
    
    function toggleIsDescriptionHovered() {
        setIsDescriptionHovered(!isDescriptionHovered)
    }

    function toggleIsAddCommentHovered() {
        setIsAddCommentHovered(!isAddCommentHovered)
    }

    function toggleLogTimeEditState() {
        setLogTimeEditState(!log_time_edit_state)
    }

    function calculateIssueTimespan(
        input_days: any,
        input_hours: any,
        input_minutes: any
    ) {
        var days, hours, minutes
        input_days === 0 ? (days = 0) : (days = input_days)
        input_hours === 0 ? (hours = 0) : (hours = input_hours)
        input_minutes === 0 ? (minutes = 0) : (minutes = input_minutes)

        if (minutes >= 60) {
            var minutes_to_hours = Math.floor(minutes / 60)
            minutes = minutes % 60
            hours = parseInt(hours) + minutes_to_hours
        }

        if (hours >= 24) {
            var hours_to_days = Math.floor(hours / 24)
            hours = hours % 24
            days = parseInt(days) + hours_to_days
        }

        let estimated_duration = days + '.' + hours + ':' + minutes + ':' + '00'
        return estimated_duration
    }

    const reformatSprintOptions = (allSprints: Sprint[]) =>
        selectedProject!.sprints.map((sprint) => ({
            key: sprint.id,
            value: sprint.id,
            text: sprint.name,
            content: (
                <HoverDiv style={{paddingTop: '0px', paddingBottom: '0px', marginTop: '0px', marginBottom: '0px'}} onClick={() => handleSprintChange(sprint.id)}>
                    <StyledLabel>{sprint.name}</StyledLabel>
                </HoverDiv>
            ),
        }))

    function handleSprintChange(sprint_id: string) {
        var sprint_issue_to_remove = {
            sprint_id: selectedIssue!.sprint_id,
            issue_id: selectedIssue!.id,
            issue_name: selectedIssue!.name,
        }
        var sprint_issue_to_add = {
            sprint_id: sprint_id,
            issue_id: selectedIssue!.id,
            issue_name: selectedIssue!.name,
        }
        console.log(sprint_issue_to_add);

        selectedIssue!.sprint_id = sprint_id

        selectedIssue!.updated_at = moment
            .tz(moment(), 'Australia/Sydney')
            .toISOString(true)

        var sprint = selectedProject!.sprints.filter(s => s.id === sprint_id)

        updateIssueAndSprint(
            sprint_issue_to_remove.sprint_id,
            sprint_issue_to_add.sprint_id,
            sprint_issue_to_add.issue_name,
            sprint_issue_to_add.issue_id,
            selectedIssue!,
            //sprint
        )
    }


    const priorityOptions = [
        {
            key: '0',
            value: 'Low',
            text: 'Low',
            content: (
                <StyledLabel
                    size='small'
                    style={{ minWidth: '90px' }}
                    onClick={() => {
                        changeIssuePriority('Low')
                    }}
                >
                    <IssuePriorityIcon priority="Low" />
                    <p
                        style={{
                            paddingBottom: '3px',
                            paddingLeft: '5px',
                            display: 'inline-block',
                        }}
                    >
                        Low
                    </p>
                </StyledLabel>
            ),
        },
        {
            key: '1',
            value: 'Medium',
            text: 'Medium',
            content: (
                <StyledLabel
                    size='small'
                    style={{ minWidth: '90px' }}
                    onClick={() => {
                        changeIssuePriority('Medium')
                    }}
                >
                    <IssuePriorityIcon priority="Medium" />
                    <p
                        style={{
                            paddingBottom: '3px',
                            paddingLeft: '5px',
                            display: 'inline-block',
                        }}
                    >
                        Medium
                    </p>
                </StyledLabel>
            ),
        },
        {
            key: '2',
            value: 'High',
            text: 'High',
            content: (
                <StyledLabel
                    size='small'
                    style={{ minWidth: '90px' }}
                    onClick={() => {
                        changeIssuePriority('High')
                    }}
                >
                    <IssuePriorityIcon priority="High" />
                    <p
                        style={{
                            paddingBottom: '3px',
                            paddingLeft: '5px',
                            display: 'inline-block',
                        }}
                    >
                        High
                    </p>
                </StyledLabel>
            ),
        },
    ]

    const changeIssuePriority = (priority: string) => {
        selectedIssue!.priority = priority

        selectedIssue!.updated_at = moment
            .tz(moment(), 'Australia/Sydney')
            .toISOString(true)

        var updated_issue: any = {
            ...selectedIssue!,
        }

        delete updated_issue['assignees']

        issueStore.updateIssue(updated_issue)
    }

    const extractTimespanObject = (timespan: string) => {
        var days = timespan.substring(0, timespan.indexOf('.'))

        if (days === null || days === '') {
            days = '0'
        }

        var hours = timespan.substring(
            timespan.indexOf('.') + 1,
            timespan.indexOf(':')
        )

        if (hours === null) {
            hours = '0'
        }

        var timespan_minus_days_and_hours = timespan.substring(
            timespan.indexOf(':') + 1,
            timespan.length
        )

        var minutes = timespan_minus_days_and_hours.substring(
            0,
            timespan_minus_days_and_hours.indexOf(':')
        )

        if (minutes === null) {
            minutes = '0'
        }

        var time_span: any = {
            days: days,
            hours: hours,
            minutes: minutes,
        }

        return time_span
    }

    const resetTimeState = () => {
        setSelectedIssueLoggedMinutes(0)
        setSelectedIssueLoggedHours(0)
        setSelectedIssueLoggedDays(0)
        setSelectedIssueRemainingMinutes(0)
        setSelectedIssueRemainingHours(0)
        setSelectedIssueRemainingDays(0)
    }

    const addTimeSpans = (first_time_span: any, second_time_span: any) => {
        var first_timespan_obj = extractTimespanObject(first_time_span)
        var second_timespan_obj = extractTimespanObject(second_time_span)

        var total_days =
            parseInt(first_timespan_obj.days) +
            parseInt(second_timespan_obj.days)

        var total_hours =
            parseInt(first_timespan_obj.hours) +
            parseInt(second_timespan_obj.hours)

        var total_minutes =
            parseInt(first_timespan_obj.minutes) +
            parseInt(second_timespan_obj.minutes)

        if (total_minutes >= 60) {
            var minutes_to_hours = Math.floor(total_minutes / 60)
            total_minutes = total_minutes % 60
            total_hours = total_hours + minutes_to_hours
        }

        if (total_hours >= 24) {
            var hours_to_days = Math.floor(total_hours / 24)
            total_hours = total_hours % 24
            total_days = total_days + hours_to_days
        }

        let finalTimespan =
            total_days + '.' + total_hours + ':' + total_minutes + ':' + '00'

        return finalTimespan
    }

    const updateLoggedTime = () => {
        var current_issue: Partial<Issue> = {
            ...selectedIssue!,
        }

        delete current_issue['assignees']

        var time_logged = calculateIssueTimespan(
            selectedIssueLoggedDays,
            selectedIssueLoggedHours,
            selectedIssueLoggedMinutes
        )

        current_issue.time_logged = addTimeSpans(
            time_logged,
            current_issue.time_logged
        )

        var time_remaining = calculateIssueTimespan(
            selectedIssueRemainingDays,
            selectedIssueRemainingHours,
            selectedIssueRemainingMinutes
        )

        console.log('Time remaining =')
        current_issue.time_remaining = time_remaining

        var updatedIssue: any = current_issue

        selectedIssue!.time_logged = current_issue.time_logged
        selectedIssue!.time_remaining = current_issue.time_remaining
        selectedIssue!.updated_at = moment
            .tz(moment(), 'Australia/Sydney')
            .toISOString(true)

        resetTimeState()

        updateIssue(updatedIssue)

        toggleLogTimeEditState()
    }

    const toggleDescriptionEditor = (description_edit_state: boolean) => {
        setDescriptionEditState(!description_edit_state)
    }

    const toggleIssueTitleEditor = (issue_title_edit_state: boolean) => {
        setIssueTitleEditState(!issue_title_edit_state)
    }

    const handleChangeReporter = (e: any) => {
        setSelectedReporter(e.target.value)
    }
    
    return (
        <div>
            <Formik enableReinitialize initialValues={issue} onSubmit={(values) => console.log(values)}>
                {({ handleSubmit }) => (
                    <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
                        <Grid>
                            <Grid.Column width={10}>
                                
            {/* ISSUE TYPE */}
                                <SelectedIssueType selectedIssueType={selectedIssue!.issue_type}/>
                                <IssueTypeSelector 
                                    issueTypeOptions={IssueTypeOptions2({mode: "update", selectedIssue, changeIssueType, updateIssue })} 
                                />

            {/* ISSUE TITLE */}                
                                <IssueTitle
                                    mode='update' 
                                    issue_title_edit_state={issue_title_edit_state}
                                    toggleIssueTitleEditor={toggleIssueTitleEditor}
                                    issueTitle={issueTitle}
                                    setIssueTitleState={setIssueTitleState}
                                    selectedIssue={selectedIssue!}
                                    updateIssueTitle={updateIssueTitle}
                                />
                                
                                <IssueDescription 
                                    mode="update"
                                    toggleIsDescriptionHovered={toggleIsDescriptionHovered}
                                    isDescriptionHovered={isDescriptionHovered}
                                    description_edit_state={description_edit_state}
                                    selectedIssueDescription={quillDescriptionEditText}
                                    setSelectedIssueDescription={setQuillDescriptionEditText}
                                    toggleDescriptionEditor={toggleDescriptionEditor}
                                    selectedIssue={selectedIssue!}
                                    updateIssueDescription={updateIssueDescription}
                                />
                               

                                {/* COMMENTS */}
                                <CommentInput 
                                    mode='update'
                                    getAssigneePhoto={getAssigneePhoto}
                                    getAssigneeName={getAssigneeName}
                                    selectedIssue={selectedIssue!}
                                    selectedProject={selectedProject!}
                                    project_assignees={selectedProject!.assignees}
                                    account_id={commonStore.account_id!}
                                    assignee_id={commonStore.assignee_id!}
                                    toggleIsAddCommentHovered={toggleIsAddCommentHovered}
                                    comment_state={comment_state}
                                    setCommentState={setCommentState}
                                    submitComment={submitComment}
                                    addCommentToIssue={issueStore.addCommentToIssue}
                                    commentHoveredIndex={commentHoveredIndex}
                                    setCommentHoveredIndex={setCommentHoveredIndex}
                                    isCommenterNameHoveredIndex={isCommenterNameHoveredIndex}
                                    setIsCommenterNameHoveredIndex={setIsCommenterNameHoveredIndex}
                                    />
                                
                            </Grid.Column>

                            <Grid.Column width={6}>

                                <IssueStatus 
                                    mode='update'
                                    isStatusHovered={isStatusHovered}
                                    setIsStatusHovered={setIsStatusHovered}
                                    selectedIssue={selectedIssue!}
                                    updateIssueStatus={updateIssueStatus}
                                    />
                                
                                <IssueAssignee 
                                    mode="update"
                                    isAssigneeHovered={isAssigneeHovered}
                                    setIsAssigneeHovered={setIsAssigneeHovered}
                                    selectedAssignees={selectedAssignees!}
                                    setSelectedAssignees={setSelectedAssignees}
                                    project_assignees={selectedProject!.assignees}
                                    account_id={commonStore.account_id!}
                                    removeAssigneeFromIssue={removeAssigneeFromIssue}
                                    addAssigneeToIssue={addAssigneeToIssue}
                                    IssueAssignees={IssueAssignees}
                                    selectedProject={selectedProject!}  
                                    selectedIssue={selectedIssue!}
                                    />
                                
                               
                                {/* REPORTER */}
                                <IssueReporter 
                                    mode='update'
                                    isReporterHovered={isReporterHovered}
                                    setIsReporterHovered={setIsReporterHovered}
                                    selectedIssue={selectedIssue!}
                                    selectedProject={selectedProject!}
                                    project_assignees={selectedProject!.assignees}
                                    account_id={commonStore.account_id!}
                                    addReporterToIssue={addReporterToIssue}
                                    removeReporterFromIssue={removeReporterFromIssue}
                                    IssueReporters={IssueReporters}
                                    selectedReporter={selectedReporter}
                                    setSelectedReporter={setSelectedReporter}
                                    />

                                <br/>
                                {/* LOG TIME */}
                                <div style={{...{zIndex: '1'}, ...divStyles, ...baseStyle, ...(isSprintHovered ? hoveredStyle : {})}} onMouseEnter={() => setIsSprintHovered(true)} onMouseLeave={() => setIsSprintHovered(false)}>
                                    <InvisibleTextInput onClick={toggleLogTimeEditState} fontsize={12} style={{ cursor: 'pointer' }}>
                                        <div style={{paddingBottom: '0px'}}>
                                        <div style={{marginTop: '5px', marginBottom: '5px', display: 'flex', alignItems: 'center', height: '100%'}}>
                                        <h4 style={{ paddingLeft: '20px'}}>Log Time</h4>
                                        </div>
                                        
                                            <hr style={{border: '1px solid white', width: '100%'}}/>
                                            <div style={{marginLeft: '10px', paddingRight: '10px' }}><UpdateIssueFormTrackingWidget /></div>
                                        </div>
                                    </InvisibleTextInput>

                                    {/* LOG TIME */}
                                    {log_time_edit_state && (
                                        <div style={{width: '90%', marginLeft: '20px'}}>
                                            <h5>Time Spent</h5>
                                            <div className="inline fields">
                                                <label style={{fontSize: '11px'}}>Days</label>
                                                <Field style={{width: '60px', height: '30px'}} type="number" name="days_logged " onChange={(e: any) => setSelectedIssueLoggedDays(e.target.value)}/>
                                            <label style={{marginLeft: '7px', fontSize: '11px'}}>Hours</label>
                                                <Field
                                                    type="number"
                                                    style={{width: '60px', height: '30px'}}
                                                    name="hours_logged"
                                                    onChange={(e: any) =>
                                                        setSelectedIssueLoggedHours(
                                                            e.target.value
                                                        )
                                                    }
                                                />

                                                <label style={{marginLeft: '7px', fontSize: '11px'}}>Minutes</label>
                                                <Field
                                                    type="number"
                                                    style={{width: '60px', height: '30px'}}
                                                    name="minutes_logged"
                                                    onChange={(e: any) =>
                                                        setSelectedIssueLoggedMinutes(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>

                                            <h5>Time Remaining</h5>
                                            <div className="inline fields">
                                                <label style={{fontSize: '11px'}}>Days</label>
                                                <Field
                                                    type="number"
                                                    style={{width: '60px', height: '30px'}}
                                                    name="days_remaining"
                                                    onChange={(e: any) =>
                                                        setSelectedIssueRemainingDays(
                                                            e.target.value
                                                        )
                                                    }
                                                />

                                                <label style={{marginLeft: '7px', fontSize: '11px'}}>Hours</label>
                                                <Field
                                                    type="number"
                                                    style={{width: '60px', height: '30px'}}
                                                    name="hours_remaining"
                                                    onChange={(e: any) =>
                                                        setSelectedIssueRemainingHours(
                                                            e.target.value
                                                        )
                                                    }
                                                />

                                                <label style={{marginLeft: '7px', fontSize: '11px'}}>Minutes</label>
                                                <Field
                                                    type="number"
                                                    style={{width: '60px', height: '30px'}}
                                                    name="minutes_remaining"
                                                    onChange={(e: any) =>
                                                        setSelectedIssueRemainingMinutes(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>

                                            <Button
                                                size="mini"
                                                content="Save"
                                                color="blue"
                                                onClick={() => {
                                                    updateLoggedTime()
                                                    toggleLogTimeEditState
                                                }}
                                            />

                                            <Button
                                                size="mini"
                                                content="Cancel"
                                                onClick={() =>
                                                    toggleLogTimeEditState()
                                                }
                                            />

                                            <br />
                                            <br />
                                        </div>
                                    )}
                                </div>

                    {/* SPRINT */}
                                <div style={{ width: '100%', marginTop: '20px' }}>
                                    <div style={{...divStyles,...baseStyle,...{position: 'relative',zIndex: '50'}, ...(isLogtimeHovered ? hoveredStyle : {})}}
                                        onMouseEnter={() => setIsLogtimeHovered(true)}
                                        onMouseLeave={() => setIsLogtimeHovered(false)}
                                    >
                                        <div style={{marginTop: '5px', marginBottom: '5px', display: 'flex', alignItems: 'center', height: '100%'}}>
                                            <h4 style={{ paddingLeft: '20px'}}>Sprint</h4>
                                        </div>
                                        <hr style={{border: '1px solid white', width: '100%'}}/>
                                        <StyledLabel size='small' style={{ marginLeft: '20px', marginRight: '0px' }}>
                                            <p style={{verticalAlign: 'top', paddingBottom: '3px', paddingTop: '3px'}}>
                                                {selectedProject!.sprints.find((sprint) => sprint.id === selectedIssue!.sprint_id)!.name}
                                            </p>
                                        </StyledLabel>
                                        <Dropdown downward multiple closeOnChange placeholder="" value="" label="Sprint" name="sprint" style={{marginLeft: '-15px', paddingLeft: '0px', position: 'relative', zIndex: '99'}}
                                            options={reformatSprintOptions(selectedProject!.sprints)}
                                            
                                        />
                                    </div>
                                    <div style={{ marginBottom: '20px' }} />

                    {/* PRIORITY */}
                                    <div
                                        style={{
                                            ...divStyles,
                                            ...baseStyle,
                                            ...(isPriorityHovered
                                                ? hoveredStyle
                                                : {}),
                                        }}
                                        onMouseEnter={() =>
                                            setIsPriorityHovered(true)
                                        }
                                        onMouseLeave={() =>
                                            setIsPriorityHovered(false)
                                        }
                                    >
                                        <div style={{marginTop: '5px', marginBottom: '5px', display: 'flex', alignItems: 'center', height: '100%'}}>
                                            <h4 style={{ paddingLeft: '20px'}}>Priority</h4>
                                        </div>
                                        <hr
                                            style={{
                                                border: '1px solid white',
                                            }}
                                        />
                                        <div style={{marginBottom: '0pxx', paddingBottom: '5px', marginLeft: '20px', marginTop: '10px', verticalAlign: 'top' }}>
                                            <StyledLabel size='small'>
                                                <IssuePriorityIcon
                                                    priority={
                                                        selectedIssue!.priority
                                                    }
                                                />
                                                <p
                                                    style={{
                                                        paddingBottom: '3px',
                                                        paddingLeft: '5px',
                                                        display: 'inline-block',
                                                    }}
                                                >
                                                    {selectedIssue!.priority}
                                                </p>
                                            </StyledLabel>
                                            <Dropdown
                                                downward
                                                multiple
                                                className="custom-dropdown"
                                                style={{marginLeft: '-22px'}}
                                                closeOnChange
                                                placeholder=""
                                                value=""
                                                label="Priority"
                                                name="priority"
                                                options={priorityOptions}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div style={{textAlign: 'right'}}>
                                    <p
                                        style={{
                                            marginTop: '10px',
                                            marginBottom: '0px',
                                            fontSize: '13px',
                                            paddingBottom: '0px',
                                            color: 'grey',
                                        }}
                                    >
                                        {'Created '.concat(
                                            moment(
                                                selectedIssue!.created_at
                                            ).fromNow()
                                        )}
                                    </p>
                                    <p
                                        style={{
                                            paddingTop: '10px',
                                            marginTop: '0px',
                                            fontSize: '13px',
                                            color: 'grey',
                                        }}
                                    >
                                        {'Last updated '.concat(
                                            moment(
                                                selectedIssue!.updated_at
                                            )?.fromNow()
                                        )}
                                    </p>
                                </div>
                            </Grid.Column>
                        </Grid>
                    </Form>
                )}
            </Formik>
        </div>
    )
})
