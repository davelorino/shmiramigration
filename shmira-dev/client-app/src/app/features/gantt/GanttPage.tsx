import React from 'react'
import { useStore } from '../../stores/store'

import {
    GanttContainer,
    GanttHeader,
    MonthColumn,
    GanttGrid,
    SprintContainer,
    IssueRow,
} from './Styles'

const GanttPage = ({}) => {
    // Calculate earliest and latest dates as before...
    const { issueStore } = useStore()
    const {
        issuesByDate,
        selectedProject,
        updateIssues,
        updateIssueAndSprint,
    } = issueStore

    const formatDate = (date: Date): string => {
        const monthNames = [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
        ]
        return `${monthNames[date.getMonth()]} ${date.getFullYear()}`
    }

    // This function generates an array of month columns.
    const generateMonthColumns = (earliestDate: Date, latestDate: Date) => {
        const months: string[] = []
        const current = new Date(earliestDate)

        while (current <= latestDate) {
            months.push(formatDate(current))
            current.setMonth(current.getMonth() + 1)
        }

        return months
    }

    // This function calculates the position of a sprint or issue as a percentage of the entire Gantt chart duration.
    const calculatePositionPercentage = (
        date: string,
        earliestDate: Date,
        latestDate: Date
    ): number => {
        const startDateTimestamp = earliestDate.getTime()
        const endDateTimestamp = latestDate.getTime()
        const totalDuration = endDateTimestamp - startDateTimestamp
        const dateTimestamp = new Date(date).getTime()

        return ((dateTimestamp - startDateTimestamp) / totalDuration) * 100
    }

    // Extract all the start dates and end dates from the sprints
    const allStartDates = selectedProject?.sprints.map((sprint) =>
        new Date(sprint.date_start).getTime()
    )
    const allEndDates = selectedProject?.sprints.map((sprint) =>
        new Date(sprint.date_end).getTime()
    )

    // Get the earliest start date and the latest end date from the arrays
    const earliestDate = new Date(Math.min(...allStartDates!))
    const latestDate = new Date(Math.max(...allEndDates!))

    // Subtract 1 month from the earliest date and add 1 month to the latest date
    earliestDate.setMonth(earliestDate.getMonth() - 1)
    latestDate.setMonth(latestDate.getMonth() + 1)

    const monthColumns = generateMonthColumns(earliestDate, latestDate)

    return (
        <GanttContainer>
            <GanttHeader>
                {monthColumns.map((month) => (
                    <MonthColumn key={month}>{month}</MonthColumn>
                ))}
            </GanttHeader>

            <GanttGrid columns={monthColumns.length}>
                {selectedProject!.sprints.map((sprint) => {
                    const sprintStartPercentage = calculatePositionPercentage(
                        sprint.date_start,
                        earliestDate,
                        latestDate
                    )
                    const sprintEndPercentage = calculatePositionPercentage(
                        sprint.date_end,
                        earliestDate,
                        latestDate
                    )

                    return (
                        <SprintContainer
                            key={sprint.id}
                            start={sprintStartPercentage}
                            end={sprintEndPercentage}
                        >
                            {sprint.issues.map((issue) => (
                                <IssueRow key={issue.id}>{issue.name}</IssueRow>
                            ))}
                        </SprintContainer>
                    )
                })}
            </GanttGrid>
        </GanttContainer>
    )
}

export default GanttPage
