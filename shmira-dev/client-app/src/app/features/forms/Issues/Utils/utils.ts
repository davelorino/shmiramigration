
import { v4 as uuid } from 'uuid'
import moment from 'moment';
import { Issue } from '../../../../models/issue'
import { Assignee } from '../../../../models/assignee'

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

interface GetAssigneePhotoProps {
    project_assignees: Assignee[]
    id: string
    account_type: string
}

export function getAssigneePhoto({ project_assignees, id, account_type }:GetAssigneePhotoProps ) {
    console.log("getAssigneePhoto Function:")
    console.log(id)
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

export function addReporterToIssue (assignee_id: string, selectedReporter: string, setSelectedReporter: any) {
    if(selectedReporter !== assignee_id){
        setSelectedReporter(assignee_id)
    }
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