
import { v4 as uuid } from 'uuid'
import moment from 'moment';
import { Issue } from '../../../../models/issue'
import { Project } from '../../../../models/project'
import { Assignee } from '../../../../models/assignee'
import { SprintIssue } from '../../../../models/sprintissue';
import { IssueAssignee } from '../../../../models/issueAssignee';

interface SubmitCommentProps {
    comment_state: string
    assignee_id: string 
    selectedIssue: Issue
    addCommentToIssue: any
}

export function submitComment({comment_state, assignee_id, selectedIssue, addCommentToIssue }: SubmitCommentProps) {
    var comment_to_send = {
        Id: uuid(),
        commenter_assignee_id: assignee_id,
        comment: comment_state,
        comment_posted: moment.tz(moment().subtract(moment.duration('11:00:00')), 'Australia/Sydney').toISOString(true)
    }

    var comment_to_add = {
        ...comment_to_send,
        comment_posted: moment
            .tz(moment(), 'Australia/Sydney')
            .toISOString(true),
    }
    selectedIssue!.comments!.push(comment_to_add)
    addCommentToIssue(selectedIssue!.id, comment_to_send)
}

export const updateIssueStatus = (
    status: string, 
    selectedIssue: Issue, 
    updateIssue: (updated_issue: Issue) => Partial<void>
    ) => {

    selectedIssue!.status = status
    selectedIssue!.updated_at = moment
        .tz(moment(), 'Australia/Sydney')
        .toISOString(true)

    var updated_issue: any = {...selectedIssue!}

    delete updated_issue['assignees']
    delete updated_issue['comments']

    updateIssue(updated_issue)
}

export const updateIssuePriority = (
    priority: string, 
    selectedIssue: Issue, 
    updateIssue: (updated_issue: Issue) => Partial<void>
    ) => {

    selectedIssue!.priority = priority
    selectedIssue!.updated_at = moment
        .tz(moment(), 'Australia/Sydney')
        .toISOString(true)

    var updated_issue: any = {...selectedIssue!}

    delete updated_issue['assignees']
    delete updated_issue['comments']

    updateIssue(updated_issue)
}

interface GetAssigneePhotoProps {
    project_assignees: Assignee[]
    id: string
    account_type: string
}

export function getAssigneePhoto({ project_assignees, id, account_type }:GetAssigneePhotoProps ) {

    if(account_type === "Assignee Id") {
        return project_assignees.find((assignee) => assignee.id === id)!.photo?.url
    } 

    return project_assignees.find((assignee) => assignee.id_app_user === id)!.photo?.url
}

interface GetAssigneeNameProps {
    project_assignees: Assignee[]
    id: string
    account_type: string | undefined
}

export function getAssigneeName({ project_assignees, id, account_type = "" }:GetAssigneeNameProps ) {
    if(account_type === "Assignee Id"){
        return project_assignees
            .find((assignee) => assignee.id === id)!.first_name
            .concat(' ', project_assignees.find((assignee) => assignee.id === id)!.second_name)
    }

    return project_assignees
        .find((assignee) => assignee.id_app_user === id)!.first_name
        .concat(' ', project_assignees.find((assignee) => assignee.id_app_user === id)!.second_name)
    
}

export function getAssigneeFullName(project_assignee: Assignee) {
    return project_assignee.first_name.concat(' ', project_assignee.second_name)
}

export function getAssigneePhotoUrl(project_assignee: Assignee, assignees: Assignee[]) {
    return assignees.find((assignee) => assignee.id === project_assignee.id)!.photo?.url
}

interface AddReporterCreateInterface {
    mode: 'create'
    assignee_id: string 
    selectedReporter: string 
    setSelectedReporter: (selectedReporter: string) => void 
}

interface AddReporterUpdateInterface {
    mode: 'update'
    assignee_id: string 
    selectedReporter: string 
    selectedIssue: Issue 
    updateIssue: (updated_issue: Issue) => Promise<void>
}
type AddReporterProps = AddReporterCreateInterface | AddReporterUpdateInterface;

