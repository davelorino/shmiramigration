
import { observer } from 'mobx-react-lite'
import { IssueTypeDropdownSelector } from './Styles'
import './Styles.css'
import { InvisibleTextInput, StyledInput } from '../../../../../shared/form/Styles'

interface Props {
    issue_title_edit_state: boolean
    setSelectedIssueName: any
    toggleIssueTitleEditor: any
    selectedIssueName: string
}

export default observer(function IssueTitle({ issue_title_edit_state, setSelectedIssueName, toggleIssueTitleEditor, selectedIssueName }: Props) {
    return (
         
    <>
         {!issue_title_edit_state && (
            <InvisibleTextInput fontsize={20} onClick={() => toggleIssueTitleEditor(issue_title_edit_state)}>
                <h3 style={{paddingTop: '15px', paddingLeft: '5px'}}>
                    {selectedIssueName}
                </h3>
            </InvisibleTextInput>
        )}
    
        {issue_title_edit_state && (
            <StyledInput defaultValue={selectedIssueName} autoFocus onChange={(e: any) => setSelectedIssueName(e.target.value)} onBlur={() => {toggleIssueTitleEditor(issue_title_edit_state)}}/>
        )}

    </>
)})