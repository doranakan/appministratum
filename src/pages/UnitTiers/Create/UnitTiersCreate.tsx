import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input
} from '@chakra-ui/react'
import { Create } from '@refinedev/chakra-ui'
import {
  IResourceComponentsProps,
  useGo,
  useParsed,
  useSelect
} from '@refinedev/core'
import { useForm } from '@refinedev/react-hook-form'
import { UnitTier } from '../../../models/unitTier'

const UnitTiersCreate: React.FC<IResourceComponentsProps> = () => {
  const { params } = useParsed()
  const codexId = params?.codexId
  const unitId = params?.unitId

  const go = useGo()

  const {
    refineCore: { formLoading },
    saveButtonProps,
    register,
    formState: { errors }
  } = useForm<UnitTier>({
    refineCoreProps: {
      onMutationSuccess: () =>
        go({
          query: {
            codexId,
            unitId
          },
          to: '../'
        }),
      redirect: false
    },
    defaultValues: {
      unit: unitId
    }
  })

  const { options: unitOptions } = useSelect({
    resource: 'units',
    optionLabel: 'name'
  })

  return (
    <Create
      isLoading={formLoading}
      saveButtonProps={saveButtonProps}
    >
      {/* <FormControl mb="3" isInvalid={!!errors?.unit}>
                <FormLabel>Unit</FormLabel>
                <Select
                    placeholder="Select unit"
                    {...register("unit", {
                        required: "This field is required",
                    })}
                >
                    {unitOptions?.map((option) => (
                        <option value={option.value} key={option.value}>
                            {option.label}
                        </option>
                    ))}
                </Select>
                <FormErrorMessage>
                    {(errors as any)?.unit?.message as string}
                </FormErrorMessage>
            </FormControl> */}
      <FormControl
        mb='3'
        isInvalid={!!(errors as any)?.points}
      >
        <FormLabel>Points</FormLabel>
        <Input
          type='number'
          {...register('points', {
            required: 'This field is required',
            valueAsNumber: true
          })}
        />
        <FormErrorMessage>
          {(errors as any)?.points?.message as string}
        </FormErrorMessage>
      </FormControl>
    </Create>
  )
}

export default UnitTiersCreate