export function addReporterToIssue ( props: AddReporterProps ) {
    if(props.mode === 'create'){
        if(props.selectedReporter !== props.assignee_id){
            props.setSelectedReporter(props.assignee_id)
        }
    }

    if(props.mode === 'update'){
        props.selectedIssue!.reporter_id = props.assignee_id

        var updated_issue: any = {
            ...props.selectedIssue!,
        }

        props.selectedIssue!.updated_at = moment
            .tz(moment(), 'Australia/Sydney')
            .toISOString(true)

        delete updated_issue['assignees']
        delete updated_issue['comments']

        props.updateIssue(updated_issue)
    }
    
}

export function removeReporterFromIssue( selectedIssue: Issue, updateIssue: (updated_issue: Issue) => void ) {
    selectedIssue!.reporter_id = ''

        var updated_issue: any = {
            ...selectedIssue!,
        }

        selectedIssue!.updated_at = moment
            .tz(moment(), 'Australia/Sydney')
            .toISOString(true)

        delete updated_issue['assignees']
        delete updated_issue['comments']

        updated_issue.reporter = ''

        updateIssue(updated_issue)
}

interface CreateAddAssigneeToIssueProps {
    mode: "create"
    assignee_id: string 
    selectedAssignees: string[] 
    setSelectedAssignees: any
}

interface UpdateAddAssigneeToIssueProps {
    mode: "update"
    assignee_id: string 
    selectedIssue: Issue
    addAssigneeToIssue: any
    allUsers: any
}

type AddAssigneeToIssueProps = CreateAddAssigneeToIssueProps | UpdateAddAssigneeToIssueProps;

export const addAssigneeToIssue = (props: AddAssigneeToIssueProps) => {
    
    if(props.mode === "create"){
        var assignees_to_set: string[] = []

        if (props.selectedAssignees.length > 0) {
            props.selectedAssignees.map((assignee_id) => {
                assignees_to_set.push(assignee_id)
            })
        }

        if (!assignees_to_set.includes(props.assignee_id)) {
            assignees_to_set.push(props.assignee_id)
        }
        props.setSelectedAssignees(assignees_to_set)
    }
    if(props.mode === "update") 
    {
        var assignees_to_set: string[] = []

        var assignee_to_add = props.allUsers.find(
            (assignee: Assignee) =>
                assignee.id === props.assignee_id
        )

        props.selectedIssue!.assignees.push(assignee_to_add!)

        props.selectedIssue!.updated_at = moment
            .tz(moment(), 'Australia/Sydney')
            .toISOString(true)

        var issue_assignee_to_add = {
            AssigneeId: props.assignee_id,
            IssueId: props.selectedIssue!.id,
        }
        props.addAssigneeToIssue(issue_assignee_to_add)
    }
}

interface CreateRemoveAssigneeFromIssueProps {
    mode: "create"
    assignee_id: string
    selectedAssignees: string[]
    setSelectedAssignees: any
}

interface UpdateRemoveAssigneeFromIssueProps {
    mode: "update"
    assignee_id: string
    selectedIssue: Issue 
    removeAssigneeFromIssue: any
}

type RemoveAssigneeFromIssueProps = CreateRemoveAssigneeFromIssueProps | UpdateRemoveAssigneeFromIssueProps;

export const removeAssigneeFromIssue = (props: RemoveAssigneeFromIssueProps) => {
    if(props.mode === "create"){
        var assignees_to_set: string[] = []

        props.selectedAssignees.map((current_assignee_id) => {
            if (current_assignee_id !== props.assignee_id) {
                assignees_to_set.push(current_assignee_id)
            }
        })
        props.setSelectedAssignees(assignees_to_set)
    }
    if(props.mode === "update"){
        props.selectedIssue!.assignees = props.selectedIssue!.assignees.filter(
            (assignee) => assignee.id.toString().toLowerCase() !== props.assignee_id
        )
        props.selectedIssue!.updated_at = moment
            .tz(moment(), 'Australia/Sydney')
            .toISOString(true)

        var issue_assignee_to_remove = {
            AssigneeId: props.assignee_id,
            IssueId: props.selectedIssue!.id,
        }

        var updated_issue: any = {
            ...props.selectedIssue!,
        }

        props.removeAssigneeFromIssue(issue_assignee_to_remove)

    }
    
}


