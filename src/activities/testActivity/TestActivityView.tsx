import React from 'react';
import { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { TestActivityContext } from '../ActivityContext';

function TestActivityView() {
    const viewModel = useContext(TestActivityContext);

    React.useEffect(() => {
        viewModel.init("Initial message from TestActivityView");
    }, []);
        
    return(
    <div>
        <h1>Test Activity View</h1>
        <p>{viewModel.message}</p>
        <p>This is a test activity view component.</p>
        <button onClick={() => viewModel.clickButton()}>Click Me</button>
    </div>
    )
}

export default observer(TestActivityView);