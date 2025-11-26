import React, { Suspense, useState } from "react";
import { secondActivityViewModel } from "./secondActivityViewModel";

function SecondActivityView() {
  const LazyComponent = React.lazy(() => import("./HeavyComponent"));
  const [showHeavy, setShowHeavy] = useState(false);

  var vm = secondActivityViewModel();

  return (
    <>
      <div>
        <h1>Second Activity View</h1>
        <p>{vm.info}</p>
        <button onMouseEnter={() => setShowHeavy(true)} onMouseLeave={() => setShowHeavy(false)}>
          Hover to show
        </button>
      </div>
      {showHeavy && (
        <Suspense fallback={<div>Loading heavy component...</div>}>
          <LazyComponent />
        </Suspense>
      )}
    </>
  );
}

export default SecondActivityView;