export const changeIssueType = (
    selectedIssue: Issue | undefined, 
    issue_type: string,
    updateIssue: any
    ) => {

    selectedIssue!.issue_type = issue_type
    var current_issue: Partial<Issue> = {
        ...selectedIssue!,
    }

    delete current_issue['assignees']
    delete current_issue['comments']

    current_issue.issue_type = issue_type

    var updatedIssue: any = current_issue

    selectedIssue!.updated_at = moment
        .tz(moment(), 'Australia/Sydney')
        .toISOString(true)

    updateIssue(updatedIssue)
}

interface UpdateIssueTitleEditorInterface {
    selectedIssue: Issue 
    issueTitle: string 
    toggleIssueTitleEditor: any 
    issue_title_edit_state: boolean 
    updateIssue: any
}

export const updateIssueTitle = (props: UpdateIssueTitleEditorInterface) => {
    var current_issue: Partial<Issue> = {
        ...props.selectedIssue!,
    }

    delete current_issue['assignees']
    delete current_issue['comments']

    if (props.issueTitle === '') {
        props.toggleIssueTitleEditor(props.issue_title_edit_state)
        return
    }
    current_issue.name = props.issueTitle

    var updatedIssue: any = current_issue

    props.selectedIssue!.name = props.issueTitle
    props.selectedIssue!.updated_at = moment
        .tz(moment(), 'Australia/Sydney')
        .toISOString(true)

    props.updateIssue(updatedIssue)

    props.toggleIssueTitleEditor(props.issue_title_edit_state)
}



export const updateIssueDescription = (selectedIssue: Issue, quillDescriptionEditText: any, updateIssue: any) => {
    var current_issue: Partial<Issue> = {
        ...selectedIssue!,
    }

    delete current_issue['assignees']
    delete current_issue['comments']

    if (quillDescriptionEditText === '') {
        return
    }

    current_issue.description = quillDescriptionEditText

    var updatedIssue: any = current_issue

    selectedIssue!.description = quillDescriptionEditText

    selectedIssue!.updated_at = moment
        .tz(moment(), 'Australia/Sydney')
        .toISOString(true)

    updateIssue(updatedIssue)
}

export function handleSprintChange(
    sprint_id: string,
    selectedIssue: Issue,
    selectedProject: Project,
    updateIssueAndSprint: any 
    ) {
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



export function calculateIssueTimespan(input_days: any, input_hours: any, input_minutes: any) {
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

export function handleCreateIssue(
    selectedIssueSprint: string, 
    selectedIssueName: string, 
    selectedIssueDescription: string,
    selectedIssuePriority: string, 
    selectedIssueStatus: string, 
    selectedAssignees: string[],
    selectedReporter: string,
    selectedIssueType: string, 
    selectedProject: Project, 
    selectedIssueLoggedDays: number, 
    selectedIssueLoggedHours: number, 
    selectedIssueLoggedMinutes: number, 
    selectedIssueEstimatedDays: number, 
    selectedIssueEstimatedHours: number, 
    selectedIssueEstimatedMinutes: number,
    selectedIssueRemainingDays: number, 
    selectedIssueRemainingHours: number, 
    selectedIssueRemainingMinutes: number,
    createIssue: (
        issue_to_create: Issue, 
        sprint_id: string, 
        sprint_issue: SprintIssue,
        issue_assignees: IssueAssignee[]
    ) => void
) {
    let sprint_id_check = selectedIssueSprint !== '' ? selectedIssueSprint : selectedProject!.sprints.find(s => s.name === 'Backlog')!.id;
    let issue_to_create: any = {
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

    let sprint_issue: SprintIssue = {
        sprint_id: sprint_id_check,
        issue_id: issue_to_create.id,
        issue_name: issue_to_create.name,
    }

    let issue_assignees: any[] = []

    selectedAssignees.map((selectedAssignee) => {
        let issue_assignee: IssueAssignee = {
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