
import { observer } from 'mobx-react-lite'
import { Issue } from '../../../../models/issue'
import './Styles.css'
import { useStore } from '../../../../stores/store'
import { InvisibleTextInput, StyledInput } from '../../../../shared/form/Styles'

interface CreateTitleProps {
    mode: 'create'
    issue_title_edit_state: boolean
    setSelectedIssueName: any
    toggleIssueTitleEditor: any
    selectedIssueName: string
}

interface UpdateTitleProps {
    mode: 'update'
    issue_title_edit_state: boolean 
    toggleIssueTitleEditor: any  
    issueTitle: string
    setIssueTitleState: any
    selectedIssue: Issue 
    updateIssueTitle: any
}

type EditTitleProps = CreateTitleProps | UpdateTitleProps;

export default observer(function IssueTitle( props: EditTitleProps ) {
    const { issueStore } = useStore()
    if(props.mode === "create"){
        return (
         
            <>
                 {!props.issue_title_edit_state && (
                    <InvisibleTextInput fontsize={20} onClick={() => props.toggleIssueTitleEditor(props.issue_title_edit_state)}>
                        <h3 style={{paddingTop: '15px', paddingLeft: '5px'}}>
                            {props.selectedIssueName}
                        </h3>
                    </InvisibleTextInput>
                )}
            
                {props.issue_title_edit_state && (
                    <StyledInput defaultValue={props.selectedIssueName} autoFocus onChange={(e: any) => props.setSelectedIssueName(e.target.value)} onBlur={() => {props.toggleIssueTitleEditor(props.issue_title_edit_state)}}/>
                )}
        
            </>
        )
    }
    if(props.mode === "update"){
        return(
            <>
            {!props.issue_title_edit_state && (
                <InvisibleTextInput
                    style={{cursor: 'pointer', marginBottom: '5px', marginTop: '5px'}}
                    fontsize={17}
                    onClick={() => props.toggleIssueTitleEditor(props.issue_title_edit_state)}
                >
                    <h3 style={{paddingTop: '15px', paddingLeft: '5px'}}>
                        {props.selectedIssue!.name}
                    </h3>
                </InvisibleTextInput>
            )}
            {props.issue_title_edit_state && (
                <StyledInput
                    defaultValue={props.selectedIssue!.name}
                    autoFocus
                    onChange={(e: any) => props.setIssueTitleState(e.target.value)}
                    onBlur={() => {
                        props.updateIssueTitle({
                            selectedIssue: props.selectedIssue!,
                            issueTitle: props.issueTitle,
                            toggleIssueTitleEditor: props.toggleIssueTitleEditor,
                            issue_title_edit_state: props.issue_title_edit_state, 
                            updateIssue: issueStore.updateIssue
                        })
                    }}
                />
            )}
            </>
        )
    }
    return <></>
})
    