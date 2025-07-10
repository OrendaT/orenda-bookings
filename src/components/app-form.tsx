import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { US_STATES } from '@/lib/constants';
import type { Appointment } from '@/lib/types';
import axios from 'axios';
import { format } from 'date-fns';
import { AppFormSchema, appFormSchema } from '@/lib/schemas';
import { AlertDialogProps } from '@radix-ui/react-alert-dialog';
import { XIcon } from 'lucide-react';

type AppFormProps = AlertDialogProps & {
  appointment: Appointment;
  onFinish: () => void;
};

const defaultValues = {
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  state: '',
};

const AppForm = ({ appointment, onFinish, ...props }: AppFormProps) => {
  const form = useForm({
    resolver: zodResolver(appFormSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting, isValid },
  } = form;

  const onSubmit = handleSubmit(async (data: AppFormSchema) => {
    const emails = [
      axios.post('/api/send-form', {
        first_name: data.first_name,
        email: data.email,
      }),
      axios.post('/api/alert-intake', {
        ...data,
        time: appointment.time,
        date: format(appointment.date!, 'PPP'),
      }),
    ];

    await Promise.all(emails);

    reset(defaultValues);
    onFinish();
  });

  return (
    <AlertDialog {...props}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Basic Info</AlertDialogTitle>
          <AlertDialogDescription>
            Please fill the fields below to complete your booking
          </AlertDialogDescription>

          <AlertDialogCancel className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 size-8 p-1 right-4 rounded-md opacity-70 transition-opacity hover:opacity-100 focus:ring-1 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
            <XIcon />
            <span className="sr-only">Close</span>
          </AlertDialogCancel>
        </AlertDialogHeader>

        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-4" noValidate>
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g John" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g johndoe@gmail.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g +2124567890"
                      type="tel"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State of Residence</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select your state of residence" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {US_STATES.map(({ value }) => (
                        <SelectItem key={value} value={value}>
                          {value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              className="bg-orenda-purple mx-auto mt-12 flex rounded-full px-12"
              type="submit"
              disabled={!isValid}
              isLoading={isSubmitting}
            >
              Submit
            </Button>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default AppForm;
