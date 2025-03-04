

export const calculateDuration = (entryTime: Date, departureTime: Date) => {
    if (departureTime === null) {
        return "En curso";
    }
    const diffInMinutes = Math.floor((departureTime.getTime() - entryTime.getTime()) / (1000 * 60));
    const hours = Math.floor(diffInMinutes / 60);
    const minutes = diffInMinutes % 60;
    
    if (hours > 0) {
        return `${hours} ${hours === 1 ? 'hora' : 'horas'}${minutes > 0 ? ` ${minutes} min` : ''}`;
    }
    return `${minutes} min`;
};