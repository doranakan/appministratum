import {
  Box,
  Button,
  HStack,
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react'
import {
  BooleanField,
  CreateButton,
  EditButton,
  List,
  ShowButton,
  usePagination
} from '@refinedev/chakra-ui'
import { IResourceComponentsProps, useGo, useParsed } from '@refinedev/core'
import { useTable } from '@refinedev/react-table'
import { IconChevronLeft, IconChevronRight } from '@tabler/icons'
import { ColumnDef, flexRender } from '@tanstack/react-table'
import React from 'react'
import { Unit } from '../../../models'

const UnitListPage: React.FC<IResourceComponentsProps> = () => {
  const { params } = useParsed()
  const codexId = params?.codexId

  const go = useGo()

  const columns = React.useMemo<ColumnDef<Unit>[]>(
    () => [
      {
        id: 'id',
        accessorKey: 'id',
        header: 'Id'
      },
      {
        id: 'name',
        accessorKey: 'name',
        header: 'Name'
      },
      {
        id: 'caption',
        accessorKey: 'caption',
        header: 'Caption'
      },
      {
        id: 'leader',
        accessorKey: 'leader',
        header: 'Leader',
        cell: function render({ getValue }) {
          return <BooleanField value={getValue<any>()} />
        }
      },
      {
        id: 'limit',
        accessorKey: 'limit',
        header: 'Limit'
      },
      {
        id: 'actions',
        accessorKey: 'id',
        header: 'Actions',
        cell: function render({ getValue }) {
          return (
            <HStack>
              <ShowButton
                hideText
                recordItemId={getValue() as string}
              />
              <EditButton
                hideText
                recordItemId={getValue() as string}
              />
            </HStack>
          )
        }
      }
    ],
    []
  )

  const {
    getHeaderGroups,
    getRowModel,
    setOptions,
    refineCore: {
      setCurrent,
      pageCount,
      current,
      tableQueryResult: { data: tableData }
    }
  } = useTable({
    columns,
    refineCoreProps: {
      filters: {
        initial: [
          {
            field: 'codex',
            operator: 'eq',
            value: codexId
          }
        ]
      }
    }
  })

  setOptions((prev) => ({
    ...prev,
    meta: {
      ...prev.meta
    }
  }))

  return (
    <List
      headerButtons={
        <CreateButton
          onClick={() =>
            go({
              query: {
                codexId
              },
              to: 'create'
            })
          }
        />
      }
    >
      <TableContainer whiteSpace='pre-line'>
        <Table variant='simple'>
          <Thead>
            {getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Th key={header.id}>
                    {!header.isPlaceholder &&
                      flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {getRowModel().rows.map((row) => (
              <Tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <Td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Pagination
        current={current}
        pageCount={pageCount}
        setCurrent={setCurrent}
      />
    </List>
  )
}

type PaginationProps = {
  current: number
  pageCount: number
  setCurrent: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({
  current,
  pageCount,
  setCurrent
}) => {
  const pagination = usePagination({
    current,
    pageCount
  })

  return (
    <Box
      display='flex'
      justifyContent='flex-end'
    >
      <HStack
        my='3'
        spacing='1'
      >
        {pagination?.prev && (
          <IconButton
            aria-label='previous page'
            onClick={() => setCurrent(current - 1)}
            disabled={!pagination?.prev}
            variant='outline'
          >
            <IconChevronLeft size='18' />
          </IconButton>
        )}

        {pagination?.items.map((page) => {
          if (typeof page === 'string') return <span key={page}>...</span>

          return (
            <Button
              key={page}
              onClick={() => setCurrent(page)}
              variant={page === current ? 'solid' : 'outline'}
            >
              {page}
            </Button>
          )
        })}
        {pagination?.next && (
          <IconButton
            aria-label='next page'
            onClick={() => setCurrent(current + 1)}
            variant='outline'
          >
            <IconChevronRight size='18' />
          </IconButton>
        )}
      </HStack>
    </Box>
  )
}

export default UnitListPage
