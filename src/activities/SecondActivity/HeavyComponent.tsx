function HeavyComponent() {
    // Simulate a heavy component with a large computation or data processing
    const computeHeavyTask = () => {
        let sum = 0;
        for (let i = 0; i < 1e7; i++) {
            sum += i;
        }
        return sum;
    };
    const result = computeHeavyTask();
    return (
        <div>
            <h2>Heavy Component</h2>
            <p>Computation Result: {result}</p>
            <p>Current Date and Time: {new Date().toLocaleString()}</p>
        </div>
    );
}
export default HeavyComponent;