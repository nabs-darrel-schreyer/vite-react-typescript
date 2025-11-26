import { makeAutoObservable } from "mobx";

export type FirstActivityData = {
    id: number;
    name: string;
};

export const fetcher = async (url: string): Promise<FirstActivityData[]> => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    return response.json() as Promise<FirstActivityData[]>;
};

export class FirstActivityViewModel {
    title: string;

    constructor() {
        this.title = "First Activity View Model";
        makeAutoObservable(this);
    }
}

export default FirstActivityViewModel;