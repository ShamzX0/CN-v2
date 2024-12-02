// Helper function to format large numbers

export default function formatLargeNumber(num: number) {
    if (!num) return '0';

    // Convert to trillion
    const trillion = 1000000000000;
    const billion = 1000000000;
    const million = 1000000;

    if (num >= trillion) {
        return `${(num / trillion).toFixed(2)}T`;
    } else if (num >= billion) {
        return `${(num / billion).toFixed(2)}B`;
    } else if (num >= million) {
        return `${(num / million).toFixed(2)}M`;
    } else {
        return `${num.toFixed(1)}`;
    }
};
