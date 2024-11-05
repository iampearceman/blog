import { format } from 'date-fns';

interface DateTimeProps {
    format?: string;
}

export function DateTime({ format: formatString = 'MMMM Do, yyyy' }: DateTimeProps) {
  return (
    <time dateTime={new Date().toISOString()}>
      {format(new Date(), formatString
        .replace('YYYY', 'yyyy')
        .replace('YY', 'yy')
      )}
    </time>
  );
}