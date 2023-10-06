import { makeAutoObservable } from 'mobx'
import { store } from './store'

interface Modal {
    open: boolean
    body: JSX.Element | null
}

export default class MiniModalStore {
    mniModal: Modal = {
        open: false,
        body: null,
    }

    constructor() {
        makeAutoObservable(this)
    }

    openMiniModal = (content: JSX.Element) => {
        this.mniModal.open = true
        this.mniModal.body = content
    }

    closeMiniModal = () => {
        this.mniModal.open = false
        this.mniModal.body = null
    }

}
