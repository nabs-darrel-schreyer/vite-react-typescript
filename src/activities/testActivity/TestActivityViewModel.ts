import { makeObservable, observable, action } from 'mobx';

export class TestActivityViewModel {
    message: string = ''

    constructor() {
        this.initializeObservables()
    }

    init(initialMessage: string): void {
        this.message = initialMessage
    }

    clickButton(): void {
        this.message = `Button clicked in ${Date.now()}`
    }

    getMessage(): string {
        return this.message
    }

    private initializeObservables(): void {
        makeObservable(this, {
            message: observable,
            clickButton: action
        })
    }
}