import { secondActivityViewModel } from "./secondActivityViewModel";

function SecondActivityView() {

    var vm = secondActivityViewModel();

    return(
        <div>
            <h1>Second Activity View</h1>
            <p>{vm.info}</p>
        </div>
    );
}

export default SecondActivityView;