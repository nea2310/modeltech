import { FC } from 'react';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';

import { Entry } from '../../types/Entry';

type Props = {
  entries: Entry[];
};

const Table: FC<Props> = ({ entries }) => {
  return (
    <div className="table">
      <DataTable value={entries} tableStyle={{ minWidth: '50rem' }}>
        <Column field="Дата" header="Дата" />
        <Column
          field="Добыча жидкости, м3/сут"
          header="Добыча жидкости, м3/сут"
        />
        <Column field="Добыча нефти, т/сут" header="Добыча нефти, т/сут" />
      </DataTable>
    </div>
  );
};

export { Table };
