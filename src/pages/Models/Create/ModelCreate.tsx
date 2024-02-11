import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input
} from '@chakra-ui/react'
import { Create } from '@refinedev/chakra-ui'
import { IResourceComponentsProps, useGo, useParsed } from '@refinedev/core'
import { useForm } from '@refinedev/react-hook-form'
import { Model } from '../../../models'

const ModelCreate: React.FC<IResourceComponentsProps> = () => {
  const { params } = useParsed()
  const codexId = params?.codexId

  const go = useGo()

  const {
    refineCore: { formLoading },
    saveButtonProps,
    register,
    formState: { errors }
  } = useForm<Model>({
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
      codex: codexId
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
        isInvalid={!!(errors as any)?.m}
      >
        <FormLabel>M</FormLabel>
        <Input
          type='number'
          {...register('m', {
            required: 'This field is required',
            valueAsNumber: true
          })}
        />
        <FormErrorMessage>
          {(errors as any)?.m?.message as string}
        </FormErrorMessage>
      </FormControl>
      <FormControl
        mb='3'
        isInvalid={!!(errors as any)?.t}
      >
        <FormLabel>T</FormLabel>
        <Input
          type='number'
          {...register('t', {
            required: 'This field is required',
            valueAsNumber: true
          })}
        />
        <FormErrorMessage>
          {(errors as any)?.t?.message as string}
        </FormErrorMessage>
      </FormControl>
      <FormControl
        mb='3'
        isInvalid={!!(errors as any)?.sv}
      >
        <FormLabel>Sv</FormLabel>
        <Input
          type='number'
          {...register('sv', {
            required: 'This field is required',
            valueAsNumber: true
          })}
        />
        <FormErrorMessage>
          {(errors as any)?.sv?.message as string}
        </FormErrorMessage>
      </FormControl>
      <FormControl
        mb='3'
        isInvalid={!!(errors as any)?.w}
      >
        <FormLabel>W</FormLabel>
        <Input
          type='number'
          {...register('w', {
            required: 'This field is required',
            valueAsNumber: true
          })}
        />
        <FormErrorMessage>
          {(errors as any)?.w?.message as string}
        </FormErrorMessage>
      </FormControl>
      <FormControl
        mb='3'
        isInvalid={!!(errors as any)?.ld}
      >
        <FormLabel>Ld</FormLabel>
        <Input
          type='number'
          {...register('ld', {
            required: 'This field is required',
            valueAsNumber: true
          })}
        />
        <FormErrorMessage>
          {(errors as any)?.ld?.message as string}
        </FormErrorMessage>
      </FormControl>
      <FormControl
        mb='3'
        isInvalid={!!(errors as any)?.oc}
      >
        <FormLabel>Oc</FormLabel>
        <Input
          type='number'
          {...register('oc', {
            required: 'This field is required',
            valueAsNumber: true
          })}
        />
        <FormErrorMessage>
          {(errors as any)?.oc?.message as string}
        </FormErrorMessage>
      </FormControl>
    </Create>
  )
}

export default ModelCreate
