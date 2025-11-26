import { FirstActivityData } from '../activities/FirstActivity/FirstActivityViewModel';

// Mock data generator
export const generateMockData = (): FirstActivityData[] => {
    return [
        { id: 1, name: 'Item One' },
        { id: 2, name: 'Item Two' },
        { id: 3, name: 'Item Three' },
        { id: 4, name: 'Item Four' },
        { id: 5, name: 'Item Five' }
    ];
};

// Mock API handler
export const mockApiHandler = (url: string): Response | null => {
    if (url.includes('/api/first-activity')) {
        const data = generateMockData();
        return new Response(JSON.stringify(data), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    }
    return null;
};
