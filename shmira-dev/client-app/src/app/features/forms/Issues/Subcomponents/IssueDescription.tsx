import { observer } from 'mobx-react-lite'
import { Issue } from '../../../../models/issue'
import { useStore } from '../../../../stores/store'
import { 
    InvisibleIssueDescriptionTextInput, 
    DescriptionContainer,
    DescriptionEditor,
    DescriptionHeading,
    hoveredStyle,
    baseStyle
} from './Styles'
import './Styles.css'
import parse from 'html-react-parser'
import { Button } from 'semantic-ui-react'

interface CreateDescriptionProps {
    mode: "create"
    description_edit_state: boolean
    setSelectedIssueDescription: any
    toggleDescriptionEditor: any
    selectedIssueDescription: string
    toggleIsDescriptionHovered: any 
    isDescriptionHovered: boolean
}

interface UpdateDescriptionProps {
    mode: "update"
    toggleIsDescriptionHovered: any 
    isDescriptionHovered: boolean 
    description_edit_state: boolean 
    selectedIssueDescription: any 
    setSelectedIssueDescription: any 
    toggleDescriptionEditor: any 
    selectedIssue: Issue
    updateIssueDescription: (selectedIssue: Issue, quillDescriptionEditText: any, updateIssue: any) => void
}

type EditDescriptionProps = CreateDescriptionProps | UpdateDescriptionProps;

export default observer(function IssueDescription(props: EditDescriptionProps) {
    const { issueStore } = useStore()
    if(props.mode === "create"){
        return (
            <>
            <DescriptionHeading>Description</DescriptionHeading>
            <div 
                onMouseEnter={() => props.toggleIsDescriptionHovered()} 
                onMouseLeave={() => props.toggleIsDescriptionHovered()} 
                style={{...{filter: 'brightness(130%)', border: '1px solid white',marginTop: '10px',paddingBottom: '15px'}, ...( props.isDescriptionHovered ? hoveredStyle : {})}}>
                
                {!props.description_edit_state && (
                <InvisibleIssueDescriptionTextInput fontsize={14} onClick={() => props.toggleDescriptionEditor(props.description_edit_state)}>
                    <DescriptionContainer >
                        {parse(props.selectedIssueDescription)}
                    </DescriptionContainer>
                </InvisibleIssueDescriptionTextInput>
            )}
        
            {/* DESCRIPTION WSIWYG INPUT */}
        
            {props.description_edit_state && (
                <>
                    <DescriptionEditor theme="snow" defaultValue={props.selectedIssueDescription} onChange={props.setSelectedIssueDescription}/>
                    <Button size="mini" content="Save" color="blue" style={{ marginLeft: '15px' }} onClick={() => {props.toggleDescriptionEditor(props.description_edit_state)}}/>
                </>
            )}
            </div>
            </>
        )
    }
    if(props.mode === "update"){
        return(
            <>
                <DescriptionHeading>Description</DescriptionHeading>
                <div 
                    onMouseEnter={() => props.toggleIsDescriptionHovered()} 
                    onMouseLeave={() => props.toggleIsDescriptionHovered()} 
                    style={{...{filter: 'brightness(130%)', border: '1px solid white',marginTop: '10px',paddingBottom: '15px'}, ...( props.isDescriptionHovered ? hoveredStyle : {})}}>
                    {!props.description_edit_state && (
                        <InvisibleIssueDescriptionTextInput
                            fontsize={14}
                            onClick={() => props.toggleDescriptionEditor(props.description_edit_state)}
                        >
                            <DescriptionContainer>
                                {parse(props.selectedIssue!.description)}
                            </DescriptionContainer>
                        </InvisibleIssueDescriptionTextInput>
                    )}
                    {props.description_edit_state && (
                        <>
                            <DescriptionEditor theme="snow" defaultValue={props.selectedIssue!.description} onChange={props.setSelectedIssueDescription}/>

                            <Button size="mini" content="Save" color="blue" style={{ marginLeft: '15px' }}
                                onClick={() => { 
                                    props.updateIssueDescription(props.selectedIssue!, props.selectedIssueDescription, issueStore.updateIssue);
                                    props.toggleDescriptionEditor(props.description_edit_state);
                                }}
                            />
                            <Button size="mini" content="Cancel" onClick={() => props.toggleDescriptionEditor(props.description_edit_state)}/>
                        </>
                    )}
                </div>
            </>
        )
    }
    return <></>
    })