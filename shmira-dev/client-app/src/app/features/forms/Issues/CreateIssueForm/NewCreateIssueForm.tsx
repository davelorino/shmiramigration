import React, { useState } from 'react'
import { Segment, Button, Label, Grid, Dropdown, TextArea } from 'semantic-ui-react'
import { Formik, Form, Field } from 'formik'
import { useStore } from '../../../../stores/store'
import { observer } from 'mobx-react-lite'
import { Sprint } from '../../../../models/sprint'
import * as Yup from 'yup'
import { Assignee } from '../../../../models/assignee'
import { StyledLabelAvatar, StyledAvatar, AvatarIsActiveLabelBorder} from '../../../filters/Styles'
import { InvisibleTextInput, StyledInput } from '../../../../shared/form/Styles'
import 'react-quill/dist/quill.snow.css'
import Icon from '../../../../images/Icon/index'
import IssuePriorityIcon from '../../../../images/IssuePriorityIcon'
import { StyledLabel } from '../../Styles'
import { HoverDiv } from '../../Styles'
import { v4 as uuid } from 'uuid'
import moment from 'moment-timezone'
import './Styles.css'

// Utils
import { getAssigneePhoto, getAssigneeName, submitComment } from './Utils/utils'

// Subcomponents 
import IssueTypeSelector from './Subcomponents/IssueTypeSelector'
import IssueTitle from './Subcomponents/IssueTitle'
import IssueDescription from './Subcomponents/IssueDescription'
import SelectedIssueType from './Subcomponents/SelectedIssueType'
import CommentInput from './Subcomponents/CommentInput'
import IssueReporter from './Subcomponents/IssueReporter'
import IssueStatus from './Subcomponents/IssueStatus'

// Constants
import { IssueTypeOptions } from './Constants/IssueTypeOptions'
import { IssueStatusOptions } from './Constants/IssueStatusOptions'
import { IssuePriorityOptions } from './Constants/IssuePriorityOptions'
import { IssueAssignees } from './Constants/IssueAssignees'

