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
import { CreateButton, List, usePagination } from '@refinedev/chakra-ui'
import {
  GetManyResponse,
  IResourceComponentsProps,
  useGo,
  useMany,
  useParsed
} from '@refinedev/core'
import { useTable } from '@refinedev/react-table'
import { IconChevronLeft, IconChevronRight } from '@tabler/icons'
import { ColumnDef, flexRender } from '@tanstack/react-table'
import React from 'react'

const UnitCompositionList: React.FC<IResourceComponentsProps> = () => {
  const { params } = useParsed()
  const codexId = params?.codexId
  const unitId = params?.unitId
  const unitTierId = params?.unitTierId

  const go = useGo()

  const columns = React.useMemo<ColumnDef<any>[]>(
    () => [
      {
        id: 'unit_tier',
        header: 'Unit Tier',
        accessorKey: 'unit_tier',
        cell: function render({ getValue, table }) {
          const meta = table.options.meta as {
            unitTierData: GetManyResponse
          }

          const unitTier = meta.unitTierData?.data?.find(
            (item) => item.id == getValue<any>()
          )

          return unitTier?.points ?? 'Loading...'
        }
      },
      {
        id: 'count',
        accessorKey: 'count',
        header: 'Count'
      },
      {
        id: 'model',
        header: 'Model',
        accessorKey: 'model',
        cell: function render({ getValue, table }) {
          const meta = table.options.meta as {
            modelData: GetManyResponse
          }

          const model = meta.modelData?.data?.find(
            (item) => item.id == getValue<any>()
          )

          return model?.name ?? 'Loading...'
        }
      },
      {
        id: 'actions',
        accessorKey: 'id',
        header: 'Actions',
        cell: function render({ getValue }) {
          return (
            <HStack>
              <Button
                onClick={() =>
                  go({
                    to: '../unit_wargears',
                    query: {
                      unitId,
                      unitCompositionId: getValue()
                    }
                  })
                }
              >
                Wargear
              </Button>
              <Button
                onClick={() =>
                  go({
                    to: '../unit_options',
                    query: {
                      unitId,
                      unitCompositionId: getValue()
                    }
                  })
                }
              >
                Options
              </Button>
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
            field: 'unit_tier',
            operator: 'eq',
            value: unitTierId
          }
        ]
      }
    }
  })

  const { data: unitTierData } = useMany({
    resource: 'unit_tiers',
    ids: tableData?.data?.map((item) => item?.unit_tier) ?? [],
    queryOptions: {
      enabled: !!tableData?.data
    }
  })

  const { data: modelData } = useMany({
    resource: 'models',
    ids: tableData?.data?.map((item) => item?.model) ?? [],
    queryOptions: {
      enabled: !!tableData?.data
    }
  })

  setOptions((prev) => ({
    ...prev,
    meta: {
      ...prev.meta,
      unitTierData,
      modelData
    }
  }))

  return (
    <List
      headerButtons={() => (
        <CreateButton
          onClick={() =>
            go({
              to: 'create',
              query: {
                codexId,
                unitId,
                unitTierId
              }
            })
          }
        />
      )}
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

export default UnitCompositionList
