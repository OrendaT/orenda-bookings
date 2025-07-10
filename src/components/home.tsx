'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { useState } from 'react';
import type { IconType } from 'react-icons/lib';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import AppForm from '@/components/app-form';
import type { Appointment } from '@/lib/types';
import { INTAKE_FORM_URL, timePeriods } from '@/lib/constants';

const initialValues: Appointment = {
  date: undefined,
  time: '',
};

function TimePeriodHeader({
  Icon,
  period,
}: {
  Icon: IconType;
  period: string;
}) {
  return (
    <h2 className="flex items-center gap-2 text-sm font-medium tracking-widest capitalize sm:w-36">
      <Icon className="size-5" /> {period}:
    </h2>
  );
}

function TimePeriod({
  period,
  onChange,
  name,
  value,
}: {
  period: { label: string; value: string };
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <label className="clamp-[px,3,6] flex cursor-pointer text-sm text-zinc-700 select-none">
      <input
        className="peer hidden"
        type="radio"
        name={name}
        checked={period.value === value}
        value={period.value}
        onChange={onChange}
      />
      <span className="border-orenda-green peer-checked:text-orenda-green peer-checked:bg-orenda-green/5 w-full rounded-md py-1 text-center whitespace-nowrap transition-all duration-300 peer-checked:border peer-checked:font-medium">
        {period.label}
      </span>
    </label>
  );
}

function TimePeriodRow({
  timePeriod,
  appointment,
  setTime,
}: {
  timePeriod: (typeof timePeriods)[number];
  appointment: Appointment;
  setTime: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="clamp-[gap,4,12] flex flex-col items-center sm:flex-row">
      <TimePeriodHeader Icon={timePeriod.Icon} period={timePeriod.label} />

      <Carousel className="w-full">
        <CarouselContent className="max-w-md">
          {timePeriod.periods.map((period) => (
            <CarouselItem
              key={period.value}
              className="basis-1/4 content-center pl-0 lg:basis-[23%]"
            >
              <TimePeriod
                name="time"
                period={period}
                value={appointment.time}
                onChange={setTime}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious
          type="button"
          className="disabled:hidden"
          variant="link"
        />
        <CarouselNext type="button" className="disabled:hidden" />
      </Carousel>
    </div>
  );
}

export default function Home() {
  const [open, setOpen] = useState(false);
  const [appointment, setAppointment] = useState(() => initialValues);

  const isValid = appointment.date && appointment.time;

  const setTime = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setAppointment({
      ...appointment,
      [name]: value,
    });
  };

  const setDate = (date?: Date) => {
    setAppointment({
      ...appointment,
      date,
    });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValid) return;

    setOpen(true);
    console.log(appointment);
  };

  const onFinish = () => {
    setAppointment(initialValues);
    setOpen(false);
    location.href = INTAKE_FORM_URL;
  };

  return (
    <>
      <main className="padding-inline flex min-h-dvh flex-col items-center pt-24 pb-20">
        <h1 className="font-heading clamp-[text,2xl,4xl] mb-8 text-center font-bold">
          Book Your Mental Health Intake
        </h1>

        <h2 className="mb-8 text-center">Choose a time that works for you</h2>

        <form onSubmit={onSubmit} className="">
          <Calendar
            mode="single"
            selected={appointment.date}
            onSelect={setDate}
            className="mx-auto mb-12 rounded-lg [--cell-size:--spacing(11)] md:[--cell-size:--spacing(12)]"
            buttonVariant="ghost"
            disabled={(date) => {
              const today = new Date();
              today.setHours(0, 0, 0, 0);
              return date < today;
            }}
            classNames={{
              caption_label: 'clamp-[text,lg,xl] font-medium',
            }}
          />

          <section className="mb-12 divide-y divide-zinc-200 border-y border-zinc-200 *:py-4">
            {timePeriods.map((timePeriod) => (
              <TimePeriodRow
                key={timePeriod.label}
                timePeriod={timePeriod}
                appointment={appointment}
                setTime={setTime}
              />
            ))}
          </section>

          <Button
            className="bg-orenda-purple mx-auto flex rounded-full px-14"
            type="submit"
            disabled={!isValid}
          >
            Proceed
          </Button>
        </form>
      </main>

      {
        <AppForm
          open={open}
          onOpenChange={setOpen}
          appointment={appointment}
          onFinish={onFinish}
        />
      }
    </>
  );
}