export default observer(function NewCreateIssueForm() {
    const { issueStore, modalStore, commonStore, userStore } = useStore()
    const { selectedIssue, allSprints, selectedProject, createIssue, loading } =
        issueStore

    const validationSchema = Yup.object({
        name: Yup.string().required(
            'The issue title is a required MyTextInput.'
        ),
    })

    var projectAssignees = selectedProject!.assignees

    var [selectedIssueName, setSelectedIssueName] = useState('Give this issue a new name')
    var [selectedIssueDescription, setSelectedIssueDescription] = useState('Give this issue a detailed description.')
    var [selectedIssuePriority, setSelectedIssuePriority] = useState('')
    var [selectedIssueStatus, setSelectedIssueStatus] = useState('')
    var [selectedIssueSprint, setSelectedIssueSprint] = useState('')
    var [selectedIssueSprintName, setSelectedIssueSprintName] = useState('')
    var [selectedIssueEstimatedDays, setSelectedIssueEstimatedDays] = useState(0)
    var [selectedIssueEstimatedHours, setSelectedIssueEstimatedHours] = useState(0)
    var [selectedIssueEstimatedMinutes, setSelectedIssueEstimatedMinutes] = useState(0)
    var [selectedIssueLoggedDays, setSelectedIssueLoggedDays] = useState(0)
    var [selectedIssueLoggedHours, setSelectedIssueLoggedHours] = useState(0)
    var [selectedIssueLoggedMinutes, setSelectedIssueLoggedMinutes] = useState(0)
    var [selectedIssueRemainingDays, setSelectedIssueRemainingDays] = useState(0)
    var [selectedIssueRemainingHours, setSelectedIssueRemainingHours] = useState(0)
    var [selectedIssueRemainingMinutes, setSelectedIssueRemainingMinutes] = useState(0)
    var [selectedAssignees, setSelectedAssignees] = useState<string[]>([])
    var [selectedReporter, setSelectedReporter] = useState('')
    var [selectedIssueType, setSelectedIssueType] = useState('Task')
    var [log_time_edit_state, setLogTimeEditState] = useState(false)
    var [description_edit_state, setDescriptionEditState] = useState(false)
    var [issue_title_edit_state, setIssueTitleEditState] = useState(false)
    var [comment_state, setCommentState] = useState('')
    const [isSprintHovered, setIsSprintHovered] = useState(false)
    const [isReporterHovered, setIsReporterHovered] = useState(false)
    const [isAssigneeHovered, setIsAssigneeHovered] = useState(false)
    const [isLogtimeHovered, setIsLogtimeHovered] = useState(false)
    const [isPriorityHovered, setIsPriorityHovered] = useState(false)
    const [isDescriptionHovered, setIsDescriptionHovered] = useState(false)
    const [isEstimatedDurationHovered, setIsEstimatedDurationHovered] = useState(false)
    const [isAddCommentHovered, setIsAddCommentHovered] = useState(false)
    const [isStatusHovered, setIsStatusHovered] = useState(false)

    const baseStyle = {
        transition: 'brightness 0.0s'
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

    const [issue, setIssue] = useState(initialState)

    function handleFormSubmit(values: any, allSprints: Sprint[]) {
        console.log('Creating issue...')
    }




    const reformatSprintOptions = (allSprints: Sprint[]) =>
        selectedProject!.sprints.map((sprint) => ({
            key: sprint.id,
            value: sprint.id,
            text: sprint.name,
            content: (
                <HoverDiv onClick={() => {setSelectedIssueSprint(sprint.id); setSelectedIssueSprintName(sprint.name); }}>
                    <StyledLabel>{sprint.name}</StyledLabel>
                </HoverDiv>
            ),
        }))



    function calculateIssueTimespan(input_days: any, input_hours: any, input_minutes: any) {
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

    function handleCreateIssue() {
        var sprint_id_check = selectedIssueSprint !== '' ? selectedIssueSprint : selectedProject!.sprints.find(s => s.name === 'Backlog')!.id;
        var issue_to_create: any = {
            id: uuid(),
            name: selectedIssueName,
            description: selectedIssueDescription,
            priority: selectedIssuePriority,
            status: selectedIssueStatus,
            reporter_id: selectedReporter,
            issue_type: selectedIssueType,
            project_id: selectedProject!.id,
            assignees: [],
            created_at: moment
                .tz(moment().subtract(moment.duration('11:00:00')), 'Australia/Sydney')
                .toISOString(true),
            updated_at: moment
                .tz(moment().subtract(moment.duration('11:00:00')), 'Australia/Sydney')
                .toISOString(true),
            description_text: '',
            time_logged: calculateIssueTimespan(
                selectedIssueLoggedDays,
                selectedIssueLoggedHours,
                selectedIssueLoggedMinutes
            ),
            time_remaining: calculateIssueTimespan(
                selectedIssueRemainingDays,
                selectedIssueRemainingHours,
                selectedIssueRemainingMinutes
            ),
            original_estimated_duration: calculateIssueTimespan(
                selectedIssueEstimatedDays,
                selectedIssueEstimatedHours,
                selectedIssueEstimatedMinutes
            ),
            sprint_id: sprint_id_check,
        }

        delete issue_to_create['assignees']

        var sprint_issue = {
            sprint_id: sprint_id_check,
            issue_id: issue_to_create.id,
            issue_name: issue_to_create.name,
        }

        var issue_assignees: any[] = []

        selectedAssignees.map((selectedAssignee) => {
            var issue_assignee = {
                IssueId: issue_to_create.id,
                AssigneeId: selectedAssignee,
            }
            issue_assignees.push(issue_assignee)
        })

        createIssue(
            issue_to_create,
            sprint_issue.sprint_id,
            sprint_issue,
            issue_assignees
        )
    }

    const addAssigneeToIssue = (assignee_id: string) => {
        var assignees_to_set: string[] = []

        if (selectedAssignees.length > 0) {
            selectedAssignees.map((assignee_id) => {
                assignees_to_set.push(assignee_id)
            })
        }

        if (!assignees_to_set.includes(assignee_id)) {
            assignees_to_set.push(assignee_id)
        }
        setSelectedAssignees(assignees_to_set)
    }

    const addReporterToIssue = (assignee_id: string) => {
        var reporter_to_set = ''

        if (selectedReporter !== assignee_id) {
            setSelectedReporter(assignee_id)
        }
    }

    const removeAssigneeFromIssue = (assignee_id: string) => {
        var assignees_to_set: string[] = []

        selectedAssignees.map((current_assignee_id) => {
            if (current_assignee_id !== assignee_id) {
                assignees_to_set.push(current_assignee_id)
            }
        })
        setSelectedAssignees(assignees_to_set)
    }

    const toggleDescriptionEditor = (description_edit_state: boolean) => {
        setDescriptionEditState(!description_edit_state)
    }

    const toggleIssueTitleEditor = (issue_title_edit_state: boolean) => {
        setIssueTitleEditState(!issue_title_edit_state)
    }

    const handleChangeReporter = (e: any) => {
        addReporterToIssue(e.target.value)
    }


    return (
        <div>
        
            <Formik validationSchema={validationSchema} enableReinitialize initialValues={issue} onSubmit={(values) => handleFormSubmit(values, allSprints)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
                        <Grid>
                            <Grid.Column width={10}>

        {/* ISSUE TYPE LABEL */}

                                <SelectedIssueType selectedIssueType={selectedIssueType}/>

        {/* ISSUE TYPE SELECTOR - Task, Story, Bug */}
                                <IssueTypeSelector issueTypeOptions={IssueTypeOptions({setSelectedIssueType, selectedIssueType})} />

        {/* ISSUE TITLE */}
                                <IssueTitle issue_title_edit_state={issue_title_edit_state} setSelectedIssueName={setSelectedIssueName} toggleIssueTitleEditor={toggleIssueTitleEditor} selectedIssueName={selectedIssueName} />
                                
        {/* ISSUE DESCRIPTION */}
                                <IssueDescription 
                                    toggleIsDescriptionHovered={toggleIsDescriptionHovered}
                                    isDescriptionHovered={isDescriptionHovered}
                                    description_edit_state={description_edit_state}
                                    setSelectedIssueDescription={setSelectedIssueDescription}
                                    toggleDescriptionEditor={toggleDescriptionEditor}
                                    selectedIssueDescription={selectedIssueDescription}
                                />
                                
        {/* COMMENT INPUT */}
                                <CommentInput 
                                    getAssigneePhoto={getAssigneePhoto}
                                    getAssigneeName={getAssigneeName}
                                    project_assignees={selectedProject!.assignees}
                                    account_id={commonStore!.account_id!}
                                    toggleIsAddCommentHovered={toggleIsAddCommentHovered}
                                    setCommentState={setCommentState}
                                    submitComment={submitComment}
                                    />

                           
                            </Grid.Column>
                            <Grid.Column width={6}>
                                <div style={{ paddingTop: '10px' }} />
                    
        {/* STATUS */}

                                <IssueStatus 
                                    isStatusHovered
                                    setIsStatusHovered
                                    selectedIssueStatus
                                    setSelectedIssueStatus 
                                    projectAssignees={selectedProject!.assignees}
                                />
                    
        {/* ASSIGNEES LABELS */}

                                <div style={{ marginBottom: '20px' }} />
                                <div style={{...divStyles,...baseStyle,...{position: 'relative',zIndex: '98',},...(isAssigneeHovered ? hoveredStyle : {})}}
                                    onMouseEnter={() => setIsAssigneeHovered(true)}
                                    onMouseLeave={() => setIsAssigneeHovered(false)}
                                >
                                    <h5 style={{paddingLeft: '20px', paddingTop: '10px'}}>Assignees</h5>
                                    <hr style={{border: '1px solid white', width: '100%'}}/>
                                    {selectedAssignees.map((user_id, index) => (
                                        <div style={{marginLeft: '20px', marginTop: '10px' }}>
                                        <StyledLabel style={{marginBottom: '6px', marginRight: '4px'}} onClick={() => {removeAssigneeFromIssue(user_id)}}>
                                            <AvatarIsActiveLabelBorder isActive={false} index={index}>
                                                <StyledLabelAvatar
                                                 src={selectedProject!.assignees.find((assignee) => assignee.id === user_id)!.photo?.url}
                                                 value={selectedProject!.assignees.find((assignee) => assignee.id === user_id)!.id} size="20" round="20px"
                                                    name={selectedProject!.assignees.find((assignee) => assignee.id === user_id)!
                                                        .first_name.concat(' ', selectedProject!.assignees.find((assignee) => assignee.id === user_id)!.second_name)}
                                                />
                                            </AvatarIsActiveLabelBorder>
                                            {selectedProject!.assignees
                                                .find((assignee) => assignee.id === user_id)!.first_name
                                                .concat(' ', selectedProject!.assignees
                                                .find((assignee) => assignee.id === user_id)!.second_name)}
                                            <Icon style={{ marginLeft: '10px' }} type="close"/>
                                        </StyledLabel>
                                        </div>
                                    ))}
                                
        {/* ASSIGNEES SELECTOR DROPDOWN */}

                                    <div style={{marginLeft: '20px'}}>
                                        <Dropdown multiple downward placeholder="+ Add more" value="" label="Assign" name="assignees"
                                            style={{position: 'relative', marginTop: '0px', paddingTop: '0px', zIndex: '99'}}
                                            options={IssueAssignees({projectAssignees, selectedAssignees, addAssigneeToIssue, selectedProject})}
                                        />
                                    </div>
                                </div>
                                
                                
        {/* REPORTER LABEL */}
                                <IssueReporter 
                                    isReporterHovered
                                    setIsReporterHovered
                                    selectedReporter 
                                    setSelectedReporter 
                                    project_assignees={selectedProject!.assignees}
                                    account_id={commonStore!.account_id!}
                                />
                                
                                <br />
        {/* ESTIMATED DURATION */}
                            <div style={{...divStyles, ...baseStyle, ...{position: 'relative', zIndex: '1'}, ...(isEstimatedDurationHovered ? hoveredStyle : {})}} onMouseEnter={() => setIsEstimatedDurationHovered(true)} onMouseLeave={() => setIsEstimatedDurationHovered(false)}>
                                <h5 style={{paddingTop: '10px', marginLeft: '20px', marginBottom: '5px', paddingBottom: '5px'}}>Estimated Duration</h5>
                                <hr style={{border: '1px solid white', width: '100%'}}/>
                                
                                <div style={{width: '90%', marginLeft: '20px'}}>
                                    <div className="inline fields">
                                
                                        <label style={{fontSize: '11px'}}>Days</label>
                                        <Field type="number" style={{width: '60px', height: '30px'}} name="days_estimate" onChange={(e: any) => setSelectedIssueEstimatedDays(e.target.value)}/>
                                
                                    <label style={{marginLeft: '7px', fontSize: '11px'}}>Hours</label>
                                    <Field
                                        type="number"
                                        style={{width: '60px', height: '30px'}}
                                        name="hours_estimate"
                                        onChange={(e: any) =>
                                            setSelectedIssueEstimatedHours(
                                                e.target.value
                                            )
                                        }
                                    />

                                    <label style={{marginLeft: '7px', fontSize: '11px'}}>Minutes</label>
                                    <Field
                                        type="number"
                                        style={{width: '60px', height: '30px'}}
                                        name="minutes_estimate"
                                        onChange={(e: any) =>
                                            setSelectedIssueEstimatedMinutes(
                                                e.target.value
                                            )
                                        }
                                    />
                                    </div>
                                </div>
                            </div>

                            <br />

        {/* LOG TIME */}

                                <div style={{...divStyles, ...baseStyle, ...(isSprintHovered ? hoveredStyle : {})}} onMouseEnter={() => setIsSprintHovered(true)} onMouseLeave={() => setIsSprintHovered(false)}>
                                    <InvisibleTextInput onClick={toggleLogTimeEditState} fontsize={12} style={{ cursor: 'pointer' }}>
                                        <div style={{paddingBottom: '10px'}}>
                                            <h5 style={{paddingTop: '10px', marginLeft: '20px', marginBottom: '5px', paddingBottom: '5px'}}>Log Time</h5>
                                        
                                            <hr style={{border: '1px solid white', width: '100%'}}/>
                                            <div style={{marginLeft: '10px', paddingRight: '10px' }}></div>
                                        </div>
                                    </InvisibleTextInput>
                            

                                {log_time_edit_state && (
                                    <div style={{width: '90%', marginLeft: '20px'}}>
                                    <h5>Time Spent</h5>
                                        <div className="inline fields">
                                            <label style={{marginLeft: '7px', fontSize: '11px'}}>Days</label>
                                            <Field
                                                type="number"
                                                style={{width: '60px', height: '30px'}}
                                                name="days_logged"
                                                onChange={(e: any) =>
                                                    setSelectedIssueLoggedDays(
                                                        e.target.value
                                                    )
                                                }
                                            />

                                            <label style={{marginLeft: '7px', fontSize: '11px'}}>Hours</label>
                                            <Field type="number" style={{width: '60px', height: '30px'}} name="hours_logged" onChange={(e: any) => setSelectedIssueLoggedHours(e.target.value)}/>

                                            <label style={{marginLeft: '7px', fontSize: '11px'}}>Minutes</label>
                                            <Field type="number" style={{width: '60px', height: '30px'}} name="minutes_logged" onChange={(e: any) => setSelectedIssueLoggedMinutes(e.target.value)}/>
                                        </div>

                                        <h5>Time Remaining</h5>
                                        <div className="inline fields">
                                            <label style={{marginLeft: '7px', fontSize: '11px'}}>Days</label>
                                            <Field type="number" name="days_remaining" onChange={(e: any) => setSelectedIssueRemainingDays(e.target.value)}/>

                                            <label style={{marginLeft: '7px', fontSize: '11px'}}>Hours</label>
                                            <Field type="number" style={{width: '60px', height: '30px'}} name="hours_remaining" onChange={(e: any) => setSelectedIssueRemainingHours(e.target.value)}/>

                                            <label style={{marginLeft: '7px', fontSize: '11px'}}>Minutes</label>
                                            <Field type="number" style={{width: '60px', height: '30px'}} name="minutes_remaining" onChange={(e: any) => setSelectedIssueRemainingMinutes(e.target.value)}/>
                                        </div>
                                        <Button size="mini" content="Save" color="blue" onClick={() => {/* TO DO: updateLoggedTime(); */ toggleLogTimeEditState()}}/>
                                        <Button size="mini" content="Cancel" onClick={() => toggleLogTimeEditState()}/>
                                    <br />
                                    <br />
                                </div>
                                )}
                            </div>

        {/* SPRINT LABEL */}

                                <div style={{ marginTop: '20px' }}>
                                    <div style={{...divStyles,...baseStyle,...{position: 'relative',zIndex: '50'}, ...(isLogtimeHovered ? hoveredStyle : {})}}
                                            onMouseEnter={() => setIsLogtimeHovered(true)}
                                            onMouseLeave={() => setIsLogtimeHovered(false)}
                                        >
                                        <h5 style={{ marginBottom: '5px', paddingBottom: '5px', marginLeft: '20px', marginTop: '10px', verticalAlign: 'top' }}>Sprint</h5>
                                        <hr style={{border: '1px solid white', width: '100%'}}/>
                                        <StyledLabel style={{ marginLeft: '20px', marginRight: '0px' }}>
                                            <p style={{verticalAlign: 'top', paddingBottom: '3px', paddingTop: '3px'}}>
                                                {selectedIssueSprintName}
                                            </p>
                                        </StyledLabel>

        {/* SPRINT DROPDDOWN SELECTOR */}

                                        <Dropdown downward multiple closeOnChange placeholder="" value="" label="Sprint" name="sprint" style={{marginLeft: '-15px', paddingLeft: '0px', position: 'relative', zIndex: '99'}}
                                            options={reformatSprintOptions(selectedProject!.sprints)}        
                                        />
                                    </div>

        {/* PRIORITY LABEL */}

                                    <div
                                        style={{...{marginTop: '20px'}, ...divStyles, ...baseStyle, ...(isPriorityHovered ? hoveredStyle : {})}}
                                        onMouseEnter={() => setIsPriorityHovered(true)}
                                        onMouseLeave={() => setIsPriorityHovered(false)}
                                    >
                                        <h5 style={{marginBottom: '5px', paddingBottom: '5px', marginLeft: '20px', marginTop: '10px', verticalAlign: 'top' }}>Priority</h5>
                                        <hr style={{border: '1px solid white'}}/>
                                        <div style={{marginBottom: '0pxx', paddingBottom: '5px', marginLeft: '20px', marginTop: '10px', verticalAlign: 'top' }}>
                                            <StyledLabel>
                                                <IssuePriorityIcon priority={selectedIssuePriority}/>
                                                <p style={{paddingBottom: '3px', paddingLeft: '5px', display: 'inline-block'}}>
                                                    {selectedIssuePriority}
                                                </p>
                                            </StyledLabel>

        {/* PRIORITY DROPDOWN SELECTOR */}

                                            <Dropdown style={{marginLeft: '-20px'}} downward multiple closeOnChange placeholder="" value="" label="Priority" name="priority" options={IssuePriorityOptions({setSelectedIssuePriority})}/>
                                        </div>
                                    </div>
                                </div>
                                <br />
                                <br />
                                <Button style={{ marginRight: '10px' }} color="blue" size="small" loading={loading} floated="right" content={'Create Issue'} onClick={() => handleCreateIssue()}></Button>
                            </Grid.Column>
                        </Grid>
                    </Form>
                )}
            </Formik>
        </div>
    )
})
