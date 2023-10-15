import React, { useState } from 'react'
import { Grid, Dropdown } from 'semantic-ui-react'
import { Formik, Form, ErrorMessage, Field } from 'formik'
import { useStore } from '../../../../stores/store'
import { observer } from 'mobx-react-lite'
import { Sprint } from '../../../../models/sprint'
import * as Yup from 'yup'
import 'react-quill/dist/quill.snow.css'
import IssuePriorityIcon from '../../../../images/IssuePriorityIcon'
import { StyledLabel } from '../../Styles'
import { HoverDiv } from '../../Styles'
import moment from 'moment'
import 'quill-mention/dist/quill.mention.css'
import 'quill-mention'
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
    updateIssueStatus,
    updateIssuePriority
} from '../Utils/utils'

import {
    updateLoggedTime
} from '../Utils/timeUtils'

// Subcomponents 
import IssueTypeSelector from '../Subcomponents/IssueTypeSelector'
import IssueTitle from '../Subcomponents/IssueTitle'
import IssueDescription from '../Subcomponents/IssueDescription'
import SelectedIssueType from '../Subcomponents/SelectedIssueType'
import CommentInput from '../Subcomponents/CommentInput'
import IssueReporter from '../Subcomponents/IssueReporter'
import IssueAssignee from '../Subcomponents/IssueAssignee'
import LogTime from '../Subcomponents/LogTime'
import IssueStatus from '../Subcomponents/IssueStatus'
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
            selectedIssue!
        )
    }

    const toggleDescriptionEditor = (description_edit_state: boolean) => {
        setDescriptionEditState(!description_edit_state)
    }

    const toggleIssueTitleEditor = (issue_title_edit_state: boolean) => {
        setIssueTitleEditState(!issue_title_edit_state)
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
                            
                                <LogTime 
                                    mode='update'
                                    selectedIssue={selectedIssue!}
                                    isLogTimeHovered={isLogtimeHovered}
                                    setIsLogTimeHovered={setIsLogtimeHovered}
                                    log_time_edit_state={log_time_edit_state}
                                    setLogTimeEditState={setLogTimeEditState}
                                    toggleLogTimeEditState={toggleLogTimeEditState}
                                    selectedIssueLoggedDays={selectedIssueLoggedDays}
                                    setSelectedIssueLoggedDays={setSelectedIssueLoggedDays}
                                    selectedIssueLoggedHours={selectedIssueLoggedHours}
                                    setSelectedIssueLoggedHours={setSelectedIssueLoggedHours}
                                    selectedIssueLoggedMinutes={selectedIssueLoggedMinutes}
                                    setSelectedIssueLoggedMinutes={setSelectedIssueLoggedMinutes}
                                    selectedIssueRemainingDays={selectedIssueRemainingDays}
                                    setSelectedIssueRemainingDays={setSelectedIssueRemainingDays}
                                    selectedIssueRemainingHours={selectedIssueRemainingHours}
                                    setSelectedIssueRemainingHours={setSelectedIssueRemainingHours}
                                    selectedIssueRemainingMinutes={selectedIssueRemainingMinutes}
                                    setSelectedIssueRemainingMinutes={setSelectedIssueRemainingMinutes}
                                    updateLoggedTime={updateLoggedTime}
                                />

 

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

                                    <div style={{ marginTop: '20px' }}>
                                    
                            {/* PRIORITY LABEL */}
                                        <IssuePriority 
                                            mode='update'
                                            isPriorityHovered={isPriorityHovered}
                                            setIsPriorityHovered={setIsPriorityHovered}
                                            selectedIssue={selectedIssue!}
                                            updateIssuePriority={updateIssuePriority}
                                            />
                            
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
