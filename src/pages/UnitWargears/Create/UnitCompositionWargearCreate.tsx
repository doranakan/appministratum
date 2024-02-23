import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select
} from '@chakra-ui/react'
import { Create } from '@refinedev/chakra-ui'
import {
  IResourceComponentsProps,
  useGo,
  useParsed,
  useSelect
} from '@refinedev/core'
import { useForm } from '@refinedev/react-hook-form'

const UnitCompositionWargearCreate: React.FC<IResourceComponentsProps> = () => {
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
      unit_composition: unitCompositionId
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
    </Create>
  )
}

export default UnitCompositionWargearCreate
