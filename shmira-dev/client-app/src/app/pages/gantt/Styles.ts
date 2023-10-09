import styled from 'styled-components'

interface SprintContainerProps {
    start: number
    end: number
}

export const GanttContainer = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid #ddd;
    overflow-x: auto;
`

export const GanttHeader = styled.div`
    display: flex;
`

export const MonthColumn = styled.div`
    flex: 1;
    border-right: 1px solid #ddd;
    text-align: center;
`

export const GanttGrid = styled.div<{ columns: number }>`
    display: flex;
    position: relative;
`

export const SprintContainer = styled.div<SprintContainerProps>`
    display: flex;
    flex-direction: column;
    position: absolute;
    left: ${(props) => props.start * 100}%;
    width: ${(props) => (props.end - props.start) * 100}%;
    border: 1px solid #ddd;
    background-color: rgba(100, 150, 255, 0.1);
`

export const IssueRow = styled.div`
    padding: 5px;
    border-top: 1px solid #ddd;
    &:first-child {
        border-top: none;
    }
`
