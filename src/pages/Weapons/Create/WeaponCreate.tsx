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
import { Weapon } from '../../../models'

const WeaponCreate: React.FC<IResourceComponentsProps> = () => {
  const { params } = useParsed()
  const unitId = params?.unitId

  const go = useGo()

  const {
    refineCore: { formLoading },
    saveButtonProps,
    register,
    formState: { errors }
  } = useForm<Weapon>({
    refineCoreProps: {
      onMutationSuccess: () =>
        go({
          to: '../',
          query: {
            unitId
          }
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

  const { options: sOptions } = useSelect({
    resource: ''
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
        isInvalid={!!(errors as any)?.range}
      >
        <FormLabel>Range</FormLabel>
        <Input
          type='string'
          {...register('range')}
        />
      </FormControl>
      <FormControl
        mb='3'
        isInvalid={!!(errors as any)?.a}
      >
        <FormLabel>A</FormLabel>
        <Input
          type='string'
          {...register('a', {
            required: 'This field is required'
          })}
        />
        <FormErrorMessage>
          {(errors as any)?.a?.message as string}
        </FormErrorMessage>
      </FormControl>
      <FormControl
        mb='3'
        isInvalid={!!(errors as any)?.bs_ws}
      >
        <FormLabel>Bs/Ws</FormLabel>
        <Input
          type='string'
          {...register('bs_ws')}
        />
      </FormControl>
      <FormControl
        mb='3'
        isInvalid={!!errors?.s}
      >
        <FormLabel>S</FormLabel>
        <Input
          type='string'
          {...register('s', {
            required: 'This field is required'
          })}
        />
        <FormErrorMessage>
          {(errors as any)?.s?.message as string}
        </FormErrorMessage>
      </FormControl>
      <FormControl
        mb='3'
        isInvalid={!!(errors as any)?.ap}
      >
        <FormLabel>Ap</FormLabel>
        <Input
          type='string'
          {...register('ap', {
            required: 'This field is required'
          })}
        />
        <FormErrorMessage>
          {(errors as any)?.ap?.message as string}
        </FormErrorMessage>
      </FormControl>
      <FormControl
        mb='3'
        isInvalid={!!(errors as any)?.d}
      >
        <FormLabel>D</FormLabel>
        <Input
          type='string'
          {...register('d', {
            required: 'This field is required'
          })}
        />
        <FormErrorMessage>
          {(errors as any)?.d?.message as string}
        </FormErrorMessage>
      </FormControl>
    </Create>
  )
}

export default WeaponCreate
