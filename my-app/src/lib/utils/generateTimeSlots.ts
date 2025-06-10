// generateTimeSlots.ts
export function generateTimeSlots(dateString: string): string[] {
  const slots: string[] = [];
  const startHour = 9;
  const endHour = 20;
  const date = new Date(dateString);

  for (let hour = startHour; hour <= endHour; hour++) {
    const slot = new Date(date.setHours(hour, 0, 0, 0));
    slots.push(slot.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }));
  }

  return slots;
}
