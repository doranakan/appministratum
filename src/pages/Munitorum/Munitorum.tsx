import { Card, Heading, Input, VStack } from '@chakra-ui/react'
import { useCallback } from 'react'

const Munitorum = () => {
  const parsePdf: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    async (e) => {
      const file = e.target.files?.[0]
      console.log({ file })
    },
    []
  )

  return (
    <VStack
      alignItems='flex-start'
      flex={1}
    >
      <Card
        gap='4'
        p='4'
        w='full'
      >
        <Heading size='lg'>Munitorum</Heading>
        <Input
          type='file'
          accept='application/pdf'
          onChange={parsePdf}
        />
      </Card>
    </VStack>
  )
}

export default Munitorum
