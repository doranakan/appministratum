import {
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input
} from '@chakra-ui/react'
import { Create } from '@refinedev/chakra-ui'
import { IResourceComponentsProps, useParsed } from '@refinedev/core'
import { useForm } from '@refinedev/react-hook-form'
import { Unit } from '../../../models'

const UnitCreatePage: React.FC<IResourceComponentsProps> = () => {
  const { params } = useParsed()

  const {
    refineCore: { formLoading },
    saveButtonProps,
    register,
    formState: { errors }
  } = useForm<Unit>({
    defaultValues: {
      codex: params?.codexId
    }
  })

  return (
    <Create
      isLoading={formLoading}
      saveButtonProps={saveButtonProps}
    >
      <FormControl
        mb='3'
        isInvalid={!!(errors as any)?.name}
      >
        <FormLabel>Name</FormLabel>
        <Input
          type='text'
          {...register('name', {
            required: 'This field is required'
          })}
        />
        <FormErrorMessage>
          {(errors as any)?.name?.message as string}
        </FormErrorMessage>
      </FormControl>
      <FormControl
        mb='3'
        isInvalid={!!(errors as any)?.caption}
      >
        <FormLabel>Caption</FormLabel>
        <Input
          type='text'
          {...register('caption')}
        />
        <FormErrorMessage>
          {(errors as any)?.caption?.message as string}
        </FormErrorMessage>
      </FormControl>
      <FormControl
        mb='3'
        isInvalid={!!errors?.leader}
      >
        <FormLabel>Leader</FormLabel>
        <Checkbox
          {...register('leader', {
            required: 'This field is required'
          })}
        />
        <FormErrorMessage>{errors?.leader?.message as string}</FormErrorMessage>
      </FormControl>
      <FormControl
        mb='3'
        isInvalid={!!(errors as any)?.limit}
      >
        <FormLabel>Limit</FormLabel>
        <Input
          type='number'
          {...register('limit', {
            required: 'This field is required',
            valueAsNumber: true
          })}
        />
        <FormErrorMessage>
          {(errors as any)?.limit?.message as string}
        </FormErrorMessage>
      </FormControl>
    </Create>
  )
}

export default UnitCreatePage
