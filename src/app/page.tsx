import { AppointmentForm } from '@/components/appointment-form';
import { DatePicker } from '@/components/date-picker';
import { PeriodSection } from '@/components/period-section';
import { Button } from '@/components/ui/button';
import { prisma } from '@/lib/prisma';
import { groupAppointmentsByPeriod } from '@/utils/appointment-utils';
import { endOfDay, parseISO, startOfDay } from 'date-fns';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ date?: string }>;
}) {
  const { date } = await searchParams;

  const selectedDate = date ? parseISO(date) : new Date();

  const appointments = await prisma.appointment.findMany({
    where: {
      scheduleAt: {
        gte: startOfDay(selectedDate),
        lte: endOfDay(selectedDate),
      },
    },
    orderBy: {
      scheduleAt: 'asc',
    },
  });

  const periods = groupAppointmentsByPeriod(appointments);

  return (
    <div className="bg-background-primary p-6">
      <div className="flex items-center justify-between mb-8 gap-4">
        <div className="">
          <h1 className="text-title-size text-content-primary mb-2">
            Sua agenda
          </h1>
          <p className="text-paragraph-medium-size text-content-secondary">
            Aqui você pode ver todos os clientes e serviços agendados para hoje.
          </p>
        </div>
        <div className="hidden md:flex items-center gap-">
          <DatePicker />
        </div>
      </div>

      <div className="mb-8 md:hidden">
        <DatePicker />
      </div>

      <PeriodSection period={periods} />

      <div
        className="
        fixed bottom-0 left-0 right-0 flex justify-center 
        bg-[#23242C] py-4.5 px-6 md:right-6 md:left-auto
        md:top-auto md:w-auto md:bg-transparent md:p-0
        "
      >
        <div className="text-right mt-2 md:mt-0 py-4 col-span-2 md:col-span-1 flex justify-end">
          <AppointmentForm>
            <Button variant="brand">Novo agendamento</Button>
          </AppointmentForm>
        </div>
      </div>
    </div>
  );
}
