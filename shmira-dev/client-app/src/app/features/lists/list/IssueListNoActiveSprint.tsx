import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Droppable } from 'react-beautiful-dnd'
import { observer } from 'mobx-react-lite'
import { List, Title, Issues, NoActiveSprintColumn } from './Styles'

interface Props {
    status: string
}

export default observer(function ProjectBoardListNoActiveSprint({
    status,
}: Props) {
    var status_name = status

    return (
        <Droppable key={status} droppableId={status}>
            {(provided) => {
                return (
                    <List>
                        <Title>{status_name}</Title>
                        <Issues {...provided.droppableProps} ref={provided.innerRef}>
                            {provided.placeholder}
                            {status_name === 'To Do' && (
                                <NoActiveSprintColumn>
                                    <p>
                                        You can't do anything right now because
                                        there is no active sprint. Head to your
                                        <Link style={{ display: 'inline-block' }} to="/sprints">
                                            backlog
                                        </Link>{' '}
                                        to start a sprint.
                                    </p>
                                </NoActiveSprintColumn>
                            )}
                        </Issues>
                    </List>
                )
            }}
        </Droppable>
    )
})
