import { useState } from 'react'
import { Grid } from 'semantic-ui-react'
import { Formik, Form } from 'formik'
import { useStore } from '../../../../stores/store'
import { observer } from 'mobx-react-lite'
import 'react-quill/dist/quill.snow.css'
import moment from 'moment'
import 'quill-mention/dist/quill.mention.css'
import 'quill-mention'
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
    updateIssuePriority,
    handleSprintChange
} from '../Utils/utils'

// Time Utils
import { updateLoggedTime } from '../Utils/timeUtils'

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
import { IssueTypeOptions2 } from '../Constants/IssueTypeOptions'
import { IssueAssignees } from '../Constants/IssueAssignees'
import { IssueReporters } from '../Constants/IssueReporters'
import { CreatedAtPTag, UpdatedAtPTag } from './Styles'

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
                                <SprintSelector
                                        mode='update'
                                        isSprintHovered={isSprintHovered}
                                        setIsSprintHovered={setIsSprintHovered}
                                        selectedIssue={selectedIssue!}
                                        selectedProject={selectedProject!}
                                        handleSprintChange={handleSprintChange}
                                />
             
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
                                    <CreatedAtPTag>
                                        {'Created '.concat(moment(selectedIssue!.created_at).fromNow())}
                                    </CreatedAtPTag>
                                    <UpdatedAtPTag>
                                        {'Last updated '.concat(moment(selectedIssue!.updated_at)?.fromNow())}
                                    </UpdatedAtPTag>
                                </div>
                            </Grid.Column>
                        </Grid>
                    </Form>
                )}
            </Formik>
        </div>
    )
})
