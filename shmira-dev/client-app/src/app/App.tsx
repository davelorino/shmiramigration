import React, { useEffect, useState, useLayoutEffect } from 'react'
import { Container, Modal } from 'semantic-ui-react'
import './images/fontStyles.css'
import IssueDashboard from './pages/kanban/KanbanBoard'
import InsightsDashboard from './features/dashboards/InsightsDashboard'
import SprintPage from './pages/sprints/SprintPage'
import GanttPage from './pages/gantt/GanttPage'
import LoadingComponent from './images/LoadingComponent'
import NavBarTop from './features/navbars/NavBarTop'
import { useStore } from './stores/store'
import { observer } from 'mobx-react-lite'
import ModalContainer from './shared/modals/ModalContainer'
import MediumModalContainer from './shared/modals/MediumModalContainer'
import SmallModalContainer from './shared/modals/SmallModalContainer'
import NavbarRight from './features/navbars/NavbarLeft'
import AboutPage from './features/About'
import { Route } from 'react-router-dom'
import LoginForm from './features/forms/Login/LoginForm'
import backgroundImage3 from './images/shmirabackground3.jpg'
import ActivateAccountForm from './features/forms/Login/ActivateAccountForm'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import '../darkmode.css'
import "./Styles.css"

function App() {
    const { issueStore, commonStore, accountStore } = useStore()

    useEffect(() => {
        issueStore.loadingInitial = true
        accountStore.accountsLoading = true
        commonStore.loadInitial()
    }, [])

    {/* If the data is loading, display the loading page */}
    if (issueStore.loadingInitial || (commonStore.assignee_id === null && (accountStore.accountsLoading || issueStore.loadingInitial)))
        return (
            <LoadingComponent content="Loading..." />
        )

    {/* If theres no stored login token and the page isn't loading, display the login page */}
    if (
        commonStore.token === null && !accountStore.accountsLoading && !issueStore.loadingInitial
    ) {
        {
            console.log('App started')
        }
        return (
            <div
                style={{
                    height: '100vh',
                    backgroundImage: `url(${backgroundImage3})`,
                    filter: `brightness(100%)`,
                    backgroundSize: 'cover',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    backgroundPosition: 'center'
                }}
            >
                <div
                    className="modal"
                    style={{
                        backgroundColor: `transparent`,
                        width: '500px',
                        height: '500px',
                        marginTop: '280px',
                        backdropFilter: `brightness(125%) saturate(150%) blur(10px)`,
                    }}
                >
                    <div className="modal-content">
                        <Route exact path="/" component={LoginForm} />
                        <Route path="/sprints" component={LoginForm} />
                        <Route path="/login" component={LoginForm} />
                        <Route path="/invite" component={LoginForm} />
                        <Route path="/gantt" component={LoginForm} />
                        <Route path="/insights" component={LoginForm} />
                        <Route
                            path="/activate"
                            component={ActivateAccountForm}
                        />
                    </div>
                </div>
            </div>
        )
    } 
    // if the data is loaded and a project is selected, display the app
    else if (
        issueStore.selectedProject! !== undefined &&
        !accountStore.accountsLoading &&
        !issueStore.loadingInitial
    ) {
        return (
            <div>
                {
                    <div className="app_brightness">
                        <ModalContainer />
                        <SmallModalContainer />
                        <MediumModalContainer />
                        <NavBarTop />
                        <NavbarRight />
                        <Container style={{ paddingTop: '7em' }}>
                            <Route exact path="/" component={IssueDashboard} />
                            <Route path="/insights" component={InsightsDashboard}/>
                            <Route path="/sprints" component={SprintPage} />
                            <Route path="/gantt" component={GanttPage} />
                            <Route path="/about" component={AboutPage} />
                        </Container>
                    </div>
                }
                {
                    <ToastContainer
                        position="bottom-right"
                        theme="dark"
                        autoClose={false}
                        hideProgressBar={true}
                        newestOnTop={false}
                        closeOnClick={true}
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                    />
                }
            </div>
        )
    }
    return <></>
}

export default observer(App)

