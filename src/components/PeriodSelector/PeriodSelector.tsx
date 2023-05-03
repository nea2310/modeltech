import { FC } from 'react';
import { ListBox } from 'primereact/listbox';

import { Option } from '../../types/Option';

type Props = {
  options: Option[];
  onChange?: (value: string) => void;
};

const PeriodSelector: FC<Props> = ({ options, onChange }) => {
  return (
    <div className="card flex justify-content-center">
      <ListBox
        onChange={(event) => {
          const value = event.value as Option;

          onChange?.(value.code);
        }}
        options={options}
        optionLabel="name"
        className="w-full md:w-14rem"
      />
    </div>
  );
};

export { PeriodSelector };
