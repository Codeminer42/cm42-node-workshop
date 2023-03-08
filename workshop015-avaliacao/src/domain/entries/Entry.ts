import { Money } from '../Money';

namespace Entry {
  export type Type = Readonly<{
    id: string;
    ledgerId: string;
    type: 'in' | 'out';
    value: Money.Type;
    date: Date;
  }>;

  type EntryProps = {
    id: string;
    ledgerId: string;
    type: 'in' | 'out';
    value: Money.Type;
  };

  export const create = (props: EntryProps): Type => ({
    id: props.id,
    ledgerId: props.ledgerId,
    type: props.type,
    value: props.value,
    date: new Date(),
  });
}

export { Entry };
