import { PeriodSection } from '@/components/period-section';
import { prisma } from '@/lib/prisma';
import { groupAppointmentsByPeriod } from '@/utils/appointment-utils';
import { HARDCODED_APPOINTMENT_DATA } from '@/utils/mock-data';

export default async function Home() {
  const periods = groupAppointmentsByPeriod(HARDCODED_APPOINTMENT_DATA);

  const appoints = await prisma.appointment.findMany();

  return (
    <div className="bg-background-primary p-6">
      <div className="flex items-center justify-between mb-8">
        <div className="">
          <h1 className="text-title-size text-content-primary mb-2">
            Sua agenda
          </h1>
          <p className="text-paragraph-medium-size text-content-secondary">
            Aqui você pode ver todos os clientes e serviços agendados para hoje.
          </p>
        </div>
      </div>
      <PeriodSection period={periods} />
    </div>
  );
}
