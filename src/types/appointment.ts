export type PeriodAlias = 'morning' | 'afternoon' | 'evening';

export type Appointment = {
  id: string;
  time: string;
  petName: string;
  tutorName: string;
  description: string;
  phone: string;
  scheduleAt: Date;
  period: PeriodAlias;
};

export type AppointmentPeriod = {
  title: string;
  type: PeriodAlias;
  timeRange: string;
  appointments: Appointment[];
};
