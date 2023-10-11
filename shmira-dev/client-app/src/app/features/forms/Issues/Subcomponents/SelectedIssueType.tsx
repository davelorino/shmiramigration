import { observer } from 'mobx-react-lite'
import './Styles.css'
import { StyledLabel } from '../../Styles'
import IssueTypeIcon from '../../../../images/IssueTypeIcon'

interface Props {
    selectedIssueType: string | undefined
}

export default observer(function SelectedIssueType({ 
    selectedIssueType
}: Props ) {
    
        if(selectedIssueType === '') {
            return (
                <StyledLabel style={{ display: 'inline-block' }}>
                    <IssueTypeIcon color="#65BA43" type="story" size={14} />
                    <div className='issue_icon'>
                        Story
                    </div>
                </StyledLabel>
            )
        }

        if (selectedIssueType == 'Story') {
            return (
                <StyledLabel style={{ display: 'inline-block' }}>
                    <IssueTypeIcon color="#65BA43" type="story" size={14} />
                    <div className='issue_icon'>
                        Story
                    </div>
                </StyledLabel>
            )
        }

        if (selectedIssueType == 'Bug') {
            return (
                <StyledLabel style={{ display: 'inline-block' }}>
                    <IssueTypeIcon color="#E44D42" type="bug" size={14} />
                    <div className='issue_icon'>
                        Bug
                    </div>
                </StyledLabel>
            )
        }
        if (selectedIssueType == 'Task') {
            return (
                <StyledLabel style={{ display: 'inline-block' }}>
                    <IssueTypeIcon color="#4FADE6" type="task" size={14} />
                    <div className='issue_icon'>
                        Task
                    </div>
                </StyledLabel>
            )
        }
        return null
})