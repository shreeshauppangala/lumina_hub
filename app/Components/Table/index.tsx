import DataTable, { TableProps } from 'react-data-table-component';
import { theme } from '@/app/theme/theme';
import {
  cells,
  headCells,
  headRow,
  noData,
  progress,
  rowStyles,
} from './styles';

const Table = (props: TableProps<any>) => {
  const {
    customStyles,
    // paginationPerPage = 10,
    paginationTotalRows = 10,
    // progressComponent,
  } = props;

  /**
   * Checks if the number of total rows in a pagination exceeds 10.
   * @param {number} paginationTotalRows - The total number of rows in the pagination.
   * @returns {boolean} True if the pagination is paginated, false otherwise.
   */
  const isPaginated = paginationTotalRows > 10;

  /**
   * Defines the style object for rows, including the last row style.
   * @param {Object} rowStyles - The base row styles.
   * @param {boolean} isPaginated - Indicates whether the rows are paginated.
   * @param {Object} theme - The theme object.
   * @returns {Object} - The style object for rows.
   */
  const rows = {
    style: {
      ...rowStyles,
      ':last-of-type': {
        borderRadius: isPaginated ? 0 : theme.spacing(0, 0, 6, 6),
      },
    },
  };
  /**
   * A component that displays pagination for the table.
   * @param {PaginationComponentProps} props - The props for the component.
   * @returns A component that displays pagination for the table.
   */
  // const PaginationComponent = useCallback(
  //   ({ rowCount, currentPage, onChangePage }: PaginationComponentProps) => (
  //     <PaginationContainer>
  //       <Pagination
  //         currentPage={currentPage}
  //         totalPages={Math.ceil(rowCount / paginationPerPage)}
  //         onClickPreviousPage={() => onChangePage(currentPage - 1, paginationPerPage)}
  //         onClickNextPage={() => onChangePage(currentPage + 1, paginationPerPage)}
  //       />
  //     </PaginationContainer>
  //   ),
  //   [],
  // );

  return (
    <DataTable
      {...props}
      customStyles={{
        headRow,
        headCells,
        rows,
        cells,
        progress,
        noData,
        ...customStyles,
      }}
      persistTableHead
      pagination={isPaginated}
      paginationServer={isPaginated}
      // paginationComponent={PaginationComponent}
      // progressComponent={progressComponent || <Loader type='table' />}
    />
  );
};

export default Table;
