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
  CreateButton,
  EditButton,
  List,
  usePagination
} from '@refinedev/chakra-ui'
import { IResourceComponentsProps, useGo, useParsed } from '@refinedev/core'
import { useTable } from '@refinedev/react-table'
import { IconChevronLeft, IconChevronRight } from '@tabler/icons'
import { ColumnDef, flexRender } from '@tanstack/react-table'
import React from 'react'

const ModelList: React.FC<IResourceComponentsProps> = () => {
  const { params } = useParsed()
  const codexId = params?.codexId

  const go = useGo()

  const columns = React.useMemo<ColumnDef<any>[]>(
    () => [
      {
        id: 'name',
        accessorKey: 'name',
        header: 'Name'
      },
      {
        id: 'm',
        accessorKey: 'm',
        header: 'M'
      },
      {
        id: 't',
        accessorKey: 't',
        header: 'T'
      },
      {
        id: 'sv',
        accessorKey: 'sv',
        header: 'Sv'
      },
      {
        id: 'w',
        accessorKey: 'w',
        header: 'W'
      },
      {
        id: 'ld',
        accessorKey: 'ld',
        header: 'Ld'
      },
      {
        id: 'oc',
        accessorKey: 'oc',
        header: 'Oc'
      },
      {
        id: 'actions',
        accessorKey: 'id',
        header: 'Actions',
        cell: function render({ getValue }) {
          return (
            <HStack>
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
      sorters: {
        initial: [
          {
            field: 'name',
            order: 'asc'
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
              to: 'create',
              query: {
                codexId
              }
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

export default ModelList
