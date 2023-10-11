
import { HoverDiv } from '../../Styles'
import IssueTypeIcon from '../../../../images/IssueTypeIcon'
import { Issue } from '../../../../models/issue'
import { useStore } from '../../../../stores/store'
import './Styles.css'



interface Props {
    setSelectedIssueType: (issue_type: string) => void;
    selectedIssueType: any
}

interface CreateIssueProps {
    mode: 'create'
    selectedIssueType: any
    setSelectedIssueType: (issue_type: string) => void;
}
  
  interface UpdateIssueProps {
    mode: 'update'
    selectedIssue: Issue | undefined;
    changeIssueType: (selectedIssue: Issue, issue_type: string, updateIssue: any ) => void;
    updateIssue: (issue: Issue) => void;
}
  
  type IssueFormProps = CreateIssueProps | UpdateIssueProps;
  
  export const IssueTypeOptions2 = (props: IssueFormProps) => {
    const { issueStore } = useStore()
    const { updateIssue } = issueStore
    if (props.mode === 'create') {
        return (
            [
                {
                    key: '0',
                    value: 'Story',
                    text: 'Story',
                    content: (
                        <HoverDiv className='assignee_reporter_label' onClick={() => props.setSelectedIssueType('Story')}>
                            <IssueTypeIcon color="#65BA43 !important" type="story" size={14}/>
                            <div className='issue_icon'>Story</div>
                        </HoverDiv>
                    ),
                },
                {
                    key: '1',
                    value: 'Bug',
                    text: 'Bug',
                    content: (
                        <HoverDiv className='assignee_reporter_label' onClick={() => props.setSelectedIssueType('Bug')}>
                            <IssueTypeIcon color="#E44D42" type="bug" size={14} />
                            <div className='issue_icon'>
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
                        <HoverDiv className='assignee_reporter_label' onClick={() => props.setSelectedIssueType('Task')}>
                            <IssueTypeIcon color="#4FADE6 !important" type="task" size={14}/>
                            <div className='issue_icon'>
                                Task
                            </div>
                        </HoverDiv>
                    ),
                },
            ]
        )
    }
    return (
        [
            {
                key: '0',
                value: 'Story',
                text: 'Story',
                content: (
                    <HoverDiv className='assignee_reporter_label' onClick={() => props.changeIssueType(props.selectedIssue!, 'Story', updateIssue)}>
                        <IssueTypeIcon color="#65BA43 !important" type="story" size={14}/>
                        <div className='issue_icon'>Story</div>
                    </HoverDiv>
                ),
            },
            {
                key: '1',
                value: 'Bug',
                text: 'Bug',
                content: (
                    <HoverDiv className='assignee_reporter_label' onClick={() => props.changeIssueType(props.selectedIssue!, 'Bug', updateIssue)}>
                        <IssueTypeIcon color="#E44D42" type="bug" size={14} />
                        <div className='issue_icon'>
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
                    <HoverDiv className='assignee_reporter_label' onClick={() => props.changeIssueType(props.selectedIssue!, 'Task', updateIssue)}>
                        <IssueTypeIcon color="#4FADE6 !important" type="task" size={14}/>
                        <div className='issue_icon'>
                            Task
                        </div>
                    </HoverDiv>
                ),
            },
        ]
    )
}

export const IssueTypeOptions = ( { setSelectedIssueType, selectedIssueType }: Props ) => {
        return(
            [
                {
                    key: '0',
                    value: 'Story',
                    text: 'Story',
                    content: (
                        <HoverDiv className='assignee_reporter_label' onClick={() => setSelectedIssueType('Story')}>
                            <IssueTypeIcon color="#65BA43 !important" type="story" size={14}/>
                            <div className='issue_icon'>Story</div>
                        </HoverDiv>
                    ),
                },
                {
                    key: '1',
                    value: 'Bug',
                    text: 'Bug',
                    content: (
                        <HoverDiv className='assignee_reporter_label' onClick={() => setSelectedIssueType('Bug')}>
                            <IssueTypeIcon color="#E44D42" type="bug" size={14} />
                            <div className='issue_icon'>
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
                        <HoverDiv className='assignee_reporter_label' onClick={() => setSelectedIssueType('Task')}>
                            <IssueTypeIcon color="#4FADE6 !important" type="task" size={14}/>
                            <div className='issue_icon'>
                                Task
                            </div>
                        </HoverDiv>
                    ),
                },
            ]
        )
}