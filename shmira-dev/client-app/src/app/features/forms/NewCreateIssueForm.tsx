import React, { useState } from 'react'
import {
    Segment,
    Button,
    Label,
    Grid,
    Dropdown,
    TextArea,
} from 'semantic-ui-react'
import { Formik, Form, Field } from 'formik'
import { useStore } from '../../stores/store'
import { observer } from 'mobx-react-lite'
import { Sprint } from '../../models/sprint'
import * as Yup from 'yup'
import { Assignee } from '../../models/assignee'
import {
    StyledLabelAvatar,
    StyledAvatar,
    AvatarIsActiveLabelBorder,
} from '../filters/Styles'
import { InvisibleTextInput, StyledInput } from '../../shared/form/Styles'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import parse from 'html-react-parser'
import Icon from '../../images/Icon/index'
import IssuePriorityIcon from '../../images/IssuePriorityIcon'
import IssueTypeIcon from '../../images/IssueTypeIcon'
import { StyledLabel } from './Styles'
import { HoverDiv } from './Styles'
import { v4 as uuid } from 'uuid'
import moment from 'moment-timezone'
import UpdateIssueFormTrackingWidget from './UpdateIssueFormTimeTrackingWidget'

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

    var [selectedIssueName, setSelectedIssueName] = useState(
        'Give this issue a new name'
    )
    var [selectedIssueDescription, setSelectedIssueDescription] = useState(
        'Give this issue a detailed description.'
    )
    var [selectedIssuePriority, setSelectedIssuePriority] = useState('')
    var [selectedIssueStatus, setSelectedIssueStatus] = useState('')
    var [selectedIssueSprint, setSelectedIssueSprint] = useState('')
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
    const [isEstimatedDurationHovered, setIsEstimatedDurationHovered] = useState(false)
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
        border: '1px solid white',
        width: '100%',
        paddingTop: '5px',
        paddingBottom: '5px',
        filter: 'brightness(130%)'
    }

    const underlineStyle = {
        textDecoration: 'underline'
    }
    
    function toggleIsDescriptionHovered() {
        setIsDescriptionHovered(!isDescriptionHovered)
    }

    function toggleIsEstimatedDurationHovered() {
        setIsEstimatedDurationHovered(!isEstimatedDurationHovered)
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
        console.log('Wing wongs')
    }

    const formatProjectAssignees = (
        projectAssignees: Assignee[],
        selected_assignees: any
    ) => {
        var unassigned_assignees: string[] = []
        var all_assignee_ids: string[] = []
        var assigned_assignees: string[] = []

        projectAssignees.map((assignee) => {
            all_assignee_ids.push(assignee.id)
        })

        selected_assignees.map((assignee: any) => {
            assigned_assignees.push(assignee)
        })

        all_assignee_ids.map((assignee) => {
            if (!assigned_assignees.includes(assignee))
                unassigned_assignees.push(assignee)
        })

        var assignees_to_display: Assignee[] = []

        projectAssignees.map((pa) => {
            if (unassigned_assignees.includes(pa.id)) {
                assignees_to_display.push(pa)
            }
        })

        return assignees_to_display!.map((project_assignee, index) => ({
            key: project_assignee.id,
            value: project_assignee.id,
            text: project_assignee.first_name.concat(
                ' ',
                project_assignee.second_name
            ),
            content: (
                <HoverDiv
                    onClick={() => addAssigneeToIssue(project_assignee.id)}
                >
                    <AvatarIsActiveLabelBorder isActive={false} index={index}>
                        <StyledLabelAvatar
                            value={project_assignee.id}
                            size="20"
                            name={project_assignee.first_name.concat(
                                ' ',
                                project_assignee.second_name
                            )}
                            round="20px"
                        />
                    </AvatarIsActiveLabelBorder>
                    {project_assignee.first_name.concat(
                        ' ',
                        project_assignee.second_name
                    )}
                </HoverDiv>
            ),
        }))
    }

    function submitComment() {
        var comment_to_send = {
            Id: uuid(),
            commenter_assignee_id: commonStore.assignee_id!,
            comment: comment_state,
            comment_posted: moment
                .tz(
                    moment().subtract(moment.duration('11:00:00')),
                    'Australia/Sydney'
                )
                .toISOString(true),
        }

        var comment_to_add = {
            ...comment_to_send,
            comment_posted: moment
                .tz(moment(), 'Australia/Sydney')
                .toISOString(true),
        }
        selectedIssue!.comments!.push(comment_to_add)
        issueStore.addCommentToIssue(selectedIssue!.id, comment_to_send)
    }

    const formatProjectReporters = (
        projectReporters: Assignee[],
        selectedReporter: string
    ) => {
        var unassigned_reporters: string[] = []
        var all_assignee_ids: string[] = []
        var assigned_reporter: string

        projectReporters.map((reporter) => {
            all_assignee_ids.push(reporter.id)
        })

        assigned_reporter = selectedReporter

        all_assignee_ids.map((assignee_id) => {
            if (assignee_id !== assigned_reporter) {
                unassigned_reporters.push(assignee_id)
            }
        })

        var assignees_to_display: Assignee[] = []

        projectReporters.map((pr) => {
            if (unassigned_reporters.includes(pr.id)) {
                assignees_to_display.push(pr)
            }
        })

        return assignees_to_display!.map((project_assignee, index) => ({
            key: project_assignee.id,
            value: project_assignee.id,
            text: project_assignee.first_name.concat(
                ' ',
                project_assignee.second_name
            ),
            content: (
                <HoverDiv
                    onClick={() => addReporterToIssue(project_assignee.id)}
                >
                    <AvatarIsActiveLabelBorder isActive={false} index={index}>
                        <StyledLabelAvatar
                            value={project_assignee.id}
                            size="20"
                            name={project_assignee.first_name.concat(
                                ' ',
                                project_assignee.second_name
                            )}
                            round="20px"
                        />
                    </AvatarIsActiveLabelBorder>
                    {project_assignee.first_name.concat(
                        ' ',
                        project_assignee.second_name
                    )}
                </HoverDiv>
            ),
        }))
    }

    const reformatSprintOptions = (allSprints: Sprint[]) =>
        selectedProject!.sprints.map((sprint) => ({
            key: sprint.id,
            value: sprint.id,
            text: sprint.name,
            content: (
                <HoverDiv onClick={() => setSelectedIssueSprint(sprint.id)}>
                    <StyledLabel>{sprint.name}</StyledLabel>
                </HoverDiv>
            ),
        }))

    const issueTypeOptions = [
        {
            key: '0',
            value: 'Story',
            text: 'Story',
            content: (
                <HoverDiv
                    style={{
                        display: 'inline-block',
                    }}
                    onClick={() => setSelectedIssueType('Story')}
                >
                    <IssueTypeIcon
                        color="#65BA43 !important"
                        type="story"
                        size={14}
                    />
                    <div
                        style={{
                            paddingLeft: '7px',
                            alignContent: 'center',
                            display: 'inline-block',
                        }}
                    >
                        Story
                    </div>
                </HoverDiv>
            ),
        },
        {
            key: '1',
            value: 'Bug',
            text: 'Bug',
            content: (
                <HoverDiv
                    style={{ display: 'inline-block' }}
                    onClick={() => setSelectedIssueType('Bug')}
                >
                    <IssueTypeIcon color="#E44D42" type="bug" size={14} />
                    <div
                        style={{
                            paddingLeft: '7px',
                            alignContent: 'center',
                            display: 'inline-block',
                        }}
                    >
                        Bug
                    </div>
                </HoverDiv>
            ),
        },
        {
            key: '2',
            value: 'Task',
            text: 'Task',
            content: (
                <HoverDiv
                    style={{ display: 'inline-block' }}
                    onClick={() => setSelectedIssueType('Task')}
                >
                    <IssueTypeIcon
                        color="#4FADE6 !important"
                        type="task"
                        size={14}
                    />
                    <div
                        style={{
                            paddingLeft: '7px',
                            alignContent: 'center',
                            display: 'inline-block',
                        }}
                    >
                        Task
                    </div>
                </HoverDiv>
            ),
        },
    ]

    const statusOptions = [
        {
            key: '0',
            value: 'To Do',
            text: 'To Do',
            content: (
                <HoverDiv onClick={() => setSelectedIssueStatus('To Do')}>
                    <Label color="blue">To Do</Label>
                </HoverDiv>
            ),
        },
        {
            key: '1',
            value: 'In Progress',
            text: 'In Progress',
            content: (
                <HoverDiv onClick={() => setSelectedIssueStatus('In Progress')}>
                    <Label color="green">In Progress</Label>
                </HoverDiv>
            ),
        },
        {
            key: '2',
            value: 'Review',
            text: 'Review',
            content: (
                <HoverDiv onClick={() => setSelectedIssueStatus('Review')}>
                    <Label color="purple">In Review</Label>
                </HoverDiv>
            ),
        },
        {
            key: '3',
            value: 'Done',
            text: 'Done',
            content: (
                <HoverDiv onClick={() => setSelectedIssueStatus('Done')}>
                    <Label>Done</Label>
                </HoverDiv>
            ),
        },
    ]

    const priorityOptions = [
        {
            key: '0',
            value: 'Low',
            text: 'Low',
            content: (
                <StyledLabel
                    onClick={() => {
                        setSelectedIssuePriority('Low')
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
                    onClick={() => {
                        setSelectedIssuePriority('Medium')
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
                    onClick={() => {
                        setSelectedIssuePriority('High')
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

    function handleCreateIssue() {
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
                .tz(
                    moment().subtract(moment.duration('11:00:00')),
                    'Australia/Sydney'
                )
                .toISOString(true),
            updated_at: moment
                .tz(
                    moment().subtract(moment.duration('11:00:00')),
                    'Australia/Sydney'
                )
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
            sprint_id: selectedIssueSprint,
        }

        delete issue_to_create['assignees']

        var sprint_issue = {
            sprint_id: selectedIssueSprint,
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

        console.log('Issue to create: ')
        console.log(issue_to_create)

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

    function renderSelectedIssueType() {
        if (selectedIssueType == 'Story') {
            return (
                <StyledLabel style={{ display: 'inline-block' }}>
                    <IssueTypeIcon color="#65BA43" type="story" size={14} />
                    <div
                        style={{
                            paddingLeft: '7px',
                            alignContent: 'center',
                            display: 'inline-block',
                        }}
                    >
                        Story
                    </div>
                </StyledLabel>
            )
        }

        if (selectedIssueType == 'Bug') {
            return (
                <StyledLabel style={{ display: 'inline-block' }}>
                    <IssueTypeIcon color="#E44D42" type="bug" size={14} />
                    <div
                        style={{
                            paddingLeft: '7px',
                            alignContent: 'center',
                            display: 'inline-block',
                        }}
                    >
                        Bug
                    </div>
                </StyledLabel>
            )
        }

        if (selectedIssueType == 'Task') {
            return (
                <StyledLabel style={{ display: 'inline-block' }}>
                    <IssueTypeIcon color="#4FADE6" type="task" size={14} />
                    <div
                        style={{
                            paddingLeft: '7px',
                            alignContent: 'center',
                            display: 'inline-block',
                        }}
                    >
                        Task
                    </div>
                </StyledLabel>
            )
        }
    }

    function parseTimeSpan(timespan: string) {
        var days = timespan.substring(0, timespan.indexOf('.'))

        if (days === null) {
            days = '0'
        }
        var days_string = ''
        if (days === '001') {
            days_string = 'day'
        } else {
            days_string = 'days'
        }

        var hours = timespan.substring(
            timespan.indexOf('.') + 1,
            timespan.indexOf(':')
        )

        if (hours === null) {
            hours = '0'
        }
        var hours_string = ''
        if (hours === '01') {
            hours_string = 'hour'
        } else hours_string = 'hours'

        var timespan_minus_days_and_hours = timespan.substring(
            timespan.indexOf(':') + 1,
            timespan.length
        )

        var minutes = timespan_minus_days_and_hours.substring(0, timespan_minus_days_and_hours.indexOf(':'))

        if (minutes === null) {
            minutes = '0'
        }
        var minutes_string = ''
        if (minutes === '01') {
            minutes_string = 'minute'
        } else {
            minutes_string = 'minutes'
        }
        var time_span = ''

        if (days === '0' && hours === '0') {
            time_span = minutes.concat(' ', minutes_string)
        } else if (days === '0') {
            time_span = hours.concat(
                ' ',
                hours_string,
                ' ',
                minutes,
                ' ',
                minutes_string
            )
        } else {
            time_span = days.concat(
                ' ',
                days_string,
                ' ',
                parseInt(hours).toString(),
                ' ',
                hours_string,
                ' ',
                parseInt(minutes).toString(),
                ' ',
                minutes_string
            )
        }

        return time_span
    }

    return (
        <div>
            <Formik
                validationSchema={validationSchema}
                enableReinitialize
                initialValues={issue}
                onSubmit={(values) => handleFormSubmit(values, allSprints)}
            >
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form
                        className="ui form"
                        onSubmit={handleSubmit}
                        autoComplete="off"
                    >
                        <Grid>
                            <Grid.Column width={10}>
                                {renderSelectedIssueType()}
                                <div style={{ display: 'inline-block' }}>
                                    <Dropdown
                                        downward
                                        multiple
                                        closeOnChange
                                        placeholder=""
                                        value=""
                                        label="Status"
                                        name="status"
                                        style={{
                                            color: '#FFFFFF',
                                            marginTop: '15px',
                                            marginBottom: '5px'
                                        }}
                                        options={issueTypeOptions}
                                    />
                                </div>

                                {!issue_title_edit_state && (
                                    <InvisibleTextInput
                                        fontsize={20}
                                        onClick={() =>
                                            toggleIssueTitleEditor(
                                                issue_title_edit_state
                                            )
                                        }
                                    >
                                        <h3
                                            style={{
                                                paddingTop: '15px',
                                                paddingLeft: '5px',
                                            }}
                                        >
                                            {selectedIssueName}
                                        </h3>
                                    </InvisibleTextInput>
                                )}

                                {issue_title_edit_state && (
                                    <StyledInput
                                        defaultValue={selectedIssueName}
                                        autoFocus
                                        onChange={(e: any) =>
                                            setSelectedIssueName(e.target.value)
                                        }
                                        onBlur={() => {
                                            toggleIssueTitleEditor(
                                                issue_title_edit_state
                                            )
                                        }}
                                    />
                                )}

                                <h5 style={{marginLeft: '10px',marginBottom: '0px',paddingBottom: '0px'}}>Description</h5>
                                <div onMouseEnter={() => toggleIsDescriptionHovered()} onMouseLeave={() => toggleIsDescriptionHovered()} style={{...{filter: 'brightness(130%)', border: '1px solid white',marginTop: '10px',paddingBottom: '15px'}, ...( isDescriptionHovered ? hoveredStyle : {})}}>
                                {!description_edit_state && (
                                    <InvisibleTextInput
                                        style={{
                                            marginTop: '4px',
                                            paddingTop: '0px',
                                            paddingBottom: '0px',
                                            marginBottom: '0px',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            maxHeight: '700px',
                                            minHeight: '200px'
                                        }}
                                        fontsize={14}
                                        onClick={() =>
                                            toggleDescriptionEditor(
                                                description_edit_state
                                            )
                                        }
                                    >
                                        <div
                                            style={{
                                                paddingTop: '8px',
                                                marginBottom: '0px',
                                                marginLeft: '12px',
                                                marginRight: '12px',
                                            }}
                                        >
                                            {parse(selectedIssueDescription)}
                                        </div>
                                    </InvisibleTextInput>
                                )}
                                {description_edit_state && (
                                    <>
                                        <ReactQuill
                                            style={{
                                                minHeight: '200px',
                                                maxHeight: '700px',
                                                marginBottom: '0px',
                                                paddingBottom: '0px'
                                            }}
                                            theme="snow"
                                            defaultValue={
                                                selectedIssueDescription
                                            }
                                            onChange={
                                                setSelectedIssueDescription
                                            }
                                        />

                                        <Button
                                            size="mini"
                                            content="Save"
                                            color="blue"
                                            style={{ marginLeft: '15px' }}
                                            onClick={() => {
                                                toggleDescriptionEditor(
                                                    description_edit_state
                                                )
                                            }}
                                        />
                                    </>
                                )}
                                </div>

                        {/* COMMENTS */}
                                <h5 style={{marginLeft: '10px', marginBottom: '8px'}}>Comments</h5>
                                <div style={{ marginTop: '20px' }}></div>
                                <div style={{ display: 'inline-block' }}>
                                    <StyledAvatar
                                        style={{ paddingTop: '12px' }}
                                        size="30"
                                        round="16px"
                                        src={
                                            selectedProject!.assignees.find(
                                                (assignee) =>
                                                    assignee.id_app_user ===
                                                    commonStore.account_id
                                            )?.photo?.url
                                        }
                                        name={selectedProject!.assignees
                                            .find(
                                                (assignee) =>
                                                    assignee.id_app_user ===
                                                    commonStore.account_id
                                            )!
                                            .first_name.concat(
                                                ' ',
                                                selectedProject!.assignees.find(
                                                    (assignee) =>
                                                        assignee.id_app_user ===
                                                        commonStore.account_id
                                                )!.second_name
                                            )}
                                    />
                                </div>
                                <div style={{display: 'inline-block', paddingLeft: '15px', width: '95%'}}>
                                    <TextArea 
                                        onMouseEnter={() => toggleIsAddCommentHovered()} onMouseLeave={() => toggleIsAddCommentHovered()}
                                        style={{
                                            ...{ border: '1px solid white' },
                                            ...{filter: 'brightness(130%)'}, 
                                            ...(isAddCommentHovered ? hoveredStyle : {})
                                        }}
                                    onChange={(e) => setCommentState(e.target.value)} placeholder="Add a comment..."/>
                                </div>
                                <div style={{marginTop: '10px', marginRight: '0px', float: 'right', display: 'inline-block'}}><Button size="tiny" content="Comment" color="blue" onClick={() => submitComment()}/></div>
                            </Grid.Column>
                            <Grid.Column width={6}>
                                <div style={{ paddingTop: '10px' }} />
                    {/* STATUS */}
                                <div style={{...divStyles,...baseStyle,...{position: 'relative',zIndex: '99', paddingBottom: '8px'},...(isStatusHovered ? hoveredStyle : {})}}
                                    onMouseEnter={() => setIsStatusHovered(true)}
                                    onMouseLeave={() => setIsStatusHovered(false)}
                                >
                                    <h5 style={{ marginBottom: '5px', paddingBottom: '5px', paddingLeft: '20px',paddingTop: '10px',}}>STATUS</h5>
                                    <hr style={{border: '1px solid white',width: '100%'}}/>
                                    <div style={{marginLeft: '20px'}}>
                                    <Label style={{marginRight: '0px'}}>{selectedIssueStatus}</Label>
                                    <Dropdown
                                        downward
                                        multiple
                                        closeOnChange
                                        placeholder=""
                                        value=""
                                        label="Status"
                                        name="status"
                                        options={statusOptions}
                                        style={{position: 'relative',zIndex: '99', marginLeft: '0px', paddingRight: '10px'}}
                                    />
                                    </div>
                                </div>
                    
                    {/* ASSIGNEES */}
                                <div style={{ marginBottom: '20px' }} />
                                <div style={{...divStyles,...baseStyle,...{position: 'relative',zIndex: '98',},...(isAssigneeHovered ? hoveredStyle : {})}}
                                    onMouseEnter={() => setIsAssigneeHovered(true)}
                                    onMouseLeave={() => setIsAssigneeHovered(false)}
                                >
                                    <h5 style={{paddingLeft: '20px', paddingTop: '10px'}}>ASSIGNEES</h5>
                                    <hr style={{border: '1px solid white', width: '100%'}}/>
                                    {selectedAssignees.map((user_id, index) => (
                                        <div style={{marginLeft: '20px', marginTop: '10px' }}>
                                        <StyledLabel style={{marginBottom: '6px', marginRight: '4px'}} onClick={() => {removeAssigneeFromIssue(user_id)}}>
                                            <AvatarIsActiveLabelBorder isActive={false} index={index}>
                                                <StyledLabelAvatar value={selectedProject!.assignees.find((assignee) => assignee.id === user_id)!.id} size="20" round="20px"
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
                                
                                    {/* Assignee Dropdown */}
                                    <div style={{marginLeft: '20px'}}>
                                        <Dropdown multiple downward placeholder="+ Add more" value="" label="Assign" name="assignees"
                                            style={{position: 'relative', marginTop: '0px', paddingTop: '0px', zIndex: '99'}}
                                            options={formatProjectAssignees(projectAssignees, selectedAssignees)}
                                        />
                                    </div>
                                </div>
                                <div style={{ marginTop: '20px' }} />
                                
                    {/* REPORTER */}
                                
                                <div style={{...divStyles, ...baseStyle, ...{position: 'relative', zIndex: '90'}, ...(isReporterHovered ? hoveredStyle : {})}}
                                    onMouseEnter={() => setIsReporterHovered(true)}
                                    onMouseLeave={() => setIsReporterHovered(false)}
                                >
                                    <h5 style={{paddingLeft: '20px', paddingTop: '10px'}}>REPORTER</h5>
                                    <hr style={{border: '1px solid white', width: '100%'}}/>

                                {selectedReporter !== null && selectedReporter.length !== 0 && (
                                    <div style={{ marginLeft: '20px' }} >
                                        <StyledLabel style={{marginBottom: '2px', marginRight: '4px'}}>
                                            <AvatarIsActiveLabelBorder isActive={false} index={1}>
                                                <StyledLabelAvatar value={selectedReporter} size="20" round="20px"
                                                    name={selectedProject!.assignees
                                                        .find((assignee) => assignee.id === selectedReporter)!.first_name
                                                        .concat(' ', selectedProject!.assignees
                                                        .find((assignee) => assignee.id === selectedReporter)!.second_name)}
                                                />
                                            </AvatarIsActiveLabelBorder>

                                            {selectedProject!.assignees
                                                .find((assignee) => assignee.id === selectedReporter)!.first_name
                                                .concat(' ', selectedProject!.assignees
                                                .find((assignee) => assignee.id === selectedReporter)!.second_name)
                                            }

                                            <Icon style={{ marginLeft: '10px' }} type="close"/>
                                        </StyledLabel>
                                    </div>
                                    )}
                                <div style={{marginLeft: '20px'}}>
                                <Dropdown
                                    downward
                                    multiple
                                    closeOnChange
                                    placeholder="Select reporter"
                                    value=""
                                    label="Assign"
                                    name="reporter"
                                    options={formatProjectReporters(
                                        selectedProject!.assignees,
                                        selectedReporter
                                    )}
                                />
                                </div>
                            </div>
                            <br />
            {/* ESTIMATED DURATION */}
                            <div style={{...divStyles, ...baseStyle, ...{position: 'relative', zIndex: '90'}, ...(isEstimatedDurationHovered ? hoveredStyle : {})}} onMouseEnter={() => setIsEstimatedDurationHovered(true)} onMouseLeave={() => setIsEstimatedDurationHovered(false)}>
                                <h5 style={{paddingTop: '10px', marginLeft: '20px', marginBottom: '5px', paddingBottom: '5px'}}>ESTIMATED DURATION</h5>
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
                                            <h5 style={{paddingTop: '10px', marginLeft: '20px', marginBottom: '5px', paddingBottom: '5px'}}>LOG TIME</h5>
                                        
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
                                            <label style={{marginLeft: '7px', fontSize: '11px'}}>Days</label>
                                            <Field
                                                type="number"
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
                                                /* TO DO: updateLoggedTime(); */ toggleLogTimeEditState()
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
                                <div style={{ marginTop: '20px' }}>
                                    <div
                                        style={{
                                            display: 'inline-block',
                                            width: '50%',
                                        }}
                                    >
                                        <h5>SPRINT</h5>
                                        <StyledLabel>
                                            <p
                                                style={{
                                                    paddingBottom: '3px',
                                                    paddingTop: '3px',
                                                }}
                                            >
                                                {
                                                    selectedProject!.sprints.find(
                                                        (sprint) =>
                                                            sprint.id ===
                                                            selectedIssueSprint
                                                    )?.name
                                                }
                                            </p>
                                        </StyledLabel>
                                        <Dropdown
                                            downward
                                            multiple
                                            closeOnChange
                                            placeholder=""
                                            value=""
                                            label="Sprint"
                                            name="sprint"
                                            options={reformatSprintOptions(
                                                allSprints
                                            )}
                                        />
                                    </div>
                                    <div
                                        style={{
                                            display: 'inline-block',
                                            width: '50%',
                                        }}
                                    >
                                        <h5>PRIORITY</h5>
                                        <StyledLabel>
                                            <IssuePriorityIcon
                                                priority={selectedIssuePriority}
                                            />
                                            <p
                                                style={{
                                                    paddingBottom: '3px',
                                                    paddingLeft: '5px',
                                                    display: 'inline-block',
                                                }}
                                            >
                                                {selectedIssuePriority}
                                            </p>
                                        </StyledLabel>

                                        <Dropdown
                                            downward
                                            multiple
                                            closeOnChange
                                            placeholder=""
                                            value=""
                                            label="Priority"
                                            name="priority"
                                            options={priorityOptions}
                                        />
                                    </div>
                                </div>
                                <br />
                                <br />
                                <Button
                                    style={{ marginRight: '10px' }}
                                    color="blue"
                                    size="small"
                                    loading={loading}
                                    floated="right"
                                    content={'Create Issue'}
                                    onClick={() => handleCreateIssue()}
                                ></Button>
                            </Grid.Column>
                        </Grid>
                    </Form>
                )}
            </Formik>
        </div>
    )
})
