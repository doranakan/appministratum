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
  useParsed,
  useSelect
} from '@refinedev/core'
import { useForm } from '@refinedev/react-hook-form'
import { UnitComposition } from '../../../models'

const UnitCompositionCreate: React.FC<IResourceComponentsProps> = () => {
  const { params } = useParsed()
  const codexId = params?.codexId
  const unitId = params?.unitId
  const unitTierId = params?.unitTierId

  const go = useGo()

  const {
    refineCore: { formLoading },
    saveButtonProps,
    register,
    formState: { errors }
  } = useForm<UnitComposition>({
    refineCoreProps: {
      onMutationSuccess: () =>
        go({
          query: {
            codexId,
            unitId,
            unitTierId
          },
          to: '../'
        }),
      redirect: false
    },
    defaultValues: {
      unit_tier: unitTierId
    }
  })

  const { options: modelOptions } = useSelect({
    resource: 'models',
    optionLabel: 'name',
    filters: [
      {
        field: 'codex',
        operator: 'eq',
        value: codexId
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
        isInvalid={!!errors?.model}
      >
        <FormLabel>Model</FormLabel>
        <Select
          placeholder='Select model'
          {...register('model', {
            required: 'This field is required'
          })}
        >
          {modelOptions?.map((option) => (
            <option
              value={option.value}
              key={option.value}
            >
              {option.label}
            </option>
          ))}
        </Select>
        <FormErrorMessage>
          {(errors as any)?.model?.message as string}
        </FormErrorMessage>
      </FormControl>
      <FormControl
        mb='3'
        isInvalid={!!(errors as any)?.count}
      >
        <FormLabel>Count</FormLabel>
        <Input
          type='number'
          {...register('count', {
            required: 'This field is required',
            valueAsNumber: true
          })}
        />
        <FormErrorMessage>
          {(errors as any)?.count?.message as string}
        </FormErrorMessage>
      </FormControl>
    </Create>
  )
}

export default UnitCompositionCreate
