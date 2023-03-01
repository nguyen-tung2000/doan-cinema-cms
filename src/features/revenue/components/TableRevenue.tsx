import {
  Thead,
  Tbody,
  chakra,
  Table,
  Tr,
  Th,
  Td,
  Icon,
  Input,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItemOption,
  MenuOptionGroup,
  Stack,
  Select,
  Text,
  Box,
} from '@chakra-ui/react';
import * as FileSaver from 'file-saver';
import * as React from 'react';
import { FiArrowRight, FiArrowDown } from 'react-icons/fi';
import { GoTriangleDown, GoTriangleUp } from 'react-icons/go';
import { ImFileExcel } from 'react-icons/im';
import {
  useTable,
  usePagination,
  useGroupBy,
  useExpanded,
  useSortBy,
  useAsyncDebounce,
  useGlobalFilter,
} from 'react-table';
import { v4 as uuidv4 } from 'uuid';
import * as XLSX from 'xlsx';

import { mapDataRevenue } from '@/features/revenue';

const MenuFilter = ({ headerGroups }: any) => {
  return (
    <Menu closeOnSelect={false}>
      <MenuButton as={Button} colorScheme="blue">
        Nhóm theo
      </MenuButton>
      <MenuList minWidth="240px">
        <MenuOptionGroup title="Nhóm" type="checkbox">
          {headerGroups[1].headers
            .filter((column: any) => column.canGroupBy)
            .map((column: any) => (
              <MenuItemOption
                value={column.render('Header')}
                {...column.getGroupByToggleProps()}
                key={uuidv4()}
              >
                {column.render('Header')}
              </MenuItemOption>
            ))}
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
};
const GlobalFilter = ({ preGlobalFilteredRows, globalFilter, setGlobalFilter }: any) => {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <chakra.span display="flex" alignItems="center">
      <Input
        variant="outline"
        placeholder={`Search: ${count} records...`}
        value={value || ''}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
      />
    </chakra.span>
  );
};
const ButtonExportCSV = ({ csvData, fileName }: { csvData: any; fileName: string }) => {
  const fileType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=URF-8';
  const fileExtension = '.xlsx';

  const handleExport = (csvData: any, fileName: string) => {
    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <Button
      leftIcon={<ImFileExcel />}
      colorScheme="green"
      onClick={() => handleExport(csvData, fileName)}
    >
      Export to Excel
    </Button>
  );
};

interface TableRevenueProps {
  rowsTable: any;
  columnsTable: any;
}

export const TableRevenue: React.FC<TableRevenueProps> = ({ rowsTable, columnsTable }) => {
  const data = React.useMemo(() => mapDataRevenue(rowsTable), [rowsTable]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize, globalFilter },
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    { columns: columnsTable, data },
    useGroupBy,
    useGlobalFilter,
    useSortBy,
    useExpanded,
    usePagination,
  ) as any;

  return (
    <Box overflow="scroll">
      <Stack spacing={2} direction="row" justifyContent="flex-end" marginY={3}>
        <GlobalFilter
          preGlobalFilteredRows={preGlobalFilteredRows}
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
        <MenuFilter headerGroups={headerGroups} />
        <ButtonExportCSV csvData={rowsTable} fileName="doanhthu" />
      </Stack>

      <Table {...getTableProps()} marginY="5">
        <Thead>
          {headerGroups.map((headerGroup: any) => (
            <Tr {...headerGroup.getHeaderGroupProps()} key={uuidv4()}>
              {headerGroup.headers.map((column: any) => (
                <Th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  isNumeric={column.isNumeric}
                  key={uuidv4()}
                >
                  {column.render('Header')}
                  <chakra.span pl="4">
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <Icon as={GoTriangleDown} aria-label="sorted descending" />
                      ) : (
                        <Icon as={GoTriangleUp} aria-label="sorted ascending" />
                      )
                    ) : null}
                  </chakra.span>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page.map((row: any) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()} key={uuidv4()}>
                {row.cells.map((cell: any) => (
                  <Td key={uuidv4()} {...cell.getCellProps()} padding={2}>
                    {cell.isGrouped ? (
                      // If it's a grouped cell, add an expander and row count
                      <>
                        <chakra.span {...row.getToggleRowExpandedProps()}>
                          {row.isExpanded ? (
                            <Icon as={FiArrowDown} aria-label="expanded" />
                          ) : (
                            <Icon as={FiArrowRight} aria-label="unexpanded" />
                          )}
                        </chakra.span>
                        {cell.render('Cell')} ({row.subRows.length})
                      </>
                    ) : cell.isAggregated ? (
                      // If the cell is aggregated, use the Aggregated
                      // renderer for cell
                      cell.render('Aggregated')
                    ) : cell.isPlaceholder ? null : ( // For cells with repeated values, render null
                      // Otherwise, just render the regular cell
                      cell.render('Cell')
                    )}
                  </Td>
                ))}
              </Tr>
            );
          })}
        </Tbody>
        <tfoot>
          {footerGroups.map((group: any) => (
            <tr {...group.getFooterGroupProps()} key={uuidv4()}>
              {group.headers.map((column: any) => (
                <td {...column.getFooterProps()} key={uuidv4()}>
                  {column.render('Footer')}
                </td>
              ))}
            </tr>
          ))}
        </tfoot>
      </Table>

      <Stack spacing={3} direction="row">
        <Button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </Button>
        <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </Button>
        <Button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </Button>
        <Button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </Button>
        <chakra.span display="flex" alignItems="center">
          Trang
          <Text as="strong" marginLeft="4px">
            {pageIndex + 1} trên {pageOptions.length}
          </Text>
        </chakra.span>
        <chakra.span>
          | Đi đến trang:{' '}
          <Input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            width="100px"
          />
        </chakra.span>{' '}
        <Select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
          maxWidth="240px"
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Xem {pageSize}
            </option>
          ))}
        </Select>
      </Stack>
    </Box>
  );
};
