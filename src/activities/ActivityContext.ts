import {createContext} from 'react';
import {TestActivityViewModel} from './testActivity/TestActivityViewModel';
import {FirstActivityViewModel} from './FirstActivity/FirstActivityViewModel';

export const TestActivityContext = createContext<TestActivityViewModel>(new TestActivityViewModel());
export const FirstActivityContext = createContext<FirstActivityViewModel>(new FirstActivityViewModel());