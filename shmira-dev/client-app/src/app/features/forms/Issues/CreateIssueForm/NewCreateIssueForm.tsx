import { useState } from 'react'
import { Button, Grid } from 'semantic-ui-react'
import { Formik, Form } from 'formik'
import { useStore } from '../../../../stores/store'
import { observer } from 'mobx-react-lite'
import { v4 as uuid } from 'uuid'
import moment from 'moment-timezone'
import './Styles.css'

// Utils
import { 
    getAssigneePhoto, 
    getAssigneeName, 
    submitComment,
    addAssigneeToIssue,
    addReporterToIssue,
    removeAssigneeFromIssue,
    handleCreateIssue
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
import { IssueTypeOptions2 } from '../Constants/IssueTypeOptions'
import { IssueAssignees } from '../Constants/IssueAssignees'
import { IssueReporters } from '../Constants/IssueReporters'
import { SprintOptions } from '../Constants/SprintOptions'

export default observer(function NewCreateIssueForm() {
    const { issueStore, commonStore } = useStore()
    const { selectedIssue, selectedProject, createIssue, loading } = issueStore;

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
    const [isLogTimeHovered, setIsLogTimeHovered] = useState(false)
    const [isPriorityHovered, setIsPriorityHovered] = useState(false)
    const [isDescriptionHovered, setIsDescriptionHovered] = useState(false)
    const [isEstimatedDurationHovered, setIsEstimatedDurationHovered] = useState(false)
    const [isAddCommentHovered, setIsAddCommentHovered] = useState(false)
    const [isStatusHovered, setIsStatusHovered] = useState(false)

    
    function toggleIsDescriptionHovered() {
        setIsDescriptionHovered(!isDescriptionHovered)
    }

    function toggleIsAddCommentHovered() {
        setIsAddCommentHovered(!isAddCommentHovered)
    }

    function toggleLogTimeEditState() {
        setLogTimeEditState(!log_time_edit_state)
    }

    const toggleDescriptionEditor = (description_edit_state: boolean) => {
        setDescriptionEditState(!description_edit_state)
    }

    const toggleIssueTitleEditor = (issue_title_edit_state: boolean) => {
        setIssueTitleEditState(!issue_title_edit_state)
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

    /*
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
    */

    return (
        <div>
        
            <Formik enableReinitialize initialValues={issue} onSubmit={(values) => console.log("Creating issue...")}>
                {({ handleSubmit }) => (
                    <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
                        <Grid>
                            <Grid.Column width={10}>

        {/* ISSUE TYPE LABEL */}

                                <SelectedIssueType selectedIssueType={selectedIssueType}/>

        {/* ISSUE TYPE SELECTOR - Task, Story, Bug */}
                                <IssueTypeSelector 
                                    issueTypeOptions={IssueTypeOptions2({mode: "create", setSelectedIssueType, selectedIssueType})} 
                                />

        {/* ISSUE TITLE */}
                                <IssueTitle
                                    mode='create' 
                                    issue_title_edit_state={issue_title_edit_state} 
                                    setSelectedIssueName={setSelectedIssueName} 
                                    toggleIssueTitleEditor={toggleIssueTitleEditor} 
                                    selectedIssueName={selectedIssueName} 
                                />
                                
        {/* ISSUE DESCRIPTION */}
                                <IssueDescription 
                                    mode="create"
                                    toggleIsDescriptionHovered={toggleIsDescriptionHovered}
                                    isDescriptionHovered={isDescriptionHovered}
                                    description_edit_state={description_edit_state}
                                    setSelectedIssueDescription={setSelectedIssueDescription}
                                    toggleDescriptionEditor={toggleDescriptionEditor}
                                    selectedIssueDescription={selectedIssueDescription}
                                />
                                
        {/* COMMENT INPUT */}
                                <CommentInput 
                                    mode='create'
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
                                    mode='create'
                                    isStatusHovered={isStatusHovered}
                                    setIsStatusHovered={setIsStatusHovered}
                                    selectedIssueStatus={selectedIssueStatus}
                                    setSelectedIssueStatus={setSelectedIssueStatus}
                                    projectAssignees={selectedProject!.assignees}
                                />
                    
        {/* ASSIGNEES LABELS */}
                                <IssueAssignee 
                                    mode="create"
                                    isAssigneeHovered={isAssigneeHovered}
                                    setIsAssigneeHovered={setIsAssigneeHovered}
                                    selectedAssignees={selectedAssignees}
                                    setSelectedAssignees={setSelectedAssignees}
                                    project_assignees={selectedProject!.assignees}
                                    account_id={commonStore.account_id!}
                                    removeAssigneeFromIssue={removeAssigneeFromIssue}
                                    addAssigneeToIssue={addAssigneeToIssue}
                                    IssueAssignees={IssueAssignees}
                                    selectedProject={selectedProject!}                                    
                                />

                                
        {/* REPORTER LABEL */}

                                <IssueReporter 
                                    mode='create'
                                    isReporterHovered={isReporterHovered}
                                    setIsReporterHovered={setIsReporterHovered}
                                    selectedReporter={selectedReporter}
                                    setSelectedReporter={setSelectedReporter}
                                    project_assignees={selectedProject!.assignees}
                                    account_id={commonStore!.account_id!}
                                    addReporterToIssue={addReporterToIssue}
                                    IssueReporters={IssueReporters}
                                />
                        
                                
                                <br />

        {/* ESTIMATED DURATION */}

                                <EstimatedDurationInput 
                                    isEstimatedDurationHovered={isEstimatedDurationHovered}
                                    setIsEstimatedDurationHovered={setIsEstimatedDurationHovered}
                                    selectedIssueEstimatedDays={selectedIssueEstimatedDays}
                                    setSelectedIssueEstimatedDays={setSelectedIssueEstimatedDays}
                                    selectedIssueEstimatedHours={selectedIssueEstimatedHours}
                                    setSelectedIssueEstimatedHours={setSelectedIssueEstimatedHours}
                                    selectedIssueEstimatedMinutes={selectedIssueEstimatedMinutes}
                                    setSelectedIssueEstimatedMinutes={setSelectedIssueEstimatedMinutes}
                                />
                           
                                <br />

        {/* LOG TIME */}

                                <LogTimeInput 
                                    mode='create'
                                    isLogTimeHovered={isLogTimeHovered}
                                    setIsLogTimeHovered={setIsLogTimeHovered}
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
                                />



        {/* SPRINT LABEL */}
                                <SprintSelector
                                    mode='create' 
                                    isSprintHovered={isSprintHovered}
                                    setIsSprintHovered={setIsSprintHovered}
                                    selectedIssueSprint={selectedIssueSprint}
                                    setSelectedIssueSprint={setSelectedIssueSprint}
                                    selectedIssueSprintName={selectedIssueSprintName}
                                    setSelectedIssueSprintName={setSelectedIssueSprintName}
                                    selectedProject={selectedProject!}
                                    SprintOptions={SprintOptions}
                                />
                                

                            <div style={{ marginTop: '20px' }}>
                                    
        {/* PRIORITY LABEL */}
                                <IssuePriority 
                                    mode='create'
                                    isPriorityHovered={isPriorityHovered}
                                    setIsPriorityHovered={setIsPriorityHovered}
                                    selectedIssuePriority={selectedIssuePriority}
                                    setSelectedIssuePriority={setSelectedIssuePriority}
                                    />
                        
                            </div>
                            <br />
                            <br />
                            
        {/* CREATE ISSUE BUTTON */}
                            <Button 
                                style={{ marginRight: '10px' }} 
                                color="blue" 
                                size="small" 
                                loading={loading} 
                                floated="right" 
                                content={'Create Issue'} 
                                onClick={() => handleCreateIssue(
                                    selectedIssueSprint,
                                    selectedIssueName,
                                    selectedIssueDescription,
                                    selectedIssuePriority, 
                                    selectedIssueStatus, 
                                    selectedAssignees,
                                    selectedReporter,
                                    selectedIssueType,
                                    selectedProject!,
                                    selectedIssueLoggedDays,
                                    selectedIssueLoggedHours,
                                    selectedIssueLoggedMinutes,
                                    selectedIssueEstimatedDays,
                                    selectedIssueEstimatedHours,
                                    selectedIssueEstimatedMinutes,
                                    selectedIssueRemainingDays,
                                    selectedIssueRemainingHours,
                                    selectedIssueRemainingMinutes,
                                    issueStore.createIssue
                                )} 
                            />
                            </Grid.Column>
                        </Grid>
                    </Form>
                )}
            </Formik>
        </div>
    )
})
