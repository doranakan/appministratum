import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select
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

  const {
    refineCore: { formLoading },
    saveButtonProps,
    register,
    formState: { errors }
  } = useForm({
    refineCoreProps: {
      onMutationSuccess: () =>
        go({
          query: {
            unitId,
            unitCompositionId
          },
          to: '../'
        }),
      redirect: false
    },
    defaultValues: {
      unit_composition: unitCompositionId,
      unit_composition_wargear: null
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

  const { options: unitCompositionWargearOptions } = useSelect({
    resource: 'unit_composition_wargears',
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
      <FormControl
        mb='3'
        isInvalid={!!errors?.weapon}
      >
        <FormLabel>Weapon</FormLabel>
        <Select
          placeholder='Select weapon'
          {...register('weapon', {
            required: 'This field is required'
          })}
        >
          {weaponOptions?.map((option) => (
            <option
              value={option.value}
              key={option.value}
            >
              {option.label}
            </option>
          ))}
        </Select>
        <FormErrorMessage>
          {(errors as any)?.weapon?.message as string}
        </FormErrorMessage>
      </FormControl>
      <FormControl mb='3'>
        <FormLabel>Weapon to replace</FormLabel>
        <Select
          placeholder='Select weapon to replace'
          defaultValue={null}
          {...register('unit_composition_wargear')}
        >
          {unitCompositionWargearOptions?.map((option) => (
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
    </Create>
  )
}

export default UnitCompositionOptionCreate
