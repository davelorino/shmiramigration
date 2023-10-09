import { Button, Table } from 'semantic-ui-react'
import { useStore } from '../../../stores/store'
import { observer } from 'mobx-react-lite'
import { Project } from '../../../models/project'
import { Account } from '../../../models/account'
import { Invitation } from '../../../models/invitation'
import * as Yup from 'yup'
import 'react-quill/dist/quill.snow.css'
import '../Login/login.css'
import Icon from '../../../images/Icon'
import { 
    InviteConfirmationOuterContainer,
    InviteCollaboratorConfirmationIconContainer,
    InviteSentHeading,
    InvitesTableContainer
} from './Styles'


export default observer(function InviteConfirmationForm() {
    const { accountStore, issueStore, commonStore } = useStore()

    function findProjectName(allProjects: Project[], invite: Invitation) {
        return allProjects.find((project) => project.id.toLowerCase() === invite.project_to_collaborate_on_id.toLowerCase())!.name
    }

    function getNameOfInviter(allAccounts: Account[], invite: Invitation) {
        return allAccounts
            .find((account) => account.id === invite.inviter_account_id)!.first_name
            .concat(' ', allAccounts.find((account) => account.id === invite.inviter_account_id)!.second_name)
    }

    function getProjectDescription(allProjects: Project[], invite: Invitation) {
        return allProjects.find((project) => project.id.toLowerCase() === invite.project_to_collaborate_on_id.toLowerCase())!.description
    }

    return (
        <div className="darkreader" style={{ backgroundColor: 'transparent' }}>
            <InviteConfirmationOuterContainer>
                <InviteCollaboratorConfirmationIconContainer>
                    <Icon top={0} type="duck" size={40} />
                </InviteCollaboratorConfirmationIconContainer>
                <InviteSentHeading>Project Invites</InviteSentHeading>
                <InvitesTableContainer>
                    <Table basic="very" celled collapsing>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Project</Table.HeaderCell>
                                <Table.HeaderCell>Invited By</Table.HeaderCell>
                                <Table.HeaderCell>
                                    Project Description
                                </Table.HeaderCell>
                                <Table.HeaderCell>
                                    Invited Date
                                </Table.HeaderCell>
                                <Table.HeaderCell>Action</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {accountStore.allInvites
                                .filter((invite) => invite.invitee_account_email !== null)
                                .filter((invite) => invite.invitee_account_email.toLowerCase() === commonStore.email!.toLowerCase())
                                .filter((invite) => invite.invitation_status === 'Pending')
                                .map((invite) => (
                                    <Table.Row key={invite.id}>
                                        <Table.Cell>
                                            {findProjectName(issueStore.allProjects, invite)}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {getNameOfInviter(accountStore.allAccounts, invite)}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {getProjectDescription(issueStore.allProjects, invite)}
                                        </Table.Cell>
                                        <Table.Cell>Placeholder</Table.Cell>
                                        <Table.Cell>
                                            <Button 
                                                onClick={() => accountStore.acceptInvitation(invite.id)}
                                                size="mini"
                                                content="Accept"
                                                color="blue"
                                            />
                                            <Button
                                                onClick={() => accountStore.declineInvitation(invite.id)}
                                                size="mini"
                                                content="Decline"
                                                color="black"
                                            />
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                        </Table.Body>
                    </Table>
                </InvitesTableContainer>
            </InviteConfirmationOuterContainer>
        </div>
    )
})
