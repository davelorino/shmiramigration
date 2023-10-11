import { observer } from 'mobx-react-lite'
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

interface Props {
    description_edit_state: boolean
    setSelectedIssueDescription: any
    toggleDescriptionEditor: any
    selectedIssueDescription: string
    toggleIsDescriptionHovered: any 
    isDescriptionHovered: boolean
}

export default observer(function IssueDescription({ 
    toggleIsDescriptionHovered, 
    isDescriptionHovered, 
    description_edit_state, 
    setSelectedIssueDescription, 
    toggleDescriptionEditor, 
    selectedIssueDescription 
}: Props) {
    return (
    <>
    <DescriptionHeading>Description</DescriptionHeading>
    <div 
        onMouseEnter={() => toggleIsDescriptionHovered()} 
        onMouseLeave={() => toggleIsDescriptionHovered()} 
        style={{...{filter: 'brightness(130%)', border: '1px solid white',marginTop: '10px',paddingBottom: '15px'}, ...( isDescriptionHovered ? hoveredStyle : {})}}>
        
        {!description_edit_state && (
        <InvisibleIssueDescriptionTextInput fontsize={14} onClick={() => toggleDescriptionEditor(description_edit_state)}>
            <DescriptionContainer >
                {parse(selectedIssueDescription)}
            </DescriptionContainer>
        </InvisibleIssueDescriptionTextInput>
    )}

    {/* DESCRIPTION WSIWYG INPUT */}

    {description_edit_state && (
        <>
            <DescriptionEditor theme="snow" defaultValue={selectedIssueDescription} onChange={setSelectedIssueDescription}/>
            <Button size="mini" content="Save" color="blue" style={{ marginLeft: '15px' }} onClick={() => {toggleDescriptionEditor(description_edit_state)}}/>
        </>
    )}
    </div>
    </>
)})