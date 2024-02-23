import {
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  VStack,
  useCheckboxGroup
} from '@chakra-ui/react'
import { Create } from '@refinedev/chakra-ui'
import {
  IResourceComponentsProps,
  useGo,
  useList,
  useParsed,
  useSelect
} from '@refinedev/core'
import { useForm } from '@refinedev/react-hook-form'
import { Weapon } from '../../../models'

const UnitCompositionOptionCreate: React.FC<IResourceComponentsProps> = () => {
  const { params } = useParsed()

  const unitId = params?.unitId
  const unitCompositionId = params?.unitCompositionId

  const go = useGo()

  const { getCheckboxProps } = useCheckboxGroup()

  const {
    refineCore: { formLoading },
    saveButtonProps,
    register,
    formState: { errors }
  } = useForm({
    refineCoreProps: {
      onMutationSuccess: async () => {
        go({
          query: {
            unitId,
            unitCompositionId
          },
          to: '../'
        })
      },

      redirect: false
    },
    defaultValues: {
      unit_composition: unitCompositionId,
      unit_wargear: null
    }
  })
  const { options: weaponOptions } = useSelect({
    resource: 'weapons',
    optionLabel: 'name',
    filters: [
      {
        field: 'unit',
        operator: 'eq',
        value: unitId
      }
    ],
    sorters: [
      {
        field: 'name',
        order: 'asc'
      }
    ]
  })

  const { data: weapons } = useList<Weapon>({
    resource: 'weapons',
    filters: [
      {
        field: 'unit',
        operator: 'eq',
        value: unitId
      }
    ]
  })

  const { options: unitWargearOptions } = useSelect({
    resource: 'unit_wargears',
    optionLabel: 'weapon',
    filters: [
      {
        field: 'unit_composition',
        operator: 'eq',
        value: unitCompositionId
      }
    ]
  })

  return (
    <Create
      isLoading={formLoading}
      saveButtonProps={saveButtonProps}
    >
      <FormControl mb='3'>
        <FormLabel>Weapon to replace</FormLabel>
        <Select
          placeholder='Select weapon to replace'
          {...register('unit_wargear')}
        >
          {unitWargearOptions?.map((option) => (
            <option
              value={option.value}
              key={option.value}
            >
              {weapons?.data?.find((weapon) => weapon.id === option.label)
                ?.name ?? option.label}
            </option>
          ))}
        </Select>
      </FormControl>
      <FormControl
        mb='3'
        isInvalid={!!(errors as any)?.count}
      >
        <FormLabel>Count</FormLabel>
        <Input
          type='number'
          {...register('count', {
            valueAsNumber: true
          })}
        />
      </FormControl>
      <FormControl
        mb='3'
        isInvalid={!!errors?.weapon}
      >
        <FormLabel>Weapons</FormLabel>
        <VStack alignItems='flex-start'>
          {weaponOptions?.map((option) => (
            <Checkbox
              key={option.value}
              {...register('weapons', { required: 'This field is required' })}
              {...getCheckboxProps({ value: option.value })}
            >
              {weapons?.data?.find((weapon) => weapon.id === option.label)
                ?.name ?? option.label}
            </Checkbox>
          ))}
        </VStack>

        <FormErrorMessage>
          {(errors as any)?.weapons?.message as string}
        </FormErrorMessage>
      </FormControl>
    </Create>
  )
}

export default UnitCompositionOptionCreate
