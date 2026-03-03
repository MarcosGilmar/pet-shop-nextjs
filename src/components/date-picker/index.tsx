'use client';

import {
  Calendar as CalendarIcon,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  PanelTopBottomDashed,
} from 'lucide-react';
import { Button } from '../ui/button';
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { addDays, format, isValid } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { NavigationButton } from './navigation-button';

export function DatePicker() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const dateParam = searchParams.get('date');

  const getInitialDate = useCallback(() => {
    if (!dateParam) return;

    const [day, month, year] = dateParam.split('-').map(Number);

    const parsedData = new Date(day, month - 1, year);

    if (!isValid(parsedData)) return new Date();

    return parsedData;
  }, [dateParam]);

  const [date, setDate] = useState<Date | undefined>(getInitialDate);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const updateURLWithDate = (selectedDate: Date | undefined) => {
    if (!selectedDate) return;

    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set('date', format(selectedDate, 'yyyy-MM-dd'));
    router.push(`${pathname}?${newParams.toString()}`);
  };

  const handleNavigateDay = (days: number) => {
    const newDate = addDays(date || new Date(), days);
    updateURLWithDate(newDate);
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    updateURLWithDate(selectedDate);
    setIsPopoverOpen(false);
  };

  useEffect(() => {
    const newDate = getInitialDate();

    if (date?.getTime() !== newDate?.getTime()) {
      setDate(newDate);
    }
  }, [date, getInitialDate]);

  return (
    <div className="flex items-center gap-2">
      <NavigationButton
        tooltipText="Dia anterior"
        onClick={() => handleNavigateDay(-1)}
      >
        <ChevronLeft className="h-4 w-4" />
      </NavigationButton>

      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="
                w-min[180px] justify-between text-left font-normal 
                bg-transparent border-border-primary text-content-primary
                hover:bg-background-tertiary hover:border-border-secondary
                hover:text-content-primary focus-visible:ring-offset-0 focus-visible:ring-1
                focus-visible:ring-border-brand focus:border-border-brand 
                focus-visible:border-border-brand"
          >
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4 text-content-brand" />
              {date ? (
                format(date, 'PPP', { locale: ptBR })
              ) : (
                <span>Selecione uma data</span>
              )}
            </div>
            <ChevronDown className="w-4 h-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            autoFocus
            locale={ptBR}
          />
        </PopoverContent>
      </Popover>

      <NavigationButton
        tooltipText="Próximo dia"
        onClick={() => handleNavigateDay(1)}
      >
        {' '}
        <ChevronRight className="h-4 w-4" />
      </NavigationButton>
    </div>
  );
}
