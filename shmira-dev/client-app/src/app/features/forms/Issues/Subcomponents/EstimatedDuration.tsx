import { observer } from 'mobx-react-lite'
import { Field } from 'formik'
import { 
    hoveredStyle,
    baseStyle,
    divStyles
} from './Styles'

interface Props {
    isEstimatedDurationHovered: boolean
    setIsEstimatedDurationHovered: any
    selectedIssueEstimatedDays: any 
    setSelectedIssueEstimatedDays: any
    selectedIssueEstimatedHours: any 
    setSelectedIssueEstimatedHours: any
    selectedIssueEstimatedMinutes: any 
    setSelectedIssueEstimatedMinutes: any
}

export default observer(function EstimatedDurationInput({ 
    isEstimatedDurationHovered,
    setIsEstimatedDurationHovered,
    selectedIssueEstimatedDays,
    setSelectedIssueEstimatedDays,
    selectedIssueEstimatedHours,
    setSelectedIssueEstimatedHours,
    selectedIssueEstimatedMinutes,
    setSelectedIssueEstimatedMinutes
}: Props) {
    return (
        <>
            <div style={{...divStyles, ...baseStyle, ...{position: 'relative', zIndex: '1'}, ...(isEstimatedDurationHovered ? hoveredStyle : {})}} onMouseEnter={() => setIsEstimatedDurationHovered(true)} onMouseLeave={() => setIsEstimatedDurationHovered(false)}>
                <h5 style={{paddingTop: '10px', marginLeft: '20px', marginBottom: '5px', paddingBottom: '5px'}}>Estimated Duration</h5>
                <hr style={{border: '1px solid white', width: '100%'}}/>
                
                <div style={{width: '90%', marginLeft: '20px'}}>
                    <div className="inline fields">
                
                    <label style={{fontSize: '11px'}}>Days</label>
                    <Field 
                        type="number" 
                        style={{width: '60px', height: '30px'}} 
                        name="days_estimate" 
                        onChange={(e: any) => setSelectedIssueEstimatedDays(e.target.value)}
                    />
                
                    <label style={{marginLeft: '7px', fontSize: '11px'}}>Hours</label>
                    <Field
                        type="number"
                        style={{width: '60px', height: '30px'}}
                        name="hours_estimate"
                        onChange={(e: any) => setSelectedIssueEstimatedHours(e.target.value)}
                    />

                    <label style={{marginLeft: '7px', fontSize: '11px'}}>Minutes</label>
                    <Field
                        type="number"
                        style={{width: '60px', height: '30px'}}
                        name="minutes_estimate"
                        onChange={(e: any) => setSelectedIssueEstimatedMinutes(e.target.value)}
                    />
                    </div>
                </div>
            </div>
        </>
)})