import Mailchimp from '@mailchimp/mailchimp_transactional';

export interface Appointment {
  date: Date | undefined;
  time: string;
}

export interface MailChimpResponse {
  success: boolean;
  response: Mailchimp.MessagesSendResponse[];
}

export interface GoogleSheetsResponse {
  success: boolean;
  message: string;
}
