import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input
} from '@chakra-ui/react'
import { Create } from '@refinedev/chakra-ui'
import { IResourceComponentsProps, useGo, useParsed } from '@refinedev/core'
import { useForm } from '@refinedev/react-hook-form'
import { Unit } from '../../../models'

const UnitCreatePage: React.FC<IResourceComponentsProps> = () => {
  const { params } = useParsed()
  const codexId = params?.codexId

  const go = useGo()

  const {
    refineCore: { formLoading },
    saveButtonProps,
    register,
    formState: { errors }
  } = useForm<Unit>({
    refineCoreProps: {
      onMutationSuccess: () =>
        go({
          to: '../',
          query: {
            codexId
          }
        }),
      redirect: false
    },
    defaultValues: {
      codex: codexId,
      leader: false
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
    </Create>
  )
}

export default UnitCreatePage
