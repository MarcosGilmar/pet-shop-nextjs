import { AppointmentPeriod } from '@/types/appointment';
import { Cloudy, Moon, Sun } from 'lucide-react';
import { AppointmentCard } from '../appointment-card';

type PeriodProps = {
  period: AppointmentPeriod[];
};

const periodIcons = {
  morning: <Sun className="text-accent-blue" />,
  afternoon: <Cloudy className="text-accent-orange" />,
  evening: <Moon className="text-accent-yellow" />,
};

export function PeriodSection({ period }: PeriodProps) {
  return (
    <>
      {period.map((period) => (
        <section
          key={period.type}
          className="mb-8 bg-background-tertiary rounded-xl"
        >
          <div className="flex items-center justify-between px-5 py-3">
            <div className="flex items-center gap-2">
              {periodIcons[period.type]}
              <h2 className="text-label-large-size text-content-primary">
                {period.title}
              </h2>
            </div>
            <span className="text-content-secondary text-label-large-size">
              {period.timeRange}
            </span>
          </div>

          {period.appointments.length > 0 ? (
            <div className="p-5">
              <div>
                {period.appointments.map((appointment, index) => (
                  <AppointmentCard key={index} appointment={appointment} />
                ))}
              </div>
            </div>
          ) : (
            <p className="text-paragraph-small-size text-content-secondary p-5">
              Nenhum agendamento para este período
            </p>
          )}
        </section>
      ))}
    </>
  );
}
